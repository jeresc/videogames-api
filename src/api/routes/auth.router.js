import { Router } from 'express';
import { login } from '#controllers';
import passport from 'passport';
import { checkSession } from '#controllers';

const router = Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  login,
);

router.post(
  '/check-session',
  passport.authenticate('jwt', { session: false }),
  checkSession
);

export default router;
