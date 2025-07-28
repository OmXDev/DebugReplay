import express from 'express';
import { createLog, getAllLogs } from '../controllers/log.controller';


const router = express.Router();

router.post('/',createLog);
router.get('/',getAllLogs);

export default router;