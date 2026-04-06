'use client'

import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { useQuery } from '@tanstack/react-query'
import {
  ShieldBan,
  PaintBucket,
  AlertCircleIcon
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent
} from "@/components/ui/card"
import { Spinner } from '@/components/ui/spinner'
import { ChartTooltipIcons } from './clan-charts'

import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Alert,
  AlertTitle,
} from '@/components/ui/alert'


/*SERVICES + BACKEND */
import { getClan } from './clan.service'
import { useParams } from 'next/navigation'
import { convertTimestampToDate } from '@/app/utils/datatime/timestamp.converter'



function ClanPage() {

  const params = useParams<{ clanid: string }>()
  const clanid = Number(params.clanid);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["clanid", clanid],
    queryFn: () => getClan(clanid),
    enabled: Number.isFinite(clanid),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
  })

  if (isLoading) return <>
    <Spinner className='size-8' />
  </>
  if (isError) return <><Alert variant="destructive"><AlertCircleIcon className="h-4 w-4" aria-hidden="true" />
    <AlertTitle>Error</AlertTitle>
  </Alert></>

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
              <BreadcrumbLink href="/dashboard/clans">Clans</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.CLAN_NAME}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='m-4 grid grid-cols-1 gap-3 xl:grid-cols-2'>
        <div className='w-full'>
          <Card className='h-full w-full shadow-lg shadow-gray-400/30'>
            <CardHeader>
              <CardTitle>
                <h1 style={{ color: `#${data?.CLAN_COLOR}`, fontSize: '1.5rem', textShadow: `1px 1px 2px #${data?.CLAN_COLOR}` }}> <ShieldBan className='inline' /> {data?.CLAN_NAME}</h1>
                <Badge variant="secondary">{data?.CLAN_TAG}</Badge>
              </CardTitle>
              <CardDescription>
                Clan information
              </CardDescription>
              <Separator />
              <CardContent className='grid grid-cols-2 gap-2'>
                <span>Name:</span>
                <span>{data?.CLAN_NAME}</span>

                <span>Tag:</span>
                <span ><Badge variant="secondary">{data?.CLAN_TAG}</Badge></span>

                <span>Clan Color:</span>
                <span><PaintBucket style={{ backgroundColor: `#${data?.CLAN_COLOR}`, borderRadius: '50%', padding: `4px` }} /></span>

                <span>Clan Zone points:</span>
                <span>{data?.CLAN_ZONES}</span>


                <span>Clan Members:</span>
                <span>{data?.clanMembers}</span>

                <span>Clan Level:</span>
                <span>{data?.CLAN_LEVEL ?? 0}</span>


              </CardContent>

            </CardHeader>
            <CardFooter>
              <p className='text-muted-foreground'>Created at {convertTimestampToDate(data?.CLAN_WHEN)}</p>
            </CardFooter>
          </Card>

        </div>
        <div className="w-full">
          <ChartTooltipIcons />
        </div>
        <div className='xl:col-span-2 bg-primary-foreground'>

        </div>
      </div>
    </>
  )
}

export default ClanPage
