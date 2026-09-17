import { z } from 'zod'


export const TicketReplySchema = z.object({
    message: z
        .string()
        .min(1, 'at least 1 character')
        .max(2000, 'Maximum of 2000 characters')
})

export type TicketReplySchema = z.infer<typeof TicketReplySchema>