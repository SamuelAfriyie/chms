import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui/card";
import { memberColumns } from "../data/member_columns";
import AutoResponsive from "@/components/auto_responsive";
import { memberSampleData } from "../data/memberSampleData";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { SideSheet } from "@/components/side-sheet";

export default function Member() {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [refresh]);

    return (
        <main className="size-full overflow-hidden px-1">
            <header className="w-full h-fit p-2">
                <div className="flex justify-end space-x-2">
                    <Button variant={"outline"} size={"sm"} onClick={() => setOpen(true)}><Plus /> Add Member</Button>

                </div>
            </header>
            <AutoResponsive>
                <Card className="gap-0 py-0 px-2 rounded-md h-full">
                    <DataTable columns={memberColumns} dataSource={memberSampleData} columnToFilter="fName" pinnedLeftColumns={['select']} isLoading={loading} />
                </Card>
            </AutoResponsive>
            <SideSheet open={open} onOpenChange={setOpen} title="Add New Member" description="Add a new member to the church"
                footer={<div className="flex w-full space-x-2">
                    <div className="w-full">
                        <Button variant="outline" className="w-full" onClick={() => setOpen(false)} >Close</Button>
                    </div>
                    <div className="w-full">
                        <Button type="submit" className="w-full" onClick={() => {
                            setOpen(false);
                            setRefresh(!refresh);
                        }} ><Save /> Save member</Button>
                    </div>
                </div>} >
                <div className="h-[800px] bg-red-50" />
            </SideSheet>
        </main>
    )
}