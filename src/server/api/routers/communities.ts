import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const communitiesRouter = createTRPCRouter({
  getCommunitiesList: publicProcedure.input(z.object({ limit: z.number() })).query(async ({ input, ctx }) => {
    const communityList = await ctx.prisma.community.findMany({
      orderBy: {
        members: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: {
            members: true,
          },
        },
      },
      take: input.limit,
    });
    return communityList;
  }),
  getPopularCommunities: publicProcedure.query(async ({ ctx }) => {
    ctx.auth.userId ? console.log("signed In") : console.log("No User");

    const popularCommnitiesFetch = await ctx.prisma.community.findMany({
      orderBy: {
        members: {
          _count: "desc",
        },
      },
      take: 10,
    });
    return popularCommnitiesFetch;
  }),
  createNewCommunity: publicProcedure
    .input(
      z.object({
        creatorId: z.string(),
        communityName: z.string(),
        communityDescription: z.string(),
        country: z.string(),
        location: z.string(),
        focusAreas: z.string().array(),
        technologies: z.string().array(),
        logo_url: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newCommunityCreation = await ctx.prisma.community.create({
        data: {
          name: input.communityName,
          description: input.communityDescription,
          country: input.country,
          location: input.location,
          focus_areas: input.focusAreas,
          technologies: input.technologies,
          logo_link: input.logo_url,
          creator: {
            connectOrCreate: {
              where: {
                id: input.creatorId,
              },
              create: {
                id: input.creatorId,
              },
            },
          },
          members: {
            connectOrCreate: {
              where: {
                id: input.creatorId,
              },
              create: {
                id: input.creatorId,
              },
            },
          },
        },
      });
      return newCommunityCreation;
    }),
});
