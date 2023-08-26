import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { techFocusAreas } from "@/utils/constants";

export const communitiesRouter = createTRPCRouter({
  getCommunitiesList: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        country: z.string(),
        filterByNew: z.boolean(),
        focusAreas: z.string().array(),
      })
    )
    .query(async ({ input, ctx }) => {
      const communityList = await ctx.prisma.community.findMany({
        where: {
          country: input.country,
          focus_area: { in: input.focusAreas.length ? input.focusAreas : techFocusAreas },
        },
        include: {
          _count: {
            select: {
              members: true,
            },
          },
        },
        take: input.limit,
        orderBy: [
          {
            members: {
              _count: "desc",
            },
          },
          {
            updated_at: input.filterByNew ? "asc" : "desc",
          },
        ],
      });
      return communityList;
    }),

  getPopularCommunities: publicProcedure.query(async ({ ctx }) => {
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

  // Get community details
  getCommunityDetails: publicProcedure
    .input(
      z.object({
        communityId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const communityDetails = await ctx.prisma.community.findUnique({
        where: {
          id: input.communityId,
        },
        include: {
          members: true,
          creator: true,
          _count: {
            select: {
              members: true,
            },
          },
        },
      });
      return communityDetails;
    }),
    

  createNewCommunity: publicProcedure
    .input(
      z.object({
        creatorId: z.string(),
        communityName: z.string(),
        communityDescription: z.string(),
        country: z.string(),
        location: z.string(),
        focusArea: z.string(),
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
          focus_area: input.focusArea,
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
