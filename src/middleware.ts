import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/communities",
    "/api/trpc/announcements.getAnnouncements,communities.getPopularCommunities",
    "/api/trpc/newsletter.subscribeToNewsletter",
    "/api/trpc/communities.getPopularCommunities",
    "/api/trpc/communities.getCommunitiesList",
    "/api/trpc/communities.getCommunitiesList,announcements.getAnnouncements",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
