import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { Edit, MoreHorizontal, UserCheck } from "lucide-react"

export type Department = {
    id: string;
    name: string;
    description?: string;
    leaderId?: string;
    createdAt: string;
    updatedAt: string;
}

export const departmentColumns: ColumnDef<Department>[] = [
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
        accessorKey: "name",
        header: "Department Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
        size: 280
    },
    {
        accessorKey: "leaderId",
        header: "Leader ID",
        cell: ({ row }) => (
            <div>{row.getValue("leaderId") ?? "—"}</div>
        ),
        size: 240
    },
    {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
    },
    {
        header: "Updated At",
        accessorKey: "updatedAt",
        cell: ({ row }) => <div>{row.getValue("updatedAt")}</div>,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div>{row.getValue("description")}</div>
        ),
        size: 1000
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
                            <DropdownMenuItem>
                                <Edit />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <UserCheck />
                                Assign Leader
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
