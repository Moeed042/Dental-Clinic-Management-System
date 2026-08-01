import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { errorHandler, notFoundHandler } from './utils/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/messages', messageRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Dental Clinic API Backend',
    timestamp: new Date().toISOString(),
  });
});

// Handle 404 & Global Errors
app.use(notFoundHandler);
app.use(errorHandler);

// Start standalone backend server if invoked directly
// if (process.env.STANDALONE_BACKEND === 'true' || process.argv[1].endsWith('backend/server.js')) {
//   app.listen(PORT, '0.0.0.0', () => {
//     console.log(`[Backend Server] Express API running on port ${PORT}`);
//   });
// }

// export default app;

app.listen(PORT, () => {
  console.log(`✅ Backend Server running on http://localhost:${PORT}`);
});

export default app;