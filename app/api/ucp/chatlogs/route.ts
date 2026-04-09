import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'



export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const limit = Number(searchParams.get("limit") || 25)
        const page = Number(searchParams.get("page") || 1)
        const search = searchParams.get("search") || ""
        const skip = (page - 1) * limit
        const where: any = {};
        const messageFilter = searchParams.get("message") || "";

        if (search) {
            const numSearch = Number(search);
            if (!isNaN(numSearch)) {
                where.accid = numSearch;
            } else {
                where.player_name = {
                    contains: search,
                };
            }
        }

        if (messageFilter) {
            where.message = {
                contains: messageFilter
            };
        }

        const total = await prisma.chat_logs.count({ where });

        const chatlogs = await prisma.chat_logs.findMany({
            where,
            take: limit,
            skip: skip,
            select: {
                id: true,
                player_name: true,
                timestamp: true,
                accid: true,
                ip: true,
                message: true,
                source: true
            }
        });

        return NextResponse.json({
            chatlogs,
            total,
            page,
            limit
        })
    } catch (error) {

        return NextResponse.json({ message: `Internal error ${error}` }, { status: 500 })
    }
}

