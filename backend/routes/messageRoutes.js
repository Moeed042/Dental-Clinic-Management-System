import express from 'express';
import {
  createMessage,
  getMessages,
  deleteMessage,
} from '../controllers/messageController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to send contact inquiry
router.post('/', createMessage);

// Protected routes for Admin Dashboard
router.get('/', verifyToken, getMessages);
router.delete('/:id', verifyToken, deleteMessage);

export default router;
