'use client'

import React, { Suspense } from 'react'
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


import { getPlayers } from '@/modules/users/users.api'
import { columns } from './columns'
import { useQuery } from '@tanstack/react-query'
import { DataTable } from './data-table'
import { useQueryState } from 'nuqs'


function UsersPageContent() {

    const [search, setSearch] = useQueryState('search', {
        defaultValue: ""
    })
    const [page, setPage] = useQueryState('page', {
        defaultValue: "1"
    })
    const [limit, setLimit] = useQueryState('limit', {
        defaultValue: "25"
    })
    const [sortBy, setSortBy] = useQueryState('sortBy', {
        defaultValue: 'id'
    })
    const [order, setOrder] = useQueryState('order', {
        defaultValue: 'desc'
    })


    const { data, isLoading, isPending, isError, error } = useQuery({
        queryKey: ['players', page, limit, search, sortBy, order],
        queryFn: () => getPlayers({
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 25,
            search: search,
            sortBy: sortBy,
            order: order
        }),
    })



    const handleSearch = (value: string) => {
        setSearch(value)
        setPage("1")
    }

    const handlePageChange = (newPage: number) => {
        if (newPage < 1) return
        setPage(newPage.toString())
    }



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
                        <CardTitle><p className='text-lg font-bold text-shadow-lg text-shadow-sky-300/10'>Players</p></CardTitle>
                    </CardHeader>
                    <CardDescription>
                        <p className='text-muted-foreground ml-3'>
                            Manage and view all players in the system.
                        </p>
                    </CardDescription>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={data?.users || []}
                            search={search}
                            onSearch={handleSearch}
                            page={parseInt(page)}
                            onPageChange={handlePageChange}
                            hasNextPage={(data?.users?.length || 0) >= 20}
                            isLoading={isPending}
                        />
                    </CardContent>
                </Card>


            </div>
        </>
    )
}

export default function UsersPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UsersPageContent />
        </Suspense>
    )
}