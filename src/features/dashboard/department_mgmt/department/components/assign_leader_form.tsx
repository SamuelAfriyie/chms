import FormInputField from "@/components/form-input-field";
import { SideSheet } from "@/components/side-sheet";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { AssignLeaderSchema } from "@/features/dashboard/schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCheck } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import type z from "zod";

interface AssignLeaderFormType {
    open: boolean,
    setOpen: (v: boolean) => void,
    departmentName?: string
}

const init: z.infer<typeof AssignLeaderSchema> = {
    leaderId: "",
}

const AssignLeaderForm = ({ open, setOpen, departmentName }: AssignLeaderFormType) => {
    const form = useForm<z.infer<typeof AssignLeaderSchema>>({
        resolver: zodResolver(AssignLeaderSchema),
        defaultValues: init,
    });

    return (
        <main>
            <SideSheet
                open={open}
                onOpenChange={setOpen}
                title="Assign Department Leader"
                description={departmentName ? `Assign a leader to ${departmentName}` : "Assign a leader to this department"}
                footer={
                    <div className="flex w-full space-x-2">
                        <div className="w-full">
                            <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>Cancel</Button>
                        </div>
                        <div className="w-full">
                            <Button type="submit" className="w-full" onClick={() => {
                                setOpen(false);
                            }}>
                                <UserCheck /> Assign
                            </Button>
                        </div>
                    </div>
                }>
                <Separator />
                <FormProvider {...form}>
                    <aside className="w-full grid md:grid-cols-1 gap-3 px-4 py-1">

                        <div className="w-full md:pl-[27px]">
                            <FormField
                                control={form.control}
                                name="leaderId"
                                render={({ field }) => (
                                    <FormInputField label="Leader ID:" field={field} placeholder="Enter member ID of the leader" showErrorMessage={false} />
                                )}
                            />
                        </div>

                    </aside>
                </FormProvider>
            </SideSheet>
        </main>
    );
}

export default AssignLeaderForm;
