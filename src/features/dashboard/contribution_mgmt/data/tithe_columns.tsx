import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { Edit, MoreHorizontal } from "lucide-react"


export type Tithe = {
    id: number,
    transactionId: string,
    amount: string,
    date: string,
    member: string,
    paymentMethod: string,
    createdBy: string,
    createdAt: string,
    updatedAt: string
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
        accessorKey: "transactionId",
        header: "Transaction ID",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("transactionId")}</div>
        ),
        size: 250
    },
    {
        accessorKey: "member",
        header: "Account Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("member")}</div>
        ),
        size: 300
    },
    {
        header: "Amount",
        accessorKey: "amount",
        cell: ({ row }) => <div className="lowercase">{row.getValue("amount")}</div>,
    },
    {
        header: "Payment Method",
        accessorKey: "paymentMethod",
        cell: ({ row }) => <div className="lowercase">{row.getValue("paymentMethod")}</div>,
    },
    {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
    },
    {
        header: "Created By",
        accessorKey: "createdBy",
        cell: ({ row }) => <div className="lowercase">{row.getValue("createdBy")}</div>,
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
                                View member
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