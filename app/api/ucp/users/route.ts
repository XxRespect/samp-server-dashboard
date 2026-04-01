import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'






export async function GET(req: NextRequest) {
    try {
        const users = await prisma.player.findMany({
      
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
                },
                orderBy: {
                    Online: 'desc'
                },
                take: 20
            
        });
         return NextResponse.json({ message: 'UCP data fetched successfully', users },{status: 200});
    }
    catch (error) {
        console.error('Error fetching UCP data:', error);
        return NextResponse.json({ error: 'Failed to fetch UCP data' }, { status: 500 });
    }
}

