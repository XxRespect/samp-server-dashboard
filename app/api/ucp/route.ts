export { NextResponse } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export default async function GET(req: NextRequest) {
    try {
        await prisma.ban.findMany();
        return NextResponse.json({ message: 'Dashboard data fetched successfully' });
    }
    catch (error) {
        console.error('Error fetching dashboard data:', error);
        return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
    }
}

