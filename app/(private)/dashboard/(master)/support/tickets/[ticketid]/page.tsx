'use client'
import { useParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent
} from '@/components/ui/card'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage
} from '@/components/ui/breadcrumb'

import {
    Separator
} from '@/components/ui/separator'


import { trpc } from '@/utils/trpc'
import { useQuery } from '@tanstack/react-query'
import { formatTime } from '@/utils/datatime/datetime.formater'
import Link from 'next/link'

export default function TicketIDPage() {
    const { ticketid } = useParams()

    const { data, isLoading } = useQuery({
        queryKey: ['ticket', ticketid],
        queryFn: () => trpc.ticketIdRouter.getTicketById.query({ ticketid: Number(ticketid) })
    })

    console.log(data)
    if (isLoading) {
        return <div>Carregando...</div>
    }

    // Mock data - substituir com dados reais da API
    const messages = [
        {
            id: 1,
            author: 'biel_hack',
            role: 'Jogador',
            timestamp: '14/04/2026 15:10',
            message: 'fui banido porque dei uma bala só de sniper na cabeça',
            avatar: 'BH'
        },
        {
            id: 2,
            author: 'biel_hack',
            role: 'Jogador',
            timestamp: '14/04/2026 15:10',
            message: 'Essa já e a 7 conta que perco sem eu usar nd',
            avatar: 'BH'
        },
        {
            id: 3,
            author: '[STT]Oughtérard',
            role: 'Supervisor',
            timestamp: '14/04/2026 15:15',
            message: 'https://streamable.com/etn3de',
            avatar: 'SO'
        },
        {
            id: 4,
            author: '[STT]Oughtérard',
            role: 'Supervisor',
            timestamp: '14/04/2026 19:10',
            message: 'Segunda chance concedida após lamentações no canal de ajuda',
            avatar: 'SO'
        }
    ]


    let RevisionType: string = "Unknown"
    if (data?.ticket.type === "report") {
        RevisionType = "Denúncia"
    } else if (data?.ticket.type === "ban_appeal") {
        RevisionType = "Revisão de Banimento"
    } else if (data?.ticket.type === "admin_report") {
        RevisionType = "Denúncia contra Admin"
    } else if (data?.ticket.type === "other") {
        RevisionType = "IP Revision"
    }

    const status = data?.ticket.status
    let color = 'default'
    if (status === 'open') color = 'outline'
    else if (status === 'closed') color = 'outline'
    else if (status === "denied") color = 'outline'

    let statusPT: string = ""
    if(status === "accepted") statusPT = "Aceito"
    else if(status === "denied") statusPT = "Recusado"

    return (
        <>
            <div className='px-4 pb-8 pt-6 sm:px-6 lg:px-8 m-6'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Suporte</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Ticket</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{RevisionType}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className='w-full px-4 pb-10 sm:px-6 lg:px-8'>
                <div className='flex gap-6 items-start'>
                    <aside className='w-80 shrink-0 mt-7'>
                        <Card className='w-full bg-primary-foreground shadow-lg shadow-gray-400/20 sticky top-4'>
                            <CardContent className='pt-6'>
                                <div className='space-y-4 text-sm'>
                                    <div>
                                        <span className='text-xs text-muted-foreground'>Tipo</span>
                                        <p className='font-medium'>{RevisionType}
                                        </p>
                                    </div>
                                    <Separator />

                                    <div>
                                        <span className='text-xs text-muted-foreground'>Autor</span>
                                        <Link href={`/dashboard/users/${data?.ticket.author_accid}`}><p className='text-blue-400 hover:underline text-shadow-2xs '>{data?.ticket.author}</p></Link> 
                                    </div>
                                    <Separator />

                                    <div>
                                        <span className='text-xs text-muted-foreground'>Contra</span> <br />
                                        <Link href={`/dashboard/users/${data?.ticket.against_accid}`}><p className='text-blue-400 hover:underline text-shadow-2xs '>{data?.ticket.against}</p></Link> 
                                    </div>
                                    <Separator />

                                    <div>
                                        <span className='text-xs text-muted-foreground'>Status</span>
                                        <div className='mt-2'>
                                            <Badge className={`font-bold text-sm ${status === 'open' ? 'bg-green-500' : status === 'closed' ? 'bg-gray-500' : 'bg-yellow-300'}`} variant={color as 'default' | 'outline'}><span >{statusPT}</span></Badge>
                                        </div>
                                    </div>
                                    <Separator />

                                    <div>
                                        <span className='text-xs text-muted-foreground'>Data de criação</span>
                                        <p className='font-medium'>{formatTime(data?.ticket.created_at)}</p>
                                    </div>
                                    <Separator />

                                    <div>
                                        {data?.ticket.type === "ban_appeal" ? (
                                            <>
                                                <span className='text-xs text-muted-foreground'>Informação adicional</span>
                                                <div className='mt-2 space-y-1'>
                                                    <p className='font-medium text-xs'>Banimento {data?.banInfo?.ban ? "Temporario" : "Permanente"}</p>
                                                    <p className='text-xs'>Motivo: {String(data?.banInfo?.motivo)}</p>
                                                    <p className='text-xs'>Admin: {String(data?.banInfo?.adm)}</p>
                                                    <p className='text-xs'>Data: {formatTime(data?.banInfo?.data)}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <><span className='text-xs text-muted-foreground'>Informação adicional</span></>
                                        )}

                                    </div>
                                </div>
                            </CardContent>

                        </Card>
                    </aside>

                    <section className='flex-1 min-w-0 mt-7'>
                        <p>Ultima atualizacao: {formatTime(data?.ticket.updated_at)}</p>
                        <div className='rounded-xl bg-primary-foreground p-6 shadow-lg shadow-gray-400/10'>
                            <div className='space-y-6'>
                                {messages.map((msg) => (
                                    <div key={msg.id} className='flex gap-4'>
                                        <Avatar className='h-10 w-10 shrink-0'>
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.author}`} />
                                            <AvatarFallback>{msg.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div className='min-w-0 flex-1'>
                                            <div className='flex items-center gap-2'>
                                                <span className='font-medium text-blue-400'>{msg.author}</span>
                                                <Badge variant='secondary' className='text-xs'>
                                                    {msg.role}
                                                </Badge>
                                                <span className='text-xs text-muted-foreground'>{msg.timestamp}</span>
                                            </div>
                                            <p className='mt-2 text-sm text-foreground'>{msg.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
