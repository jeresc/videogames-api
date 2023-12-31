import { Strategy } from 'passport-local';
import { getUser } from '#services';

export const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await getUser(email, password)
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
