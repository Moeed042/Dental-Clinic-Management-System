import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

// Import backend API routes
import authRoutes from './backend/routes/authRoutes.js';
import appointmentRoutes from './backend/routes/appointmentRoutes.js';
import messageRoutes from './backend/routes/messageRoutes.js';
import { errorHandler } from './backend/utils/errorHandler.js';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes FIRST
  app.use('/api/auth', authRoutes);
  app.use('/api/appointments', appointmentRoutes);
  app.use('/api/messages', messageRoutes);

  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Dental Clinic Management Full-Stack API',
      timestamp: new Date().toISOString(),
    });
  });

  // Vite middleware for development vs static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Error handling middleware
  app.use(errorHandler);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Full-Stack Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
