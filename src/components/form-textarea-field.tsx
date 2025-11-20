import { cn } from "@/lib/utils";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import type { ControllerRenderProps } from "react-hook-form";
import { Textarea } from "./ui/textarea";

interface Props {
    field: ControllerRenderProps<any>,
    placeholder?: string,
    label?: string;
    inputClassName?: string;
    showErrorMessage?: boolean
}

export default function FormTextareaField({ label, inputClassName, placeholder, field, showErrorMessage = false }: Props) {
    return (
        <FormItem className="md:flex items-start space-x-0.5">
            <FormLabel className="text-xs text-nowrap">{label}</FormLabel>
            <div className="w-full">
                <FormControl>
                    <Textarea {...field} className={cn("pr-10 rounded-sm focus-visible:ring-0 h-7 resize-none", inputClassName)} placeholder={placeholder} />
                </FormControl>
                {showErrorMessage && <FormMessage className="text-xs ml-1 mt-1" />}
            </div>
        </FormItem>
    )
}