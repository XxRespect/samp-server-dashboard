'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
}
  from '@/components/ui/breadcrumb'
import { trpc } from '@/utils/trpc'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

function SupportPage() {


  const { data: session } = useSession()

  
  const { data } = useQuery({
    queryKey: ['userTickets', session?.user.id],
    queryFn: () => trpc.getUserTickets.getTickets.query({
      userid: Number(session?.user.id)
    }),
    enabled: !!session?.user.id
  })
 

  console.log(data)

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
              <BreadcrumbPage>Tickets</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className='grid grid-cols-3 gap-2'>
          <div className="bg-primary-foreground h-14"> </div>
          <div className="bg-primary-foreground"></div>
          <div className="bg-primary-foreground"></div>
        </div>

        
      </div>
    </>
  )
}

export default SupportPage