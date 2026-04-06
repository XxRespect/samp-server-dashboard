import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get("page") || 1)
    const search = searchParams.get("search") || ""
    const limit = Number(searchParams.get("limit") || 20)
    let where = {}

    if (!Number(searchParams.get("search"))) {
        where = {
            CLAN_NAME: {
                contains: searchParams.get("search")
            }
        }
    } else {
        where = {
            CLAN_ID: Number(searchParams.get("search"))
        }
    }

    try {
        if (!Number(search)) {
            where = {
                ...where,
                CLAN_NAME: {
                    contains: search
                }
            }
        }

        const clans = await prisma.clan.findMany({
            where
        })



        let clanMembers

        try {
            clanMembers = await prisma.members.count({
                where: {
                    M_CLANID: {
                        in: clans.map(clan => clan.CLAN_ID)
                    }
                }
            })
        } catch (error) {
            return NextResponse.json({ error: 'Internal server  couldnt not fetch members' }, { status: 500 })
        }

        return NextResponse.json({ clans, memberCount: clanMembers })

    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}