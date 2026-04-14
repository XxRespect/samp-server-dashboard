import { ColumnDef } from "@tanstack/react-table"
import Link from 'next/link'

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DataTable } from '../_components/data-table'
import { cn } from "@/lib/utils"
import { UserType } from "@/modules/user/user.type"
import { convertTimestampToDate } from '@/utils/datatime/timestamp.converter'

const numberFormatter = new Intl.NumberFormat('pt-BR')

const getPlayerInitials = (name: string) =>
    name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('')

const getPositionStyles = (position: number) => {
    if (position === 1) {
        return "border-amber-400/50 bg-amber-400/15 text-amber-700 dark:text-amber-300"
    }

    if (position === 2) {
        return "border-slate-400/50 bg-slate-400/15 text-slate-700 dark:text-slate-200"
    }

    if (position === 3) {
        return "border-orange-500/40 bg-orange-500/15 text-orange-700 dark:text-orange-300"
    }

    return "border-border bg-muted/40 text-foreground"
}

export const topPlayersColumn: ColumnDef<UserType>[] = [
    {
        id: "position",
        header: "#",
        cell: ({ row }) => {
            const position = row.index + 1

            return (
                <div
                    className={cn(
                        "mx-auto flex size-11 items-center justify-center rounded-2xl border text-sm font-semibold shadow-sm",
                        getPositionStyles(position)
                    )}
                >
                    #{position}
                </div>
            )
        }
    },
    {
        id: "player",
        header: "Jogador",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    <Avatar size="lg" className="shadow-md shadow-black/10">
                        <AvatarImage src={row.original.profile} alt={row.original.Nome} />
                        <AvatarFallback>{getPlayerInitials(row.original.Nome)}</AvatarFallback>
                        <AvatarBadge className={row.original.Online ? "bg-emerald-500" : "bg-zinc-400"} />
                    </Avatar>

                    <div className="min-w-0">
                        <Link
                            href={`/dashboard/users/${row.original.id}`}
                            className="block truncate text-sm font-semibold text-foreground transition-colors hover:text-primary"
                        >
                            {row.original.Nome}
                        </Link>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                            <Badge
                                variant={row.original.Online ? "secondary" : "outline"}
                                className={cn(
                                    "h-6 rounded-full px-2.5 text-[11px]",
                                    row.original.Online && "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                                )}
                            >
                                {row.original.Online ? 'Online agora' : 'Offline'}
                            </Badge>

                            {row.index < 3 ? (
                                <Badge
                                    variant="outline"
                                    className="h-6 rounded-full border-amber-400/30 bg-amber-400/10 px-2.5 text-[11px] text-amber-700 dark:text-amber-300"
                                >
                                    Top 3
                                </Badge>
                            ) : null}
                        </div>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "Score",
        header: "Score",
        cell: ({ row, table }) => {
            const leaderScore = Number((table.options.data[0] as UserType | undefined)?.Score ?? row.original.Score ?? 0)
            const currentScore = Number(row.original.Score ?? 0)
            const progress = leaderScore > 0 ? Math.max((currentScore / leaderScore) * 100, 8) : 0

            return (
                <div className="min-w-32">
                    <p className="text-base font-semibold text-foreground">
                        {numberFormatter.format(currentScore)}
                    </p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                        <div
                            className="h-full rounded-full bg-linear-to-r from-amber-400 via-orange-400 to-rose-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "LasTimer",
        header: "Ultimo login",
        cell: ({ row }) => {
            const lastSeen = convertTimestampToDate(row.original.LasTimer, -3)

            return (
                <div className="space-y-1">
                    <p className="font-medium text-foreground">{lastSeen}</p>
                    <p className="text-xs text-muted-foreground">
                        {row.original.Online ? 'Jogador ativo no momento' : 'Ultimo registro capturado'}
                    </p>
                </div>
            )
        }
    },
]

interface Props {
    data: UserType[]
    isLoading: boolean
}

export default function TopPlayersTable({ data, isLoading }: Props) {
    return <DataTable columns={topPlayersColumn} data={data} isLoading={isLoading} />
}
