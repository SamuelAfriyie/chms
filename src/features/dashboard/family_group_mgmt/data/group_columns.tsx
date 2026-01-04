import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { Edit, MoreHorizontal } from "lucide-react"


export type Group = {
    id: number,
    groupName: string,
    description: string,
    status: "Active" | "Inactive",
    category: string,
    size: number,
    createdAt: string,
    updatedAt: string
}

export const groupColumns: ColumnDef<Group>[] = [
    {
        id: "select",
        enablePinning: true,
        header: ({ table }) => (
            <Checkbox
                style={{ width: 20 }}
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                style={{ width: 20 }}
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40
    },
    {
        accessorKey: "groupName",
        header: "Group Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("groupName")}</div>
        ),
        size: 250
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("category")}</div>
        ),
        size: 300
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
    },
    {
        header: "Size",
        accessorKey: "size",
        cell: ({ row }) => <div className="lowercase">{row.getValue("size")}</div>,
    },
    {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ row }) => <div className="lowercase">{row.getValue("createdAt")}</div>,
    },
    {
        header: "Updated At",
        accessorKey: "updatedAt",
        cell: ({ row }) => <div className="lowercase">{row.getValue("updatedAt")}</div>,
    },
    {
        header: "Description",
        accessorKey: "description",
        cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>,
        size: 1000,
    },
    {
        id: "actions",
        size: 100,
        enableHiding: false,
        cell: ({ }) => {
            return (
                <div className="text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-1">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem

                            >
                                View members
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Edit />
                                Edit
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]