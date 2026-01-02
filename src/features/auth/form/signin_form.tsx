"use client";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import FormInputField from "@/components/form-input-field";
import { SigninFormSchema } from "@/lib/schema/zodSchema";
import { SVG } from "@/lib/utils/svg-assets";
import { useNavigate } from "react-router";
import { useAuthService } from "@/hooks/use-auth-service";
import { toast } from "sonner";


export default function SignInForm() {
    const navigate = useNavigate();
    const { mutate, isPending } = useAuthService();

    const form = useForm<z.infer<typeof SigninFormSchema>>({
        resolver: zodResolver(SigninFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(formData: z.infer<typeof SigninFormSchema>) {
        mutate(
            formData,
            {
                onSuccess: (res) => {
                    console.log("Login successfulX", res);
                    if (res.token) {
                        localStorage.setItem("token", res.token);
                        document.cookie = `token=${res.token}; path=/; max-age=86400; SameSite=Strict`;
                    }
                    toast.success("Login successful");
                    navigate("/dashboard", { replace: true });
                },
                onError: () => {
                    toast.error("Wrong credentials");
                    form.setError("email", {}, { shouldFocus: true })
                    form.setError("password", {}, { shouldFocus: true })
                    console.log("Login Failed");
                }
            },
        );
    }

    return (
        <FormProvider {...form}>
            <form className="space-y-3 w-full px-10" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormInputField wrapperClassName="flex-none" inputClassName="h-8" field={field} suffix={SVG.User} placeholder="Email" showErrorMessage />
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormInputField wrapperClassName="flex-none" inputClassName="h-8" type="password" field={field} suffix={SVG.Password} placeholder="Password" showErrorMessage />
                    )}
                />
                <p className="text-end font-bold text-xs hover:cursor-pointer">Forgot Password?</p>
                <div className="w-full mt-5 pl-2">
                    <Button variant={"default"} disabled={isPending} className="w-full h-10 dark:text-white">{isPending ? "Log In..." : "Log In"}</Button>
                </div>
            </form>
        </FormProvider>

    )
}