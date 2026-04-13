import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'



export async function GET(req: NextRequest) {
    try {

        const tickets = await prisma.tickets.findMany({
                where: {

                }
        })

    } catch(error) {
        return NextResponse.json({
            message: `Error: ${error}`
        })
    }
}