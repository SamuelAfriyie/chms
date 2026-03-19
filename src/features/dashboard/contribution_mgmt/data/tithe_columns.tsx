import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { Edit, MoreHorizontal } from "lucide-react"

export type Tithe = {
    id: string;
    memberId: string;
    contributionType: string;
    amount: number;
    paymentMethod: string;
    reference?: string;
    date: string;
    createdAt: string;
    updatedAt: string;
}

export const titheColumns: ColumnDef<Tithe>[] = [
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
        accessorKey: "memberId",
        header: "Member ID",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("memberId")}</div>
        ),
        size: 250
    },
    {
        accessorKey: "contributionType",
        header: "Type",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("contributionType")}</div>
        ),
    },
    {
        header: "Amount",
        accessorKey: "amount",
        cell: ({ row }) => <div>{row.getValue("amount")}</div>,
    },
    {
        header: "Payment Method",
        accessorKey: "paymentMethod",
        cell: ({ row }) => <div className="uppercase">{row.getValue("paymentMethod")}</div>,
    },
    {
        header: "Reference",
        accessorKey: "reference",
        cell: ({ row }) => <div>{row.getValue("reference") ?? "—"}</div>,
    },
    {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => <div>{row.getValue("date")}</div>,
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
                            <DropdownMenuItem>View member</DropdownMenuItem>
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
