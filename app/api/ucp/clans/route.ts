import { prisma } from '@/lib/prisma'
import type { Prisma } from '@/generated/prisma/client'
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get("page") || 1)
    const search = searchParams.get("search") || ""
    const limit = Number(searchParams.get("limit") || 20)
    const skip = (page - 1) * limit
    let where: Prisma.clanWhereInput = {}

    try {
        if (search) {
            if (Number.isNaN(Number(search))) {
                where = {
                    CLAN_NAME: {
                        contains: search
                    }
                }
            } else {
                where = {
                    CLAN_ID: Number(search)
                }
            }
        }

        const total = await prisma.clan.count({ where })

        const clans = await prisma.clan.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                CLAN_ID: 'desc'
            }
        })

        const clanIds = clans.map((clan) => clan.CLAN_ID)
        const clanMembers = clanIds.length
            ? await prisma.members.groupBy({
                by: ['M_CLANID'],
                where: {
                    M_CLANID: {
                        in: clanIds
                    }
                },
                _count: {
                    _all: true
                }
            })
            : []

        const membersByClanId = new Map(
            clanMembers.map((memberGroup) => [memberGroup.M_CLANID, memberGroup._count._all])
        )

        const clansWithMembers = clans.map((clan) => ({
            ...clan,
            clanMembers: membersByClanId.get(clan.CLAN_ID) ?? 0
        }))


        const totalPages = Math.ceil(total / limit)

        return NextResponse.json({
            clans: clansWithMembers,
            total,
            page,
            limit,
            totalPages
        })
    } catch (error) {
        console.error('Error fetching clans:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
