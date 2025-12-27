import type { SelectOption } from "@/types/generics";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Props = {
    label?: string;
    placeholder?: string;
    options?: SelectOption[];
    onSelect?: (v: string) => void;
}

export default function ChipSelect({ label, placeholder, options, onSelect }: Props) {
    return (
        <div className="flex items-center w-fit h-7 rounded-full pl-3 py-1 border dark:bg-muted">
            <p className="text-sm">{label}</p>
            <Select onValueChange={onSelect}>
                <SelectTrigger className="w-[120px] focus-visible:ring-0 border-none dark:hover:bg-transparent dark:bg-transparent">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {
                        options?.map((opt: SelectOption, index: number) => (
                            <SelectItem key={index} value={opt.value.toLowerCase()}>{opt?.label}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}