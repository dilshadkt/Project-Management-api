import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
  userId?: string;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authenticated' });
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: jwt.VerifyErrors | null, palyload: JwtPayload | any) => {
      if (err) return res.status(403).json({ message: 'Token is not valid' });
      if (palyload) {
        req.userId = palyload.id;
        next();
      } else {
        res.status(403).json({ message: 'Token is not valid' });
      }
    },
  );
};
