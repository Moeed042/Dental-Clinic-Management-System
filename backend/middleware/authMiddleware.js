import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dental_clinic_jwt_secret_key_2026';

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access Denied: Missing or invalid Authorization token',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access Denied: No token provided',
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.',
        expired: true,
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid or corrupted token.',
    });
  }
};
