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
import { Button } from "@/components/ui/button"
import { Card } from '@/components/ui/card'
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

import { Spinner } from '@/components/ui/spinner'
import { Skeleton } from '@/components/ui/skeleton'
import { FaArrowRight} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";



export function DataTable<TData, TValue>({
  columns,
  data,
  page,
  limit,
  setPage,
  totalPages,
  total,
  isLoading
}: DataTableProps<TData, TValue> & { 
  page: number; 
  limit: number; 
  setPage: (value: string) => void;
  totalPages: number;
  total: number;
  isLoading: boolean;}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Card className='shadow-lg shadow-gray-600/10'>
    <div className="overflow-hidden rounded-md border m-5">
      <Table>
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
            <TableRow className='text-center'>
              <TableCell colSpan={columns.length} className="h-24 ">
                {isLoading? (
                  <>
                  <Spinner className="mx-auto size-7" />
                 </>
                ) : (
                  "No results."
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {isLoading ? 
          (<>
            <Skeleton className="ml-4 h-4 w-40" />
          </> )
          : 
          (<><span className="ml-4">Mostrando {((page - 1) * limit) + 1} a {Math.min(page * limit, total)} de {new Intl.NumberFormat('pt-BR').format(total)} resultados</span></>)
          }
          
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(String(page - 1))}
            disabled={page <= 1}
          >
            <FaArrowLeft />
          </Button>
          <span className="text-sm">
            Página {page} de {totalPages}
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