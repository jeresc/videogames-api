import passport from 'passport';

import { LocalStrategy, JwtStrategy } from './strategies/index.js';

passport.use(LocalStrategy);
passport.use(JwtStrategy);

export default passport;
