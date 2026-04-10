import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { serializeBigInt } from '@/app/utils/api/serializer'

export async function GET(req: NextRequest) {

    try {
        const totalPlayers = await prisma.player.count()
        const totalClans = await prisma.clan.count()
        const totalBanned = await prisma.ban.count()
        const totalPcPlayers = await prisma.player.count({
            where: {
                Device: 'PC'
            }
        })

        const totalMobiles = await prisma.player.count({
            where: {
                Device: {
                    in: ['samp lancher', 'Mobile']
                }
            },
        })

        const totalOthers = await prisma.player.count({
            where: {
                Device: 'Nao Verificado'
            }
        })
        
        return NextResponse.json({
            totalPlayers,
            totalClans,
            totalBanned,
            totalPcPlayers,
            totalMobiles,
            totalOthers
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