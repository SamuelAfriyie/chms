import FormDatePicker from "@/components/form-date-picker";
import FormInputField from "@/components/form-input-field";
import FormSelectField from "@/components/form-select-field";
import { SideSheet } from "@/components/side-sheet";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { TitheSchema, } from "@/features/dashboard/schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import type z from "zod";

interface TitheFormType {
    open: boolean,
    setOpen: (v: boolean) => void
}

const init: z.infer<typeof TitheSchema> = {
    amount: "",
    date: "",
    paymentMethod: "",
    transactionId: "",
}


const TitheForm = ({ open, setOpen }: TitheFormType) => {
    const form = useForm<z.infer<typeof TitheSchema>>({
        resolver: zodResolver(TitheSchema),
        defaultValues: init,
    });

    return (
        <main>
            <SideSheet open={open} onOpenChange={setOpen} title="Add New Tithe" description="Add a new Tithe to the church"
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
                                        <FormSelectField label="Payment Method:" field={field}
                                            valueExpr="value" keyExpr="label"
                                            options={[
                                                { "label": "Cash", "value": "cash" },
                                                { "label": "Check", "value": "check" },
                                                { "label": "ACH/Bank Transfer", "value": "bank-transfer" },
                                                { "label": "Momo", "value": "momo" },
                                            ]}
                                        />
                                    )}
                                />
                            </aside>
                        </div>

                        <div className="w-full md:pl-[15px]">
                            <FormField
                                control={form.control}
                                name="transactionId"
                                render={({ field }) => (
                                    <FormInputField label="Transaction ID:" field={field} placeholder="Enter transaction id" showErrorMessage={false} />
                                )}
                            />
                        </div>
                    </aside>
                </FormProvider>
            </SideSheet>
        </main>
    );
}

export default TitheForm;