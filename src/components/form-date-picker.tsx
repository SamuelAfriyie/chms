import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { FormControl, FormItem, FormLabel } from "./ui/form";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

type Props = {
    field: any;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    wrapperClassName?: string;
};

export default function FormDatePicker({ field, label, placeholder = "Pick a date", className, wrapperClassName, disabled }: Props) {
    return (
        <FormItem className={cn("md:flex flex-row items-center w-full", wrapperClassName)}>
            <FormLabel className="text-xs text-nowrap">{label}</FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl className="w-full">
                        <Button
                            variant={"outline"}
                            className={cn(
                                "md:w-[calc(100%-40px)] pl-3 text-left font-normal h-8 rounded-sm bg-transparent",
                                !field.value && "text-muted-foreground", className
                            )}
                        >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>{placeholder}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="start">
                    <Calendar
                        className="bg-white dark:bg-black"
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => disabled == undefined &&
                            date > new Date() || date < new Date("1900-01-01")
                        }
                    />
                </PopoverContent>
            </Popover>
            {/* <FormMessage /> */}
        </FormItem>
    );
}