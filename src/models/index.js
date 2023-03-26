// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Genders = {
  "MALE": "MALE",
  "FEMALE": "FEMALE",
  "OTHER": "OTHER"
};

const { Match, User, UserMatch } = initSchema(schema);

export {
  Match,
  User,
  UserMatch,
  Genders
};