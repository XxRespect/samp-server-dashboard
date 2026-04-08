import { BannedsProps } from '@/app/modules/banneds/banned.type'
import { formatTime } from '@/app/utils/datatime/datetime.formater'
import { ImBin } from "react-icons/im";
import { ColumnDef } from "@tanstack/react-table"
import { Button } from '@/components/ui/button';



/*************  ✨ Windsurf Command 🌟  *************/
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';

export const columns: ColumnDef<BannedsProps>[] = [

    {
        accessorKey: "Nick",
        id: "accid",
        header: "Nick",
        cell: ({ row }) => {
            return (
                <>
                    <div>
                        <Button variant='link'>
                            <Link href={`/dashboard/users/${row.original.accid}`}><p className='text-shadow-lg/30'>{row.original.Nick}</p></Link>
                        </Button>

                    </div>
                </>
            )
        }
    },
    {
        accessorKey: "adm",
        id: "adm",
        header: "Admin",
        cell: ({ row }) => {
            return (
                <>
                    <div>
                        <Button variant='link'>
                            <Link href={`/dashboard/users/${row.original.adminid}`}>{row.original.adm}</Link>
                        </Button>

                    </div>
                </>
            )
        }
    },
    {
        accessorKey: "motivo",
        header: "Reason"
    },
    {
        accessorKey: "data",
        header: "Data",
        cell: ({ row }) => {
            return <div>{formatTime(row.getValue('data'))}</div>
        }
    },
    {
        accessorKey: "desban",
        header: "Type",
        cell: ({ row }) => {
            return <div>{Number(row.getValue('desban')) > 0 ? 'Temporary' : 'Permanent'}</div>
        },
    },
    {
        accessorKey: "banid",
        id: "actions",
        header: "",
        cell: () => {
            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className='hover:cursor-pointer hover:transition-all hover:scale-120'
                                variant="destructive"
                                size="icon"
                            >
                                <ImBin />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                            >
                                Ban actions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Unban Player</DropdownMenuItem>
                            <DropdownMenuItem>Unban Ip</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    }
] 
