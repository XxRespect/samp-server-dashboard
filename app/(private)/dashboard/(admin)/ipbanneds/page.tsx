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

  const handleKeyPress = (e: React.KeyboardEvent) => {
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
        <div className='w-120 m-5 grid grid-cols-2'>
          <Input
            type="text"
            placeholder="Search IP"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="ml-3 hover:cursor-pointer">
            <Button variant='outline' onClick={handleSearch}>
              Search
            </Button>
          </div>
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
