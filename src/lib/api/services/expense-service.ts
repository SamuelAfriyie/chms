import type { ServiceDefinition } from "../config/api-types";

const expenseService = {

    create: (data?: Record<string, any>) => {
        return {
            url: "/expenses",
            method: "POST",
            data,
        } as ServiceDefinition;
    },

    getAll: (params?: Record<string, any>) => {
        return {
            url: "/expenses",
            method: "GET",
            params,
        } as ServiceDefinition;
    },

    getTotal: () => {
        return {
            url: "/expenses/total",
            method: "GET",
        } as ServiceDefinition;
    },

    getByDepartment: () => {
        return {
            url: "/expenses/by-department",
            method: "GET",
        } as ServiceDefinition;
    },

    update: (id: string, data?: Record<string, any>) => {
        return {
            url: `/expenses/${id}`,
            method: "PATCH",
            data,
        } as ServiceDefinition;
    },

    remove: (id: string) => {
        return {
            url: `/expenses/${id}`,
            method: "DELETE",
        } as ServiceDefinition;
    },

}

export default expenseService;
