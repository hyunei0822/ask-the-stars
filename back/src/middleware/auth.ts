import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'] as string;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '액세스 토큰이 필요합니다.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const User = require('../models/User').default;
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
  }
};

export const requireArtist = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.type !== 'artist') {
    return res.status(403).json({ message: '아티스트 권한이 필요합니다.' });
  }
  next();
};
