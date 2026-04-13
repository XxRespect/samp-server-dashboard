
'use client'

import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


import { useQuery } from '@tanstack/react-query'
import { getAdmins } from './admins.service'
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'


function AdminsPage() {
      const { isLoading, data }  = useQuery({
      queryKey: ["Admins"],
      queryFn: () => getAdmins(),
      retry: false
    })

    const {data: session} = useSession()
    if(!session || session?.user?.Admin === 0 || session?.user?.role == "user" || session?.user?.role == "mod") {
      redirect('/dashboard')
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
              <BreadcrumbPage>Admins</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='m-8'>
        <div className='m-4'>
        </div>
          <DataTawwwble data={data?.admins ?? []} 
          columns={columns}
           isLoading={isLoading}
           totalAdmins={data?.totalAdmins ?? 0}
           />
      </div>
    </>
  )
}

export default AdminsPage
