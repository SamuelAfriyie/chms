import { configFn } from "@/lib/api/config/axios";
import facilitatorService from "@/lib/api/services/facilitator-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface Facilitator {
    id: string;
    name: string;
    role: string;
    ministryType: string;
    phone: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export const useCreateFacilitator = () => {
    return useMutation({
        mutationFn: (data: Record<string, any>) =>
            configFn<Facilitator>(facilitatorService.create(data)),
    });
};

export const useGetFacilitators = () => {
    return useQuery({
        queryKey: ["facilitators"],
        queryFn: () => configFn<Facilitator[]>(facilitatorService.getAll()),
    });
};

export const useGetFacilitatorsByMinistry = (ministryType: string) => {
    return useQuery({
        queryKey: ["facilitators", "ministry", ministryType],
        queryFn: () => configFn<Facilitator[]>(facilitatorService.getByMinistry(ministryType)),
        enabled: !!ministryType,
    });
};
