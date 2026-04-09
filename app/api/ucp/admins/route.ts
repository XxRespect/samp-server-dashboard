import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { success } from 'zod'


function serializeBigInt(data: any) {
    return JSON.parse(
        JSON.stringify(data, (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
        )
    )
}

export async function GET(req: NextRequest) {
    try {
        const admins = await prisma.player.findMany({
            where: {
                Admin: {
                    gt: 0
                },
            },
            select: {
                Nome: true,
                Admin: true,
                id: true,
                ADMIN_TEMP: true,
                role: true,
                LasTimer: true
            }

        })

        const totalAdmins = await prisma.player.count({
            where: {
                Admin: {
                    gt:0
                }
            }
        });

        return NextResponse.json({
            admins,
            totalAdmins
        }, { status: 200 },)
    } catch (error) {
        return NextResponse.json({
            message: `Internal error ${error}`,
            success: false
        }, { status: 500 })
    }
}
