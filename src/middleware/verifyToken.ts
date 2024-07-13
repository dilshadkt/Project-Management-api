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
  // const token = req.cookies.token;
  const token = req.header('X-auth-token');
  if (!token)
    return res
      .status(401)
      .json({ status: false, message: 'Not authenticated' });
  jwt.verify(
    token.split(' ')[1],
    process.env.JWT_SECRET as string,
    async (err: jwt.VerifyErrors | null, palyload: JwtPayload | any) => {
      if (err) return res.status(403).json({ message: 'Token is not valid' });
      if (palyload) {
        req.userId = palyload.id;
        next();
      } else {
        res.status(403).json({ status: false, message: 'Token is not valid' });
      }
    },
  );
};
