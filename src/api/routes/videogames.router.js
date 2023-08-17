import { Router } from 'express';
import {
  getVideogames,
  getVideogameById,
  postVideogame,
  deleteVideogame,
  patchVideogame,
} from '#controllers';
import passport from 'passport';

const router = Router();

router.get('/', getVideogames);
router.get('/:id', getVideogameById);
router.post('/', postVideogame);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  deleteVideogame,
);
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  patchVideogame,
);

export default router;
