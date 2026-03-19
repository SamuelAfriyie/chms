import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui/card";
import AutoResponsive from "@/components/auto_responsive";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { expenseColumns } from "../data/expense_columns";
import ExpenseForm from "./components/expense_form";
import { useGetExpenses } from "@/hooks/use-expense-service";
import { useQueryClient } from "@tanstack/react-query";

export default function Expenses() {
    const [open, setOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const { data, isLoading } = useGetExpenses({ page: 1, limit: 50 });

    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ["expenses"] });
    };

    return (
        <main className="size-full overflow-hidden px-1">
            <header className="w-full h-fit p-2">
                <div className="flex justify-end space-x-2">
                    <Button size={"sm"} onClick={() => setOpen(true)}><Plus /> Add Expense</Button>
                </div>
            </header>
            <AutoResponsive>
                <Card className="gap-0 py-0 px-2 rounded-md h-full">
                    <DataTable
                        columns={expenseColumns}
                        dataSource={data?.data ?? []}
                        columnToFilter="title"
                        pinnedLeftColumns={['select']}
                        isLoading={isLoading}
                    />
                </Card>
            </AutoResponsive>
            <ExpenseForm open={open} setOpen={setOpen} onSuccess={handleSuccess} />
        </main>
    );
}
