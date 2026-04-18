import { baseProcedure, createTRPCRouter } from "../../init";
import { z } from "zod";

export const ticketIdRouter = createTRPCRouter({
    getTicketById: baseProcedure.input(z.object({
        ticketid: z.coerce.number()
    }))
        .query(async ({ ctx, input }) => {
            const ticket = await ctx.prisma.tickets.findUnique({
                where: {
                    ticketid: input.ticketid
                },
                include: {
                    player_tickets_against_accidToplayer: {
                        select: {
                            Nome: true,
                            profile:true,
                        }
                    },
                    player_tickets_author_accidToplayer: {
                        select: {
                            Nome: true,
                            profile: true
                        }
                    }
                }
            })

            const messages = await ctx.prisma.ticket_messages.findMany({
                where: {
                    ticketid: input.ticketid
                },
                orderBy: {
                    createdAt: "asc"
                },
                include: {
                    player: {
                        select: {
                            Nome: true,
                            profile: true,
                        }
                    }
                }
            })

    



            if (!ticket) {
                throw new Error("Ticket não encontrado")
            }

            let banInfo = null
            if (ticket.ticket_type === "ban_appeal" && ticket.author_accid != null) {
                banInfo = await ctx.prisma.ban.findFirst({
                    where: {
                        accid: ticket.author_accid
                    }

                })
            }



            return {
                ticket: {
                    id: ticket.ticketid,
                    author_accid: ticket.author_accid,
                    against_accid: ticket.against_accid,
                    type: ticket.ticket_type,
                    status: ticket.status,
                    created_at: ticket.createdAt,
                    updated_at: ticket.updatedAt,
                    author: ticket.player_tickets_author_accidToplayer?.Nome,
                    against: ticket.player_tickets_against_accidToplayer?.Nome
                },
                messages: messages.map((msg) => ({
                    id: msg.id,
                    author_accid: msg.author_accid,
                    author: msg.player.Nome,
                    profile: msg.player.profile,
                    message: msg.message,
                    role: msg.role,
                    created_at: msg.createdAt,
                    updated_at: msg.updatedAt,
                })),
                banInfo: banInfo,
            }
        })
})
