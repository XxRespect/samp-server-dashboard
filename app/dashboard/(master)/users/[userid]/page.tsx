import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


import { Button } from "@/components/ui/button"
import CardList from '@/components/CardList'

import Link from 'next/link'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { BadgeCheck, ShieldUser } from "lucide-react"
import { GiEdgedShield } from "react-icons/gi";

import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"

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
                            <BreadcrumbLink href="/dashboard/players">Players</BreadcrumbLink>
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
                            <h1 className="text-xl font-semibold">Player Badges</h1>
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

                            <div className="space-y-4 mt-4">
                                <div className="flex flex-col gap-2 mb-8">
                                    <p className="text-sm text-muted-foreground"></p>
                                    <Field className="w-full max-w-sm">
                                        <FieldLabel htmlFor="progress-upload">
                                            <span>Player K/D</span>
                                            <span className="ml-auto">66%</span>
                                        </FieldLabel>
                                        <Progress value={66} id="progress-upload" />
                                    </Field>
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary-foreground p-4 rounded-lg">
                            <CardList title='Popular Contents' />
                        </div>
                    </div>
                    {/**RIGHT */}
                    <div className="w-full xl:w-2/3 space-y-6">
                        <div className="bg-primary-foreground p-4 rounded-lg">UserCard</div>
                        <div className="bg-primary-foreground p-4 rounded-lg">Chart</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPage