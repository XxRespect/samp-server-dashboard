
'use client'


import { PlayersChart } from "@/components/appBarChat";
import { ServerActivityChart } from "@/components/AppAreaChart"
import ChartPieDonutText from "@/components/AppPieChart";
import CardList from "@/components/CardList"
import ServerCards from "@/components/ServerCards";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useSession } from 'next-auth/react'
import { Users, Shield, Ban } from 'lucide-react'
import { getData } from '@/app/modules/home/assets/service'
import { useQuery } from '@tanstack/react-query'


export default function DashboardPage() {

    const { data, isError, isLoading } = useQuery({
        queryKey: ["data"],
        queryFn: getData,
        retry: false
    })

    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 m-4'>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 m-3 lg:col-span-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total de Contas</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{new Intl.NumberFormat('pt-BR').format(data?.totalPlayers || 0)}</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% em relação ao mês passado
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Clans</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{new Intl.NumberFormat('pt-BR').format(data?.totalClans || 0)}</div>
                            <p className="text-xs text-muted-foreground">
                                +5 novos clans este mês
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total de Banidos</CardTitle>
                            <Ban className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{new Intl.NumberFormat('pt-BR').format(data?.totalBanned || 0)}</div>
                            <p className="text-xs text-muted-foreground">
                                -12% em relação ao mês passado
                            </p>
                        </CardContent>
                    </Card>
                </div>
           <div className="bg-primary-foreground p-4 rounded-lg m-3 lg:col-span-2"><PlayersChart /> </div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3"><ChartPieDonutText /></div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3"><CardList title="Raking" /></div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3 lg:col-span-2 xl:col-span-1 2xl:col-span-2"><ServerActivityChart />
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <h1>Popular Players</h1>
                            </CardTitle>
                        </CardHeader>
                        <CardDescription>
                            <Avatar>

                            </Avatar>
                        </CardDescription>
                    </Card>

                </div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3"><CardList title="High Score" /></div>
            </div>

        </>
    )
}
