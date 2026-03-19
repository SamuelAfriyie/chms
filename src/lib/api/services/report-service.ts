import type { ServiceDefinition } from "../config/api-types";

const reportService = {

    financialSummary: (params?: Record<string, any>) => {
        return {
            url: "/reports/financial-summary",
            method: "GET",
            params,
        } as ServiceDefinition;
    },

    contributionsVsExpenses: (params?: Record<string, any>) => {
        return {
            url: "/reports/contributions-vs-expenses",
            method: "GET",
            params,
        } as ServiceDefinition;
    },

    monthlyGiving: (params?: Record<string, any>) => {
        return {
            url: "/reports/monthly-giving",
            method: "GET",
            params,
        } as ServiceDefinition;
    },

    departmentalExpenses: () => {
        return {
            url: "/reports/departmental-expenses",
            method: "GET",
        } as ServiceDefinition;
    },

}

export default reportService;
