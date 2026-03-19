import FormDatePicker from "@/components/form-date-picker";
import FormInputField from "@/components/form-input-field";
import FormSelectField from "@/components/form-select-field";
import { SideSheet } from "@/components/side-sheet";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { OfferingSchema } from "@/features/dashboard/schema/zodSchema";
import { useCreateContribution } from "@/hooks/use-contribution-service";
import { useGetMembers } from "@/hooks/use-member-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

interface OfferingFormType {
    open: boolean;
    setOpen: (v: boolean) => void;
    onSuccess?: () => void;
}

const init: z.infer<typeof OfferingSchema> = {
    memberId: "",
    amount: "",
    date: "",
    paymentMethod: "",
    reference: "",
};

const OfferingForm = ({ open, setOpen, onSuccess }: OfferingFormType) => {
    const { mutate, isPending } = useCreateContribution();
    const { data: memberData } = useGetMembers({ page: 1, limit: 100 });

    const memberOptions = (memberData?.data ?? []).map((m) => ({
        label: `${m.firstName} ${m.lastName}`,
        value: m.id,
    }));

    const form = useForm<z.infer<typeof OfferingSchema>>({
        resolver: zodResolver(OfferingSchema),
        defaultValues: init,
    });

    const onSubmit = (values: z.infer<typeof OfferingSchema>) => {
        mutate(
            {
                memberId: values.memberId,
                contributionType: "OFFERINGS",
                amount: Number(values.amount),
                paymentMethod: values.paymentMethod,
                reference: values.reference,
                date: values.date,
            },
            {
                onSuccess: () => {
                    toast.success("Offering recorded successfully");
                    form.reset(init);
                    setOpen(false);
                    onSuccess?.();
                },
                onError: (error: any) => {
                    toast.error(error?.message ?? "Failed to record offering");
                },
            }
        );
    };

    return (
        <main>
            <SideSheet
                open={open}
                onOpenChange={setOpen}
                title="Add New Offering"
                description="Add a new Offering to the church"
                footer={
                    <div className="flex w-full space-x-2">
                        <div className="w-full">
                            <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        </div>
                        <div className="w-full">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                                onClick={form.handleSubmit(onSubmit)}
                            >
                                {isPending ? <><Loader2 className="animate-spin" /> Saving...</> : <><Save /> Save</>}
                            </Button>
                        </div>
                    </div>
                }
            >
                <Separator />
                <FormProvider {...form}>
                    <aside className="w-full grid md:grid-cols-1 gap-3 px-4 py-1">

                        <div className="w-full flex items-center">
                            <aside className="w-full flex-1">
                                <FormField
                                    control={form.control}
                                    name="memberId"
                                    render={({ field }) => (
                                        <FormSelectField
                                            label="Member:"
                                            field={field}
                                            valueExpr="value"
                                            keyExpr="label"
                                            placeholder="Select a member"
                                            options={memberOptions}
                                        />
                                    )}
                                />
                            </aside>
                        </div>

                        <div className="w-full md:pl-[71px]">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormDatePicker label="Date:" field={field} />
                                )}
                            />
                        </div>

                        <div className="w-full md:pl-[53px]">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormInputField label="Amount:" field={field} placeholder="Enter amount" showErrorMessage={false} />
                                )}
                            />
                        </div>

                        <div className="w-full flex items-center">
                            <aside className="w-full flex-1">
                                <FormField
                                    control={form.control}
                                    name="paymentMethod"
                                    render={({ field }) => (
                                        <FormSelectField
                                            label="Payment Method:"
                                            field={field}
                                            valueExpr="value"
                                            keyExpr="label"
                                            options={[
                                                { label: "Cash", value: "CASH" },
                                                { label: "Check", value: "CHECK" },
                                                { label: "ACH/Bank Transfer", value: "BANK_TRANSFER" },
                                                { label: "Momo", value: "MOMO" },
                                            ]}
                                        />
                                    )}
                                />
                            </aside>
                        </div>

                        <div className="w-full md:pl-[15px]">
                            <FormField
                                control={form.control}
                                name="reference"
                                render={({ field }) => (
                                    <FormInputField label="Reference:" field={field} placeholder="Enter reference (optional)" showErrorMessage={false} />
                                )}
                            />
                        </div>

                    </aside>
                </FormProvider>
            </SideSheet>
        </main>
    );
};

export default OfferingForm;
