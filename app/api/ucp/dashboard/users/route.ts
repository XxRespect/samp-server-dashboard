import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'


export async function GET() {

    try {
        const usersCount = await prisma.player.count()
        return NextResponse.json(usersCount);
    }catch(error) {
        console.log(`1 Try catch failed check the database`)
        return NextResponse.json({message:"Could no fetch the required data"})
    }
}