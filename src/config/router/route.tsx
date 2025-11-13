import Signin from "@/features/auth/sigin";
import Dashboard from "@/features/dashboard/dashboard";
import DashboardLayout from "@/layouts/dashboard-layout";

export type RouteType = {
    path: string,
    element: React.ReactNode,
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
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            // member management route
            {
                path: "member-management",
                children: [
                    { path: "member", element: <div className="size-full bg-red-50" /> },
                    { path: "visitor", element: <div className="size-full bg-yellow-50" /> },
                    { path: "new-convert", element: <div className="size-full bg-blue-50" /> },
                ]
            },
            // group management route
            {
                path: "group-management",
                children: [
                    { path: "department", element: <div className="size-full bg-green-50" /> },
                ]
            }
        ]
    },
];