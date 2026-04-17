import { z } from "zod";
import { createTRPCRouter,baseProcedure} from "../../init";


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
            },
            take: 100
        })
        return (
            tickets.map((ticket) => ({
                id: ticket.ticketid,
                author_accid: ticket.author_accid,
                against_accid: ticket.against_accid,
                title: ticket.name,
                ticket_type: ticket.ticket_type,
                status: ticket.status,
                created_at: ticket.createdAt,
                updated_at: ticket.updatedAt,
                author_name: ticket.player_tickets_author_accidToplayer?.Nome || "Desconhecido",
                against_name: ticket.player_tickets_against_accidToplayer?.Nome || "Desconhecido"
            }))
        );
    })
})
