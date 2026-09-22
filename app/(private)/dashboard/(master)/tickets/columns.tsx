"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./data-table-features"
import { TicketTypes } from './types'
import Link from 'next/link'
import { DataTable } from "./data-table"
import { Badge } from "@/components/ui/badge"
import { formatTime } from '@/utils/datatime/datetime.formater'
import { trpc } from '@/trpc/client'


// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, TicketTypes>()



function formatTicketType(ticketType: string): string {
  switch (ticketType) {
    case 'admin_report':
      return 'Denuncia contra Admin'
    case 'ban_appeal':
      return 'Revisao de banimento'
    case 'ip_appeal':
      return 'Revisao de IP'
    case 'Report':
      return 'Denuncia contra jogador'
    default:
      return ticketType
  }
}


function formatTicketStatus(ticketStatus: string | null): string {
  if (!ticketStatus) {
    return '—'
  }

  switch (ticketStatus) {
    case 'open':
      return 'Aberto'
    case 'closed':
      return 'Fechado'
    case 'accepted':
      return 'Aceito'
    case 'denied':
      return 'Recusado'
    default:
      return ticketStatus
  }
}


function formatTicketStatusBadge(ticketStatus: string | null) {
  if (!ticketStatus) {
    return <Badge variant="secondary">—</Badge>
  }

  switch (ticketStatus) {
    case 'open':
      return <Badge variant="secondary">Aberto</Badge>
    case 'closed':
      return <Badge variant="secondary">Fechado</Badge>
    case 'accepted':
      return <Badge variant="secondary">Aceito</Badge>
    case 'denied':
      return <Badge variant="secondary">Recusado</Badge>
    default:
      return ticketStatus
  }
}
    

export const columns = columnHelper.columns([
  columnHelper.accessor('ticketid', {
    header: 'ID',
    cell: ({ row }) => (
      <span className="font-medium">{row.original.ticketid}</span>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ row }) => (
      <span className="font-medium">{formatTicketStatusBadge(row.original.status)}</span>
    ),
  }),
  columnHelper.accessor('author', {
    header: 'Ticket/Author',
    cell: ({ row }) => 
      (


        
      <div className="grid gap-1">
        <span className="font-medium"><Link href={`/dashboard/support/tickets/${row.getValue("ticketid")}`}><p>{formatTicketType(row.original.ticket_type)}</p></Link></span>
        <span className="font-medium to-blue-600 "><Link href={`/dashboard/users/${row.original.author_accid}`}>{row.original.author}</Link></span>
      </div>
    ),
  }),
  columnHelper.accessor('against_name', {
    header: 'Contra',
    cell: ({ row }) => (
      <span className="font-medium"><Link href={`/dashboard/users/${row.original.against_accid}`}>{row.original.against_name ?? '—'}</Link></span>
    ),
  }),
  columnHelper.accessor("updatedAt", {
    header: "Ultima atualizacao",
  cell: ({row}) => {
    return (
      <span className="font-medium">{formatTime(row.original.updatedAt)}</span>
    )
  }

})
])


interface Props {
  data: TicketTypes[]
  isLoading?: boolean
}

export function TicketsDataTable({ data, isLoading }: Props) {
  return (
    <DataTable columns={columns} data={data} isLoading={isLoading} />
  )
}


