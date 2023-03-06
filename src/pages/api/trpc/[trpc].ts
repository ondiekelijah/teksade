import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/_app";

//Creates a  trpc endpoint in our api
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
