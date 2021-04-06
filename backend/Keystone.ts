import 'dotenv/config';
import {config, createSchema} from '@keystone-next/keystone/schema';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-nico-shop-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

export default config({
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
  }),
  ui: {
    // todo change this gor roles
    isAccessAllowed: () => true,
  },
  // todo: add session values here
});
