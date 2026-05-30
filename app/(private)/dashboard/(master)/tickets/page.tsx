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
import { trpc } from '@/trpc/client'
import { useSession } from 'next-auth/react'


function SupportPage() {
  const { data: session, status } = useSession()
  const userId = Number(session?.user.id)

  const { data } = trpc.ticket.getTickets.useQuery(
    { userid: userId },
    {
      enabled: status === 'authenticated' && Number.isFinite(userId),
    },
  )

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Not authenticated</p>;
  }



 

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
