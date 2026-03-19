import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui/card";
import { memberColumns, type Member } from "../data/member_columns";
import AutoResponsive from "@/components/auto_responsive";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import MemberForm from "./components/member_form";
import { useGetMembers } from "@/hooks/use-member-service";
import { useQueryClient } from "@tanstack/react-query";

export default function Member() {
    const [open, setOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const { data, isLoading } = useGetMembers({ page: 1, limit: 50 });

    const tableData: Member[] = (data?.data ?? []).map((m, index) => ({
        id: index,
        membershipId: m.id,
        fName: m.firstName,
        lName: m.lastName,
        gender: m.gender,
        dateOfBirth: m.dateOfBirth,
        phone: m.phone,
        email: m.email,
        ministry: m.ministry,
        joinDate: m.joinDate,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
    }));

    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ["members"] });
    };

    return (
        <main className="size-full overflow-hidden px-1">
            <header className="w-full h-fit py-1">
                <div className="flex justify-end">
                    <Button size={"sm"} onClick={() => setOpen(true)}><Plus /> Add Member</Button>
                </div>
            </header>
            <AutoResponsive>
                <Card className="gap-0 py-0 px-2 rounded-md h-full">
                    <DataTable columns={memberColumns} dataSource={tableData} columnToFilter="fName" pinnedLeftColumns={['select']} isLoading={isLoading} />
                </Card>
            </AutoResponsive>
            <MemberForm open={open} setOpen={setOpen} onSuccess={handleSuccess} />
        </main>
    )
}