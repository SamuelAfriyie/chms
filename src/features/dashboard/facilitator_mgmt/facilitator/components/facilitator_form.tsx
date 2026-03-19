import FormInputField from "@/components/form-input-field";
import FormSelectField from "@/components/form-select-field";
import { SideSheet } from "@/components/side-sheet";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { FacilitatorSchema } from "@/features/dashboard/schema/zodSchema";
import { useCreateFacilitator } from "@/hooks/use-facilitator-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

interface FacilitatorFormType {
    open: boolean;
    setOpen: (v: boolean) => void;
    onSuccess?: () => void;
}

const init: z.infer<typeof FacilitatorSchema> = {
    name: "",
    role: "",
    ministryType: "",
    phone: "",
    email: "",
}

const FacilitatorForm = ({ open, setOpen, onSuccess }: FacilitatorFormType) => {
    const { mutate, isPending } = useCreateFacilitator();

    const form = useForm<z.infer<typeof FacilitatorSchema>>({
        resolver: zodResolver(FacilitatorSchema),
        defaultValues: init,
    });

    const onSubmit = (values: z.infer<typeof FacilitatorSchema>) => {
        mutate(values, {
            onSuccess: () => {
                toast.success(`Facilitator "${values.name}" added`);
                form.reset(init);
                setOpen(false);
                onSuccess?.();
            },
            onError: (error: any) => {
                toast.error(error?.message ?? "Failed to add facilitator");
            },
        });
    };

    return (
        <main>
            <SideSheet open={open} onOpenChange={setOpen} title="Add New Facilitator" description="Add a new facilitator to a ministry"
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

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormInputField label="Name:" field={field} placeholder="Enter full name" showErrorMessage={false} wrapperClassName="gap-2" />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormSelectField label="Role:" field={field}
                                    valueExpr="value" keyExpr="label"
                                    wrapperClassName="gap-2"
                                    options={[
                                        { label: "Teacher", value: "TEACHER" },
                                        { label: "Coordinator", value: "ASSISTANT" },
                                    ]}
                                />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="ministryType"
                            render={({ field }) => (
                                <FormSelectField label="Ministry:" field={field}
                                    valueExpr="value" keyExpr="label"
                                    wrapperClassName="gap-2"
                                    options={[
                                        { label: "Children", value: "CHILDREN" },
                                        { label: "Youth", value: "YOUTH" },
                                        { label: "Adult", value: "ADULT" },
                                        { label: "Worship", value: "WORSHIP" },
                                        { label: "Outreach", value: "OUTREACH" },
                                    ]}
                                />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormInputField label="Phone:" field={field} placeholder="Enter phone number" showErrorMessage={false} wrapperClassName="gap-2" />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormInputField label="Email:" field={field} placeholder="Enter email address" showErrorMessage={false} wrapperClassName="gap-2" />
                            )}
                        />

                    </aside>
                </FormProvider>
            </SideSheet>
        </main>
    );
}

export default FacilitatorForm;
