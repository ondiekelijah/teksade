import { createYoga, createSchema } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    // Disable body parsing (required for future  file uploads)
    bodyParser: false,
  },
};

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  graphqlEndpoint: "/api/graphql",
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        greetings: String
      }
    `,
    resolvers: {
      Query: {
        greetings: () =>
          " Jambo devs ! Welcome to Tesksade GraphQl Endpoint .Stay tuned for amazing features",
      },
    },
  }),
});
