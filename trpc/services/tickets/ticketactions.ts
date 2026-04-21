import { baseProcedure, createTRPCRouter } from "../../init";
import {z} from 'zod'


export const replyRouter = createTRPCRouter({
    reply: baseProcedure.input(z.object({
        ticketid: z.coerce.number(),
        sender: z.coerce.number(),
        message: z.string()
    }))
    .mutation(async ({ctx, input}) => {

        const senderAccount = await ctx.prisma.player.findUnique({
            where: {
                id: input.sender
            },
            select: {
                role: true
            }
        })

        if(!senderAccount) {
            throw new Error("Sender account not found")
        }

        const ticket = await ctx.prisma.tickets.findUnique({
            where: {
                ticketid: input.ticketid
            }
        })

        if(!ticket) {
            throw new Error("Ticket not found or deleted")
        }

        const reply = await ctx.prisma.ticket_messages.create({
            data: {
                author_accid: input.sender,
                message: input.message,
                ticketid: input.ticketid,
                role: senderAccount.role
                
            }
        })
        return reply
    })
})