import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const membersRouter = createTRPCRouter({
  getMemberInfo: publicProcedure
    .input(
      z.object({
        memberId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const memberInfo = await ctx.prisma.member.findUnique({
          where: {
            id: input.memberId,
          },
        });
        return memberInfo;
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
});
