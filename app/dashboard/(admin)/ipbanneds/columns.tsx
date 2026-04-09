import { ColumnDef } from "@tanstack/react-table";
import { IpBannedInterface } from "./ipbanned.types";
import { formatTime } from '@/app/utils/datatime/datetime.formater'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'


export const columns: ColumnDef<IpBannedInterface>[] = [
    {
        accessorKey: "IP",
        header: "IP",
    },
    {
        accessorKey: "playername",
        header: "Nick",
    },
    {
        accessorKey: "Reason",
        header: "Reason",
    },
    {
        accessorKey: "date",
        header: "date",
        cell: ({ row }) => {
            return (
                <>
                    <div>
                        {formatTime(row.original.date)}
                    </div>
                </>
            )
        }
    },
    {
        id: "actions",
        header: "actions",

        cell: ({ row }) => {
            return (
                <>
                    <div>
                        <Button variant ='destructive' className="hover:cursor-pointer hover:transition-all hover:shadow-lg hover:shadow-gray-500">
                        <Trash2 />
                    </Button>
                </div >
                </>
            )
        }
    }
]