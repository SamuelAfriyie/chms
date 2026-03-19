import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui/card";
import AutoResponsive from "@/components/auto_responsive";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { facilitatorColumns } from "../data/facilitator_columns";
import FacilitatorForm from "./components/facilitator_form";
import { useGetFacilitators } from "@/hooks/use-facilitator-service";
import { useQueryClient } from "@tanstack/react-query";

export default function Facilitator() {
    const [open, setOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const { data: res, isLoading } = useGetFacilitators({ page: 1, limit: 50 });
    console.log(res?.data)
    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ["facilitators"] });
    };

    return (
        <main className="size-full overflow-hidden px-1">
            <header className="w-full h-fit p-2">
                <div className="flex justify-end space-x-2">
                    <Button size={"sm"} onClick={() => setOpen(true)}><Plus /> Add Facilitator</Button>
                </div>
            </header>
            <AutoResponsive>
                <Card className="gap-0 py-0 px-2 rounded-md h-full">
                    <DataTable
                        columns={facilitatorColumns}
                        dataSource={res?.data ?? []}
                        columnToFilter="name"
                        pinnedLeftColumns={['select']}
                        isLoading={isLoading}
                    />
                </Card>
            </AutoResponsive>
            <FacilitatorForm open={open} setOpen={setOpen} onSuccess={handleSuccess} />
        </main>
    );
}
