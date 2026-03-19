import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"

export type Expense = {
    id: string;
    title: string;
    category: string;
    department: string;
    amount: number;
    expenseDate: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export const expenseColumns: ColumnDef<Expense>[] = [
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
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("title")}</div>
        ),
        size: 280
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("category")}</div>
        ),
        size: 180
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("department")}</div>
        ),
        size: 200
    },
    {
        header: "Amount",
        accessorKey: "amount",
        cell: ({ row }) => <div>{row.getValue("amount")}</div>,
    },
    {
        header: "Expense Date",
        accessorKey: "expenseDate",
        cell: ({ row }) => <div>{row.getValue("expenseDate")}</div>,
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
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                                <Trash2 />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
