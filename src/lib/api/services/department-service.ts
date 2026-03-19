import type { ServiceDefinition } from "../config/api-types";

const departmentService = {

    create: (data?: Record<string, any>) => {
        return {
            url: "/departments",
            method: "POST",
            data,
        } as ServiceDefinition;
    },

    getAll: (params?: Record<string, any>) => {
        return {
            url: "/departments",
            method: "GET",
            params,
        } as ServiceDefinition;
    },

    getById: (id: string) => {
        return {
            url: `/departments/${id}`,
            method: "GET",
        } as ServiceDefinition;
    },

    assignLeader: (id: string, data?: Record<string, any>) => {
        return {
            url: `/departments/${id}/assign-leader`,
            method: "PATCH",
            data,
        } as ServiceDefinition;
    },

}

export default departmentService;
