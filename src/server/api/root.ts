import { createTRPCRouter } from "@/server/api/trpc";
import { communitiesRouter } from "./routers/communities";
import { membersRouter } from "./routers/members";
import { likesRouter } from "./routers/likes";
import { newsletterRouter } from "./routers/newsletter";
import { announcementsRouter } from "./routers/announcements";
import { emailsRouter } from "./routers/emails";

/**
 * This is the primary router for our backend.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  communities: communitiesRouter,
  members: membersRouter,
  likes: likesRouter,
  newsletter: newsletterRouter,
  announcements: announcementsRouter,
  emails: emailsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
