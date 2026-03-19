import { configFn } from "@/lib/api/config/axios";
import reportService from "@/lib/api/services/report-service";
import { useQuery } from "@tanstack/react-query";

export interface FinancialSummary {
    totalContributions: number;
    totalExpenses: number;
    netBalance: number;
    startDate: string;
    endDate: string;
}

export interface ContributionsVsExpenses {
    month: string;
    contributions: number;
    expenses: number;
}

export interface MonthlyGiving {
    memberId: string;
    memberName: string;
    totalAmount: number;
    contributionCount: number;
}

export interface DepartmentalExpense {
    department: string;
    totalAmount: number;
    expenseCount: number;
}

export const useGetFinancialSummary = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ["reports", "financial-summary", params],
        queryFn: () => configFn<FinancialSummary>(reportService.financialSummary(params)),
        enabled: !!params?.startDate && !!params?.endDate,
    });
};

export const useGetContributionsVsExpenses = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ["reports", "contributions-vs-expenses", params],
        queryFn: () => configFn<ContributionsVsExpenses[]>(reportService.contributionsVsExpenses(params)),
    });
};

export const useGetMonthlyGiving = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ["reports", "monthly-giving", params],
        queryFn: () => configFn<MonthlyGiving[]>(reportService.monthlyGiving(params)),
        enabled: !!params?.year && !!params?.month,
    });
};

export const useGetDepartmentalExpenses = () => {
    return useQuery({
        queryKey: ["reports", "departmental-expenses"],
        queryFn: () => configFn<DepartmentalExpense[]>(reportService.departmentalExpenses()),
    });
};
