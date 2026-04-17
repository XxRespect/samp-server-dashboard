import { createTRPCRouter } from '../init';

/**USER ROUTERS */
import { playerRouter } from './user/player';
import { getProperties } from './user/properties'
import {getUserTickets} from './user/usertickets'


/**ADMIN ROUTERS */

export const appRouter = createTRPCRouter({
    player: playerRouter,
    getProperties: getProperties,
    getUserTickets: getUserTickets
});

export type AppRouter = typeof appRouter;