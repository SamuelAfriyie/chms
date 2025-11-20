import type { ControllerRenderProps } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import type { HTMLInputTypeAttribute } from "react";

interface Props {
    field: ControllerRenderProps<any>,
    suffix?: React.ReactNode;
    placeholder?: string,
    label?: string;
    inputClassName?: string;
    wrapperClassName?: string;
    showErrorMessage?: boolean;
    type?: HTMLInputTypeAttribute
}

export default function FormInputField({ field, suffix, placeholder, label, inputClassName, wrapperClassName, showErrorMessage = true, type }: Props) {
    return (
        <FormItem className={cn("md:flex items-center", wrapperClassName)}>
            <FormLabel className="text-xs text-nowrap">{label}</FormLabel>
            <div className="w-full">
                <div className="relative">
                    <FormControl>
                        <Input {...field} className={cn("pr-10 rounded-sm focus-visible:ring-0 h-7", inputClassName)} placeholder={placeholder} type={type} />
                    </FormControl>
                    {
                        suffix && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {suffix}
                            </span>
                        )
                    }
                </div>
                {showErrorMessage && (<FormMessage className="text-xs ml-1 mt-1" />)}
            </div>
        </FormItem>
    )
}