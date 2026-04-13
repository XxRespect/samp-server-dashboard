import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'


export async function GET(req: NextRequest) {

    try {
        const usersCount = await prisma.player.count()
        return NextResponse.json(usersCount);


        const popularUsers = await prisma.player.findMany({
            where: {
                Score: {
                    gt: 30,
                }
            },
            select: {
                Nome: true,
                Score: true,
                Online: true,
                Device: true
            }
        })


        return NextResponse.json({status: "sucess", popularUsers})
        
    }catch(error) {
        console.log(`1 Try catch failed check the database`)
        return NextResponse.json({message:"Could no fetch the required data"})
    }
}