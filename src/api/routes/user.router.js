import { Router } from 'express';
import { getAllUsers, postUser } from '#controllers';

const router = Router();

router.get('/', getAllUsers);
router.post('/', postUser);

export default router;
