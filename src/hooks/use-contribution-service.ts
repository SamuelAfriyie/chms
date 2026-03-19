import { configFn } from "@/lib/api/config/axios";
import contributionService from "@/lib/api/services/contribution-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface Contribution {
    id: string;
    memberId: string;
    contributionType: string;
    amount: number;
    paymentMethod: string;
    reference?: string;
    date: string;
    createdAt: string;
    updatedAt: string;
}

export interface ContributionListResponse {
    data: Contribution[];
    total: number;
    page: number;
    limit: number;
}

export const useCreateContribution = () => {
    return useMutation({
        mutationFn: (data: Record<string, any>) =>
            configFn<Contribution>(contributionService.create(data)),
    });
};

export const useGetContributions = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ["contributions", params],
        queryFn: () => configFn<ContributionListResponse>(contributionService.getAll(params)),
    });
};

export const useGetContributionsByType = (type: string, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ["contributions", "by-type", type, params],
        queryFn: () => configFn<ContributionListResponse>(contributionService.getByType(type, params)),
        enabled: !!type,
    });
};

export const useUpdateContribution = () => {
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Record<string, any> }) =>
            configFn<Contribution>(contributionService.update(id, data)),
    });
};

export const useDeleteContribution = () => {
    return useMutation({
        mutationFn: (id: string) =>
            configFn<void>(contributionService.remove(id)),
    });
};

export const useGetContributionById = (id: string) => {
    return useQuery({
        queryKey: ["contributions", id],
        queryFn: () => configFn<Contribution>(contributionService.getById(id)),
        enabled: !!id,
    });
};

export const useGetContributionsByMember = (memberId: string, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ["contributions", "by-member", memberId, params],
        queryFn: () => configFn<ContributionListResponse>(contributionService.getByMember(memberId, params)),
        enabled: !!memberId,
    });
};

export interface MonthlySummaryResponse {
    year: number;
    month: number;
    total: number;
    count: number;
}

export interface YearlySummaryResponse {
    year: number;
    total: number;
    count: number;
}

export interface SummaryByTypeItem {
    contributionType: string;
    total: number;
    count: number;
}

export const useGetMonthlySummary = (year: number, month: number) => {
    return useQuery({
        queryKey: ["contributions", "summary", "monthly", year, month],
        queryFn: () => configFn<MonthlySummaryResponse>(contributionService.monthlySummary(year, month)),
        enabled: !!year && !!month,
    });
};

export const useGetYearlySummary = (year: number) => {
    return useQuery({
        queryKey: ["contributions", "summary", "yearly", year],
        queryFn: () => configFn<YearlySummaryResponse>(contributionService.yearlySummary(year)),
        enabled: !!year,
    });
};

export const useGetSummaryByType = () => {
    return useQuery({
        queryKey: ["contributions", "summary", "by-type"],
        queryFn: () => configFn<SummaryByTypeItem[]>(contributionService.summaryByType()),
    });
};
