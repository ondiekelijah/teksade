import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs";

export const membersRouter = createTRPCRouter({
  getMemberInfo: publicProcedure
    .input(
      z.object({
        memberId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const authInfo = await clerkClient.users.getUser(input.memberId);
        const memberInfo = await ctx.prisma.member.findUnique({
          where: {
            id: input.memberId,
          },
        });

        return {
          ...memberInfo,
          imageUrl: authInfo.imageUrl,
        };
      } catch (error) {
        console.log(error);
      }
    }),
  updateMemberInfo: publicProcedure
    .input(
      z.object({
        memberId: z.string(),
        name: z.string().nullable().optional(),
        email: z.string().nullable().optional(),
        phone: z.string().nullable().optional(),
        institution: z.string().nullable().optional(),
        role: z.string().nullable().optional(),
        about: z.string().nullable().optional(),
        country: z.string().nullable().optional(),
        location: z.string().nullable().optional(),
        github: z.string().nullable().optional(),
        twitter: z.string().nullable().optional(),
        linkedin: z.string().nullable().optional(),
        website: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updateMemberDetails = await ctx.prisma.member.upsert({
          where: {
            id: input.memberId,
          },
          create: {
            id: input.memberId,
            name: input.name,
            email: input.email,
            phone: input.phone,
            institution: input.institution,
            role: input.role,
            about: input.about,
            country: input.country,
            location: input.location,
            github: input.github,
            twitter: input.twitter,
            linkedin: input.linkedin,
            website: input.website,
          },
          update: {
            name: input.name,
            email: input.email,
            phone: input.phone,
            institution: input.institution,
            role: input.role,
            about: input.about,
            country: input.country,
            location: input.location,
            github: input.github,
            twitter: input.twitter,
            linkedin: input.linkedin,
            website: input.website,
          },
        });
        return updateMemberDetails;
      } catch (error) {
        console.log(error);
      }
    }),
  getCommunitiesCreatedByMember: publicProcedure
    .input(
      z.object({
        memberId: z.string(),
        searchTerm: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const createdCommunities = await ctx.prisma.community.findMany({
          where: {
            creatorId: input.memberId,
            name: {
              contains: input.searchTerm,
              mode: "insensitive",
            },
          },
          include: {
            _count: {
              select: {
                members: true,
              },
            },
          },
        });
        return createdCommunities;
      } catch (error) {
        console.log(error);
      }
    }),
  getCommunitiesJoinedByMember: publicProcedure
    .input(
      z.object({
        memberId: z.string(),
        searchTerm: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const joinedCommunites = await ctx.prisma.member.findUnique({
          where: {
            id: input.memberId,
          },
          select: {
            communities_joined: {
              include: {
                _count: {
                  select: {
                    members: true,
                  },
                },
              },
              where: {
                name: {
                  contains: input.searchTerm,
                  mode: "insensitive",
                },
              },
            },
          },
        });
        return joinedCommunites;
      } catch (error) {
        console.log(error);
      }
    }),
});
