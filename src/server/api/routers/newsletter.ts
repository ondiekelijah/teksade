import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// Handle email subscriptions
export const newsletterRouter = createTRPCRouter({
  subscribeToNewsletter: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const newSubscriber = await ctx.prisma.newsletter.create({
          data: {
            email: input.email,
          },
        });

        if (newSubscriber) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("error", error);
      }
    }),
});
