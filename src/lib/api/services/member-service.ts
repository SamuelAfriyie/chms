import type { ServiceDefinition } from "../config/api-types";

const memberService = {

    create: (data?: Record<string, any>) => {
        return {
            url: "/members",
            method: "POST",
            data,
        } as ServiceDefinition;
    },

    getAll: (params?: Record<string, any>) => {
        return {
            url: "/members",
            method: "GET",
            params,
        } as ServiceDefinition;
    },

    getByDepartment: (departmentId: string) => {
        return {
            url: `/members/department/${departmentId}`,
            method: "GET",
        } as ServiceDefinition;
    },

}

export default memberService;
