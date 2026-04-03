
'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


import CardList from '@/components/CardList'
import { Badge } from "@/components/ui/badge"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { BadgeCheck, Search, ShieldUser, InfoIcon, Ban } from "lucide-react"
import { GiEdgedShield } from "react-icons/gi"
import { FaArrowAltCircleDown } from "react-icons/fa";
import { ChartLineDefault } from "@/components/KillsBarChart"
import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"

import {
    Alert,
    AlertDescription,
    AlertTitle

} from '@/components/ui/alert'

import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

/*backend data */
import { useQuery } from '@tanstack/react-query'
import { getUser } from "@/app/modules/user/user.api"
import { useParams } from "next/navigation"
import Link from "next/link"
import { formatPlayerNumber } from "@/app/utils/number/number.formater"



import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card'

import { formatTime } from "@/app/utils/datatime/datetime.formater"

import { convertTimestampToDate } from "@/app/utils/datatime/timestamp.converter"

const dashboardCardClass =
    "rounded-xl border border-white/10 bg-[#171717] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.35),0_0_24px_rgba(255,255,255,0.04)] backdrop-blur-sm"

const UserPage = () => {
    const params = useParams<{ userid: string }>()
    const userId = Number(params.userid)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUser(userId),
        enabled: Number.isFinite(userId),
        retry: false,

    });


    const kills = Number(data?.user?.Matou ?? 0)
    const deaths = Number(data?.user?.Morreu ?? 0)
    const kdValue = deaths > 0 ? kills / deaths : kills
    const kdText = Number.isFinite(kdValue) ? kdValue.toFixed(2) : "0.00"
    const isBanned = Boolean(data?.user?.BANNED)
    const isTempAdmin = Number(data?.user?.ADMIN_TEMP ?? 0) > 0
    const isAdmin = Number(data?.user?.Admin ?? 0) > 0

    const playerStatus = isBanned
        ? { label: "Banido", variant: "destructive" as const }
        : isTempAdmin
            ? { label: "Admin Temp", variant: "secondary" as const }
            : isAdmin
                ? { label: "Admin", variant: "outline" as const }
                : { label: "Jogador", variant: "outline" as const }

    const playerRole = isTempAdmin
        ? { label: "Admin Temp", variant: "secondary" as const }
        : isAdmin
            ? { label: "Admin", variant: "outline" as const }
            : { label: "Jogador", variant: "outline" as const }

    if (isLoading) return <p className="text-bold flex">Loading <Spinner className="ml-14 size-5"></Spinner></p>
    if (isError) return (
        <div className="w-full abosolute flex items-center justify-center">
            <Alert className="m-4 max-w-md" variant='destructive'>
                <InfoIcon />
                <AlertTitle>
                    Account not found
                </AlertTitle>
                <AlertDescription>
                    {error.message}
                </AlertDescription>
            </Alert>
        </div>
    )

    return (
        <>

            <div className="m-5
            ">
                <Breadcrumb className='m-5'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/users">Players</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage> {isLoading ? <Spinner className="size-4"></Spinner> : isError ? "Failed to load user" : data?.user?.Nome ?? "Unknown user"}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/**CONTAINER */}
                <div className="mt-5 flex flex-col xl:flex-row gap-8">
                    {/**LEFT */}
                    <div className="w-full xl:w-1/3 space-y-6 ">
                        <div className={`${dashboardCardClass} p-4 shadow-lg shadow-gray-600/16`}>
                            <h1 className="text-xl font-semibold">Player Awards and Tags</h1>
                            <div className="flex gap-4 mt-4">
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <BadgeCheck size={36} className="rounded-full bg-blue-500/50 border border-blue p-2" />
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                        <h1 className="font-bold mb-2">User Verified</h1>
                                        <p className="text-muted-foreground">This user has an Account verified on discord server</p>
                                    </HoverCardContent>
                                </HoverCard>
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <GiEdgedShield size={36} className="rounded-full bg-red-500/50 border border-blue p-2" />
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                        <h1 className="font-bold mb-2">User Tag</h1>
                                        <p className="text-muted-foreground">This user has a Purger Territory Tag</p>
                                    </HoverCardContent>
                                </HoverCard>
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <ShieldUser size={36} className="rounded-full bg-blue-500/50 border border-blue p-2" />
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                        <h1 className="font-bold mb-2">User Role</h1>
                                        <p className="text-muted-foreground">This user is an Admin</p>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        </div>
                        <div className={`${dashboardCardClass} p-4 shadow-lg shadow-gray-600/13`}>
                            <h1 className="text-xl font-semibold">Player Information</h1>
                            <h2 className="text-xl text-muted-foreground">
                                <div className="flex flex-row items-center">
                                    <Avatar size='lg' className="m-1">
                                        <AvatarImage src={data?.user.profile} />
                                        <AvatarFallback><p className="text-shadow-lg/30 ">{data?.user.Nome}</p></AvatarFallback>
                                        <AvatarBadge className={data?.user.Online ? "bg-green-600" : "bg-red-500"} />
                                    </Avatar>
                                    <p className="text-shadow-lg/60">{data?.user.Nome}</p>
                                </div>

                            </h2>

                            <div className="mt-4 space-y-5">
                                <div className="flex items-center justify-between rounded-lg border border-white/8 bg-white/2 px-3 py-2 shadow-lg shadow-gray-600/13">
                                    <span className="text-sm text-muted-foreground">Player status</span>
                                    <Badge variant={playerStatus.variant}>
                                        <p className="text-shadow-lg/60">{playerStatus.label}</p>
                                    </Badge>
                                </div>

                                <div className="rounded-lg border border-white/8 bg-white/2 p-4 shadow-lg shadow-gray-600/13 ">
                                    <div className="mb-4">
                                        <p className="text-sm font-medium">Player overview</p>
                                        <p className="text-sm text-muted-foreground">Core account details and progression</p>
                                    </div>

                                    <Field className="w-full">
                                        <FieldLabel htmlFor="progress-upload">
                                            <span>Player K/D</span>
                                            <span className="ml-auto">
                                                <Badge variant="secondary">
                                                    <p className="text-shadow-2xs">{kills}/{deaths} - Average</p>
                                                </Badge>
                                            </span>
                                        </FieldLabel>
                                        <Progress value={Math.min(100, kdValue * 10)} id="progress-upload" />
                                    </Field>

                                    <div className="mt-5 grid grid-cols-2 gap-y-3">
                                        <span className="text-muted-foreground">ID:</span>
                                        <span>{data?.user.id}</span>

                                        <span className="text-muted-foreground">Nick:</span>
                                        <span className="font-medium">{data?.user?.Nome ?? "-"}</span>




                                        <span className="text-muted-foreground">Role:</span>
                                        <span>
                                            <Badge variant={playerRole.variant}>
                                                {playerRole.label}
                                            </Badge>
                                        </span>
                                        {data?.user?.Admin ? (
                                            <>
                                                <span className="text-muted-foreground">Admin:</span>
                                                <span className="font-medium">{data?.user?.Admin}</span>
                                            </>
                                        ) : null}

                                        {data?.user?.Email ? (
                                            <>
                                                <span className="text-muted-foreground">Email:</span>
                                                <span className="font-medium">{data?.user?.Email ?? "-"}</span>
                                            </>
                                        ) : null}


                                        <span className="text-muted-foreground">Joined:</span>
                                        <span>{formatTime(data?.user?.user_register)}</span>
                                        <span className="text-muted-foreground">Logoff:</span>
                                        <span>{convertTimestampToDate(data?.user?.LasTimer, -3)}</span>

                                        <span className="text-muted-foreground">Clan:</span>
                                        <span className="border-b-2 w-40">{data?.user?.Clan ?? "-"}</span>

                                        <span className="text-muted-foreground">Cash:</span>
                                        <span><Badge variant='outline'>R$ {formatPlayerNumber(data?.user.Dinheiro)}</Badge></span>

                                        <span className="text-muted-foreground">Score:</span>
                                        <span>{formatPlayerNumber(data?.user.Score)}</span>

                                        <span className="text-muted-foreground">Kills/Deaths:</span>
                                        <span>{kills}/{deaths}</span>

                                        <span className="text-muted-foreground">Headshots:</span>
                                        <span>{data?.user.HeadShots}</span>

                                        <span className="text-muted-foreground">K/D:</span>
                                        <span>{kdText}</span>

                                        <span className="text-muted-foreground">Skin:</span>
                                        <span>{data?.user.Skin}</span>



                                        <span className="text-muted-foreground">VIP:</span>
                                        <span><Badge variant={data?.user.IS_VIP ? "default" : "outline"}>{data?.user.IS_VIP ? "Yes" : "No"}</Badge></span>

                                        <span className="text-muted-foreground">Jailed:</span>
                                        <span><Badge variant="destructive">{Number(data?.user.Preso) ? "Yes" : "No"}</Badge></span>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-white/8 bg-white/2 p-4">
                                    <div className="mb-4">
                                        <p className="text-sm font-medium">Game modes</p>
                                        <p className="text-sm text-muted-foreground">Mode stats and activity split</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-3">
                                        <span className="text-muted-foreground">Freeroam:</span>
                                        <span>{data?.user.MODO_MATA}</span>

                                        <span className="text-muted-foreground">CnR:</span>
                                        <span>{data?.user.Score}</span>

                                        <span className="text-muted-foreground">Derby:</span>
                                        <span>0</span>

                                        <span className="text-muted-foreground">Call of Duty:</span>
                                        <span>345</span>

                                        <span className="text-muted-foreground">P-T-P:</span>
                                        <span>345</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${dashboardCardClass} p-4`}>
                            <CardList title='Popular Contents' />
                        </div>
                        <div className="col-span-1 space-y-3 shadow-lg shadow-gray-600/16">
                            <Card size="sm" className={`${dashboardCardClass} h-full`}>
                                <CardHeader>
                                    <CardTitle>
                                        Chat log: last messages
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="overflow-y-scroll h-95">
                                    {data?.userChatLog.map((account) => (
                                        <span className="text-muted-foreground text-shadow-2xs font-medium" key={account.id}>[{formatTime(account.timestamp)}]: {account.message}<br /></span>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    {/**RIGHT */}
                    <div className="w-full xl:w-2/3 space-y-6  ">
                        <div className={`${dashboardCardClass} p-4 shadow-lg shadow-gray-600/16`}>
                            <div className="flex items-center gap-2 w-full">

                                <Avatar size='lg'>
                                    <AvatarImage src={data?.user.profile} />
                                    <AvatarFallback>{data?.user.Nome}</AvatarFallback>
                                    <AvatarBadge className={data?.user.Online ? "bg-green-600" : "bg-red-500"} />
                                </Avatar>
                                <h1 className='font-bold text-xl'>{data?.user.Nome}</h1>
                            </div>
                            <h1 className="text-lg text-muted-foreground p-4"><Badge variant='outline'>Admin Panel</Badge></h1>
                            <hr />
                            <div className="mt-4 ">
                                <div className="flex items-center gap-7 mt-5">
                                    <span className="font-bold ">Serial : </span>
                                    <span>{data?.user.Gpci} </span><Button className="cursor-pointer hover:transition-all" variant='outline' asChild>
                                        <Link href='/dashboard/users'><Search size={34} className="mr-auto" /></Link></Button>

                                </div>

                                <h1 className="font-bold text-xl border-b-blue">Geo Information</h1>
                                <hr />
                                <div className="grid grid-cols-2 gap-y-2 mt-4 mb-3 w-full max-w-2xl ">
                                    <span className="text-muted-foreground">IP:</span>
                                    <span>{data?.geoLocation.query}</span>

                                    <span className="text-muted-foreground">Location:</span>
                                    <span>{data?.geoLocation.city} - {data?.geoLocation.regionName} - {data?.geoLocation.country}</span>

                                    <span className="text-muted-foreground">Time Zone:</span>
                                    <span>{data?.geoLocation.timezone}</span>

                                    <span className="text-muted-foreground">ISP:</span>
                                    <span>{data?.geoLocation.isp}</span>

                                    <span className="text-muted-foreground">Org:</span>
                                    <span>{data?.geoLocation.org}</span>

                                    <span className="text-muted-foreground">CEP:</span>
                                    <span>{data?.geoLocation.zip}</span>

                                    <span className="text-muted-foreground">Country code:</span>
                                    <span>{data?.geoLocation.countryCode}</span>

                                    <span className="text-muted-foreground">Device:</span>
                                    <span>{data?.user.Device}</span>

                                    <span className="text-muted-foreground">VPN:</span>
                                    <span><Badge variant='outline'>{data?.geoLocation.proxy ? 'Yes' : 'No'}</Badge></span>

                                </div>
                                <hr />
                                <Button className="hover:cursor-pointer hover:p-4 mt-4 hover:transition-all hover:shadow-2xl ml-3" variant='secondary'>Ban, Chat Log and Etc scroll down<FaArrowAltCircleDown /> </Button>
                                <Button className="hover:cursor-pointer hover:p-4 mt-4 hover:transition-all hover:shadow-2xl ml-3" variant='secondary'>Search Player AC<Search /> </Button>
                            </div>
                        </div>
                        <div className={`${dashboardCardClass} p-4 shadow-lg shadow-gray-600/16`}>
                            <ChartLineDefault />
                        </div>
                        {data?.user.BANNED ? <div className={`${dashboardCardClass} p-4 shadow-lg shadow-gray-600/16`}>
                            <Card className={dashboardCardClass}>
                                <CardHeader>
                                    <CardTitle className="flex"><Ban size={20} /> <span className="ml-3">Ban information</span></CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-y-2 w-80">

                                            <span className="text-muted-foreground">Adm:</span>
                                            <span>{data?.userBanInfo?.adm ?? "--"}</span>

                                            <span className="text-muted-foreground">Reason:</span>
                                            <span>{data?.userBanInfo?.motivo ?? "--"}</span>

                                            <span className="text-muted-foreground">Date:</span>
                                            <span>
                                                {data?.userBanInfo?.data
                                                    ? formatTime(data.userBanInfo.data)
                                                    : "--"}
                                            </span>

                                            <span className="text-muted-foreground">Type:</span>
                                            <span>{Number(data?.userBanInfo?.desban ?? 0) > 0 ? "Temporária" : "Permanente"}</span>

                                        </div>
                                    </CardContent>
                                </CardContent>
                            </Card>
                        </div> : <div className="hidden"></div>}
                        <div className={`${dashboardCardClass} p-4 shadow-lg shadow-gray-600/16`}>
                            <div className="col-span-2 space-y-3">
                                <Card size='sm' className={`${dashboardCardClass} `}>
                                    <CardTitle className="border-b p-1"><span className="text-1lg">Login/Logout</span></CardTitle>
                                    <CardContent className="overflow-y-scroll h-40">
                                        {data?.userLoginLogs.map((log) => (
                                            <span className="text-muted-foreground text-shadow-2xs font-medium" key={log.id}>[{formatTime(log.timestamp)}] {log.action == "CONNECT" ? "Logou no servidor" : "Saiu do servidor"} {log.system} <br /></span>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardTitle className="border-b p-1"><span className="text-1lg">Nicknames history</span></CardTitle>
                                    <CardContent className="overflow-y-scroll h-40">
                                        {data?.nicksChangeLogs.map((log, _) => (
                                            <span className="text-muted-foreground text-shadow-2xs font-medium" key={log.id}>[{log.data}] {log.nick_antigo} → {log.nick} <br /></span>
                                        ))}
                                    </CardContent>
                                </Card>

                                {/** IPs card */}
                                <Card size='sm' className={dashboardCardClass}>
                                    <CardTitle className="border-b p-1"><span className="text-1lg">Accounts on this IP: {data?.user.Ip}</span></CardTitle>
                                    <CardContent className="overflow-y-scroll h-40">
                                        {data?.usersWithSameIp?.length ? (
                                            <div className="space-y-1">
                                                {data.usersWithSameIp.map((account) => (
                                                    <Link href={`/dashboard/users/${account.id}`} className={account.BANNED ? "text-red-600" : "text-blue-400"} key={account.id}>
                                                        <span>{account.Nome}<br /></span>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>No accounts found</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="col-span-2 space-y-6 mt-4  shadow-lg shadow-gray-600/16">
                                <Card size='sm' className={dashboardCardClass}>
                                    <CardTitle className="border-b p-1"><span className="text-1lg">Accounts with same Serial: {data?.user.Gpci}</span></CardTitle>
                                    <CardContent className="overflow-y-scroll h-40">
                                        {data?.usersWithSameSerial?.length ? (
                                            <div className="space-y-1">
                                                {data.usersWithSameSerial.map((account) => (
                                                    <Link href={`/dashboard/users/${account.id}`} className={account.BANNED ? "text-red-600" : "text-blue-400"} key={account.id}>
                                                        <span>{account.Nome}<br /></span>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>No accounts found</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="grid col-span-1 mt-7">
                    <Card className={dashboardCardClass}>
                        <CardHeader>
                            <CardTitle>
                                Anti Cheat system
                            </CardTitle>
                        </CardHeader>
                        <CardContent>

                        </CardContent>
                        <CardFooter>
                            logs
                        </CardFooter>
                    </Card>
                </div>
            </div >
        </>
    )
}

export default UserPage


