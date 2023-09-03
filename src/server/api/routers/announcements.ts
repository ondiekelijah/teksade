import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// Handle fetch announcements, get's the recently added announcement. Just one uisng date created.No inputs.
export const announcementsRouter = createTRPCRouter({
    getAnnouncements: publicProcedure
        .query(async ({ ctx }) => {
            try {
                const announcements = await ctx.prisma.announcements.findMany({
                    orderBy: {
                        created_at: "desc",
                    },
                    take: 1,
                });
                return announcements;
            } catch (error) {
                console.log(error);
            }
        })
    });

    
