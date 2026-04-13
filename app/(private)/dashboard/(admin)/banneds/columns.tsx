import { BannedsProps } from '@/modules/banneds/banned.type'
import { formatTime } from '@/utils/datatime/datetime.formater'
import { ImBin } from "react-icons/im";
import { ColumnDef } from "@tanstack/react-table"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,

} from "@/components/ui/dialog"

import Form from 'next/form'



export const columns: ColumnDef<BannedsProps>[] = [

    {
        accessorKey: "Nick",
        id: "accid",
        header: "Nick",
        cell: ({ row }) => {
            return (
                <>
                    <div>
                        <Button asChild variant='link'>
                            <Link href={`/dashboard/users/${row.original.accid}`}>
                                <p className='text-shadow-lg/30'>{row.original.Nick}</p>
                            </Link>
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
                        <Button asChild variant='link'>
                            <Link href={`/dashboard/users/${row.original.adminid}`}>
                                {row.original.adm}
                            </Link>
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
        header: "Action",
        cell: ({ row }) => {
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            className='hover:cursor-pointer hover:transition-all hover:scale-120'
                            variant="destructive"
                            size="icon"
                        >
                            <ImBin />
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Desbanir Jogador</DialogTitle>
                            <DialogDescription>
                                <p className='text-white'>Tem certeza que deseja desbanir este jogador?<br /></p>
                                <span className='font-bold'>{row.original.Nick}</span>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    variant="destructive"
                                    className='hover:cursor-pointer hover:shadow-lg hover:shadow-grey-500/15 hover:transition-all'
                                >
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button
                                variant="secondary"
                                className='hover:cursor-pointer hover:shadow-lg hover:shadow-grey-500/15 hover:transition-all'
                            >
                                Desbanir
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
        },
    }
] 
