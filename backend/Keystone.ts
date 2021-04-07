import { createAuth } from '@keystone-next/auth';
import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-nico-shop-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // todo add in initial roles here
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTED_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // todo:  add data seeding here
    },
    lists: createSchema({
      // schema items go in here
      User,
    }),
    ui: {
      // todo change this gor roles
      isAccessAllowed: ({ session }) => {
        console.log(session);
        return session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL query
      User: 'id name email',
    }),
  })
);
