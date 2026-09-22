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
import { columns, TicketsDataTable } from './columns'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ArrowDown } from 'lucide-react'


export default function Page() {
  const { status } = useSession()

  const { data, isLoading } = trpc.ticket.getAllTickets.useQuery(
    {},
    {
      enabled: status === 'authenticated',
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  )



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

        <div className='grid grid-cols-3'>
          <div className="bg-primary-foreground h-14">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-primary-foreground m-3 p-4 text-xl cursor-pointer" variant="outline">Todos < ArrowDown className="ml-2 h-4 w-4" /></Button>
                
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup className='hover:bg-primary-foreground cursor-pointer'>
                  <DropdownMenuLabel className='hover:cursor-pointer' ><p>Tickets</p></DropdownMenuLabel>
                  <DropdownMenuItem className='hover:cursor-pointer'><p>Abertos</p></DropdownMenuItem>
                  <DropdownMenuItem className='hover:cursor-pointer'><p>Aceitos</p></DropdownMenuItem>
                  <DropdownMenuItem className='hover:cursor-pointer'><p>Recusados</p></DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="bg-primary-foreground"></div>
          <div className="bg-primary-foreground"></div>
        </div>

        <div className='m-6'>
          <TicketsDataTable data={data ?? []} />
        </div>
      </div>
    </>
  )
}

