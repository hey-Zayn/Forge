import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: any): string => {
  return jwt.sign(
    { _id: userId },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

export const generateRefreshToken = (userId: any): string => {
  return jwt.sign(
    { _id: userId },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const verifyToken = (token: string, secret: string): any => {
  return jwt.verify(token, secret);
};
