import { Minus, PlusCircle, PlusIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { FormControl, FormItem, FormLabel } from "./ui/form";
import type { ControllerRenderProps } from "react-hook-form";
import { useEffect, useState } from "react";
import IconButton from "./icon-button";

type Props = {
    placeholder?: string;
    itemsplaceholder?: string;
    label?: string;
    title?: string;
    field?: ControllerRenderProps<any>;
    inputClassName?: string;
    wrapperClassName?: string;
    form?: any;
}

export default function FormInputWithOptions({ placeholder, label, title, wrapperClassName, field, form, itemsplaceholder }: Props) {
    const [formElemets, setFormElements] = useState<any[]>([{}]);
    const [inputs, setInputs] = useState<string[]>([""])
    const [open, setOpen] = useState<boolean>(false);

    // Add new input
    const addInput = () => {
        setInputs([...inputs, ""]) // start with empty string
    }

    // Handle input change
    const handleChange = (index: number, value: string) => {
        const newInputs = [...inputs]
        newInputs[index] = value
        setInputs(newInputs)
    }

    const removeInput = (index: number) => {
        const newInputs = inputs.filter((_, i) => i !== index)
        setInputs(newInputs)
    }

    const inputJSX = (key: number) => (
        <div className="flex items-center space-x-1" key={key}>
            <Input autoFocus={checkAndSetFocus(field?.value)} className={cn("pr-10 rounded-sm focus-visible:ring-0 h-7")} placeholder={itemsplaceholder} type="email" onChange={(e) => handleChange(key + 1, e.target.value)} defaultValue={inputs[key + 1]} />
            <IconButton icon={<Minus className="dark:text-white" />} className="size-7 dark:bg-muted dark:hover:bg-red-400/10 hover:bg-red-400/10 bg-muted text-black" onClick={() => handleRemoveElement(key!)} />
        </div>)

    const handleAddElement = () => {
        addInput();
        setFormElements((prev) => [...prev, {}])
    }

    const handleRemoveElement = (index: number) => {
        removeInput(index + 1);
        setFormElements((prev) => prev.filter((_, i) => i !== index));
    }

    const handleDone = () => {
        const emails = inputs.filter((e) => e !== "").join(',');
        form?.setValue(field?.name, emails);
        setOpen(false);
    }

    const handleCancel = () => {
        setInputs([""]);
        setFormElements([{}]);
        setOpen(false);
    }

    const checkAndPopulateValue = () => {
        if (field?.value !== undefined || field?.value == "") {
            const options: any[] = field!.value.split(',');
            if (field?.name == "email") { //for emails validation only
                if (options.filter((e: string) => !e.includes('@')).length <= 0) {
                    options.push("");
                }
            } else {
                options.push("");
            }
            setInputs(options);
            setFormElements(Array.from({ length: options.length - 1 }, () => ({})));
        }
    }

    const handleEnterEscapeDone = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleDone();
        } else if (e.key === "Escape") {
            handleCancel();
        }
    }

    const checkAndSetFocus = (value: string) => {
        return value !== "";
    }

    useEffect(() => {
        checkAndPopulateValue();
    }, [open]);

    return (
        <div className="w-full relative" onKeyDown={handleEnterEscapeDone}>
            <FormItem className={cn(wrapperClassName || "md:flex items-center space-x-0.5")}>
                <FormLabel className="text-xs text-nowrap">{label}:</FormLabel>
                <div className="w-full">
                    <FormControl>
                        <Input {...field} className={cn("pr-10 rounded-sm focus-visible:ring-0 h-7")} placeholder={placeholder} readOnly={true} onClick={() => setOpen(!open)} />
                    </FormControl>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-0.5">
                        <Popover open={open}>
                            <PopoverTrigger>
                                <PlusCircle className="bg-muted border-l px-2 w-8" onClick={() => setOpen(true)} />
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                                <header className="flex items-center h-7">
                                    <p className="text-xs text-nowrap w-full p-2 font-bold"> Add {title ?? label}s</p>
                                    <Separator orientation="vertical" />
                                    <div className="w-16">
                                        <Button variant={"ghost"} size={"icon"} className="w-full h-7 text-xs rounded-none" onClick={handleAddElement}><PlusIcon /></Button>
                                    </div>
                                </header>
                                <Separator />
                                <section className="px-1 py-1 space-y-1.5 overflow-y-auto min-h-11 max-h-44 ">
                                    <Input className={cn("pr-10 rounded-sm focus-visible:ring-0 h-7")} placeholder={itemsplaceholder} autoFocus={true} defaultValue={inputs[0]} onChange={(e) => handleChange(0, e.target.value)} />
                                    {
                                        formElemets?.map((_, index: number) => inputJSX(index))
                                    }
                                </section>
                                <Separator />
                                <section className="flex items-center w-auto h-7">
                                    <Button variant={"ghost"} size={"icon"} className="w-1/2 h-7 text-xs rounded-none font-bold" onClick={handleDone}>Done</Button>
                                    <Separator orientation="vertical" />
                                    <Button variant={"ghost"} size={"icon"} className="w-1/2 h-7 text-xs rounded-none font-bold hover:text-red-500 text-red-500 dark:text-red-500/50" onClick={handleCancel}>Cancel</Button>
                                </section>
                            </PopoverContent>
                        </Popover>
                    </span>
                </div>
            </FormItem>
        </div>
    )
}