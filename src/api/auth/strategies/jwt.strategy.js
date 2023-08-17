import { Strategy } from 'passport-jwt';
import config from '#config';

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['login_token'];
  }
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: `${config.jwtSecret}`,
};

export const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

