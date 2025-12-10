import Signin from "@/features/auth/sigin";
import Dashboard from "@/features/dashboard/dashboard";
import Member from "@/features/dashboard/member_mgmt/member/member";
import NewConvert from "@/features/dashboard/member_mgmt/new_convert/new-convert";
import Visitor from "@/features/dashboard/member_mgmt/visitor/visitor";
import DashboardLayout from "@/layouts/dashboard-layout";

export type RouteType = {
    path: string,
    element: React.ReactNode,
    index: true | undefined
}

export const routes: RouteType[] | any[] = [
    //initial route
    {
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
                    { path: "member", element: <Member /> },
                    { path: "visitor", element: <Visitor /> },
                    { path: "new-convert", element: <NewConvert /> },
                ]
            },
            // group management route
            {
                path: "group-management",
                children: [
                    { path: "group", element: <div className="size-full bg-green-50">Groups</div> },
                    { path: "family", element: <div className="size-full bg-green-50">Family </div> },
                ]
            },
            // asset management route
            {
                path: "asset-management",
                children: [
                    { path: "facility", element: <div className="size-full bg-green-50">Facility</div> },
                    { path: "inventory", element: <div className="size-full bg-green-50" >Inventory</div> },
                ]
            },
            // Accounting & finance management route
            {
                path: "accounting-finance",
                children: [
                    { path: "income", element: <div className="size-full bg-blue-50">Income</div> },
                    { path: "expenses", element: <div className="size-full bg-blue-50">Expenses</div> },
                    { path: "balance-sheet", element: <div className="size-full bg-blue-50">Balance sheet</div> },
                ]
            },
            // Event & Service management route
            {
                path: "event-service",
                children: [
                    { path: "service", element: <div className="size-full bg-blue-50">Service</div> },
                    { path: "event", element: <div className="size-full bg-blue-50">Event</div> },
                    { path: "order-of-service", element: <div className="size-full bg-blue-50">Order of service</div> },
                ]
            }
        ]
    },
];