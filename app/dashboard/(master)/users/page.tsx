'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import {useQuery } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'

import { Spinner } from '@/components/ui/spinner'

import { getPlayers } from '@/app/modules/users/users.api'


import { FaSearch } from "react-icons/fa";
import PlayersDaTable from './columns'
function Page() {

    const {data, isLoading,error} = useQuery({
        queryKey: ["players"],
        queryFn: getPlayers,
        retry: false,
    })


    if(isLoading) return <Spinner />


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
                        <BreadcrumbPage>Players</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div className='space-y-6 grid grid-cols-1'>
        <Card size='sm' className='shadow-indigo-200 m-6' >
            <CardHeader className='border-b'>
                <CardTitle>Players</CardTitle>
            </CardHeader>
            <CardDescription>
                <p>Manage and view all players in the system.</p>
            </CardDescription>
            <CardContent>
             <PlayersDaTable players={data?.users || []} />
            </CardContent>
        </Card>
        
     
        </div>
        </>
    )
}

export default Page