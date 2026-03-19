import { configFn } from "@/lib/api/config/axios";
import departmentService from "@/lib/api/services/department-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface Department {
    id: string;
    name: string;
    description?: string;
    leaderId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface DepartmentListResponse {
    data: Department[];
    total: number;
    page: number;
    limit: number;
}

export const useCreateDepartment = () => {
    return useMutation({
        mutationFn: (data: Record<string, any>) =>
            configFn<Department>(departmentService.create(data)),
    });
};

export const useGetDepartments = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ["departments", params],
        queryFn: () => configFn<DepartmentListResponse>(departmentService.getAll(params)),
    });
};

export const useAssignDepartmentLeader = () => {
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Record<string, any> }) =>
            configFn<Department>(departmentService.assignLeader(id, data)),
    });
};
