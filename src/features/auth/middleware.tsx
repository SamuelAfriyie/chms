import DashboardLayout from "@/layouts/dashboard-layout";
import { Navigate } from "react-router";

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return <DashboardLayout />;
};

function useAuth(): { isAuthenticated: any; } {
    const token = localStorage.getItem('token') ?? undefined;
    console.log("Token: ", token);
    return { isAuthenticated: !!token }
}
