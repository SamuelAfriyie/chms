import AutoResponsive from "@/components/auto_responsive";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import NewConvertForm from "./components/new-convert-form";
import { newConvertColumns } from "../data/new_convert_columns";
import { newConvertSampleData } from "../data/newConvertSampleData";

const NewConvert = () => {
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
            <header className="w-full h-fit p-2">
                <div className="flex justify-end space-x-2">
                    <Button size={"sm"} onClick={() => setOpen(true)}><Plus /> Add New Convert</Button>
                </div>
            </header>
            <AutoResponsive>
                <Card className="gap-0 py-0 px-2 rounded-md h-full">
                    <DataTable columns={newConvertColumns} dataSource={newConvertSampleData} columnToFilter="fName" pinnedLeftColumns={['select']} isLoading={loading} />
                </Card>
            </AutoResponsive>
            <NewConvertForm open={open} setOpen={setOpen} />
        </main>
    )
}

export default NewConvert;