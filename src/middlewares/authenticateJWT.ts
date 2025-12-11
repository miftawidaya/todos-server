import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name?: string;
      };
    }
  }
}

/**
 * Middleware to validate JWT token from Authorization header
 * Expected format: "Bearer <token>"
 */
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  // Check if header starts with "Bearer "
  if (!authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'Unauthorized: Invalid token format' });
  }

  // Extract token (remove "Bearer " prefix)
  const token = authHeader.substring(7);

  // Verify token
  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }

  // Attach user to request object
  req.user = user;

  return next();
};
