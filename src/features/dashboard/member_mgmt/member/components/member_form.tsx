import { SideSheet } from "@/components/side-sheet";
import { Button } from "@/components/ui/button";
import { Forward, Loader2, Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { MemberSchema } from "@/features/dashboard/schema/zodSchema";
import { FormField } from "@/components/ui/form";
import FormInputField from "@/components/form-input-field";
import { useState } from "react";
import { StepTracker, StepWrapper } from "@/components/stepper";
import { Separator } from "@/components/ui/separator";
import FormSelectField from "@/components/form-select-field";
import FormDatePicker from "@/components/form-date-picker";
import { useCreateMember } from "@/hooks/use-member-service";
import { toast } from "sonner";
import { format } from "date-fns";

interface MemberFormType {
    open: boolean,
    setOpen: (v: boolean) => void,
    onSuccess?: () => void
}

const init: z.infer<typeof MemberSchema> = {
    firstName: "",
    lastName: "",
    gender: "",
    dob: new Date(),
    joinDate: new Date(),
    phone: "",
    email: "",
    ministry: "",
}

export default function MemberForm({ open, setOpen, onSuccess }: MemberFormType) {
    const [step, setStep] = useState(1);
    const { mutate, isPending } = useCreateMember();

    const next = () => setStep((prev) => Math.min(prev + 1, 2));
    const back = () => setStep((prev) => Math.max(prev - 1, 1));

    const form = useForm<z.infer<typeof MemberSchema>>({
        resolver: zodResolver(MemberSchema),
        defaultValues: init,
    });

    const onSubmit = (values: z.infer<typeof MemberSchema>) => {
        mutate(
            {
                firstName: values.firstName,
                lastName: values.lastName,
                gender: values.gender,
                dateOfBirth: format(values.dob, "yyyy-MM-dd"),
                phone: values.phone,
                email: values.email,
                ministry: values.ministry,
                joinDate: format(values.joinDate, "yyyy-MM-dd"),
            },
            {
                onSuccess: () => {
                    toast.success("Member added successfully");
                    form.reset(init);
                    setStep(1);
                    setOpen(false);
                    onSuccess?.();
                },
                onError: (error: any) => {
                    toast.error(error?.message ?? "Failed to add member");
                },
            }
        );
    };

    return (
        <SideSheet open={open} onOpenChange={setOpen} title="Add New Member" description="Add a new member to the church"
            footer={
                <div className="flex w-full space-x-2">
                    <div className="w-full">
                        {step === 1 ? (
                            <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>Cancel</Button>
                        ) : (
                            <Button variant="outline" className="w-full" onClick={back}>Back</Button>
                        )}
                    </div>
                    <div className="w-full">
                        {step < 2 ? (
                            <Button onClick={next} className="w-full">
                                <Forward />
                                Next
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                                onClick={form.handleSubmit(onSubmit)}
                            >
                                {isPending ? <Loader2 className="animate-spin" /> : <Save />}
                                {isPending ? "Saving..." : "Save"}
                            </Button>
                        )}
                    </div>
                </div>
            }>
            <FormProvider {...form}>
                <form className="w-full h-screen bg-muted/50 border-y overflow-y-auto" onSubmit={form.handleSubmit(onSubmit)}>
                    <StepTracker step={step} items={[1, 2]} className="my-4" />
                    <Separator />

                    {step === 1 && (
                        <StepWrapper step={step}>
                            <aside className="w-full grid md:grid-cols-1 gap-3 p-4">
                                <h2 className="text-[16px] font-medium text-gray-700 mb-1">Step 1: Personal Information</h2>

                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormInputField label="First Name:" field={field} placeholder="Enter first name" showErrorMessage={false} wrapperClassName="gap-2" />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormInputField label="Last Name:" field={field} placeholder="Enter last name" showErrorMessage={false} wrapperClassName="gap-2" />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormSelectField label="Gender:" field={field}
                                            valueExpr="value" keyExpr="label"
                                            wrapperClassName="gap-2"
                                            options={[
                                                { label: "Male", value: "MALE" },
                                                { label: "Female", value: "FEMALE" },
                                            ]}
                                        />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dob"
                                    render={({ field }) => (
                                        <FormDatePicker label="Date of Birth:" field={field} wrapperClassName="gap-2" />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="joinDate"
                                    render={({ field }) => (
                                        <FormDatePicker label="Join Date:" field={field} wrapperClassName="gap-2" />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="ministry"
                                    render={({ field }) => (
                                        <FormSelectField label="Ministry:" field={field}
                                            valueExpr="value" keyExpr="label"
                                            wrapperClassName="gap-2"
                                            options={[
                                                { label: "Adult", value: "ADULT" },
                                                { label: "Teens", value: "TEENS" },
                                                { label: "Children", value: "CHILDREN" }, 
                                            ]}
                                        />
                                    )}
                                />
                            </aside>
                        </StepWrapper>
                    )}

                    {step === 2 && (
                        <StepWrapper step={step}>
                            <div className="w-full grid md:grid-cols-1 gap-3 p-4 overflow-y-auto">
                                <h2 className="text-[16px] font-medium text-gray-700 mb-1">Step 2: Contact Information</h2>

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormInputField label="Email:" field={field} placeholder="Enter email" showErrorMessage={false} wrapperClassName="gap-2" />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormInputField label="Phone:" field={field} placeholder="Enter phone number" showErrorMessage={false} wrapperClassName="gap-2" />
                                    )}
                                />
                            </div>
                        </StepWrapper>
                    )}
                </form>
            </FormProvider>
        </SideSheet>
    );
}
