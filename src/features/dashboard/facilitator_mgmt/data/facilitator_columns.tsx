import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { Edit, MoreHorizontal } from "lucide-react"

export type Facilitator = {
    id: string,
    name: string,
    role: string,
    ministryType: string,
    phone: string,
    email: string,
    createdAt: string,
    updatedAt: string
}

export const facilitatorColumns: ColumnDef<Facilitator>[] = [
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
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
        size: 240
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("role")}</div>
        ),
        size: 160
    },
    {
        accessorKey: "ministryType",
        header: "Ministry",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("ministryType")}</div>
        ),
        size: 160
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => <div>{row.getValue("phone")}</div>,
        size: 160
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div>{row.getValue("email")}</div>,
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
                                View Profile
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
