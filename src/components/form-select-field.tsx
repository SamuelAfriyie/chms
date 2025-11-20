import type { ControllerRenderProps } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form"; 
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Props {
    keyExpr?: string;
    valueExpr?: string;
    options?: any;
    field: ControllerRenderProps<any>,
    placeholder?: string,
    label?: string;
    wrapperClassName?: string;
}

export default function FormSelectField({ field, label, keyExpr, valueExpr, options, wrapperClassName, placeholder = "Select an option" }: Props) {
    return (
        <FormItem className={cn("md:flex items-center w-full", wrapperClassName)}>
            <FormLabel className="text-xs text-nowrap">{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger className="w-full " size="sm">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {options?.map((option: any, index: number) => (
                        <SelectItem key={index} value={option[valueExpr || "value"]}>
                            {option[keyExpr || "label"]}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select> 
            <FormMessage />
        </FormItem>
    );
}