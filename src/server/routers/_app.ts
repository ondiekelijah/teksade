import { router } from "../trpc";
import { communitesRouter } from "./communites";
import { membersRouter } from "./members";
import { newsletterRouter } from "./newsletter";

//The entry point to our API
export const appRouter = router({
  COMMUNITES_API: communitesRouter,
  MEMBERS_API: membersRouter,
  NEWSLETTER_API: newsletterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
