import express from 'express';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/:otherUserId', protectRoute, getMessages);
router.post('/send', protectRoute, sendMessage);

export default router;