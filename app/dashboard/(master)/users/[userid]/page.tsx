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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface UsernameProps {
    params: Promise<{ userid: string }>
}



const UserPage = async ({ params }: UsernameProps) => {
    const { userid } = await params
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
                            <BreadcrumbPage>Katarina</BreadcrumbPage>
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
                            <h2 className="text-xl text-muted-foreground">Katrina</h2>
                            <span><Badge variant='destructive'>Banido</Badge></span>
                            <div className="space-y-4 mt-4">
                                <div className="flex flex-col gap-2 mb-8">
                                    <p className="text-sm text-muted-foreground">Player in game info</p>
                                    <Field className="w-full max-w-sm">
                                        <FieldLabel htmlFor="progress-upload">
                                            <span>Player K/D</span>
                                            <span className="ml-auto"><Badge variant="secondary"><p className="text-shadow-2xs">66% - Accuracy</p></Badge></span>
                                        </FieldLabel>
                                        <Progress value={66} id="progress-upload" />

                                    </Field>
                                    <div className="flex items-center gap-4 ">
                                        <span className="font-bold">ID: </span>
                                        <span>1</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">Nick: </span>
                                        <span><p  className="text-muted-foreground font-bold">Katrina</p></span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">Joined: </span>
                                        <span>12/01/2024 - 13:45</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold">logoff: </span>
                                        <span>24/03/2026 - 14:34</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">Cash: </span>
                                        <span><Badge variant='outline'> R$ 345.432.445</Badge></span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">Score: </span>
                                        <span>56.432</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">Kills/Deaths: </span>
                                        <span>345/233</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">K/D: </span>
                                        <span>3.34</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">Skin: </span>
                                        <span>212</span>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <span className="font-bold">Role: </span>
                                        <span><Badge variant="outline">Admin</Badge></span>
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
                                        <span>12.345</span>
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
                                <h1 className='font-bold text-xl'>Katrina</h1>
                            </div>
                            <h1 className="text-lg text-muted-foreground p-4"><Badge variant='outline'>Admin Panel</Badge></h1>
                            <hr />
                            <div className="mt-4">
                                <div className="flex items-center gap-7 mt-5">
                                    <span className="font-bold ">Serial : </span>
                                    <span>EEAA40FED9A895CC40AFC909D4008E595805488C </span><Button className="cursor-pointer hover:transition-all" variant='outline'>
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
                                    <span>China -Linda- Ireland</span>
                                </div>
                                <div className="flex items-center gap-7 ">
                                    <span className="font-bold ">Provider: : </span>
                                    <span>Eircom Limited</span>
                                </div>
                                <div className="flex items-center gap-16 ">
                                    <span className="font-bold ">Org: : </span>
                                    <span>Eir Tele IE</span>
                                </div>
                                <div className="flex items-center gap-13 mb-3">
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