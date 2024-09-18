import { Response } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

export const setCookie = (
  res: Response, 
  name: string, 
  token: string, 
  options: {
    maxAge?: number; 
    path?: string;   
  } = {}
) => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: isProduction, 
    sameSite: isProduction ? 'strict' : 'lax', 
    path: options.path || '/', 
    maxAge: options.maxAge || 7 * 24 * 60 * 60 * 1000, 
  });
};

export const clearCookie = (
  res: Response, 
  name: string, 
  options: {
    path?: string;
  } = {}
) => {
  res.clearCookie(name, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: options.path || '/', 
  });
};

