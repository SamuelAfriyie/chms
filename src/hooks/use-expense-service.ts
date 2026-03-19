import { configFn } from "@/lib/api/config/axios";
import expenseService from "@/lib/api/services/expense-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface Expense {
    id: string;
    title: string;
    description?: string;
    amount: number;
    category: string;
    department: string;
    expenseDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface ExpenseListResponse {
    data: Expense[];
    total: number;
    page: number;
    limit: number;
}

export const useCreateExpense = () => {
    return useMutation({
        mutationFn: (data: Record<string, any>) =>
            configFn<Expense>(expenseService.create(data)),
    });
};

export const useGetExpenses = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ["expenses", params],
        queryFn: () => configFn<ExpenseListResponse>(expenseService.getAll(params)),
    });
};

export const useUpdateExpense = () => {
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Record<string, any> }) =>
            configFn<Expense>(expenseService.update(id, data)),
    });
};

export const useDeleteExpense = () => {
    return useMutation({
        mutationFn: (id: string) =>
            configFn<void>(expenseService.remove(id)),
    });
};
