import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'



/*******  ae867b13-9cbb-4091-8f65-5b86bc8e170f  *******/
export async function GET(req: NextRequest) {

    try {
        const { searchParams } = new URL(req.url)
        const search = searchParams.get("search")
        const limit = Number(searchParams.get("limit") || 25)
        const page = Number(searchParams.get("page") || 1)
        
        const total = await prisma.ipban.count()

        let where = {}

        if (search) {
            where = {
                IP: {
                    contains: search
                }
            }

        } else {
            where = {}
        }

        const totalbannedIps = await prisma.ipban.count({
            where
        })

        const banned = await prisma.ipban.findMany({
            where,
            take: limit,
            skip: (page - 1) * limit
        })

        const totalPages = Math.ceil(totalbannedIps / limit)
        const hasNextPage = page < totalPages

        return NextResponse.json({ 
            status: true,
            message: 'IP banneds fetched successfully',
            banned, 
            totalbannedIps,
            total,
            totalPages,
            currentPage: page,
            hasNextPage
         }, { status: 200 })


    } catch (error) {
        return NextResponse.json({ status: false, message: `Database connection failed` }, { status: 500 });
    }
}
