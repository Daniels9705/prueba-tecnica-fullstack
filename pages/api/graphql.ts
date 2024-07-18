import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers';
import { getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import Cors from 'micro-cors';

const cors = Cors();
const prisma = new PrismaClient();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const session = await getSession(req, res);   
    return { prisma, user: session?.user };
  },
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
