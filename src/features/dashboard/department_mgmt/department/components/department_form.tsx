import FormInputField from "@/components/form-input-field";
import FormTextareaField from "@/components/form-textarea-field";
import { SideSheet } from "@/components/side-sheet";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { DepartmentSchema } from "@/features/dashboard/schema/zodSchema";
import { useCreateDepartment } from "@/hooks/use-department-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

interface DepartmentFormType {
    open: boolean;
    setOpen: (v: boolean) => void;
    onSuccess?: () => void;
}

const init: z.infer<typeof DepartmentSchema> = {
    name: "",
    description: "",
}

const DepartmentForm = ({ open, setOpen, onSuccess }: DepartmentFormType) => {
    const { mutate, isPending } = useCreateDepartment();

    const form = useForm<z.infer<typeof DepartmentSchema>>({
        resolver: zodResolver(DepartmentSchema),
        defaultValues: init,
    });

    const onSubmit = (values: z.infer<typeof DepartmentSchema>) => {
        mutate(values, {
            onSuccess: () => {
                toast.success(`Department "${values.name}" created`);
                form.reset(init);
                setOpen(false);
                onSuccess?.();
            },
            onError: (error: any) => {
                toast.error(error?.message ?? "Failed to create department");
            },
        });
    };

    return (
        <main>
            <SideSheet open={open} onOpenChange={setOpen} title="Add New Department" description="Create a new department in the church"
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
                                name="name"
                                render={({ field }) => (
                                    <FormInputField label="Name:" field={field} placeholder="Enter department name" showErrorMessage={false} />
                                )}
                            />
                        </div>

                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormTextareaField label="Description:" field={field} placeholder="Enter department description (optional)" inputClassName="h-24" />
                                )}
                            />
                        </div>

                    </aside>
                </FormProvider>
            </SideSheet>
        </main>
    );
}

export default DepartmentForm;
