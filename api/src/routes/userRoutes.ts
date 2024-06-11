import { Router } from 'express';
import { searchUsers } from '../controllers/userController';

const router = Router();

router.post('/search', searchUsers);

export default router;
