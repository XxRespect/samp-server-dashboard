import { z } from 'zod'


export const TicketReplySchema = z.object({
    message: z
        .string()
        .min(5, 'Mínimo 5 caracteres')
        .max(2000, 'Máximo 2000 caracteres')
        .trim(),
    ticketId: z.coerce.number().int().positive(),
    authorAccid: z.coerce.number().int().positive(),
})

export type TicketReplySchema = z.infer<typeof TicketReplySchema>