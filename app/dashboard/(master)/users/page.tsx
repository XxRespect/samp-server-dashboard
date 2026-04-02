'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { Spinner } from '@/components/ui/spinner'

import PlayersDaTable from './columns'
import { usePlayers } from '@/app/hooks/useUsers'

function UsersPageContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const initialSearch = searchParams.get('id') || searchParams.get('search') || ""
    const initialPage = Number(searchParams.get('page') || '1')

    const [search, setSearch] = React.useState<string>(initialSearch)
    const [page, setPage] = React.useState<number>(initialPage)

    const { data, isLoading, isError, error } = usePlayers({
        page,
        limit: 20,
        search,
        sortBy: "Online",
        order: "desc"
    })

    const updateUrlQuery = (newSearch: string, newPage: number) => {
      const params = new URLSearchParams()
      if (newSearch) params.set('search', newSearch)
      if (newPage > 1) params.set('page', String(newPage))
      router.replace(`/dashboard/users?${params.toString()}`)
    }

    const handleSearch = (value: string) => {
      setSearch(value)
      setPage(1)
      updateUrlQuery(value, 1)
    }

    const handlePageChange = (newPage: number) => {
      if (newPage < 1) return
      setPage(newPage)
      updateUrlQuery(search, newPage)
    }

    
    if (isLoading) return <Spinner />

    if (isError) return <div>Error: {(error as Error).message}</div>


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
                        <BreadcrumbPage><p>Players</p></BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div className='space-y-6 grid grid-cols-1'>
        <Card size='sm' className=' shadow-lg shadow-gray-300/20 m-6' >
            <CardHeader className='border-b'>
                <CardTitle><p className='text-lg font-bold text-shadow-lg text-shadow-sky-300/25'>Players</p></CardTitle>
            </CardHeader>
            <CardDescription>
                <p className='text-muted-foreground ml-3'>
                    Manage and view all players in the system.
                </p>
            </CardDescription>
            <CardContent>
             <PlayersDaTable
               players={data?.users || []}
               search={search}
               onSearch={handleSearch}
               page={page}
               onPageChange={handlePageChange}
               hasNextPage={(data?.users?.length || 0) >= 20}
             />
            </CardContent>
        </Card>
        
     
        </div>
        </>
    )
}

export default function Page() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <UsersPageContent />
    </React.Suspense>
  )
}
