import { ColumnDef } from '@tanstack/react-table'
import { Players } from '@/app/modules/users/users.type'
import Image from 'next/image'
import Link from 'next/link'
import { formatTime } from '@/app/utils/datatime/datetime.formater'
import { DataTable } from './data-table'
import { Badge } from '@/components/ui/badge'
import { convertTimestampToDate } from '@/app/utils/datatime/timestamp.converter'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const getValidImageUrl = (url: string | null | undefined): string => {
    if (!url) return '/default-avatar.png'

    // Se já é URL absoluta, retorna
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
    }

    // Se é caminho relativo sem slash, adiciona
    if (!url.startsWith('/')) {
        return `/${url}`
    }

    return url
}



const columns: ColumnDef<Players>[] = [

    {
        accessorKey: "id",
        id: "id",
        header: ({ column }) => {
            return (
                <div className="flex items-center gap-2">
                    <span onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>ID</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            return <div>{row.getValue('id')}</div>
        }
    },
    {
        accessorKey: "profile",
        header: "",
        cell: ({ row }) => {
            const imageUrl = getValidImageUrl(row.getValue('profile'))
            return (
                <Image
                    src={imageUrl}
                    alt={row.original.Nome}
                    width={50}
                    height={50}
                    className="rounded-full object-cover w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                    onError={(e) => {
                        e.currentTarget.src = '/default-avatar.png'
                    }}
                />
            )
        }
    },
    {
        accessorKey: "Nome",
        id: "Nome",
        header: ({ column }) => {
            return (
                <div className="flex items-center gap-2">
                    <span onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Name</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            const isBanned = row.original.BANNED > 0;
            const isAdminTemp = row.original.ADMIN_TEMP > 0;
            const isAdmin = row.original.Admin > 0;

            let statusText = "Jogador";
            let badgeVariant: "outline" | "success" | "destructive" = "outline";

            if (isBanned) {
                statusText = "Banido";
                badgeVariant = "destructive";
            } else if (isAdminTemp) {
                statusText = "Admin Temp";
                badgeVariant = "outline";
            } else if (isAdmin) {
                statusText = "Admin";
                badgeVariant = "outline";
            }

            return (
                <div className="grid grid-cols-1  className='shadow-lg shadow-gray-300/6'">
                    <Link href={`/dashboard/users/${row.original.id}`}>
                        {row.getValue('Nome')}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                        <Badge className='shadow-lg shadow-gray-300/7' variant={badgeVariant}><p className={statusText == "Banido" ? "text-white" : ""}>{statusText}</p></Badge>
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "Score",
        id: "Score",
        header: ({ column }) => {
            return (
                <div className="flex items-center gap-2">
                    <span onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Score</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            return <div>{row.getValue('Score')}</div>
        }
    },
    {
        accessorKey: "user_register",
        header: ({ column }) => {
            return (
                <div className="flex items-center gap-2">
                    <span onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Joined</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            return <div>{formatTime(row.getValue('user_register'))}</div>
        }

    },
    {
        accessorKey: "LasTimer",
        header: ({ column }) => {
            return (
                <div className="flex items-center gap-2">
                    <span onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Logoff</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            return <div>{convertTimestampToDate(row.getValue('LasTimer'), -3)}</div>
        }
    },
    {
        accessorKey: "Online",
        header: ({ column }) => {
            return (
                <div className="flex items-center gap-2">
                    <span onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Status</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            return <div><Badge className={row.getValue('Online') ? "bg-green-500 text-white" : "bg-gray-500 text-white"} variant={row.getValue('Online') ? "outline" : "ghost"}>
                {row.getValue('Online') ? 'Online' : 'Offline'}
            </Badge></div>
        }
    }

]

interface Props {
    players: Players[]
    search: string
    onSearch: (value: string) => void
    page: number
    onPageChange: (page: number) => void
    hasNextPage: boolean
}

export default function PlayersDaTable({ players, search, onSearch, page, onPageChange, hasNextPage }: Props) {
    return (
        <DataTable
            columns={columns}
            data={players}
            search={search}
            onSearch={onSearch}
            page={page}
            onPageChange={onPageChange}
            hasNextPage={hasNextPage}
        />
    )
}