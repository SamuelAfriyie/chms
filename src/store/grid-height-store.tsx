import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';

export type gridHeightState = {
    height: number,
}

type gridHeightActions = {
    setHeight: (height: number) => void,
}

type GridHeightStore = gridHeightState & gridHeightActions

const defaultInitState: gridHeightState = {
    height: 300,
}

export const createGridHeightStore = (
    initState: gridHeightState = defaultInitState,
) => {
    return createStore<GridHeightStore>()((set) => ({
        ...initState,
        setHeight: (height: number) => set(() => ({ height })),
    }))
}

const gridHeightStore = createGridHeightStore();

export const useGridHeight = () => useStore(gridHeightStore);