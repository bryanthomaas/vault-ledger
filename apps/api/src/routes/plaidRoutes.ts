import { Router } from 'express';
import { linkPlaid } from '../controllers/plaidController';

const router = Router();

router.post('/link', linkPlaid);

export default router;
