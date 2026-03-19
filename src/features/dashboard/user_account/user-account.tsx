import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssignRoleSchema, RegisterSchema } from "@/lib/schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldCheck, UserPlus } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { useAssignRoleService, useRegisterService } from "@/hooks/use-auth-service";
import FormInputField from "@/components/form-input-field";
import FormSelectField from "@/components/form-select-field";

const registerInit: z.infer<typeof RegisterSchema> = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
};

const assignRoleInit: z.infer<typeof AssignRoleSchema> = {
    userId: "",
    role: "",
};

const ROLES = [
    { label: "Admin", value: "ADMIN" },
    { label: "Pastor", value: "PASTOR" },
    { label: "Treasurer", value: "TREASURER" },
    { label: "Secretary", value: "SECRETARY" },
    { label: "Staff", value: "STAFF" },
];

function RegisterTab() {
    const { mutate, isPending } = useRegisterService();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: registerInit,
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        mutate(
            {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                password: values.password,
            },
            {
                onSuccess: () => {
                    toast.success(`Account created for ${values.firstName} ${values.lastName}`);
                    form.reset(registerInit);
                },
                onError: (error: any) => {
                    toast.error(error?.message ?? "Failed to create account");
                },
            }
        );
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                    <UserPlus className="size-4" />
                    Register New User
                </CardTitle>
                <CardDescription className="text-xs">
                    All fields are required. The user will be able to log in immediately after creation.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormInputField
                                        label="First Name:"
                                        field={field}
                                        placeholder="John"
                                        showErrorMessage
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormInputField
                                        label="Last Name:"
                                        field={field}
                                        placeholder="Doe"
                                        showErrorMessage
                                    />
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormInputField
                                    label="Email:"
                                    field={field}
                                    placeholder="john.doe@example.com"
                                    showErrorMessage
                                />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormInputField
                                    label="Phone:"
                                    field={field}
                                    placeholder="+233201234567"
                                    showErrorMessage
                                />
                            )}
                        />

                        <Separator />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormInputField
                                        label="Password:"
                                        field={field}
                                        type="password"
                                        placeholder="Min. 8 characters"
                                        showErrorMessage
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormInputField
                                        label="Confirm Password:"
                                        field={field}
                                        type="password"
                                        placeholder="Repeat password"
                                        showErrorMessage
                                    />
                                )}
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button type="submit" disabled={isPending} className="min-w-[140px]">
                                {isPending
                                    ? <><Loader2 className="animate-spin" /> Creating...</>
                                    : <><UserPlus /> Create Account</>
                                }
                            </Button>
                        </div>

                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}

function AssignRoleTab() {
    const { mutate, isPending } = useAssignRoleService();

    const form = useForm<z.infer<typeof AssignRoleSchema>>({
        resolver: zodResolver(AssignRoleSchema),
        defaultValues: assignRoleInit,
    });

    const onSubmit = (values: z.infer<typeof AssignRoleSchema>) => {
        mutate(
            { userId: values.userId, role: values.role },
            {
                onSuccess: () => {
                    toast.success("Role assigned successfully");
                    form.reset(assignRoleInit);
                },
                onError: (error: any) => {
                    toast.error(error?.message ?? "Failed to assign role");
                },
            }
        );
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                    <ShieldCheck className="size-4" />
                    Assign Role
                </CardTitle>
                <CardDescription className="text-xs">
                    Enter the user's ID and select a role to assign.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormInputField
                                    label="User ID:"
                                    field={field}
                                    placeholder="e.g. abc123"
                                    showErrorMessage
                                />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormSelectField
                                    label="Role:"
                                    field={field}
                                    valueExpr="value"
                                    keyExpr="label"
                                    options={ROLES}
                                />
                            )}
                        />

                        <div className="flex justify-end pt-2">
                            <Button type="submit" disabled={isPending} className="min-w-[140px]">
                                {isPending
                                    ? <><Loader2 className="animate-spin" /> Assigning...</>
                                    : <><ShieldCheck /> Assign Role</>
                                }
                            </Button>
                        </div>

                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}

export default function UserAccount() {
    return (
        <main className="size-full overflow-y-auto px-4 py-6">
            <div className="max-w-2xl mx-auto space-y-6">

                <div>
                    <h1 className="text-xl font-semibold">User Account</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage system users and their roles.
                    </p>
                </div>

                <Separator />

                <Tabs defaultValue="register">
                    <TabsList className="mb-4">
                        <TabsTrigger value="register">Register User</TabsTrigger>
                        <TabsTrigger value="assign-role">Assign Role</TabsTrigger>
                    </TabsList>
                    <TabsContent value="register">
                        <RegisterTab />
                    </TabsContent>
                    <TabsContent value="assign-role">
                        <AssignRoleTab />
                    </TabsContent>
                </Tabs>

            </div>
        </main>
    );
}
