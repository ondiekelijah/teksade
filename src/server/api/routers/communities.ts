import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { techFocusAreas, technologies } from "@/utils/constants";

export const communitiesRouter = createTRPCRouter({
  getCommunityInfo: publicProcedure.input(z.object({ communityId: z.string() })).query(async ({ input, ctx }) => {
    try {
      const communityInfo = ctx.prisma.community.findUnique({
        where: {
          id: input.communityId,
        },
        include: {
          members: {
            select: {
              id: true,
            },
          },
        },
      });
      return communityInfo;
    } catch (error) {
      console.log(error);
    }
  }),
  getCommunitiesList: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        country: z.string().optional(),
        filterByNew: z.boolean(),
        technologies: z.string().array().optional(),
        focusAreas: z.string().array().optional(),
        searchTerm: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const communityList = await ctx.prisma.community.findMany({
          where: {
            AND: [
              input.country
                ? {
                    country: input.country,
                  }
                : {},

              input.technologies?.length
                ? {
                    technologies: {
                      hasSome: input.technologies,
                    },
                  }
                : {},
              input.focusAreas?.length
                ? {
                    focus_area: {
                      in: input.focusAreas,
                    },
                  }
                : {},
              input.searchTerm
                ? {
                    name: {
                      contains: input.searchTerm,
                      mode: "insensitive",
                    },
                  }
                : {},
            ],
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
              created_at: input.filterByNew ? "desc" : "asc",
            },
          ],
        });
        return communityList;
      } catch (error) {
        console.log(error);
      }
    }),

  getPopularCommunities: publicProcedure.query(async ({ ctx }) => {
    try {
      const popularCommnitiesFetch = await ctx.prisma.community.findMany({
        orderBy: {
          members: {
            _count: "desc",
          },
        },
        take: 10,
      });
      return popularCommnitiesFetch;
    } catch (error) {
      console.log(error);
    }
  }),

  // Get community details
  getCommunityDetails: publicProcedure
    .input(
      z.object({
        communityId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
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
      } catch (error) {
        console.log(error);
      }
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
        technologies: z.string().array().optional(),
        logo_url: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    }),

  addMemberToCommunity: publicProcedure
    .input(
      z.object({
        memberId: z.string(),
        communityId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const addMember = await ctx.prisma.community.update({
          where: {
            id: input.communityId,
          },
          data: {
            members: {
              connect: {
                id: input.memberId,
              },
            },
          },
          select: {
            _count: {
              select: {
                members: true,
              },
            },
          },
        });
        return addMember;
      } catch (error) {
        console.log(error);
      }
    }),
  updateCommunity: publicProcedure
    .input(
      z.object({
        communityID: z.string(),
        name: z.string().optional(),
        focusArea: z.string().optional(),
        description: z.string().optional(),
        location: z.string().optional(),
        technologies: z.string().array().optional(),
        github: z.string().url().optional(),
        twitter: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        website: z.string().url().optional(),
        whatsapp: z.string().url().optional(),
        phone: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const communityUpdate = await ctx.prisma.community.update({
          where: {
            id: input.communityID,
          },
          data: {
            name: input.name,
            focus_area: input.focusArea,
            description: input.description,
            location: input.location,
            technologies: input.technologies,
            github: input.github,
            twitter: input.twitter,
            linkedin: input.linkedin,
            website: input.website,
            whatsapp: input.whatsapp,
            phone: input.phone,
          },
        });
        return communityUpdate.id;
      } catch (error) {
        console.log(error);
      }
    }),
  deleteCommunity: publicProcedure
    .input(
      z.object({
        communityID: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const communityDeletion = await ctx.prisma.community.delete({
          where: {
            id: input.communityID,
          },
        });
        return communityDeletion.id;
      } catch (error) {
        console.log(error);
      }
    }),
});
