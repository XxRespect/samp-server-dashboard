import {prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest){

    const { searchParams } = new URL(req.url)
    const limit = Number(searchParams.get("limit") || 30)
    const page = Number(searchParams.get("page") || 1)
    const search =  searchParams.get("search") || ""
    const order = searchParams.get("orderBy") || "banid"

    try {
        const [banneds, total] = await Promise.all([
            prisma.ban.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    Nick: {
                        contains: search
                    }
                },
                select: {
                    Nick: true,
                    banid: true,
                    motivo: true,        
                    adm: true,
                    desban: true,
                    accid: true,
                    data: true,
                    adminid: true,
                    ban: true
                },
                orderBy: {
                    [order]: order === 'banid' ? 'desc' : 'asc'
                }
            }),
            prisma.ban.count({
                where: {
                    Nick: {
                        contains: search
                    }
                }
            })
        ])

        const totalPages = Math.ceil(total / limit)

        if(!banneds) {
            return NextResponse.json({message: 'No banneds found'}, {status: 404})
        }
        return NextResponse.json({
            message: 'Banneds fetched successfully', 
            banneds,
            total,
            totalPages,
            currentPage: page
        }, {status: 200})
    } catch(error) {
        return NextResponse.json({message: 'Error fetching banneds', error: (error as Error).message}, {status: 500})
    }
}