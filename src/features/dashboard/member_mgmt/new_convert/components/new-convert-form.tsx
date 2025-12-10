import FormDatePicker from "@/components/form-date-picker";
import FormInputField from "@/components/form-input-field";
import FormSelectField from "@/components/form-select-field";
import FormTextareaField from "@/components/form-textarea-field";
import { SideSheet } from "@/components/side-sheet";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { VisitorNewConvertSchema } from "@/features/dashboard/schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import type z from "zod";

interface NewConvetFormType {
    open: boolean,
    setOpen: (v: boolean) => void
}

const init: z.infer<typeof VisitorNewConvertSchema> = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: new Date(),
    joinedDate: new Date(),
    maritalStatus: false,
    isActive: false,
    address: "",
}


const NewConvertForm = ({ open, setOpen }: NewConvetFormType) => {
    const form = useForm<z.infer<typeof VisitorNewConvertSchema>>({
        resolver: zodResolver(VisitorNewConvertSchema),
        defaultValues: init,
    });

    return (
        <main>
            <SideSheet open={open} onOpenChange={setOpen} title="Add New Convert" description="Add a new convert to the church"
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

                        <div className="w-full md:pl-[9px] pr-[42px]">
                            <FormField
                                control={form.control}
                                name="joinedDate"
                                render={({ field }) => (
                                    <FormDatePicker label="Date Joined:" field={field} />
                                )}
                            />
                        </div>

                        <div className="w-full md:pl-[18px]">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormInputField label="First Name:" field={field} placeholder="Enter first name" showErrorMessage={false} />
                                )}
                            />
                        </div>
                        <div className="w-full md:pl-[19px]">
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormInputField label="Last Name:" field={field} placeholder="Enter last name" showErrorMessage={false} />
                                )}
                            />
                        </div>
                        <div className="w-full md:pl-[38px] flex items-center">
                            <aside className="w-full flex-1">
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormSelectField label="Gender:" field={field}
                                            valueExpr="value" keyExpr="label"
                                            options={[]}
                                        />
                                    )}
                                />
                            </aside>
                        </div>

                        <div className="w-full md:pl-[54px]">
                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormDatePicker label="DOB:" field={field} />
                                )}
                            />
                        </div>
                        <div className="w-full flex items-center">
                            <aside className="w-full flex-1">
                                <FormField
                                    control={form.control}
                                    name="maritalStatus"
                                    render={({ field }) => (
                                        <FormSelectField label="Marital Status:" field={field}
                                            valueExpr="value" keyExpr="label"
                                            options={[{ "label": "Married", "value": "married" }, { "label": "Single", "value": "single" }]}
                                        />
                                    )}
                                />
                            </aside>
                        </div>

                        <div className="w-full md:pl-[50px]">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormInputField label="Email:" field={field} placeholder="Enter email" showErrorMessage={false} />
                                )}
                            />
                        </div>
                        <div className="w-full md:pl-[45px]">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormInputField label="Phone:" field={field} placeholder="Enter phone" showErrorMessage={false} />
                                )}
                            />
                        </div>

                        <div className="w-full md:pl-[33px]">
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

export default NewConvertForm;