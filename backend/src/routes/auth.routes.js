import { Router } from 'express';
import { login, me, register, enable2FA, verify2FA } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';
const router = Router();
router.post('/register', register); // for seeding; restrict in production
router.post('/login', login);
router.get('/me', protect, me);
router.post('/2fa/enable', protect, enable2FA);
router.post('/2fa/verify', protect, verify2FA);
export default router;
