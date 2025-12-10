import { useCallback, useState } from "react";
import { CheckIcon, ChevronsUpDownIcon, GroupIcon, MinusCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";



const groups = [
    {
        value: "Administration/Operations",
        label: "Administration/Operations",
    },
    {
        value: "Worship/Music-Ministry ",
        label: "Worship/Music-Ministry ",
    },
    {
        value: "Children's-Ministry",
        label: "Children's-Ministry",
    },
    {
        value: "Missions/Outreach",
        label: "Missions/Outreach",
    },
    {
        value: "Youth-Ministry",
        label: "Youth-Ministry",
    },
    {
        value: "Family & Life-Ministry",
        label: "Family & Life-Ministry",
    },
]

interface GroupAssignmentProps {
    form: any,
    options?: any[]
}

export default function GroupAssignment({ }: GroupAssignmentProps) {
    const [selected, setSelected] = useState<any[]>([]);
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const handleGroupSelect = (group: string) => {
        setSelected((prev) => {
            const updatedSelections = new Set(prev);
            updatedSelections.add(group);
            return Array.from(updatedSelections);
        });
    }

    const handleRemoveItem = (groupName: string) => {
        const filtered = selected.filter((group) => group !== groupName);
        if (selected.length === 1 || groupName === value) {
            setValue("");
        }
        setSelected((_) => filtered);
    };

    return (
        <main>
            <div className="w-full flex items-center">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between text-sm bg-transparent"
                        >
                            {value
                                ? groups.find((group) => group.value === value)?.label
                                : "Select group..."}
                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-sm p-0" align="start">
                        <Command>
                            <CommandInput placeholder="Search group..." />
                            <CommandList>
                                <CommandEmpty>No group found.</CommandEmpty>
                                <CommandGroup>
                                    {groups.map((group) => (
                                        <CommandItem
                                            key={group.value}
                                            value={group.value}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                if (currentValue !== "") {
                                                    handleGroupSelect(currentValue);
                                                }
                                                setOpen(false)
                                            }}
                                        >
                                            <CheckIcon
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === group.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {group.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <Separator className="my-4" />
            <section className="space-y-2">
                {
                    selected?.length === 0 ?
                        (<NoGroupSelected />)
                        :
                        selected.map((group) => (
                            <GroupItem name={group} onUpdate={handleRemoveItem} />
                        ))
                }
            </section>
        </main>
    )
}

interface GroupItemProps {
    name: string,
    onUpdate?: (item: string) => void
}

const GroupItem = ({ name, onUpdate }: GroupItemProps) => {

    const handleRemoveItem = useCallback((item: any) => {
        onUpdate && onUpdate(item);
    }, [onUpdate]);

    return (
        <main className="spacy-y-2">
            <section className="flex border rounded-md bg-muted px-4 py-2 space-x-2 items-center">
                <div className="flex-1">
                    <p className="text-xs text-ellipsis font-semibold">{name}</p>
                </div>
                <MinusCircleIcon height={18} width={18} color="red" onClick={() => handleRemoveItem(name)} />
            </section>
        </main>
    )
}

const NoGroupSelected = () => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <GroupIcon />
                </EmptyMedia>
                <EmptyTitle>No Group Selected</EmptyTitle>
                <EmptyDescription>Select all <em>Groups</em> that this member belongs to.</EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}