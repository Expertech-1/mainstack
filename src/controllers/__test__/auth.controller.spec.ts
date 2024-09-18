import { Request, Response } from 'express';
import AuthController from '../../controllers/auth.controller';
import AuthService from '../../services/auth.service';
import { setCookie, clearCookie } from '../../utils/cookie.utils';
import { ZodError } from 'zod';

jest.mock('../../services/auth.service');
jest.mock('../../utils/cookie.utils');

describe('AuthController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    mockRequest = {};
    responseObject = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    mockResponse = responseObject;
  });

  describe('register', () => {
    it('should register a user successfully', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      (AuthService.register as jest.Mock).mockResolvedValue(mockUser);
      mockRequest.body = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                mobileNumber: '1234567890',
                password: 'password',
                confirmPassword: 'password',
              };

      await AuthController.register(mockRequest as Request, mockResponse as Response);

      expect(responseObject.status).toHaveBeenCalledWith(201);
      expect(responseObject.json).toHaveBeenCalledWith(mockUser);
    });

    it('should handle validation errors', async () => {
      mockRequest.body = { email: 'invalid-email' };
      // const zodError = new ZodError([{ code: 'invalid_string', message: 'Invalid email', path: ['email'] }]);

      await AuthController.register(mockRequest as Request, mockResponse as Response);

      expect(responseObject.status).toHaveBeenCalledWith(400);
      expect(responseObject.json).toHaveBeenCalledWith({ message: 'Invalid email'});
    });
  });

  describe('signin', () => {
    it('should sign in a user successfully', async () => {
      const mockResult = {
        msg: 'User signed in successfully',
        refreshToken: { refreshToken: 'refresh-token' },
        accessToken: { accessToken: 'access-token' },
        user: { id: '1', email: 'test@example.com' },
      };
      (AuthService.signin as jest.Mock).mockResolvedValue(mockResult);
      mockRequest.body = { email: 'test@example.com', password: 'password' };

      await AuthController.signin(mockRequest as Request, mockResponse as Response);

      expect(setCookie).toHaveBeenCalledWith(mockResponse, 'refreshToken', 'refresh-token', expect.any(Object));
      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: mockResult.msg,
        token: mockResult.accessToken,
        user: mockResult.user,
      });
    });
  });

  describe('signout', () => {
    it('should sign out a user successfully', async () => {
      mockResponse.locals = { user: { email: 'test@example.com' } };

      await AuthController.signout(mockRequest as Request, mockResponse as Response);

      expect(clearCookie).toHaveBeenCalledWith(mockResponse, 'refreshToken');
      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({ message: 'User test@example.com signed out successfully.' });
    });
  });

  describe('refreshToken', () => {
    it('should refresh token successfully', async () => {
      const mockToken = 'new-access-token';
      (AuthService.refreshToken as jest.Mock).mockResolvedValue(mockToken);
      mockRequest.cookies = { refreshToken: 'old-refresh-token' };

      await AuthController.refreshToken(mockRequest as Request, mockResponse as Response);

      expect(responseObject.status).toHaveBeenCalledWith(201);
      expect(responseObject.json).toHaveBeenCalledWith(mockToken);
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const mockUpdatedUser = { id: '1', email: 'updated@example.com' };
      (AuthService.updateUser as jest.Mock).mockResolvedValue(mockUpdatedUser);
      mockRequest.query = { type: 'profile' };
      mockRequest.body = { email: 'updated@example.com' };
      mockResponse.locals = { user: { _id: '1' } };

      await AuthController.updateUser(mockRequest as Request, mockResponse as Response);

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it('should handle user not found', async () => {
      (AuthService.updateUser as jest.Mock).mockResolvedValue(null);
      mockRequest.query = { type: 'profile' };
      mockRequest.body = { email: 'updated@example.com' };
      mockResponse.locals = { user: { _id: '1' } };

      await AuthController.updateUser(mockRequest as Request, mockResponse as Response);

      expect(responseObject.status).toHaveBeenCalledWith(404);
      expect(responseObject.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });
});
