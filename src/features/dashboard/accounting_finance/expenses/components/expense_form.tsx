import FormDatePicker from "@/components/form-date-picker";
import FormInputField from "@/components/form-input-field";
import FormSelectField from "@/components/form-select-field";
import FormTextareaField from "@/components/form-textarea-field";
import { SideSheet } from "@/components/side-sheet";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ExpenseSchema } from "@/features/dashboard/schema/zodSchema";
import { useCreateExpense } from "@/hooks/use-expense-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

interface ExpenseFormType {
    open: boolean;
    setOpen: (v: boolean) => void;
    onSuccess?: () => void;
}

const init: z.infer<typeof ExpenseSchema> = {
    title: "",
    description: "",
    amount: "",
    category: "",
    department: "",
    expenseDate: "",
}

const ExpenseForm = ({ open, setOpen, onSuccess }: ExpenseFormType) => {
    const { mutate, isPending } = useCreateExpense();

    const form = useForm<z.infer<typeof ExpenseSchema>>({
        resolver: zodResolver(ExpenseSchema),
        defaultValues: init,
    });

    const onSubmit = (values: z.infer<typeof ExpenseSchema>) => {
        mutate(
            {
                title: values.title,
                description: values.description,
                amount: Number(values.amount),
                category: values.category,
                department: values.department,
                expenseDate: values.expenseDate,
            },
            {
                onSuccess: () => {
                    toast.success(`Expense "${values.title}" recorded`);
                    form.reset(init);
                    setOpen(false);
                    onSuccess?.();
                },
                onError: (error: any) => {
                    toast.error(error?.message ?? "Failed to record expense");
                },
            }
        );
    };

    return (
        <main>
            <SideSheet open={open} onOpenChange={setOpen} title="Add New Expense" description="Record a new church expense"
                footer={
                    <div className="flex w-full space-x-2">
                        <div className="w-full">
                            <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>Cancel</Button>
                        </div>
                        <div className="w-full">
                            <Button type="submit" className="w-full" disabled={isPending} onClick={form.handleSubmit(onSubmit)}>
                                {isPending ? <><Loader2 className="animate-spin" /> Saving...</> : <><Save /> Save</>}
                            </Button>
                        </div>
                    </div>
                }>
                <Separator />
                <FormProvider {...form}>
                    <aside className="w-full grid md:grid-cols-1 gap-3 px-4 py-1">

                        <div className="w-full md:pl-[53px]">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormInputField label="Title:" field={field} placeholder="Enter expense title" showErrorMessage={false} />
                                )}
                            />
                        </div>

                        <div className="w-full flex items-center">
                            <aside className="w-full flex-1">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormSelectField label="Category:" field={field}
                                            valueExpr="value" keyExpr="label"
                                            options={[
                                                { "label": "Equipment", "value": "Equipment" },
                                                { "label": "Utilities", "value": "Utilities" },
                                                { "label": "Salaries", "value": "Salaries" },
                                                { "label": "Events", "value": "Events" },
                                                { "label": "Other", "value": "Other" },
                                            ]}
                                        />
                                    )}
                                />
                            </aside>
                        </div>

                        <div className="w-full md:pl-[7px]">
                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormInputField label="Department:" field={field} placeholder="Enter department name" showErrorMessage={false} />
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

                        <div className="w-full md:pl-[27px]">
                            <FormField
                                control={form.control}
                                name="expenseDate"
                                render={({ field }) => (
                                    <FormDatePicker label="Expense Date:" field={field} />
                                )}
                            />
                        </div>

                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormTextareaField label="Description:" field={field} placeholder="Enter description (optional)" inputClassName="h-24" />
                                )}
                            />
                        </div>

                    </aside>
                </FormProvider>
            </SideSheet>
        </main>
    );
}

export default ExpenseForm;
