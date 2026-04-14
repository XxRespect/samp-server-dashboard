'use client'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useQueryState } from 'nuqs'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { getChatLog } from './chatlog.service'
import { DataTable } from "./data-table"
import { columns } from './columns'
import { Input } from '@/components/ui/input'
import { MessageSquare, Search, User } from 'lucide-react'

function ChatLogsContent() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  })

  const [message, setMessage] = useQueryState("message", {
    defaultValue: ""
  })

  const [page, setPage] = useQueryState("page", {
    defaultValue: "1"
  })

  const [searchInput, setSearchInput] = React.useState(search)
  const [messageInput, setMessageInput] = React.useState(message)

  const { data, isLoading } = useQuery({
    queryKey: ["ChatLogs", search, message, page],
    queryFn: () => getChatLog({
      search,
      message,
      page: parseInt(page, 10)
    }),
    retry: false
  })

  React.useEffect(() => {
    setSearchInput(search)
  }, [search])

  React.useEffect(() => {
    setMessageInput(message)
  }, [message])

  const handleSearch = () => {
    setSearch(searchInput)
    setMessage(messageInput)
    setPage("1")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
              <BreadcrumbPage>Chat Logs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='mx-5 mb-5 rounded-2xl border bg-card/80 p-4 shadow-sm'>
        <div className='flex flex-col gap-4 xl:flex-row xl:items-end'>
          <div className='grid flex-1 gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <p className='text-sm font-medium text-foreground'>Jogador</p>
              <div className='relative'>
                <User className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  placeholder='Pesquisar por nome do jogador ou ID da conta...'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className='h-11 rounded-xl border-border/70 bg-background pl-10 shadow-sm'
                />
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-sm font-medium text-foreground'>Mensagem</p>
              <div className='relative'>
                <MessageSquare className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  placeholder='Pesquisar por mensagem...'
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className='h-11 rounded-xl border-border/70 bg-background pl-10 shadow-sm'
                />
              </div>
            </div>
          </div>
          <Button
            onClick={handleSearch}
            className='h-11 rounded-xl px-5 shadow-sm'
          >
            <Search className='mr-2 size-4' />
            Buscar
          </Button>
        </div>
        <p className='mt-3 text-xs text-muted-foreground'>
          Pressione Enter em qualquer campo para aplicar os filtros.
        </p>
      </div>
      <div>
        <Suspense fallback={<p>Loading...</p>}>
          <DataTable columns={columns} data={data?.chatlogs ?? []}
            isLoading={isLoading}
            page={Number(page)}
            limit={data?.limit ?? 25}
            total={data?.total ?? 0}
            setPage={setPage}
          />
        </Suspense>
      </div>
    </>
  )
}

export default function ChatLogs() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatLogsContent />
    </Suspense>
  )
}
