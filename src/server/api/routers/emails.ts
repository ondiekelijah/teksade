import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const emailsRouter = createTRPCRouter({
  publishAndsendCommunityPublishedEmail: publicProcedure
    .input(
      z.object({
        communityId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const communityToPublish = await ctx.db.community.update({
        where: {
          id: input.communityId,
        },
        data: {
          published: true,
        },
        select: {
          name: true,
          id: true,
          creator: {
            select: {
              email: true,
            },
          },
        },
      });

      return communityToPublish;
    }),
});
