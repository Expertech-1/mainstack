import { Request, Response, query } from 'express';
import AuthService from '../services/auth.service';
import { createUserSchema, signInUserSchema, updateUserSchema } from '../schema/user.schema';
import { clearCookie, setCookie } from '../utils/cookie.utils';
import z from 'zod';


class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const body = createUserSchema.parse(req.body);
      const user = await AuthService.register(body);
      res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
  

  static async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      const token = await AuthService.refreshToken(refreshToken);
      res.status(201).json(token);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async signin(req: Request, res: Response) {
    try {
      const body = signInUserSchema.parse(req.body);
      const result = await AuthService.signin(body);
      setCookie(res, 'refreshToken', result.refreshToken.refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000 }); 
      res.status(200).json({ message: result.msg, token: result.accessToken, user: result.user });
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors });
      }
      return res.status(400).json({ message: err.message });
    }
  }

  static async signout(req: Request, res: Response) {
    try {
      const user = res.locals.user;
      clearCookie(res, 'refreshToken');
      return res.status(200).json({ message: `User ${user.email} signed out successfully.` });
    } catch (err: any) {
      return res.status(500).json({ message: 'Error signing out. Please try again later.' });
    }
  }


  static async updateUser(req: Request, res: Response) {
    try {
      const validatedData = updateUserSchema.parse({
        type: req.query,
        body: req.body,
      });
      const userId = res.locals.user._id;
      const { type = '' } = validatedData.type;
      const updateData = validatedData.body;
      const user = await AuthService.updateUser(userId, updateData, type);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
  
}

export default AuthController;
