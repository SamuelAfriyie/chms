import type { ServiceDefinition } from "../config/api-types";

const contributionService = {

    create: (data?: Record<string, any>) => {
        return {
            url: "/contributions",
            method: "POST",
            data,
        } as ServiceDefinition;
    },

    getAll: (params?: Record<string, any>) => {
        return {
            url: "/contributions",
            method: "GET",
            params,
        } as ServiceDefinition;
    },

    getById: (id: string) => {
        return {
            url: `/contributions/${id}`,
            method: "GET",
        } as ServiceDefinition;
    },

    getByType: (type: string, params?: Record<string, any>) => {
        return {
            url: `/contributions/by-type/${type}`,
            method: "GET",
            params,
        } as ServiceDefinition;
    },

    getByMember: (memberId: string, params?: Record<string, any>) => {
        return {
            url: `/contributions/by-member/${memberId}`,
            method: "GET",
            params,
        } as ServiceDefinition;
    },

    monthlySummary: (year: number, month: number) => {
        return {
            url: `/contributions/summary/monthly/${year}/${month}`,
            method: "GET",
        } as ServiceDefinition;
    },

    yearlySummary: (year: number) => {
        return {
            url: `/contributions/summary/yearly/${year}`,
            method: "GET",
        } as ServiceDefinition;
    },

    summaryByType: () => {
        return {
            url: "/contributions/summary/by-type",
            method: "GET",
        } as ServiceDefinition;
    },

    update: (id: string, data?: Record<string, any>) => {
        return {
            url: `/contributions/${id}`,
            method: "PATCH",
            data,
        } as ServiceDefinition;
    },

    remove: (id: string) => {
        return {
            url: `/contributions/${id}`,
            method: "DELETE",
        } as ServiceDefinition;
    },

}

export default contributionService;
