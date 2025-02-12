import express from 'express';
import { addContacts, getContacts, removeContacts } from '../controllers/contacts.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/add-contacts', protectRoute, addContacts);
router.post('/get-contacts', protectRoute, getContacts);
router.delete('/remove-contacts', protectRoute, removeContacts);

export default router;