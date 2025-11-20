import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check, Plus } from "lucide-react";
import { FormControl, FormItem, FormLabel } from "./ui/form";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useCallback, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";

interface Props {
    keyExpr?: string;
    valueExpr?: string;
    dataSource?: any;
    field: ControllerRenderProps<any>,
    placeholder?: string,
    contentPlaceholder?: string,
    label?: string;
    wrapperClassName?: string;
    form?: any;
}

export default function FormComboBoxField({ field, label, keyExpr, valueExpr, dataSource, wrapperClassName, placeholder = "Select an option", contentPlaceholder, form }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    const handleAdd = useCallback(() => {
        form && form.setValue(field?.name, search);
        setOpen(false);
    }, [search]);

    const handleEnterEscapeDone = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (search === "") {
                setOpen(false);
            } else {
                handleAdd();
            }
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    };

    const handleOnSelect = (value: any) => {
        field?.onChange(value);
        setTimeout(() => { setOpen(false) }, 300)
    };

    return (
        <FormItem className={cn("md:flex items-center w-full", wrapperClassName)} onKeyDown={handleEnterEscapeDone}>
            <FormLabel className="text-xs text-nowrap">{label}</FormLabel>
            <div className="w-full">
                <Popover open={open}>
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    "w-full justify-between h-7 rounded-sm text-sm",
                                    !field.value && "text-muted-foreground"
                                )}
                                onClick={() => setOpen(!open)}
                            >
                                {field?.value
                                    ? (dataSource?.find(
                                        (item: any) => item[valueExpr || "value"] === field.value
                                    )?.[keyExpr || "label"] ?? field?.value)
                                    : placeholder}
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align={"start"} className="w-full p-0">
                        <Command className="md:min-w-[450px]">
                            <CommandInput
                                placeholder={`${contentPlaceholder}...`}
                                className="h-9 w-full"
                                onChangeCapture={(e: any) => setSearch(e.target.value)}
                                value={search}
                            />
                            <CommandList>
                                <CommandEmpty className="text-center text-sm">
                                    <p className="py-3">Not found.</p>
                                    <Button
                                        className="w-full mt-2 border-0 rounded-none border-t text-xs font-bold"
                                        variant="ghost"
                                        onClick={handleAdd}
                                    >
                                        <Plus /> Add Item
                                    </Button>
                                </CommandEmpty>
                                <CommandGroup>
                                    {dataSource?.map((item: any) => (
                                        <CommandItem
                                            value={item[keyExpr || "label"]}
                                            key={item[valueExpr || "value"]}
                                            onSelect={() => handleOnSelect(item[valueExpr || "value"])}
                                        >
                                            {item[keyExpr || "label"]}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    item[valueExpr || "value"] === field?.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            {/* <FormMessage /> */}
        </FormItem>
    );
}