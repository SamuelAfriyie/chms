import type { ServiceDefinition } from "../config/api-types";

const authService = {

    login: (data?: Record<string, any>) => {
        return {
            url: "/auth/login",
            method: "POST",
            data,
        } as ServiceDefinition;
    },

    register: (data?: Record<string, any>) => {
        return {
            url: "/auth/register",
            method: "POST",
            data,
        } as ServiceDefinition;
    },

    assignRole: (data?: Record<string, any>) => {
        return {
            url: "/auth/assign-role",
            method: "POST",
            data,
        } as ServiceDefinition;
    },

    changePassword: (data?: Record<string, any>) => {
        return {
            url: "/auth/change-password",
            method: "POST",
            data,
        } as ServiceDefinition;
    },

}

export default authService;