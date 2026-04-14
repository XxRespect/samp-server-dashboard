"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isLoading: boolean
    page: number
    limit: number
    total: number
    setPage: (value: string) => void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading,
    page,
    limit,
    total,
    setPage,
}: DataTableProps<TData, TValue>) {
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const totalPages = Math.max(1, Math.ceil(total / limit))
    const startItem = total === 0 ? 0 : ((page - 1) * limit) + 1
    const endItem = total === 0 ? 0 : Math.min(page * limit, total)

    return (
        <Card className="mx-7 overflow-hidden shadow-lg shadow-gray-600/10">
            <div className="overflow-hidden rounded-md border bg-primary-foreground">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
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
                                    {isLoading ? (
                                        <>
                                            <Spinner className="mx-auto size-7" />
                                            <br />
                                            Carregando...
                                        </>
                                    ) : (
                                        "No results."
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-between gap-3 px-4 py-4">
                    <div className="text-sm text-muted-foreground">
                        {isLoading ? (
                            <Skeleton className="h-4 w-40" />
                        ) : (
                            <span>
                                Mostrando {startItem} a {endItem} de {new Intl.NumberFormat("pt-BR").format(total)} resultados
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(String(page - 1))}
                            disabled={page <= 1}
                        >
                            <FaArrowLeft />
                        </Button>
                        <span className="text-sm">
                            Pagina {page} de {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(String(page + 1))}
                            disabled={page >= totalPages}
                        >
                            <FaArrowRight />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}
