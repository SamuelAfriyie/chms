import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';
import { persist, type PersistOptions } from "zustand/middleware";

export type FovouriteState = {
    items: any[],
}

type FavouriteAction = {
    addTo: (navItem?: any) => void,
}

type FavStore = FovouriteState & FavouriteAction

const defaultInitState: FovouriteState = {
    items: [],
}

export const createFavStore = (
    initState: FovouriteState = defaultInitState,
) => {
    return createStore<FavStore>()(
        persist(
            (set, get) => ({
                ...initState,

                addTo: (item?: any) => {
                    if (!item) return;

                    const current = get().items ?? [];

                    // 1. Check if item already exists (same name)
                    const exists = current.some((i) => i.name === item.name);

                    if (exists) {
                        // Do nothing — keep original order and data
                        return;
                    }

                    // 2. Add new item
                    let updated = [...current, item];

                    // 3. If more than 4 items, keep last 4
                    if (updated.length > 4) {
                        updated = updated.slice(updated.length - 4);
                    }

                    set({ items: updated });
                },
            }),
            {
                name: "fav-store",
            } as PersistOptions<FavStore>
        )
    )
}

const favStore = createFavStore();

export const useFavStore = () => useStore(favStore);