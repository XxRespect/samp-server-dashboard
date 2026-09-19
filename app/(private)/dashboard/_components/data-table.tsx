"use client"

import { flexRender, useTable, type RowData, type TableColumnDef } from "@/lib/table"
import { features } from "./data-table-features"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Spinner } from '@/components/ui/spinner'
import { cn } from "@/lib/utils"

interface DataTableProps<TData extends RowData> {
  columns: TableColumnDef<TData, typeof features>[]
  data: TData[]
  isLoading?: boolean
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  isLoading
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
  })

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/95 shadow-xl shadow-black/5 backdrop-blur supports-backdrop-filter:bg-card/80">
      <Table>
        <TableHeader className="bg-muted/35">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "h-12 border-b border-border/60 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground",
                      header.column.id === "position" && "w-20 text-center"
                    )}
                  >
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-b border-border/50 transition-all duration-200 hover:bg-muted/30"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "px-4 py-4 align-middle",
                      cell.column.id === "position" && "text-center"
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-40 px-6 text-center">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
                    <Spinner className="mx-auto size-7" />
                    <span>Carregando ranking...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-base font-medium text-foreground">Nenhum jogador no ranking.</span>
                    <span>Assim que houver dados, o topscore aparece aqui.</span>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
