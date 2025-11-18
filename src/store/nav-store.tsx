"use client"
import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';
import { persist, type PersistOptions } from "zustand/middleware";

export type NavigationState = {
    selected: string,
}

type NavigationActions = {
    toggle: (value?: string) => void,
}

type NavStore = NavigationState & NavigationActions

const defaultInitState: NavigationState = {
    selected: '/dashboard',
}

export const createNavStore = (
    initState: NavigationState = defaultInitState,
) => {
    return createStore<NavStore>()(
        persist(
            (set) => ({
                ...initState,
                toggle: (value?: string) => set({ selected: value }),
            }),
            {
                name: "nav-store",
            } as PersistOptions<NavStore>
        )
    )
}

const navStore = createNavStore();

export const useNavStore = () => useStore(navStore);