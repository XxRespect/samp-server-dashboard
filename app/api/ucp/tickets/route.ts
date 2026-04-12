import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'



export async function GET(req: NextRequest) {
    try {

        const tickets = await prisma.tickets.findMany({
            orderBy: {
                
            }
        })

    } catch(error) {
        return NextResponse.json({
            message: `Error: ${error}`
        })
    }
}