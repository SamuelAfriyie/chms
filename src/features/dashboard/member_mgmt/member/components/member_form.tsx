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

    const next = () => setStep((prev) => Math.min(prev + 1, 5));
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
                        {step < 5 ? (
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
                <form className="w-full h-screen bg-muted/50 border-y" onSubmit={form.handleSubmit(() => { })}>
                    {/* Step Tracker */}
                    <StepTracker step={step} items={[1, 2, 3, 4, 5]} className="my-4" />
                    <Separator />
                    {step === 1 && (
                        <StepWrapper step={step}>
                            <aside className="w-full grid md:grid-cols-1 gap-3 p-4">
                                <h2 className="text-[16px] font-medium text-gray-700 mb-1">Step 1: Personal Infomation</h2>

                                <div className="w-full md:pl-1">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormInputField label="First Name:" field={field} placeholder="Enter first name" showErrorMessage={false} />
                                        )}
                                    />
                                </div>
                                <div className="w-full md:pl-1">
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormInputField label="Last Name:" field={field} placeholder="Enter last name" showErrorMessage={false} />
                                        )}
                                    />
                                </div>
                                <div className="w-full md:pl-[22px] flex items-center">
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
                                <div className="w-full md:pl-[53px]">
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormDatePicker label="Date:" field={field} />
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
                                            name="membershipStatus"
                                            render={({ field }) => (
                                                <FormSelectField label="Membership Status:" field={field}
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
                                            name="membershipStatus"
                                            render={({ field }) => (
                                                <FormSelectField label="Membership Status:" field={field}
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
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-gray-700">Step 2: Contact Information</h2>

                                <div className="w-full md:pl-[34px]">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormInputField label="Email:" field={field} placeholder="Enter email" showErrorMessage={false} />
                                        )}
                                    />
                                </div>
                                <div className="w-full md:pl-[29px]">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormInputField label="Phone:" field={field} placeholder="Enter phone" showErrorMessage={false} />
                                        )}
                                    />
                                </div>

                                <div className="w-full md:pl-4">
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
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-gray-700">Step 3: Confirmation</h2>
                                <p className="text-gray-600">Review your details and submit.</p>
                            </div>
                        </StepWrapper>
                    )}
                    {step === 4 && (
                        <StepWrapper step={step}>
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-gray-700">Step 3: Confirmation</h2>
                                <p className="text-gray-600">Review your details and submit.</p>
                            </div>
                        </StepWrapper>
                    )}
                    {step === 5 && (
                        <StepWrapper step={step}>
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-gray-700">Step 3: Confirmation</h2>
                                <p className="text-gray-600">Review your details and submit.</p>
                            </div>
                        </StepWrapper>
                    )
                    }
                </form >
            </FormProvider >
        </SideSheet >
    );
}