import FormInputField from "@/components/form-input-field";
import FormSelectField from "@/components/form-select-field";
import FormTextareaField from "@/components/form-textarea-field";
import { SideSheet } from "@/components/side-sheet";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { GroupSchema, } from "@/features/dashboard/schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import type z from "zod";

interface GroupFormType {
    open: boolean,
    setOpen: (v: boolean) => void
}

const init: z.infer<typeof GroupSchema> = {
    groupName: "",
    description: "",
    status: "",
    category: "",
}


const GroupForm = ({ open, setOpen }: GroupFormType) => {
    const form = useForm<z.infer<typeof GroupSchema>>({
        resolver: zodResolver(GroupSchema),
        defaultValues: init,
    });

    return (
        <main>
            <SideSheet open={open} onOpenChange={setOpen} title="Add New Group" description="Add a new Group to the church"
                footer={
                    <div className="flex w-full space-x-2">
                        <div className="w-full">
                            <Button variant="outline" className="w-full" onClick={() => setOpen(false)} >Cancel</Button>
                        </div>

                        <div className="w-full">
                            <Button type="submit" className="w-full" onClick={() => {
                                setOpen(false);
                            }} >
                                <Save /> Save
                            </Button>
                        </div>
                    </div>
                } >
                <Separator />
                <FormProvider {...form}>
                    <aside className="w-full grid md:grid-cols-1 gap-3 px-4 py-1">

                        <div className="w-full md:pl-[33px]">
                            <FormField
                                control={form.control}
                                name="groupName"
                                render={({ field }) => (
                                    <FormInputField label="Name:" field={field} placeholder="Enter Group Name" showErrorMessage={false} />
                                )}
                            />
                        </div>

                        <div className="w-full flex items-center md:pl-[13px]">
                            <aside className="w-full flex-1">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormSelectField label="Category:" field={field}
                                            valueExpr="value" keyExpr="label"
                                            options={[
                                                { "label": "Department", "value": "department" },
                                                { "label": "Ministry", "value": "ministry" },
                                                { "label": "Fellowship", "value": "fellowship" },
                                                { "label": "Team", "value": "team" },
                                                { "label": "Small Group", "value": "smallgroup" }
                                            ]}
                                        />
                                    )}
                                />
                            </aside>
                        </div>

                        <div className="w-full flex items-center md:pl-[30px]">
                            <aside className="w-full flex-1">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormSelectField label="Status:" field={field}
                                            valueExpr="value" keyExpr="label"
                                            options={[
                                                { "label": "Active", "value": "active" },
                                                { "label": "Inactive", "value": "inactive" },
                                                { "label": "Archived", "value": "archived" }
                                            ]}
                                        />
                                    )}
                                />
                            </aside>
                        </div>
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormTextareaField label="Description:" field={field} inputClassName="h-24" placeholder="Enter description" />
                                )}
                            />
                        </div>
                    </aside>
                </FormProvider>
            </SideSheet>
        </main>
    );
}

export default GroupForm;