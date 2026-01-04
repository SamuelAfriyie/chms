import FormInputField from "@/components/form-input-field";
import FormSelectField from "@/components/form-select-field";
import FormTextareaField from "@/components/form-textarea-field";
import { SideSheet } from "@/components/side-sheet";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { FamilySchema, } from "@/features/dashboard/schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import type z from "zod";

interface FamilyFormType {
    open: boolean,
    setOpen: (v: boolean) => void
}

const init: z.infer<typeof FamilySchema> = {
    familyName: "",
    address: "",
    email: "",
    phone: "",
    isActive: true,
    status: ""
}


const FamilyForm = ({ open, setOpen }: FamilyFormType) => {
    const form = useForm<z.infer<typeof FamilySchema>>({
        resolver: zodResolver(FamilySchema),
        defaultValues: init,
    });

    return (
        <main>
            <SideSheet open={open} onOpenChange={setOpen} title="Add New Family / Household" description="Add a new Family / Household to the church"
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

                        <div className="w-full md:pl-[18px]">
                            <FormField
                                control={form.control}
                                name="familyName"
                                render={({ field }) => (
                                    <FormInputField label="Name:" field={field} placeholder="Enter Family Name" showErrorMessage={false} />
                                )}
                            />
                        </div>

                        <div className="w-full md:pl-[19px]">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormInputField label="Email:" field={field} placeholder="Enter email" showErrorMessage={false} />
                                )}
                            />
                        </div>
                        <div className="w-full md:pl-[15px]">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormInputField label="Phone:" field={field} placeholder="Enter phone" showErrorMessage={false} />
                                )}
                            />
                        </div>
                        <div className="w-full flex items-center md:pl-[15px]">
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
                                                { "label": "New", "value": "new" },
                                                { "label": "Prospect", "value": "prospect" }
                                            ]}
                                        />
                                    )}
                                />
                            </aside>
                        </div>
                        <div className="w-full md:pl-[5px]">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormTextareaField label="Address:" field={field} inputClassName="h-24" placeholder="Enter address" />
                                )}
                            />
                        </div>
                    </aside>
                </FormProvider>
            </SideSheet>
        </main>
    );
}

export default FamilyForm;