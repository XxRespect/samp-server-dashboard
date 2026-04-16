import { createTRPCRouter } from '../init';
import { playerRouter } from './player';
import { getProperties } from './properties'

export const appRouter = createTRPCRouter({
    player: playerRouter,
    getProperties: getProperties
});

export type AppRouter = typeof appRouter;