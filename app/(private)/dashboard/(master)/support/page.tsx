'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
}from '@/components/ui/breadcrumb'


import { trpc } from '@/utils/trpc'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Gavel, Flag, Shield, MessageSquare } from 'lucide-react'
import { TicketsDataTable } from './_components/columns'
import Link from 'next/link'


function SupportPage() {
  const { data: session } = useSession()

  const { data, isLoading, isPending } = useQuery({
    queryKey: ['userTickets', session?.user.id],
    queryFn: () => trpc.getUserTickets.getTickets.query({
      userid: Number(session?.user.id)
    }),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    gcTime: Infinity,
    retry: false,
    enabled: !!session?.user.id
  })




  return (
    <div className='min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 pb-20'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Breadcrumb */}
        <div className='pt-6 pb-8 m-4'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Suporte</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Título Principal */}
        <div className='mb-16'>
          <h1 className='text-5xl font-bold text-white mb-2'>Área de Suporte</h1>
          <p className='text-gray-400 text-lg'>Escolha uma opção para resolver seu problema</p>
        </div>

        {/* Grid com 4 colunas */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          
          {/* Suporte Geral */}
          <Card className='bg-linear-to-br from-blue-900/40 to-blue-950/40 border border-blue-800/50 hover:border-blue-700/80 transition-all duration-300 overflow-hidden group 
          hover:shadow-lg hover:shadow-red-500'>
            <div className='h-1 bg-linear-to-r from-blue-500 to-blue-600' />
            <div className='p-6 flex flex-col h-full'>
              <div className='w-14 h-14 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <MessageSquare className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-2'>Suporte Geral</h3>
              <p className='text-gray-400 text-sm mb-6 grow'>Dúvidas gerais sobre sua conta e servidor</p>
              <Button className='hover:cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors'>
                Abrir Ticket
              </Button>
            </div>
          </Card>

          {/* Revisão de Ban */}
          <Card className='bg-linear-to-br from-red-900/40 to-red-950/40 border border-red-800/50 hover:border-red-700/80 transition-all duration-300 overflow-hidden group  hover:shadow-lg hover:shadow-red-500/20'>
            <div className='h-1 bg-linear-to-r from-red-500 to-red-600' />
            <div className='p-6 flex flex-col h-full'>
              <div className='w-14 h-14 bg-linear-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <Gavel className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-2'>Revisão de Ban</h3>
              <p className='text-gray-400 text-sm mb-6 grow'>Apele de uma banição em sua conta</p>
              <Button className='hover:cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors'>
                <Link href='/dashboard/support/ban-appeal'>Apelar ban</Link>
              </Button>
            </div>
          </Card>

          {/* Denunciar Player */}
          <Card className='bg-linear-to-br from-yellow-900/40 to-yellow-950/40 border border-yellow-800/50 hover:border-yellow-700/80 transition-all duration-300 overflow-hidden group  hover:shadow-lg hover:shadow-yellow-500/20'>
            <div className='h-1 bg-linear-to-r from-yellow-500 to-yellow-600' />
            <div className='p-6 flex flex-col h-full'>
              <div className='w-14 h-14 bg-linear-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <Flag className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-2'>Denunciar Player</h3>
              <p className='text-gray-400 text-sm mb-6 grow'>Reportar um jogador ou admin</p>
              <Button className='hover:cursor-pointer w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-lg transition-colors'>
                Fazer Denúncia
              </Button>
            </div>
          </Card>

          {/* Revisão de IP */}
          <Card className='bg-linear-to-br from-purple-900/40 to-purple-950/40 border border-purple-800/50 hover:border-purple-700/80 transition-all duration-300 overflow-hidden group  hover:shadow-lg hover:shadow-purple-500/20'>
            <div className='h-1 bg-linear-to-r from-purple-500 to-purple-600' />
            <div className='p-6 flex flex-col h-full'>
              <div className='w-14 h-14 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <Shield className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-2'>Revisão de IP</h3>
              <p className='text-gray-400 text-sm mb-6 grow'>Solicitar revisão de restrição de IP</p>
              <Button className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors'>
                Solicitar Revisão
              </Button>
            </div>
          </Card>

        </div>

        {/* Tickets Recentes */}
        <div>
          <h2 className='text-3xl font-bold text-white mb-3 mt-3'>Seus Tickets Recentes</h2>
          <Card className='bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl overflow-hidden'>
            <div className='p-8'>
              <div className='text-center py-12'>
                <h1 className='text-2xl font-bold text-white mb-4 text-center'>Tickets</h1>
  
                <div>
                  <TicketsDataTable data={data}
                  isLoading={isLoading} 
                  isPending={isPending}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default SupportPage