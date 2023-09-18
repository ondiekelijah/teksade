import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Resend } from "resend";
import CommunityPublishedEmail from "@/components/emails/CommunityPublishedEmail";
import { log } from "console";
const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
export const emailsRouter = createTRPCRouter({
  publishAndsendCommunityPublishedEmail: publicProcedure
    .input(
      z.object({
        communityId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const communityToPublish = await ctx.prisma.community.update({
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
        const sendCommunityPublishedEmail = await resend.emails.send({
          from: "Teksade <contact@teksade.com>",
          to: communityToPublish.creator.email ?? "teksadeproject@gmail.com",
          subject: "🎉 Hooray! Your community is now live!",
          react: CommunityPublishedEmail({
            communityName: communityToPublish.name,
            communityId: communityToPublish.id,
          }),
        });
        if (sendCommunityPublishedEmail.id) {
          console.log("Sent to", communityToPublish.creator.email);
        } else {
          console.log(" Not Sent", communityToPublish.creator.email);
        }
        return sendCommunityPublishedEmail.id;
      } catch (error) {
        console.log(error);
      }
    }),
});
