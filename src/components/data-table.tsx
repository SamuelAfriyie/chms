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
import { ChevronDown, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
            <div className="flex items-center justify-between py-2 gap-4 flex-wrap">
                {/* Left: selection count + rows per page */}
                <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected
                    </span>
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">Rows per page</span>
                        <Select
                            value={String(table.getState().pagination.pageSize)}
                            onValueChange={(v) => table.setPageSize(Number(v))}
                        >
                            <SelectTrigger className="h-7 w-[70px] text-xs focus:ring-0">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 15, 20, 30, 50].map((size) => (
                                    <SelectItem key={size} value={String(size)} className="text-xs">
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Right: page info + navigation */}
                <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground whitespace-nowrap mr-1">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <Button size="icon" variant="outline" className="h-7 w-7"
                        onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
                        <ChevronFirst className="size-3.5" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-7 w-7"
                        onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        <ChevronLeft className="size-3.5" />
                    </Button>

                    {/* Page number buttons */}
                    {(() => {
                        const current = table.getState().pagination.pageIndex;
                        const total = table.getPageCount();
                        const delta = 1;
                        const pages: (number | "…")[] = [];
                        for (let i = 0; i < total; i++) {
                            if (i === 0 || i === total - 1 || (i >= current - delta && i <= current + delta)) {
                                pages.push(i);
                            } else if (pages[pages.length - 1] !== "…") {
                                pages.push("…");
                            }
                        }
                        return pages.map((p, idx) =>
                            p === "…" ? (
                                <span key={`ellipsis-${idx}`} className="text-xs text-muted-foreground px-1">…</span>
                            ) : (
                                <Button
                                    key={p}
                                    size="icon"
                                    variant={p === current ? "default" : "outline"}
                                    className="h-7 w-7 text-xs"
                                    onClick={() => table.setPageIndex(p as number)}
                                >
                                    {(p as number) + 1}
                                </Button>
                            )
                        );
                    })()}

                    <Button size="icon" variant="outline" className="h-7 w-7"
                        onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        <ChevronRight className="size-3.5" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-7 w-7"
                        onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
                        <ChevronLast className="size-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
