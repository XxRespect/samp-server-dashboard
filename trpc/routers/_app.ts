import { createTRPCRouter } from '../init';

/**USER ROUTERS */
import { playerRouter } from './user/player';
import { getProperties } from './user/properties'
import {getUserTickets} from './user/usertickets'
import { ticketid } from './user/ticket';
import {  replyRouter } from '../services/tickets/ticketactions'
/**ADMIN ROUTERS */

export const appRouter = createTRPCRouter({
    player: playerRouter,
    getProperties: getProperties,
    getUserTickets: getUserTickets,
    tickets: ticketid,
    ticketactions: replyRouter
});

export type AppRouter = typeof appRouter;