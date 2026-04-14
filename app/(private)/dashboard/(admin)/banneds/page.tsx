'use client'

import { Breadcrumb,
   BreadcrumbItem, 
   BreadcrumbLink, 
   BreadcrumbList,
    BreadcrumbPage, 
    BreadcrumbSeparator
  } from '@/components/ui/breadcrumb'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DataTable } from './data-table'
import { useQuery } from '@tanstack/react-query'
import { columns } from './columns'
import getBanneds from '@/modules/banneds/banned.api'
import { useQueryState } from 'nuqs'
import { Suspense } from 'react'
import { Search, User } from 'lucide-react'




function BannedsPage() {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: ''
  })
  const [searchInput, setSearchInput] = useState(search)
  const [page, setPage] = useQueryState('page', {
    defaultValue: '1'
  })
  const [sortBy] = useQueryState('sortBy', {
    defaultValue: 'banid'
  })

  const [limit] = useQueryState('limit', {
    defaultValue: '25'
  })

  const handleSearch = () => {
    setSearch(searchInput)
    setPage('1') // Reset to first page when searching
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ['banneds', search, page, sortBy, limit],
    queryFn: () => getBanneds(
      { search: search || undefined, 
        page: page ? Number(page) : undefined, 
        sortBy: sortBy || undefined, 
        limit: limit ? Number(limit) : undefined 
      }),
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry:false
  })


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
              <BreadcrumbPage>Banneds</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="m-5 shadow-lg shadow-grey-300/50">
        <div className="rounded-2xl border bg-card/80 p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium text-foreground">Nickname</p>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nickname..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-11 rounded-xl border-border/70 bg-background pl-10 shadow-sm"
                />
              </div>
            </div>
            <Button
              className='h-11 rounded-xl px-5 shadow-sm hover:cursor-pointer'
              onClick={handleSearch}
            >
              <Search className="mr-2 size-4" />
              Buscar
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Pressione Enter para iniciar a busca.
          </p>
        </div>
          <DataTable columns={columns} data={data?.banneds ?? []} 
          page={Number(page)} 
          limit={Number(limit)} 
          setPage={setPage} 
          totalPages={data?.totalPages || 0}
          total={data?.total || 0} 
          isLoading={isLoading} />
          
     
      </div>
    </>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BannedsPage />
    </Suspense>
  )
}
