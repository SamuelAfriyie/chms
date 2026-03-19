import DashboardLayout from "@/layouts/dashboard-layout";
import { Navigate } from "react-router";

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return <DashboardLayout />;
};

function useAuth(): { isAuthenticated: boolean } {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    return { isAuthenticated: !!token };
}
