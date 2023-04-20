import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const countriesRouter = createTRPCRouter({
  getDataByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    ).query(async ({ ctx, input }) => {
    return ctx.prisma.country.findUnique({
      where: {
        name: input.name
      }
    })
  }),

  getRicherList: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.richer.findMany({
      orderBy: [
        {
          win_percentage: 'desc'
        },
        {
          voted: 'desc'
        }
      ]
    })
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

      if (existingCountry) {
        const richerVotes = await ctx.prisma.richer.findUnique({
          where: {
            country_name: input.name,
          }
        })

        const votes = richerVotes?.voted || 0
        const oneMoreVote = input.voted ? 1 : 0
        const appearences = richerVotes ? richerVotes.apeard + 1 : 1

        await ctx.prisma.richer.update({
          where: {
            country_name: input.name,
          },
          data: {
            voted: votes + oneMoreVote,
            apeard: appearences,
            win_percentage: Math.floor((votes * 100) / (appearences))
          }
        })
      }
      else {
        await ctx.prisma.country.create({
          data: {
            name: input.name,
            flag: input.flag,
            alt: input.alt,
          }
        })
        
        await ctx.prisma.richer.create(
          {
            data: {
              country_name: input.name,
              apeard: 1,
              voted: input.voted ? 1 : 0,
              flag: input.flag,
              alt: input.alt,
              win_percentage: input.voted ? 100 : 0
            }
          }
        )
      }
    })
});
