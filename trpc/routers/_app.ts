import { createTRPCRouter } from '../init';

/**USER ROUTERS */
import { getProperties } from './user/properties'
import { tickets } from './user/ticket';
/**ADMIN ROUTERS */

export const appRouter = createTRPCRouter({
    getProperties: getProperties,
    ticket: tickets,
});

export type AppRouter = typeof appRouter;