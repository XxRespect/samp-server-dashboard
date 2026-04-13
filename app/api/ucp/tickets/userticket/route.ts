import { prisma } from '@/lib/prisma'

import { NextRequest, NextResponse } from 'next/server'



/*************  ✨ Windsurf Command ⭐  *************/
/**
 * GET /api/ucp/tickets/userticket
 * 
 * Recupera os tickets do banco.
 * 
 * @returns {NextResponse} - Resposta com a lista de tickets do banco.
 */
/*******  5d997326-2c1b-4355-905c-4e3d9ced9c5e  *******/
export async function GET(req: NextRequest) {
    try {

        const tickets = await prisma.tickets.findMany({
                where: {

                }
        })

    } catch(error) {
        return NextResponse.json({
            message: `Error: ${error}`
        })
    }
}