import { z } from 'zod'

export const BanAppealSchema = z.object({
    message: z
        .string()
        .min(1, 'at least 1 character')
        .max(2000, 'Máximo 2000 caracteres')
})


export type BanAppealSchema = z.infer<typeof BanAppealSchema>