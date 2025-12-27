import { configFn } from "@/lib/api/config/axios";
import authService from "@/lib/api/services/auth-service";
import { useMutation } from "@tanstack/react-query";

interface AuthResponse {
    access_token: string;
}

export const useAuthService = () => {
    return useMutation({
        mutationFn: (data: Record<string, any>) => configFn<AuthResponse>(authService.login(data))
    });
}

