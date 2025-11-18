import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type Column,
    type ColumnDef,
    type ColumnFiltersState,
    type Row,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Skeleton } from "./ui/skeleton"
import { useGridHeight } from "@/store/grid-height-store"
// import { useGlobalStore } from "@/lib/store/global-store"

type Props<T> = {
    columns: ColumnDef<T, any>[],
    dataSource: T[],
    columnToFilter: string,
    pinnedLeftColumns?: string[],
    pinnedRightColumns?: string[],
    isLoading?: boolean,
    enableMultiRowSelection?: boolean,
    onRowClick?: (data: T | null) => void;
}

const getCommonPinningStyles = (column: Column<any>): React.CSSProperties => {
    const isPinned = column?.getIsPinned();
    const isLastLeftPinnedColumn =
        isPinned === 'left' && column?.getIsLastColumn('left')
    const isFirstRightPinnedColumn =
        isPinned === 'right' && column?.getIsFirstColumn('right')

    return {
        boxShadow: isLastLeftPinnedColumn
            ? '-4px 0 4px -4px gray inset'
            : isFirstRightPinnedColumn
                ? '4px 0 4px -4px gray inset'
                : undefined,
        left: isPinned === 'left' ? `${column?.getStart('left')}px` : undefined,
        right: isPinned === 'right' ? `${column?.getAfter('right')}px` : undefined,
        opacity: isPinned ? 0.85 : 1,
        position: isPinned ? 'sticky' : 'relative',
        width: column?.getSize(),
        zIndex: isPinned ? 1 : 0,
    }
}

export function DataTable<T>({ columns, dataSource, columnToFilter, pinnedLeftColumns, pinnedRightColumns, isLoading, enableMultiRowSelection = false, onRowClick }: Props<T>) {
    const { height } = useGridHeight();
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: dataSource,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageIndex: 0, //custom initial page index
                pageSize: 15, //custom default page size
            },
            columnPinning: {
                left: pinnedLeftColumns ?? [],
                right: pinnedRightColumns ?? ['actions']
            }
        },
        autoResetPageIndex: false,
        enableMultiRowSelection: enableMultiRowSelection,
    })

    const handleRowClick = (row: Row<T>) => {
        if (!enableMultiRowSelection) { //for single row selection
            if (!row.getIsSelected()) {
                onRowClick && onRowClick(row.original);
                // gStore.setMode("update");
            } else {
                // gStore.setMode("new");
                onRowClick && onRowClick(null);
            }
            row.toggleSelected();
        }
    };

    return (
        <div className="size-full">
            <div className="flex items-center py-2">
                <Input
                    placeholder={`Filter ${columnToFilter}...`}
                    value={(table.getColumn(columnToFilter)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(columnToFilter)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm focus-visible:ring-0 h-7 rounded-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto focus-visible:ring-0 h-7" size={"sm"}>
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border w-full overflow-auto h-full" style={{ height: height - 90 }}>
                <Table style={{ width: table.getTotalSize() }}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} style={{ ...getCommonPinningStyles(header.column) }} className={cn(header.column.getIsPinned() ? 'dark:bg-black bg-white' : '')}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="overflow-auto" style={{ height: 20 }}>
                        {isLoading ? (
                            [...Array(15)].map((_, i) => ( // Display 15 skeleton rows while loading
                                <TableRow key={`skeleton-${i}`}>
                                    {columns.map((_, columnIndex) => (
                                        <TableCell key={`cell-${i}-${columnIndex}`}>
                                            <Skeleton className="h-4 w-20" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => handleRowClick(row)}
                                    className={cn(i % 2 && "bg-muted")}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} style={{ ...getCommonPinningStyles(cell.column) }} className={cn(cell.column.getIsPinned() ? 'dark:bg-black bg-white' : '')}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-2">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    {/* <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button> */}
                    <Button
                        size={"icon"} className="dark:text-white h-7" variant={"outline"}
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </Button>
                    <Button
                        size={"icon"} className="dark:text-white h-7" variant={"outline"}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </Button>
                    <Button
                        size={"icon"} className="dark:text-white h-7" variant={"outline"}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </Button>
                    <Button
                        size={"icon"} className="dark:text-white h-7" variant={"outline"}
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </Button>
                    {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto focus-visible:ring-0 h-7" size={"sm"}>
                            Select <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {[5, 10, 20, 30, 40, 50].map((size) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={size}
                                        className="capitalize" 
                                        onCheckedChange={(value) =>
                                            alert(value)
                                        }
                                    >
                                        {size}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu> */}
                </div>
            </div>
        </div>
    )
}
