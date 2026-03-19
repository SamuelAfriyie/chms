import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';
import { persist, type PersistStorage, type PersistOptions } from "zustand/middleware";
import { SecretManager } from '../utils/encrypt';
import type { User } from '@/hooks/use-auth-service';

export type AuthState = {
    user?: User,
    token?: string,
    refreshToken?: string,
}

type AuthAction = {
    save: (data: any) => void,
    clear: () => void
}

type AuthStore = AuthState & AuthAction

const defaultInitState: AuthState = {
}

export const CreateAuthStore = (
    initState: AuthState = defaultInitState,
) => {
    return createStore<AuthStore>()(
        persist(
            (set) => ({
                ...initState,
                save: ({ user, accessToken, refreshToken }: any) => {
                    set({ user, token: accessToken, refreshToken });
                    document.cookie = `token=${accessToken}; path=/; max-age=604800; samesite=strict`;
                },
                clear: () => {
                    set(defaultInitState);
                    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                },
            }),
            {
                name: "auth-store",
                storage: encryptedStorage
            } as PersistOptions<AuthStore>
        )
    )
}

const encryptedStorage: PersistStorage<AuthStore> = {
    getItem: (name) => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        try {
            const decryptedData = SecretManager.decrypt(str);
            if (!decryptedData) return;
            return JSON.parse(decryptedData);
        } catch (e) {
            return null;
        }
    },
    setItem: (name, newValue) => {
        const encrypted = SecretManager.encrypt(newValue);
        if (!encrypted) return;
        localStorage.setItem(name, encrypted);
    },
    removeItem: (name) => localStorage.removeItem(name),
};

export const authStore = CreateAuthStore();

export const useAuthStore = () => useStore(authStore);

export const logout = () => {
    authStore.persist.clearStorage();
    authStore.getState().clear();
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};