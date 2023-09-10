import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/communities",
    "/api/trpc/announcements.getAnnouncements,communities.getPopularCommunities", 
    "/api/trpc/communities.getCommunitiesList,announcements.getAnnouncements"
  ],
  ignoredRoutes: [
    "/((?!api|trpc))(_next|.+\..+)(.*)",
    "/api/trpc/communities.getPopularCommunities"
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
