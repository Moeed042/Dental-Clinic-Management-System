import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getDashboardStats,
} from '../controllers/appointmentController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to book appointment
router.post('/', createAppointment);

// Protected routes for Admin Dashboard
router.get('/', verifyToken, getAppointments);
router.get('/stats', verifyToken, getDashboardStats);
router.get('/:id', verifyToken, getAppointmentById);
router.put('/:id', verifyToken, updateAppointment);
router.patch('/status/:id', verifyToken, updateAppointmentStatus);
router.delete('/:id', verifyToken, deleteAppointment);

export default router;
