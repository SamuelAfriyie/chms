import type { AxiosRequestHeaders } from "axios";

/**
 * Generic type for API service calls
 */
export type ServiceDefinition<T = unknown> = {
  method: `GET` | `POST` | `PUT` | `DELETE` | `PATCH` | `OPTIONS` | `HEAD`;
  url: string;
  data?: T;
  params?: Record<string, unknown>;
  headers?: AxiosRequestHeaders;
};

export type BaseResponse<T = unknown> = {
  code?: number;
  message: string;
  data: T;
  status: boolean;
};
