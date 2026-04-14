'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import React, { Suspense, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { DataTable } from './data-table'
import { getBannedIps } from './ipbanned.service'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQueryState } from 'nuqs'
import { Search, ShieldBan } from 'lucide-react'

function IpBannedsPage() {

  const [page, setPage] = useQueryState('page', {
    defaultValue: '1'
  })

  const [limit, setLimit] = useQueryState("limit", {
    defaultValue: "25"
  })

  const [search, setSearch] = useQueryState("search", {
    defaultValue: ""
  })

  const [searchInput, setSearchInput] = useState(search)


  const { data } = useQuery({
    queryKey: ['bannedIps', search, page, limit],
    queryFn: () => getBannedIps({
      search: search || "",
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    }),
    retry: false

  })

  function handleSearch() {
    setSearch(searchInput)
    setPage('1') // Reset to first page when searching
    setLimit("25")

  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }


  return (
    <>
      <div>
        <Breadcrumb className='m-5'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>IP Banneds</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
  
      <div className='m-9'>
        <div className='m-5 rounded-2xl border bg-card/80 p-4 shadow-sm'>
          <div className='flex flex-col gap-4 md:flex-row md:items-end'>
            <div className='flex-1 space-y-2'>
              <p className='text-sm font-medium text-foreground'>Endereço IP</p>
              <div className='relative'>
                <ShieldBan className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  type="text"
                  placeholder="Search IP"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className='h-11 rounded-xl border-border/70 bg-background pl-10 shadow-sm'
                />
              </div>
            </div>
            <Button className='h-11 rounded-xl px-5 shadow-sm' onClick={handleSearch}>
              <Search className='mr-2 size-4' />
              Buscar
            </Button>
          </div>
          <p className='mt-3 text-xs text-muted-foreground'>
            Pressione Enter para aplicar o filtro de IP.
          </p>
        </div>
        <DataTable data={data?.banned || []}
          columns={columns} />
          <div className='flex items-center justify-end space-x-2 py-4'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setPage(String(Number(page) - 1))}
              disabled={Number(page) === 1}
            >
              Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
            onClick={() => setPage(String(Number(page) + 1))}
              disabled={!data?.hasNextPage}
            >
            Next
            </Button>
          </div>
      </div>
    </>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IpBannedsPage />
    </Suspense>
  )
}
