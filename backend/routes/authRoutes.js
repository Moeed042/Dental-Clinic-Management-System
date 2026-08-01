import express from 'express';
import { loginAdmin, getMe } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public login route
router.post('/login', loginAdmin);

// Protected token verification route
router.get('/me', verifyToken, getMe);

export default router;
