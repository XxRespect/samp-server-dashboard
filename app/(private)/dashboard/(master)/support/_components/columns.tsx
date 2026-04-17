import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '../_components/data-table'
import { TicketsTypes } from './tickets.type'
import {formatTime } from '@/utils/datatime/datetime.formater'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'



export const TicketsColumns: ColumnDef<TicketsTypes>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <span className='font-mono ml-auto align-left'>{row.original.id}</span>
    },
    {
        accessorKey: 'ticket_type',
        header: 'Assunto',
        cell: ({ row }) => {
            const type = row.original.ticket_type

            if(type === "report") {
                return (<>Denuncia</>)
            } else if(type === "ban_appeal") {
                return (<>Revisao de Banimento</>)
            } else if(type === "admin_report") {
                return (<>Denuncia contra Admin</>)
            }
            
        }
    },
    {
        accessorKey: 'author_name',
        header: 'Autor',
        cell: ({row}) => {
            const name = row.original.author_name
            return (
                <>
                <Link href={`/dashboard/users/${row.original.author_accid}`}><p className='text-blue-400 hover:underline text-shadow-2xs '>{name}</p></Link>
                </>
            )
        }
    },
    {
        accessorKey: 'against_name',
        header: 'Contra',
        cell: ({row}) => {
            const name = row.original.against_name
            if(!name) return <span className='text-gray-500 italic'>N/A</span>
            return (
                <>
                <Link  href={`/dashboard/users/${row.original.against_accid}`}><p className='text-blue-400 hover:underline text-shadow-2xs'>{name}</p></Link>
                </>
            )
        }
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status
            let color = 'default'
            if (status === 'open') color = 'outline'
            else if (status === 'closed') color = 'outline'
            else if (status === 'pending') color = 'outline'
            let statusText
            if(status === 'open') statusText = 'Aberto'
            else if(status === 'closed') statusText = 'Fechado'
            else if(status === 'pending') statusText = 'Pendente'

            return <Badge className={`font-bold text-sm ${status === 'open' ? 'bg-green-500' : status === 'closed' ? 'bg-red-300' : 'bg-yellow-300'}`} variant={color as 'default' | 'outline'}><span >{statusText}</span></Badge>
        }
    },
    {
        accessorKey: 'created_at',
        header: 'Created At',
        cell: ({ row }) => formatTime(row.original.created_at)
    },
    {
        accessorKey: 'updated_at',
        header: 'Updated At',
        cell: ({ row }) => formatTime(row.original.updated_at)
    }
]


interface Props {
    data?: TicketsTypes[]
    isLoading: boolean,
    isPending?: boolean
}

export function TicketsDataTable({data, isLoading, isPending}: Props) {
    return <DataTable columns={TicketsColumns} data={data ?? []} 
    isLoading={isLoading}
    isPending={isPending}
    />
}