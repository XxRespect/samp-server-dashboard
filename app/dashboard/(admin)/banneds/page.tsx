'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import React from 'react'

import { DataTable } from './data-table'
import { useQuery } from '@tanstack/react-query'
import { columns } from './columns'
import getBanneds from '@/app/modules/banneds/banned.api'
import {Card } from '@/components/ui/card'

function Page() {

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['banneds'],
    queryFn: getBanneds,
  })

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
        <Card>
          <DataTable columns={columns} data={data?.banneds ?? []} />
        </Card>
      </div>
    </>
  )
}

export default Page
