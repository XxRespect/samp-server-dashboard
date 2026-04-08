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
import {
  Alert,
  AlertTitle,
  AlertDescription
} from '@/components/ui/alert'



import { DataTable } from './data-table'
import { useQuery } from '@tanstack/react-query'
import { columns } from './columns'
import getBanneds from '@/app/modules/banneds/banned.api'
import {Card } from '@/components/ui/card'
import { useQueryState } from 'nuqs'
import { Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'




function BannedsPage() {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: ''
  })
  const [searchInput, setSearchInput] = useState(search)
  const [page, setPage] = useQueryState('page', {
    defaultValue: '1'
  })
  const [sortBy, setSortBy] = useQueryState('sortBy', {
    defaultValue: 'banid'
  })

  const [orderBy, setOrderBy] = useQueryState('orderBy', {
    defaultValue: 'desc'
  })

  const [limit, setLimit] = useQueryState('limit', {
    defaultValue: '25'
  })

  const handleSearch = () => {
    setSearch(searchInput)
    setPage('1') // Reset to first page when searching
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['banneds', search, page, sortBy, limit],
    queryFn: () => getBanneds(
      { search: search || undefined, 
        page: page ? Number(page) : undefined, 
        sortBy: sortBy || undefined, 
        limit: limit ? Number(limit) : undefined 
      }),
  })

  const {data: session}  = useSession()

  if(!session || session?.user?.Admin <= 0) {
    redirect('/dashboard')
    return (
      <>
        <Alert>
          <AlertTitle>Acceso denied</AlertTitle>
          <AlertDescription>
            You do not have permission to access this Page
          </AlertDescription>
        </Alert>
      </>
    )
  }

  return (
    <>
    {isLoading && <p className="px-5">Loading banneds...</p>}
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
        <Card className='bg-primary-background'>
          <div className="p-4 h-full">
            <div className="flex gap-2 max-w-sm">
              <Input
                placeholder="Buscar por nickname..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
                 <Button
                className='max-w-sm shadow-xl/30 hover:cursor-pointer hover:transition-all'
                variant='outline'
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
          <DataTable columns={columns} data={data?.banneds ?? []} 
          page={Number(page)} 
          limit={Number(limit)} 
          setPage={setPage} 
          totalPages={data?.totalPages || 0}
          total={data?.total || 0} />
        </Card>
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
