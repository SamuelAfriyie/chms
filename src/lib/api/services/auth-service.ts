import type { ServiceDefinition } from "../config/api-types";

const authService = {

    login: (data?: Record<string, any>) => {
        return {
            url: "login",
            method: "POST",
            data,
        } as ServiceDefinition;
    }

}

export default authService;