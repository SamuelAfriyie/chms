import { SideSheet } from "@/components/side-sheet";
import { Button } from "@/components/ui/button";
import { Forward, Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { MemberSchema } from "@/features/dashboard/schema/zodSchema";
import { FormField } from "@/components/ui/form";
import FormInputField from "@/components/form-input-field";
import FormTextareaField from "@/components/form-textarea-field";
import { useState } from "react";
import { StepTracker, StepWrapper } from "@/components/stepper";
import { Separator } from "@/components/ui/separator";
import FormSelectField from "@/components/form-select-field";
import FormDatePicker from "@/components/form-date-picker";
import GroupAssignment from "./group_assignment";

interface MemberFormType {
    open: boolean,
    setOpen: (v: boolean) => void
}

const init: z.infer<typeof MemberSchema> = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: new Date(),
    maritalStatus: false,
    baptismStatus: "",
    membershipDate: new Date(),
    isActive: false,
    address: "",
    membershipStatus: ""
}

export default function MemberForm({ open, setOpen }: MemberFormType) {
    const [step, setStep] = useState(1);

    const next = () => setStep((prev) => Math.min(prev + 1, 4));
    const back = () => setStep((prev) => Math.max(prev - 1, 1));

    const form = useForm<z.infer<typeof MemberSchema>>({
        resolver: zodResolver(MemberSchema),
        defaultValues: init,
    });

    return (
        <SideSheet open={open} onOpenChange={setOpen} title="Add New Member" description="Add a new member to the church"
            footer={
                <div className="flex w-full space-x-2">
                    <div className="w-full">
                        {step == 1 ? (
                            <Button variant="outline" className="w-full" onClick={() => setOpen(false)} >Cancel</Button>
                        ) :
                            (<Button variant="outline" className="w-full" onClick={back} >Back</Button>)}
                    </div>

                    <div className="w-full">
                        {step < 4 ? (
                            <Button onClick={next} className="w-full">
                                <Forward />
                                Next
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full" onClick={() => {
                                setOpen(false);
                                setStep(1)
                            }} >
                                <Save /> Save
                            </Button>
                        )}
                    </div>
                </div>
            } >
            {/* form section */}
            <FormProvider {...form}>
                <form className="w-full h-screen bg-muted/50 border-y overflow-y-auto" onSubmit={form.handleSubmit(() => { })}>
                    {/* Step Tracker */}
                    <StepTracker step={step} items={[1, 2, 3, 4]} className="my-4" />
                    <Separator />
                    {step === 1 && (
                        <StepWrapper step={step}>
                            <aside className="w-full grid md:grid-cols-1 gap-3 p-4">
                                <h2 className="text-[16px] font-medium text-gray-700 mb-1">Step 1: Personal Infomation</h2>

                                <div className="w-full md:pl-[27px]">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormInputField label="First Name:" field={field} placeholder="Enter first name" showErrorMessage={false} />
                                        )}
                                    />
                                </div>
                                <div className="w-full md:pl-7">
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormInputField label="Last Name:" field={field} placeholder="Enter last name" showErrorMessage={false} />
                                        )}
                                    />
                                </div>
                                <div className="w-full md:pl-[47px] flex items-center">
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
                                <div className="w-full md:pl-[63px]">
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormDatePicker label="DOB:" field={field} />
                                        )}
                                    />
                                </div>
                                <div className="w-full md:pl-[9px] flex items-center">
                                    <aside className="w-full flex-1">
                                        <FormField
                                            control={form.control}
                                            name="maritalStatus"
                                            render={({ field }) => (
                                                <FormSelectField label="Marital Status:" field={field}
                                                    valueExpr="value" keyExpr="label"
                                                    options={[]}
                                                />
                                            )}
                                        />
                                    </aside>
                                </div>

                                <div className="w-full md:pl-5 pr-[42px]">
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormDatePicker label="Memb. Date:" field={field} />
                                        )}
                                    />
                                </div>
                                <div className="w-full md:pl-[9px]  flex items-center">
                                    <aside className="w-full flex-1">
                                        <FormField
                                            control={form.control}
                                            name="membershipStatus"
                                            render={({ field }) => (
                                                <FormSelectField label="Memb. Status:" field={field}
                                                    valueExpr="value" keyExpr="label"
                                                    options={[]}
                                                />
                                            )}
                                        />
                                    </aside>
                                </div>
                                <div className="w-full flex items-center">
                                    <aside className="w-full flex-1">
                                        <FormField
                                            control={form.control}
                                            name="baptismStatus"
                                            render={({ field }) => (
                                                <FormSelectField label="Baptism Status:" field={field}
                                                    valueExpr="value" keyExpr="label"
                                                    options={[]}
                                                />
                                            )}
                                        />
                                    </aside>
                                </div>
                            </aside>
                        </StepWrapper>
                    )}

                    {step === 2 && (
                        <StepWrapper step={step}>
                            <div className="w-full grid md:grid-cols-1 gap-3 p-4 overflow-y-auto">
                                <h2 className="text-[16px] font-medium text-gray-700 mb-1">Step 2: Contact Information</h2>

                                <div className="w-full md:pl-[18px]">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormInputField label="Email:" field={field} placeholder="Enter email" showErrorMessage={false} />
                                        )}
                                    />
                                </div>
                                <div className="w-full md:pl-[13px]">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormInputField label="Phone:" field={field} placeholder="Enter phone" showErrorMessage={false} />
                                        )}
                                    />
                                </div>

                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormTextareaField label="Address:" field={field} inputClassName="h-24" placeholder="Enter address" />
                                        )}
                                    />
                                </div>
                            </div>
                        </StepWrapper>
                    )}

                    {step === 3 && (
                        <StepWrapper step={step}>
                            <div className="w-full grid md:grid-cols-1 gap-3 p-4 overflow-y-auto">
                                <h2 className="text-[16px] font-medium text-gray-700 mb-1">Step 3: Family / Household Information</h2>

                                <div className="w-full flex items-center">
                                    <aside className="w-full flex-1">
                                        <FormField
                                            control={form.control}
                                            name="baptismStatus"
                                            render={({ field }) => (
                                                <FormSelectField label="Family(Household):" field={field}
                                                    valueExpr="value" keyExpr="label"
                                                    options={[]}
                                                />
                                            )}
                                        />
                                    </aside>
                                </div>
                                <div className="w-full flex items-center">
                                    <aside className="w-full flex-1 md:pl-[37px]">
                                        <FormField
                                            control={form.control}
                                            name="baptismStatus"
                                            render={({ field }) => (
                                                <FormSelectField label="Relationship:" field={field}
                                                    valueExpr="value" keyExpr="label"
                                                    options={[]}
                                                />
                                            )}
                                        />
                                    </aside>
                                </div>
                                <div className="w-full flex items-center">
                                    <aside className="w-full flex-1 md:pl-[15px]">
                                        <FormField
                                            control={form.control}
                                            name="baptismStatus"
                                            render={({ field }) => (
                                                <FormSelectField label="Primary Contact:" field={field}
                                                    valueExpr="value" keyExpr="label"
                                                    options={[{ "label": "Yes", "value": "yes" }, { "label": "No", "value": "no" }]}
                                                />
                                            )}
                                        />
                                    </aside>
                                </div>
                            </div>
                        </StepWrapper>
                    )}
                    {step === 4 && (
                        <StepWrapper step={step}>
                            <div className="w-full grid md:grid-cols-1 gap-3 p-4 overflow-y-auto">
                                <h2 className="text-[16px] font-medium text-gray-700 mb-1">Step 4: Groups <span className="text-sm">[ Department | Ministry | Service ]</span></h2>
                                <GroupAssignment form={form} />
                            </div>
                        </StepWrapper>
                    )}
                </form >
            </FormProvider >
        </SideSheet >
    );
}