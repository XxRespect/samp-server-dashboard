import { z } from "zod";
import { createTRPCRouter,baseProcedure} from "../init";


export const getUserTickets = createTRPCRouter({
    getTickets: baseProcedure.input(z.object({
        userid: z.coerce.number()
    }))
    .query(async ({ctx, input}) => {

        
        const tickets = await ctx.prisma.tickets.findMany({
            where: {
                OR: [
                    {against_accid: input.userid},
                    {author_accid: input.userid}
                ]
            },
            include: {
                player_tickets_against_accidToplayer: {
                    select: {
                        Nome: true
                    }
                },
                player_tickets_author_accidToplayer: {
                    select: {
                        Nome: true
                    }
                }
            }
        })
        return tickets;
    })
})
