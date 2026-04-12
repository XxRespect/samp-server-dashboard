import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'



export async function GET(req: NextRequest, {params}: {params: Promise<{userid: string}>}) {

    const { userid } = await params

    let where = {}

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