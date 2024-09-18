import bcrypt from 'bcryptjs';
import AuthService from '../../services/auth.service';
import { User } from '../../models/user.model';
import { signJwt, verifyJwt } from '../../utils/jwt.utils';
import { jest } from '@jest/globals';
import { beforeEach, describe, it } from 'node:test';

jest.mock('bcryptjs');
jest.mock('../../models/user.model');
jest.mock('../../utils/jwt.utils');

describe('AuthService Tests', () => {
  const mockUser = {
    _id: '605c72ed4ad5f5e95c17b0f4',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'hashedpassword123',
    userType: 'User',
    status: 'Active',
  };

  describe('register', () => {
    it('should register a new user successfully', async () => {
      (User.findOne as jest.MockedFunction<typeof User.findOne>).mockResolvedValue(null); 
      (bcrypt.hash as jest.Mock).mockImplementation(async () => 'hashedpassword123');
      (signJwt as jest.Mock).mockReturnValue('access-token');
      (User.prototype.save as jest.MockedFunction<typeof User.findOne>).mockResolvedValue(mockUser);

      const userDetails = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const result = await AuthService.register(userDetails);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(result).toEqual({
        message: 'User created successfully'
        // token: { accessToken: 'access-token' }
      });
    });

    it('should throw an error if the user already exists', async () => {
      (User.findOne as jest.MockedFunction<typeof User.findOne>).mockResolvedValue(mockUser); 

      const userDetails = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      await expect(AuthService.register(userDetails)).rejects.toThrow('User already exists with this email');
      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
    });
  });

  describe('signin', () => {
    it('should sign in successfully with valid credentials', async () => {
      (User.findOne as jest.MockedFunction<typeof User.findOne>).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockImplementation(async () => true);
      (signJwt as jest.Mock).mockReturnValueOnce('access-token').mockReturnValueOnce('refresh-token');

      const userDetails = {
        email: 'john@example.com',
        password: 'password123',
      };

      const result = await AuthService.signin(userDetails);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedpassword123');
      expect(result).toEqual({
        msg: 'User signed in successfully',
        refreshToken: { refreshToken: 'refresh-token' },
        accessToken: { accessToken: 'access-token' },
        user: {
          id: '605c72ed4ad5f5e95c17b0f4',
          email: 'john@example.com',
          userType: 'User',
          status: 'Active',
        },
      });
    });

    it('should throw an error for invalid email or password', async () => {
      (User.findOne as jest.MockedFunction<typeof User.findOne>).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockImplementation(async () => false);
      
      const userDetails = {
        email: 'john@example.com',
        password: 'wrongpassword',
      };

      await expect(AuthService.signin(userDetails)).rejects.toThrow('Invalid email or password');
      expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'hashedpassword123');
    });

    it('should throw an error if the user does not exist', async () => {
      (User.findOne as jest.MockedFunction<typeof User.findOne>).mockResolvedValue(null); 

      const userDetails = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      await expect(AuthService.signin(userDetails)).rejects.toThrow('Invalid email or password');
      expect(User.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
    });
  });

  describe('refreshToken', () => {
    it('should refresh access token when valid refresh token is provided', async () => {
      (verifyJwt as jest.Mock).mockReturnValue({ decoded: { id: mockUser._id }, valid: true });
      (signJwt as jest.Mock).mockReturnValue('new-access-token');
      (User.findById as jest.MockedFunction<typeof User.findOne>).mockResolvedValue(mockUser);

      const result = await AuthService.refreshToken('valid-refresh-token');

      expect(verifyJwt).toHaveBeenCalledWith('valid-refresh-token');
      expect(User.findById).toHaveBeenCalledWith(mockUser._id);
      expect(result).toBe('new-access-token');
    });

    it('should throw an error for invalid refresh token', async () => {
      (verifyJwt as jest.Mock).mockReturnValue({ valid: false });

      await expect(AuthService.refreshToken('invalid-refresh-token')).rejects.toThrow('Invalid refresh token');
      expect(verifyJwt).toHaveBeenCalledWith('invalid-refresh-token');
    });
  });

  describe('updateUser', () => {
    it('should update the user password successfully', async () => {
      (bcrypt.hash as jest.Mock).mockImplementation(async () => 'new-hashed-password');
      (User.findByIdAndUpdate as jest.MockedFunction<typeof User.findOne>).mockResolvedValue(mockUser);

      const result = await AuthService.updateUser(mockUser._id, { password: 'newpassword123' }, 'password');

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        mockUser._id,
        { password: 'new-hashed-password' },
        { new: true }
      );
      expect(result).toEqual({ msg: 'Account Updated Successfully' });
    });

    it('should update the user details successfully', async () => {
      (User.findByIdAndUpdate as jest.MockedFunction<typeof User.findOne>).mockResolvedValue(mockUser);

      const result = await AuthService.updateUser(mockUser._id, { firstName: 'Jane' });

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockUser._id, { firstName: 'Jane' }, { new: true });
      expect(result).toEqual({ msg: 'Account Updated Successfully' });
    });

    it('should return an error if user update fails', async () => {
      (User.findByIdAndUpdate as jest.MockedFunction<typeof User.findOne>).mockResolvedValue(null);

      const result = await AuthService.updateUser(mockUser._id, { firstName: 'Jane' });

      expect(result).toEqual({ msg: 'Account Updated Error' });
    });
  });
});
