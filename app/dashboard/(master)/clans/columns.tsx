"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ClansInterface } from "./clans.type"
import Link from "next/link"
import { convertTimestampToDate } from '@/app/utils/datatime/timestamp.converter'
import { Button } from '@/components/ui/button'


export const columns: ColumnDef<ClansInterface>[] = [
  {
    accessorKey: "CLAN_NAME",
    header: "Clan/Tag",
    cell: ({row}) => {
      return (
        <div className='grid grid-cols-1'>
          <span>
            <Button variant='link' asChild>
              <Link href={`/dashboard/clans/${row.original.CLAN_ID}`}>
                {row.original.CLAN_NAME}
              </Link>
            </Button>
          </span>
          <span className='ml-3'>{row.original.CLAN_TAG}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "CLAN_WHEN",
    header: "Created at",
    cell: ({row}) => {
      return (<div>{convertTimestampToDate(row.original.CLAN_WHEN)}</div>)
    }
  },
  {
    accessorKey: "CLAN_ZONES",
    header: "Points",
  },
  {
    accessorKey: "clanMembers",
    header: "Members",
    cell: ({row}) => {
      return (<div>{row.original.clanMembers}</div>)
    }
  },
  
]
