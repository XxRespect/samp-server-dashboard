
export { NextResponse } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { url } from 'inspector';


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1)
    const limit = Number(searchParams.get("limit") || 20)
    const search = (searchParams.get("search") || "")
    const orderBy = searchParams.get("orderBy") || "id"
    const order = searchParams.get("order") || "desc"
    const skip = (page - 1) * limit

    let where = {}

    if (search) {
        if (!isNaN(Number(search))) {
            where = {
                id: Number(search)
            }
        } else {
            where = {
                Nome: {
                    contains: search,
                }
            }
        }
    }

    try {
        const users = await prisma.player.findMany({

            skip: skip,
            take: limit,
            where,
            orderBy: {
                [orderBy]: order
            },
            select: {
                id: true,
                Nome: true,
                profile: true,
                Admin: true,
                ADMIN_TEMP: true,
                BANNED: true,
                Online: true,
                Score: true,
                user_register: true,
                timestamp: true,
                LasTimer: true,
            },

        });

        
        return NextResponse.json({ message: 'UCP data fetched successfully', users, }, { status: 200 });
    }
    catch (error) {
        console.error('Error fetching UCP:', error);
        return NextResponse.json({ error: 'Failed to fetch UCP data. This problem may caused due the database status' }, { status: 500 });
    }
}


