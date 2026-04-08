import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest) {
    try {

            const muted = await prisma.player.findMany({
                where: {
                    MUTED: true
                },
                select: {
                    Nome: true,
                    id: true,

                }
            })

            return NextResponse.json(muted)
    }catch(error) {
        return NextResponse.json({message: `Database connection failed`});
    }
}