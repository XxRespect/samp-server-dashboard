import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {

    try {
        const totalPlayers = await prisma.player.count()
        const totalClans = await prisma.clan.count()
        const totalBanned = await prisma.ban.count()


        const [totalPcPlayers, totalMobiles, totalOthers, topScorePlayers] = await Promise.all([
            prisma.player.count({
                where: {
                    Device: 'PC'
                }
            }),
            prisma.player.count({
                where: {
                    Device: {
                        in: ['samp lancher', 'Mobile']
                    }
                },
            }),
            prisma.player.count({
                where: {
                    Device: 'Nao Verificado'
                },
                take: 1000
            }),
            prisma.player.findMany({
                select: {
                    id: true,
                    Nome: true,
                    Score: true,
                    Online: true,
                    Device: true,
                    profile: true,
                    LasTimer: true,
                },
                orderBy: {
                    Score: 'desc'
                },
                where: {
                    BANNED: 0
                },
                take: 15
            })
        ])
        
        return NextResponse.json({
            totalPlayers,
            totalClans,
            totalBanned,
            totalPcPlayers,
            totalMobiles,
            totalOthers,
            topScorePlayers
        }, {
            status: 200
        })

        
    } catch(error) {
        return NextResponse.json({
            message: `Internal error ${error}`
        },{
            status: 500
        })
    }
}