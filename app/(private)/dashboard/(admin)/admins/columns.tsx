"use client"

import { createColumnHelper } from "@/lib/table"
import { features } from "./data-table-features"
import { AdminsInterface } from "./admins.types"
// This type is used to define the shape of our data.
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { convertTimestampToDate } from '@/utils/datatime/timestamp.converter'
import { UserRoundPen } from 'lucide-react';


const columnHelper = createColumnHelper<typeof features, AdminsInterface>()

export const columns = columnHelper.columns([
    {
        accessorKey: "Nome",
        header: "Admin",
        cell: ({ row }) => {
            return (
                <div>
                    <Button variant='link'>
                        <Link href={`/dashboard/users/${row.original.id}`}><p className='text-shadow-lg/30'>{row.original.Nome}</p></Link>
                    </Button>
                </div>)
        }
    },
    {
        accessorKey: "Admin",
        header: "Level",
    },
    {
        accessorKey: "ADMIN_TEMP",
        header: "Time",
        cell: ({ row }) => {
            return (
                <>
                    {row.original.ADMIN_TEMP == 0 ? 'Permanent' : convertTimestampToDate(row.original.ADMIN_TEMP)}
                </>
            )
        }
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "LasTimer",
        header: "Logoff",
        cell: ({ row }) => {
            return (
                <>
                    {row.original.LasTimer == 0 ? 'Never' : convertTimestampToDate(row.original.LasTimer)}
                </>
            )
        }
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
            return (
                <>
                    <Button variant='outline' className="hover:cursor-pointer hover:transition-all">

                        <UserRoundPen className="mr-2 h-4 w-4" />
                    </Button>

                </>
            )
        }
    },
])