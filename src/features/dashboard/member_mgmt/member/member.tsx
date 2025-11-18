import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui/card";
import { memberColumns } from "../data/member_columns";
import AutoResponsive from "@/components/auto_responsive";
import { memberSampleData } from "../data/memberSampleData";

export default function Member() {
    return (
        <main className="size-full overflow-hidden px-1">
            <AutoResponsive>
                <Card className="gap-0 py-0 px-2 rounded-md h-full">
                    <DataTable columns={memberColumns} dataSource={memberSampleData} columnToFilter="fName" pinnedLeftColumns={['select']} />
                </Card>
            </AutoResponsive>
        </main>
    )
}