import Signin from "@/features/auth/sigin";
import Dashboard from "@/features/dashboard/dashboard";
import type { ReactElement } from "react"

export type RouteType = {
    path: string,
    element: ReactElement,
    index: true | undefined
}

export const routes: RouteType[] | any[] = [
    //initial route
    {
        path: "/",
        index: true,
        element: <Signin />
    },
    {
        path: "/dashboard",
        element: (<Dashboard />)
    },
];