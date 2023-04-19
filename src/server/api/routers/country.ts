import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const countriesRouter = createTRPCRouter({

  getRicherList: publicProcedure.query(async ({ ctx }) => {
    return null
  }),

  vote: publicProcedure
    .input(
      z.object({
        name: z.string(),
        flag: z.string(),
        voted: z.boolean(),
        alt: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingCountry = await ctx.prisma.country.findUnique({
        where: {
          name: input.name,
        }
      })

      console.log("existingCountry", existingCountry)

      if (existingCountry) {
        const richerVotes = await ctx.prisma.richer.findUnique({
          where: {
            country_name: existingCountry.name,
          }
        })

        const votes = richerVotes?.voted || 0
        const oneMoreVote = input.voted ? 1 : 0

        const update = await ctx.prisma.richer.update({
          where: {
            country_name: existingCountry.name,
          },
          data: {
            voted: votes + oneMoreVote,
            apeard: richerVotes ? richerVotes.apeard + 1 : 1
          }
        })
        console.log("update", update)
      }
      else {
        const createdCountry = await ctx.prisma.country.create({
          data: {
            name: input.name,
            flag: input.flag,
            alt: input.alt,
          }
        })
        console.log("createdCountry", createdCountry)
        const createdRicher = await ctx.prisma.richer.create(
          {
            data: {
              country_name: input.name,
              apeard: 1,
              voted: input.voted ? 1 : 0
            }
          }
        )
        console.log("created richer", createdRicher)
      }
    })
});
