import { baseProcedure, createTRPCRouter } from "../../init";
import {z} from 'zod'


export const replyRouter = createTRPCRouter({
    create: baseProcedure.input(z.object({
        ticketid: z.coerce.number(),
        userid: z.coerce.number(),
        message: z.string()
    }))
    .query(async ({ctx, input}) => {
        const reply = await ctx.prisma.ticket_messages.create({
            data: {
                author_accid: input.userid,
                message: input.message,
                ticketid: input.ticketid
                
            }
        })
        return reply
    })
})