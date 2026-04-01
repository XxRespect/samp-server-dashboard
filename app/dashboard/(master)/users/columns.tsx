import { ColumnDef } from '@tanstack/react-table'
import { Players } from '@/app/modules/users/users.type'
import Image from 'next/image'
import Link from 'next/link'
import { formatTime } from '@/app/utils/datatime/datetime.formater'
import { DataTable } from './data-table'
import { Badge } from '@/components/ui/badge'


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
        accessorKey: "profile",
        header: "",
        cell: ({row}) => {
            const imageUrl = getValidImageUrl(row.getValue('profile'))
            return (
                <Image 
                    src={imageUrl} 
                    alt={row.original.Nome} 
                    width={50} 
                    height={50} 
                    className='rounded-full '
                    onError={(e) => {
                        e.currentTarget.src = '/default-avatar.png'
                    }}
                />
            )
        }
    },
    {
        accessorKey: "Nome",
        header: "Name",
        cell: ({row}) => {
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
                <div className="grid grid-cols-1">
                    <Link href={`/dashboard/users/${row.original.id}`}>
                        {row.getValue('Nome')}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                        <Badge className=' ' variant={badgeVariant}><p>{statusText}</p></Badge>
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "Score",
        header: "Score",
         cell: ({row}) => {
            return <div>{row.getValue('Score')}</div>
        }
    },
    {
        accessorKey: "user_register",
        header: "Joined",
        cell: ({row}) => {
            return <div>{formatTime(row.getValue('user_register'))}</div>
        }

    },
    {
        accessorKey: "timestamp",
        header: "last login",
         cell: ({row}) => {
            return <div>{formatTime(row.getValue('timestamp'))}</div>
        }
    },
    {
        accessorKey: "Online",
        header: "status",
         cell: ({row}) => {
            return <div><Badge className={row.getValue('Online') ? "bg-green-500 text-white" : "bg-gray-500 text-white"} variant={row.getValue('Online') ? "outline" : "ghost"}>
                {row.getValue('Online') ? 'Online' : 'Offline'}
            </Badge></div>
        }
    }

]

interface Props {
    players: Players[]
}

export default function PlayersDaTable({ players }: Props) {
    return <DataTable columns={columns} data={players} />
}