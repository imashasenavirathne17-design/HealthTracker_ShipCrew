import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roles.js';
import * as ctrl from '../controllers/report.controller.js';
const router = Router();
router.use(protect);
router.get('/summary', authorize('HEALTH_OFFICER'), ctrl.summaryReport);
router.get('/incidents', authorize('EMERGENCY_OFFICER'), ctrl.incidentReport);
export default router;
