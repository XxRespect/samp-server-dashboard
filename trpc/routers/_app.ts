import { createTRPCRouter } from '../init';

/**USER ROUTERS */
import { playerRouter } from './user/player';
import { getProperties } from './user/properties'
import {getUserTickets} from './user/usertickets'
import { ticketIdRouter } from './user/ticketid';

/**ADMIN ROUTERS */

export const appRouter = createTRPCRouter({
    player: playerRouter,
    getProperties: getProperties,
    getUserTickets: getUserTickets,
    ticketIdRouter: ticketIdRouter
});

export type AppRouter = typeof appRouter;