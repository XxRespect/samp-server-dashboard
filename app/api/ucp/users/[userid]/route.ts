import { getGeoLocation } from '@/app/services/geo/geo.service'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

const serializeBigInt = <T>(data: T): T =>
    JSON.parse(
        JSON.stringify(data, (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
        )
    )


export async function GET(req: NextRequest, { params }: { params: Promise<{ userid: string }> }) {
    try {
        const { userid } = await params
        const parsedUserId = Number(userid)
        console.log(`[API GET USER] Requesting user with ID: ${userid}, Parsed ID: ${parsedUserId}`)

        if (!Number?.isInteger(parsedUserId)) {
            console.log(`[API GET USER] Invalid user ID: ${userid}`)
            return NextResponse.json({ message: `Invalid Account Id` }, { status: 400 })
        }


        const user = await prisma.player.findUnique({
            where: {
                id: parsedUserId,
            },
            select: {
                Nome: true,
                id: true,
                Admin: true,
                ADMIN_TEMP: true,
                Score: true,
                Gpci: true,
                BANNED: true,
                banreason: true,
                Device: true,
                pais: true,
                cidade: true,
                Dinheiro: true,
                Online: true,
                LasTimer: true,
                regiao: true,
                Skin: true,
                cep: true,
                Clan: true,
                Preso: true,
                organizacao: true,
                fuso_horario: true,
                isp: true,
                Matou: true,
                Morreu: true,
                vpn: true,
                IS_VIP: true,
                coordenadas: true,
                original_nickname: true,
                user_register: true,
                MODO_MATA: true,
                Ip: true,
                profile: true,
                HeadShots: true,
                Email: true,
                HasEmail: true,

            },

        })

        if (!user) {
            console.log(`[API GET USER] User not found in database for ID: ${parsedUserId}`)
            return NextResponse.json({ message: `User not found` }, { status: 404 })
        }

        console.log(`[API GET USER] User found: ${user.Nome} (ID: ${user.id})`)

        const userBanInfo = await prisma.ban.findFirst({
            where: {
                accid: user.id
            },
            select: {
                Nick: true,
                adm: true,
                data: true,
                desban: true,
                adminid: true,
                motivo: true,
            }
        })

        const userChatLog = await prisma.chat_logs.findMany({
            where: {
                accid: user.id,
                NOT: {
                    id: user.id
                }
            },
            orderBy: {
                id: "desc"
            },
            select: {
                id: true,
                player_name: true,
                message: true,
                timestamp: true,

            },
            take: 2
        })

        const usersWithSameIp = await prisma.player.findMany({
            where: {
                Ip: user.Ip,
                id: {
                    not: user.id
                }
            },
            select: {
                id: true,
                Nome: true,
                Ip: true,
                BANNED: true,
            },
        })

        const user_ac = await prisma.anticheat_logs.findMany()

        const usersWithSameSerial = await prisma.player.findMany({
            where: {
                Gpci: user.Gpci,
                id: {
                    not: user.id
                }
            },
            select: {
                id: true,
                Nome: true,
                Gpci: true,
                Ip: true,
                BANNED: true,
            },
        })

        let geoLocation
        try {
            geoLocation = await getGeoLocation(user.Ip)
        } catch (geoError) {
            console.warn(`Geo lookup for user ${user.id} failed, using fallback geo data.`, geoError)
            geoLocation = {
                city: "Unknown",
                region: "Unknown",
                country: "Unknown",
                isp: "Unknown",
                org: "Unknown",
                zip: "Unknown",
                proxy: false,
                timezone: "UTC",
                query: user.Ip || "",
                regionName: "Unknown",
                as: "",
                countryCode: "",
                dns: {
                    ip: "",
                },
            }
        }

        const userLoginLogs = await prisma.connect_logs.findMany({
            where: {
                accid: user.id
            },
            orderBy: {
                id: "desc"
            },
            take: 60

        })

        const nicksChangeLogs = await prisma.nick_history.findMany({
            where: {
                jogador_id: user.id
            },
            orderBy: {
                id: "desc"
            }

        })

        const safeUser = serializeBigInt(user)
        return NextResponse.json({
            message: `User ${user.Nome} fetched successfully`,
            user: safeUser,
            usersWithSameIp,
            usersWithSameSerial,
            user_ac,
            userChatLog,
            userBanInfo,
            geoLocation,
            userLoginLogs,
            nicksChangeLogs
        }, { status: 200 })
    } catch (error) {
        console.error('Error fetching UCP data:', error);
        return NextResponse.json({ error: 'Failed to fetch UCP data' }, { status: 500 });
    }
}