import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui/card";
import AutoResponsive from "@/components/auto_responsive";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import OfferingForm from "./components/offering_form";
import { offeringColumns } from "../data/offering_columns";
import { useGetContributionsByType } from "@/hooks/use-contribution-service";
import { useQueryClient } from "@tanstack/react-query";
import ContributionStats from "../components/contribution-stats";

export default function Offering() {
    const [open, setOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const { data, isLoading } = useGetContributionsByType("OFFERINGS", { page: 1, limit: 50 });

    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ["contributions"] });
    };

    return (
        <main className="size-full overflow-y-auto overflow-x-hidden px-1">
            <header className="w-full h-fit p-2">
                <div className="flex justify-end space-x-2">
                    <Button size={"sm"} onClick={() => setOpen(true)}><Plus /> Add Offering</Button>
                </div>
            </header>
            <ContributionStats contributionType="OFFERINGS" />
            <AutoResponsive>
                <Card className="gap-0 py-0 px-2 rounded-md h-full">
                    <DataTable
                        columns={offeringColumns}
                        dataSource={data?.data ?? []}
                        columnToFilter="memberId"
                        pinnedLeftColumns={['select']}
                        isLoading={isLoading}
                    />
                </Card>
            </AutoResponsive>
            <OfferingForm open={open} setOpen={setOpen} onSuccess={handleSuccess} />
        </main>
    );
}
