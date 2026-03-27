import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

const serializeBigInt = <T>(data: T): T =>
    JSON.parse(
        JSON.stringify(data, (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
        )
    )


export async function GET(req: NextRequest, {params}: {params: Promise<{userid: string}>}) {
    try {
        const { userid } = await params
        const parsedUserId = Number(userid)
        if (!Number.isInteger(parsedUserId)) {

            return NextResponse.json({message: `Invalid accound Id`},{status:400})
        }

        const user = await prisma.player.findUnique({
            where: {
                id: parsedUserId,
            },
            select: {
                Nome: true,
                id: true,
                Admin: true,
                ADMIN_TEMP:true,
                Score: true,
                Gpci: true,
                BANNED: true,
                banreason: true,
                Device:true,
                pais:true,
                cidade:true,
                Dinheiro: true,
                Online: true,
                regiao:true,
                Skin: true,
                cep:true,
                organizacao:true,
                fuso_horario:true,
                isp:true,
                Matou: true,
                Morreu:true,
                vpn:true,
                IS_VIP: true,
                coordenadas:true,
                original_nickname:true,
                user_register: true,
                MODO_MATA: true,

            },

        })
        if(!user) {
            return NextResponse.json({message: `User not found`}, {status: 404})
        }
        const safeUser = serializeBigInt(user)
        return NextResponse.json({message: `User ${user.Nome} fetched successfully`, user: safeUser}, {status: 200})
    }catch(error) {
        console.error('Error fetching UCP data:', error);
        return NextResponse.json({ error: 'Failed to fetch UCP data' }, { status: 500 });
    }
}