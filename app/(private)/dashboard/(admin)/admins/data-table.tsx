"use client"

import {
    flexRender,
    useTable,
    type ColumnFiltersState,
    type RowData,
    type TableColumnDef,
} from "@/lib/table"
import { features } from "./data-table-features"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Input } from '@/components/ui/input'


interface DataTableProps<TData extends RowData> {
    columns: TableColumnDef<TData, typeof features>[]
    data: TData[]
    isLoading?: boolean
    totalAdmins?: number 
}

import * as React from 'react'


import { Button } from '@/components/ui/button'



export function DataTable<TData extends RowData>({
    columns,
    data,
    isLoading,
}: DataTableProps<TData>) {

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const table = useTable({
        features,
        data,
        columns,
        onColumnFiltersChange: setColumnFilters,
        state: {
            columnFilters
        },
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 25,
            },
        },
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="grid grid-cols-2 w-180  m-5">
                <Input
                    placeholder="Filter admins Nick"
                    value={(table.getColumn('Nome')?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn('Nome')?.setFilterValue(event.target.value)}
                />
            </div>
            <div className=" rounded-md border">

                <Table className="h-full overflow-y-hidden">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
                    <TableBody>
                        {table.getRowModel()?.rows?.length > 0 ? (
                            table.getRowModel()?.rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No Admins.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
                <div className='flex items-center justify-end space-x-2 py-4'>
                    <Button
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
                    </Button>
                </div>
            </div>
        </>
    )
}
