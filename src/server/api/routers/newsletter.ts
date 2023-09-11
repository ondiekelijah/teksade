import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            return "The user already exists in the Newsletter list";
          }
        }
      }
    }),
});
