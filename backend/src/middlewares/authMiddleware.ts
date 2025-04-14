import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
}

interface DecodedToken {
  userId: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}
const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default authMiddleware;
