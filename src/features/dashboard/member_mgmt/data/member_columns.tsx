import TooTip from "@/components/tooltip"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Copy, Edit, MoreHorizontal } from "lucide-react"


export type Member = {
    id: number,
    membershipId: string,
    fName: string,
    lName: string,
    gender: string,
    dateOfBirth: string,
    phone: string,
    email: string,
    ministry: string,
    joinDate: string,
    createdAt: string,
    updatedAt: string,
}

export const memberColumns: ColumnDef<Member>[] = [
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
        accessorKey: "membershipId",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("membershipId")}</div>
        ),
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Membership ID
                    <ArrowUpDown />
                </Button>
            )
        },
    },
    {
        accessorKey: "fName",
        header: "First Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("fName")}</div>
        ),
    },
    {
        accessorKey: "lName",
        header: "Last Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("lName")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase flex items-center truncate">
            {row.getValue("email")}
            <TooTip message="Click to copy email">
                <Copy onClick={() => navigator.clipboard.writeText(row.original?.email)} className="size-4 ml-2" />
            </TooTip>
        </div>,
    },
    {
        accessorKey: "phone",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Phone
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
    },
    {
        header: "Gender",
        accessorKey: "gender",
        cell: ({ row }) => <div className="capitalize">{(row.getValue("gender") as string).toLowerCase()}</div>,
    },
    {
        header: "Date of Birth",
        accessorKey: "dateOfBirth",
        cell: ({ row }) => <div>{row.getValue("dateOfBirth")}</div>,
    },
    {
        header: "Ministry",
        accessorKey: "ministry",
        cell: ({ row }) => <div className="capitalize">{(row.getValue("ministry") as string).toLowerCase()}</div>,
    },
    {
        header: "Join Date",
        accessorKey: "joinDate",
        cell: ({ row }) => <div>{row.getValue("joinDate")}</div>,
    },
    {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
    },
    {
        id: "actions",
        size: 100,
        enableHiding: false,
        cell: ({ row }) => {
            const customer = row.original

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
                                onClick={() => navigator.clipboard.writeText(customer.membershipId)}
                            >
                                Copy Membership ID
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(customer.email)}
                            >
                                Copy  email
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