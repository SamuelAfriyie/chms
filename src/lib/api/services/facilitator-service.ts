import type { ServiceDefinition } from "../config/api-types";

const facilitatorService = {

    create: (data?: Record<string, any>) => {
        return {
            url: "/facilitators",
            method: "POST",
            data,
        } as ServiceDefinition;
    },

    getAll: () => {
        return {
            url: "/facilitators",
            method: "GET",
        } as ServiceDefinition;
    },

    getByMinistry: (ministryType: string) => {
        return {
            url: `/facilitators/ministry/${ministryType}`,
            method: "GET",
        } as ServiceDefinition;
    },

}

export default facilitatorService;
