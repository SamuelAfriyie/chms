import { ProtectedRoute } from "@/features/auth/middleware";
import Signin from "@/features/auth/sigin";
import Expenses from "@/features/dashboard/accounting_finance/expenses/expenses";
import Offering from "@/features/dashboard/contribution_mgmt/offering/offering";
import Department from "@/features/dashboard/department_mgmt/department/department";
import Facilitator from "@/features/dashboard/facilitator_mgmt/facilitator/facilitator";
import Member from "@/features/dashboard/member_mgmt/member/member";
import Overview from "@/features/dashboard/overview/overview";
import UserAccount from "@/features/dashboard/user_account/user-account";

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
        element: <ProtectedRoute />,
        children: [
            { index: true, element: <Overview /> },
            // { index: true, element: <Dashboard /> },
            // member management route
            {
                path: "member-management",
                children: [
                    { path: "member", element: <Member /> },
                    // { path: "visitor", element: <Visitor /> },
                    // { path: "new-convert", element: <NewConvert /> },
                ]
            },
            // group management route
            // {
            //     path: "group-management",
            //     children: [
            //         { path: "group", element: <Group /> },
            //         { path: "family", element: <Family /> },
            //     ]
            // },
            // asset management route
            // {
            //     path: "asset-management",
            //     children: [
            //         { path: "facility", element: <div className="size-full bg-green-50">Facility</div> },
            //         { path: "inventory", element: <div className="size-full bg-green-50" >Inventory</div> },
            //     ]
            // },
            // Accounting & finance management route
            {
                path: "accounting-finance",
                children: [
                    // { path: "income", element: <div className="size-full bg-blue-50">Income</div> },
                    { path: "expenses", element: <Expenses /> },
                    // { path: "balance-sheet", element: <div className="size-full bg-blue-50">Balance sheet</div> },
                ]
            },
            // Department management route
            {
                path: "department-management",
                children: [
                    { path: "departments", element: <Department /> },
                ]
            },
            // Facilitator management route
            {
                path: "facilitator-management",
                children: [
                    { path: "facilitators", element: <Facilitator /> },
                ]
            },
            // System administration
            { path: "user-account", element: <UserAccount /> },
            // Event & Service management route
            // {
            //     path: "event-service",
            //     children: [
            //         { path: "service", element: <div className="size-full bg-blue-50">Service</div> },
            //         { path: "event", element: <div className="size-full bg-blue-50">Event</div> },
            //         { path: "order-of-service", element: <div className="size-full bg-blue-50">Order of service</div> },
            //     ]
            // },
            // Event & Service management route
            {
                path: "contribution-management",
                children: [
                    // { path: "tithes", element: <Tithe /> },
                    { path: "offerings", element: <Offering /> },
                ]
            }
        ]
    },
];