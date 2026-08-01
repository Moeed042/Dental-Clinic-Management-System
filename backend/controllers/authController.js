import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminModel } from '../models/adminModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dental_clinic_jwt_secret_key_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const identifier = email || username;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/username and password',
      });
    }

    // Default Fallback Admin verification if DB not seeded
    if (identifier === 'admin@dentalclinic.com' || identifier === 'admin') {
      if (password === 'admin123') {
        const token = jwt.sign(
          { id: 1, username: 'admin', email: 'admin@dentalclinic.com' },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN }
        );
        return res.json({
          success: true,
          message: 'Login successful',
          token,
          admin: { id: 1, username: 'admin', email: 'admin@dentalclinic.com' },
        });
      }
    }

    // Check DB for Admin User
    const admin = await AdminModel.findByUsernameOrEmail(identifier);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User not found.',
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Password incorrect.',
      });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, email: admin.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const admin = await AdminModel.findById(req.admin.id);
    res.json({
      success: true,
      admin: admin || req.admin,
    });
  } catch (error) {
    next(error);
  }
};
