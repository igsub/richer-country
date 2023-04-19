import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const countriesRouter = createTRPCRouter({
  getRicherList: publicProcedure.query(async ({ ctx }) => {
    return null
  }),
});
