import { createTRPCRouter } from '../init';
import { playerRouter } from './player';
import { getProperties } from './properties'
import {getUserTickets} from './usertickets'


export const appRouter = createTRPCRouter({
    player: playerRouter,
    getProperties: getProperties,
    getUserTickets: getUserTickets
});

export type AppRouter = typeof appRouter;