import { z } from 'zod'
import { createTRPCRouter, baseProcedure } from '../init'
import { serializeBigInt } from '@/utils/api/serializer'


export const playerRouter = createTRPCRouter({
    getPlayer: baseProcedure.input(z.object({
        id: z.number()
    }))
    .query(async ({ctx, input}) => {
        const player = await ctx.prisma.player.findUnique({
            where: {
                id: input.id
            }
        });
        return serializeBigInt(player);
    })
})