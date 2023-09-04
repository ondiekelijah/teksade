import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const likesRouter = createTRPCRouter({
  addLikeToCommunity: publicProcedure
    .input(
      z.object({
        memberId: z.string(),
        communityId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const newLike = await ctx.prisma.like.create({
          data: {
            communityId: input.communityId,
            memberId: input.memberId,
          },
        });

        if (newLike) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }),

  getCommunintyLikes: publicProcedure
    .input(
      z.object({
        communityId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const getNumberOfLikes = await ctx.prisma.community.findUnique({
          where: {
            id: input.communityId,
          },
          select: {
            likes: {
              select: {
                id: true,
                memberId: true,
              },
            },
            _count: {
              select: {
                likes: true,
              },
            },
          },
        });
        return getNumberOfLikes;
      } catch (error) {
        console.log(error);
      }
    }),
  removeExistingLike: publicProcedure
    .input(
      z.object({
        likeId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const deletedLike = await ctx.prisma.like.delete({
          where: {
            id: input.likeId,
          },
        });
        return deletedLike;
      } catch (error) {
        console.log(error);
      }
    }),
});
