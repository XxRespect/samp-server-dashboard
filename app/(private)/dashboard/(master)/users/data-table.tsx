"use client"

import * as react from 'react'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field } from '@/components/ui/field'
import { ButtonGroup } from '@/components/ui/button-group'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Spinner } from '@/components/ui/spinner'

import { FaArrowRight} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";



import { IoFilter } from "react-icons/io5";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageSize?: number
  search?: string
  onSearch?: (value: string) => void
  page: number
  onPageChange?: (page: number) => void
  isLoading: boolean
  hasNextPage?: boolean

}

export function DataTable<TData, TValue>({
  columns,
  data,
  search = "",
  onSearch,
  page = 1,
  onPageChange,
  hasNextPage = false,
  isLoading 
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = react.useState<SortingState>([])
  const [inputValue, setInputValue] = react.useState<string>(search)
  const [orderBy, setOrderBy] = react.useState<string>("Online")
  const [currentPageSize, setCurrentPageSize] = react.useState<number>(20)

  react.useEffect(() => {
    setInputValue(search)
  }, [search])

  const runSearch = () => {
    onSearch?.(inputValue)
  }

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })




  return (
    <>
      <div className="overflow-hidden rounded-md border  shadow-lg shadow-gray-300/6">
        <div className="m-3 flex ">
          <Field >
            <ButtonGroup >
              <Input
              
                placeholder="Enter a Player Nick or Account ID or Serial"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    runSearch()
                  }
                }}
                className="max-w-sm shadow-xl/30"
              />
              <Button
                className='max-w-sm shadow-xl/30 hover:cursor-pointer hover:transition-all'
                variant='outline'
                onClick={runSearch}
              >
                Search
              </Button>
            </ButtonGroup>
          </Field>
          <div className='ml-auto'>
            <DropdownMenu  >
              <DropdownMenuTrigger asChild>
                <Button  className='shadow-xl/30  hover:cursor-pointer hover:transition-all active:bg-muted ' variant="outline">Filtering <IoFilter /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel ><p>Filters</p></DropdownMenuLabel>
                  <DropdownMenuItem className='hover:cursor-pointer hover:transition-all grid grid-cols-1'><p><Button className='w-full' onClick={() => setOrderBy("Online")}  variant='link'>Status</Button></p></DropdownMenuItem>
                  <DropdownMenuItem className='hover:cursor-pointer hover:transition-all'><p>Banneds</p></DropdownMenuItem>
                  <DropdownMenuItem className='hover:cursor-pointer hover:transition-all'><p>Last Login</p></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='ml-3'>
            <DropdownMenu  >
              <DropdownMenuTrigger  asChild>
                <Button  className='shadow-xl/30  hover:cursor-pointer hover:transition-all active:bg-muted ' variant="outline">{currentPageSize} rows</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel ><p>Rows per page</p></DropdownMenuLabel>
                  <DropdownMenuItem className='hover:cursor-pointer hover:transition-all grid grid-cols-1'><p><Button className='w-full' onClick={() => setCurrentPageSize(10)}  variant='link'>10 rows</Button></p></DropdownMenuItem>
                  <DropdownMenuItem className='hover:cursor-pointer hover:transition-all'><p><Button className='w-full' onClick={() => setCurrentPageSize(15)}  variant='link'>15 rows</Button></p></DropdownMenuItem>
                  <DropdownMenuItem className='hover:cursor-pointer hover:transition-all'><p><Button className='w-full' onClick={() => setCurrentPageSize(25)}  variant='link'>25 rows</Button></p></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Table >
          <TableHeader className='border-b-2'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className='border-t-2 p-1' key={header.id}>
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
          <TableBody className='m-3'>
            {(() => {
              let rowModel;
              try {
                rowModel = table?.getRowModel();
              } catch (e) {
                rowModel = null;
              }
              const rows = rowModel?.rows;
              if (rows && rows.length > 0) {
                return rows.map((row) => (
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
              } else {
                return (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      {isLoading ? (
                        <>
                          <div className="mt-3">
                            <Spinner className='mx-auto size-7' /> <br />Loading...
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-muted-foreground">
                            No results.
                          </p>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              }
            })()}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4 m-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(page - 1)}
            disabled={page <= 1}
          >
            <FaArrowLeft/>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(page + 1)}
            disabled={!hasNextPage}
          >
            <FaArrowRight/>
          </Button>
        </div>
      </div>
    </>
  )
}