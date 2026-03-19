import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui/card";
import AutoResponsive from "@/components/auto_responsive";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { departmentColumns } from "../data/department_columns";
import DepartmentForm from "./components/department_form";
import { useGetDepartments } from "@/hooks/use-department-service";
import { useQueryClient } from "@tanstack/react-query";

export default function Department() {
    const [open, setOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const { data, isLoading } = useGetDepartments({ page: 1, limit: 50 });

    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ["departments"] });
    };

    return (
        <main className="size-full overflow-hidden px-1">
            <header className="w-full h-fit p-2">
                <div className="flex justify-end space-x-2">
                    <Button size={"sm"} onClick={() => setOpen(true)}><Plus /> Add Department</Button>
                </div>
            </header>
            <AutoResponsive>
                <Card className="gap-0 py-0 px-2 rounded-md h-full">
                    <DataTable
                        columns={departmentColumns}
                        dataSource={data?.data ?? []}
                        columnToFilter="name"
                        pinnedLeftColumns={['select']}
                        isLoading={isLoading}
                    />
                </Card>
            </AutoResponsive>
            <DepartmentForm open={open} setOpen={setOpen} onSuccess={handleSuccess} />
        </main>
    );
}
