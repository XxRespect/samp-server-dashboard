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
import { BadgeCheck, Search, ShieldUser } from "lucide-react"
import { GiEdgedShield } from "react-icons/gi"
import { FaArrowAltCircleDown } from "react-icons/fa";
import { ChartLineDefault } from "@/components/KillsBarChart"
import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

/*backend data */
import { useQuery } from '@tanstack/react-query'
import { getUser } from "@/app/modules/user/user.api"
import { useParams } from "next/navigation"






const UserPage = () => {
    const params = useParams<{ userid: string }>()
    const userId = Number(params.userid)

    const { data, isLoading, isError } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUser(userId),
        enabled: Number.isFinite(userId),
        retry: false,
    })

    const kills = Number(data?.user?.Matou ?? 0)
    const deaths = Number(data?.user?.Morreu ?? 0)
    const kdValue = deaths > 0 ? kills / deaths : kills
    const kdText = Number.isFinite(kdValue) ? kdValue.toFixed(2) : "0.00"


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
                    <div className="w-full xl:w-1/3 space-y-6">
                        <div className="bg-primary-foreground p-4 rounded-lg">
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
                        <div className="bg-primary-foreground p-4 rounded-lg">
                            <h1 className="text-xl font-semibold">Player Information</h1>
                            <h2 className="text-xl text-muted-foreground">
                                {isLoading ? <Spinner className="size-6"></Spinner> : isError ? "Failed to load user" : data?.user?.Nome ?? "Unknown user"}
                            </h2>
                            <span><Badge className={!data?.user.BANNED && data?.user.Admin ? "Admin" : "Jogador" } variant={data?.user.BANNED ? "destructive" : "outline"}>{data?.user.BANNED ? "banido" : "Jogador"}</Badge></span>
                            <div className="space-y-4 mt-4">
                                <div className="flex flex-col gap-2 mb-8">
                                    <p className="text-sm text-muted-foreground">Player in game info</p>
                                    <Field className="w-full max-w-sm">
                                        <FieldLabel htmlFor="progress-upload">
                                            <span>Player K/D</span>
                                            <span className="ml-auto"><Badge variant="secondary"><p className="text-shadow-2xs">{}% - Accuracy</p></Badge></span>
                                        </FieldLabel>
                                        <Progress value={Math.min(100, kdValue * 10)} id="progress-upload" />

                                    </Field>
                                    <div className="flex items-center gap-4 ">
                                        <span className="font-bold">ID: </span>
                                        <span>{data?.user.id}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">Nick: </span>
                                        <span><p className="text-muted-foreground font-bold">{data?.user?.Nome ?? "-"}</p></span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">Joined: </span>
                                        <span>{isLoading ? <Skeleton className="h-4 w-2/3"> </Skeleton> : isError ? "Faild to load user" : data?.user.user_register ?? "Couldnt load"}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold">logoff: </span>
                                        <span>24/03/2026 - 14:34</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">Cash: </span>
                                        <span><Badge variant='outline'> R$ { }</Badge></span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">Score: </span>
                                        <span>{data?.user.Score}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">Kills/Deaths: </span>
                                        <span>{kills}/{deaths}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">K/D: </span>
                                        <span>{kdText}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">Skin: </span>
                                        <span>{data?.user.Skin}</span>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <span className="font-bold">Role: </span>
                                        <span><Badge variant="outline">{
                                            data?.user.Admin ? "Admin" : "Player"
                                        } - {data?.user.Admin}</Badge></span>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <span className="font-bold">VIP: </span>
                                        <span><Badge variant="default">Yes</Badge></span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">Preso: </span>
                                        <span><Badge variant="destructive">Yes</Badge></span>
                                    </div>
                                    <hr />
                                    <div className="flex items-center gap-6">
                                        <span className="font-bold">Freeroam: </span>
                                        <span>{data?.user.MODO_MATA}</span>
                                    </div>
                                    <div className="flex items-center gap-7">
                                        <span className="font-bold">CnR: </span>
                                        <span>234</span>
                                    </div>
                                    <div className="flex items-center gap-7">
                                        <span className="font-bold">Derby: </span>
                                        <span>0</span>
                                    </div>
                                    <div className="flex items-center gap-7">
                                        <span className="font-bold">Call of Duty: </span>
                                        <span>345</span>
                                    </div>
                                    <div className="flex items-center gap-7">
                                        <span className="font-bold">P-T-P: </span>
                                        <span>345</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary-foreground p-4 rounded-lg">
                            <CardList title='Popular Contents' />
                        </div>
                    </div>
                    {/**RIGHT */}
                    <div className="w-full xl:w-2/3 space-y-6">
                        <div className="bg-primary-foreground p-4 rounded-lg">
                            <div className="flex items-center gap-2 w-full">

                                <Avatar>
                                    <AvatarImage sizes="12" src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h1 className='font-bold text-xl'>{data?.user.Nome}</h1>
                            </div>
                            <h1 className="text-lg text-muted-foreground p-4"><Badge variant='outline'>Admin Panel</Badge></h1>
                            <hr />
                            <div className="mt-4">
                                <div className="flex items-center gap-7 mt-5">
                                    <span className="font-bold ">Serial : </span>
                                    <span>{data?.user.Gpci} </span><Button className="cursor-pointer hover:transition-all" variant='outline'>
                                        <Search size={34} className="mr-auto" /></Button>

                                </div>
                                <h1 className="font-bold text-xl border-b-blue">Geo Info</h1>
                                <hr />
                                <div className="flex items-center gap-20 mt-4">
                                    <span className="font-bold ">IP: : </span>
                                    <span>183.345.32</span>
                                </div>
                                <div className="flex items-center gap-6 ">
                                    <span className="font-bold ">Location: : </span>
                                    <span>{data?.user.cidade}- {data?.user.regiao} - {data?.user.pais}</span>
                                </div>
                                <div className="flex items-center gap-7 ">
                                    <span className="font-bold ">Provider: : </span>
                                    <span>{data?.user.isp}</span>
                                </div>
                                <div className="flex items-center gap-17 ">
                                    <span className="font-bold ">Org: </span>
                                    <span>{data?.user.organizacao}</span>
                                </div>
                                <div className="flex items-center gap-16 ">
                                    <span className="font-bold ">CEP: </span>
                                    <span>{data?.user.cep}</span>
                                </div>
                                <div className="flex items-center gap-11 ">
                                    <span className="font-bold ">Device: </span>
                                    <span>{data?.user.Device}</span>
                                </div>
                                <div className="flex items-center gap-14 mb-3">
                                    <span className="font-bold ">VPN: : </span>
                                    <span><Badge variant='outline'>No</Badge></span>
                                </div>
                                <hr />
                                <Button className="hover:cursor-pointer hover:p-4 mt-4 hover:transition-all hover:shadow-2xl ml-3" variant='secondary'>Ban, Chat Log and Etc scroll down<FaArrowAltCircleDown /> </Button>
                                <Button className="hover:cursor-pointer hover:p-4 mt-4 hover:transition-all hover:shadow-2xl ml-3" variant='secondary'>Search Player AC<Search /> </Button>
                            </div>
                        </div>
                        <div className="bg-primary-foreground p-4 rounded-lg">
                            <ChartLineDefault />
                        </div>
                        <div className="bg-primary-foreground p-4 rounded-lg">
                            <h1>Anti Cheat tracker</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPage