import axios, { isAxiosError } from "axios";
import type { ServiceDefinition } from "./api-types";

const index = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL || "",
  timeout: 10000,
});

const axiosApi = async (config: ServiceDefinition) => {
  return index({
    ...config,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...config?.headers,
    },
    params: config?.params,
  });
};

export const configFn = async <TData, Error = never>(
  config: ServiceDefinition
) => {
  try {
    const response = await axiosApi(config);
    return response.data as TData;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data as Error;
    }
    throw error;
  }
};
