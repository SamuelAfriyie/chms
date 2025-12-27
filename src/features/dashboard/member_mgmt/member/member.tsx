import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui/card";
import { memberColumns } from "../data/member_columns";
import AutoResponsive from "@/components/auto_responsive";
import { memberSampleData } from "../data/memberSampleData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import MemberForm from "./components/member_form";
import MemberToolbar from "./components/member_toolbar";

export default function Member() {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [refresh, _setRefresh] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [refresh]);

    return (
        <main className="size-full overflow-hidden px-1">
            <header className="w-full h-fit py-1">
                <div className="flex justify-between space-x-2 items-center">
                    <MemberToolbar />
                    <Button size={"sm"} onClick={() => setOpen(true)}><Plus /> Add Member</Button>
                </div>
            </header>
            <AutoResponsive>
                <Card className="gap-0 py-0 px-2 rounded-md h-full">
                    <DataTable columns={memberColumns} dataSource={memberSampleData} columnToFilter="fName" pinnedLeftColumns={['select']} isLoading={loading} />
                </Card>
            </AutoResponsive>
            <MemberForm open={open} setOpen={setOpen} />
        </main>
    )
}