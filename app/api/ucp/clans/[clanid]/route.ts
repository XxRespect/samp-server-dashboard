import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma'


export async function GET(req: NextRequest, {params}: {params: Promise<{clanid: string}>}) {
   
    const { clanid }  = await params
    try{

        const clan = await prisma.clan.findUnique({
            where: {
                CLAN_ID: Number(clanid)
            }
        })

        const clanMembers = await prisma.members.findMany({
            where: {
                M_ACCID: Number(clanid)
            }
        })

        if (!clan) {
            return NextResponse.json(
                { message: `Clan ${clanid} not found` },
                { status: 404 }
            )
        }


        const clanOwner = await prisma.player.findFirst({
            where: {
                Clan: clan.CLAN_NAME
            },
            select: {
                id: true
            }
        })

        return NextResponse.json(
            {
                message: 'Clan fetched successfully',
                clan,
                clanMembers,
                clanOwner
            },
            {status: 200}
        )
    } catch(error) {
        return NextResponse.json(
            {message: `${error} Couldnt fetch the clan due database issues`},
            { status: 500 }
        )
    }
}
