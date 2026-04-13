'use client'

import { useQuery } from '@tanstack/react-query'
import { Activity, Ban, Flame, Shield, Trophy, Users } from 'lucide-react'

import { PlayersChart } from "@/components/appBarChat"
import ChartPieDonutText from "@/components/AppPieChart"
import CardList from "@/components/CardList"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Spinner } from '@/components/ui/spinner'
import TopPlayersTable from '../dashboard/_components/columns'
import { getData } from '@/modules/assets/service'

export default function DashboardPage() {
    const { data, isLoading } = useQuery({
        queryKey: ["data"],
        queryFn: getData,
        retry: false
    })

    const topScorePlayers = data?.topScorePlayers || []
    const leader = topScorePlayers[0]
    const onlineInRanking = topScorePlayers.filter((player) => player.Online).length
    const numberFormatter = new Intl.NumberFormat('pt-BR')

    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4'>
                <div className="grid grid-cols-1 gap-4 p-4 m-3 md:grid-cols-3 lg:col-span-4">
                    <Card className='shadow-lg shadow-gray-600/10'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total de Contas</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {!isLoading ? (
                                    numberFormatter.format(data?.totalPlayers || 0)
                                ) : (
                                    <Spinner className="size-6" />
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% em relacao ao mes passado
                            </p>
                        </CardContent>
                    </Card>

                    <Card className='shadow-lg shadow-gray-600/10'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Clans</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {!isLoading ? (
                                    numberFormatter.format(data?.totalClans || 0)
                                ) : (
                                    <Spinner className="size-6" />
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +5 novos clans este mes
                            </p>
                        </CardContent>
                    </Card>

                    <Card className='shadow-lg shadow-gray-600/10'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total de Banidos</CardTitle>
                            <Ban className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {!isLoading ? (
                                    numberFormatter.format(data?.totalBanned || 0)
                                ) : (
                                    <Spinner className="size-6" />
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                -12% em relacao ao mes passado
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-primary-foreground p-4 rounded-lg m-3 shadow-lg shadow-gray-600/10 lg:col-span-2">
                    <PlayersChart />
                </div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3 shadow-lg shadow-gray-600/10">
                    <ChartPieDonutText />
                </div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3 shadow-lg shadow-gray-600/10">
                    <CardList title="Raking" />
                </div>
            </div>

            <div className='mx-3 mb-8 mt-4'>
                <Card className="overflow-hidden border-none bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.24),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_24%),linear-gradient(135deg,_rgb(15,23,42),_rgb(30,41,59))] text-slate-50 shadow-2xl shadow-slate-950/15 ring-0">
                    <CardContent className="grid gap-6 px-6 py-6 lg:grid-cols-[1.4fr_0.9fr]">
                        <div className="space-y-4">
                            <Badge className="w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-100">
                                Topscore
                            </Badge>

                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                    Quem domina o topo do servidor
                                </h2>
                                <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-[15px]">
                                    O ranking de topscore destaca os jogadores que mais acumularam progresso no servidor.
                                    Aqui fica facil identificar consistencia, atividade recente e quem esta puxando a regua
                                    competitiva la para cima.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                    <Trophy className="size-4 text-amber-300" />
                                    Lider atual
                                </div>
                                <p className="mt-3 text-lg font-semibold text-white">
                                    {leader?.Nome || 'Aguardando dados'}
                                </p>
                                <p className="text-sm text-slate-300">
                                    {leader ? `${numberFormatter.format(leader.Score)} pontos` : 'Sem jogadores listados'}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                    <Flame className="size-4 text-orange-300" />
                                    Top 15
                                </div>
                                <p className="mt-3 text-lg font-semibold text-white">
                                    {numberFormatter.format(topScorePlayers.length)}
                                </p>
                                <p className="text-sm text-slate-300">
                                    Jogadores exibidos no ranking principal
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                    <Activity className="size-4 text-sky-300" />
                                    Status
                                </div>
                                <p className="mt-3 text-lg font-semibold text-white">
                                    {numberFormatter.format(onlineInRanking)}
                                </p>
                                <p className="text-sm text-slate-300">
                                    Jogadores online dentro do topscore
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-5">
                    <TopPlayersTable data={topScorePlayers} isLoading={isLoading} />
                </div>
            </div>
        </>
    )
}
