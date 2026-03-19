import { configFn } from "@/lib/api/config/axios";
import authService from "@/lib/api/services/auth-service";
import { useMutation } from "@tanstack/react-query";

// export interface Pivot {
//     role_id?: number;
//     permission_id?: number;
//     model_type?: string;
//     model_id?: number;
// }

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    // pivot?: Pivot;
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    // pivot?: Pivot;
    permissions: Permission[];
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    email_verified_at: string | null;
    phone: string;
    status: string;
    role: string;
    address: string | null;
    date_of_birth: string | null;
    gender: string | null;
    profile_image: string | null;
    is_active: boolean;
    membership_date: string;
    occupation: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    // roles: Role[];
    // permissions: Permission[];
}

export interface AuthResponse {
    success: boolean;
    user: User;
    accessToken: string;
    refreshToken: string;
    roles: string[];
    permissions: string[];
}

export interface RegisterResponse {
    success: boolean;
    user: User;
    accessToken: string;
    refreshToken: string;
}

export const useAuthService = () => {
    return useMutation({
        mutationFn: (data: Record<string, any>) => configFn<AuthResponse>(authService.login(data))
    });
};

export const useRegisterService = () => {
    return useMutation({
        mutationFn: (data: Record<string, any>) => configFn<RegisterResponse>(authService.register(data))
    });
};

export const useAssignRoleService = () => {
    return useMutation({
        mutationFn: (data: Record<string, any>) => configFn(authService.assignRole(data))
    });
};

