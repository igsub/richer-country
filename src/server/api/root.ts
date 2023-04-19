import { createTRPCRouter } from "~/server/api/trpc";
import { countriesRouter } from "./routers/country";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  countries: countriesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
