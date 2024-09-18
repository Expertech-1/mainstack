"use strict";
// // import AuthService from '../../services/auth.service';
// // import { User } from '../../models/user.model';
// // import bcrypt from 'bcryptjs';
// // import { signJwt, verifyJwt } from '../../utils/jwt.utils';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // import jest from 'jest';
// // import { describe, it } from 'node:test';
// // jest.mock('../../models/user.model');
// // jest.mock('bcryptjs');
// // jest.mock('../../utils/jwt.utils');
// // describe('AuthService', () => {
// //   describe('register', () => {
// //     it('should hash the password and create a new user', async () => {
// //       const hashedPassword = 'hashedPassword';
// //       bcrypt.hash = jest.fn().mockResolvedValue(hashedPassword);
// //       const saveMock = jest.fn().mockResolvedValue({
// //         _id: 'userId',
// //         email: 'john@example.com',
// //         userType: 'user',
// //       });
// //       (User as any).findOne = jest.fn().mockResolvedValue(null);
// //       (User as any).mockImplementation(() => ({
// //         save: saveMock,
// //       }));
// //       signJwt.mockReturnValue('accessToken');
// //       const userDetails = {
// //         firstName: 'John',
// //         lastName: 'Doe',
// //         email: 'john@example.com',
// //         password: 'password',
// //         confirmPassword: 'password',
// //       };
// //       const result = await AuthService.register(userDetails);
// //       expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
// //       expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
// //       expect(saveMock).toHaveBeenCalled();
// //       expect(signJwt).toHaveBeenCalledWith(
// //         { id: 'userId', userType: 'user' },
// //         { expiresIn: '1h' }
// //       );
// //       expect(result).toEqual({
// //         message: 'User created successfully',
// //         token: { accessToken: 'accessToken' },
// //       });
// //     });
// //     it('should throw an error if user already exists', async () => {
// //       (User as any).findOne = jest.fn().mockResolvedValue({ email: 'john@example.com' });
// //       const userDetails = {
// //         email: 'john@example.com',
// //         password: 'password',
// //         confirmPassword: 'password',
// //       };
// //       await expect(AuthService.register(userDetails)).rejects.toThrow(
// //         'User already exists with this email.'
// //       );
// //     });
// //   });
// //   describe('signin', () => {
// //     it('should return tokens if credentials are valid', async () => {
// //       const user = {
// //         _id: 'userId',
// //         email: 'test@example.com',
// //         password: 'hashedPassword',
// //         userType: 'user',
// //         status: 'active',
// //       };
// //       bcrypt.compare = jest.fn().mockResolvedValue(true);
// //       signJwt.mockReturnValueOnce('accessToken').mockReturnValueOnce('refreshToken');
// //       (User as any).findOne = jest.fn().mockResolvedValue(user);
// //       const result = await AuthService.signin({
// //         email: 'test@example.com',
// //         password: 'password',
// //       });
// //       expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
// //       expect(signJwt).toHaveBeenCalledTimes(2);
// //       expect(result).toEqual({
// //         msg: 'User signed in successfully',
// //         refreshToken: { refreshToken: 'refreshToken' },
// //         accessToken: { accessToken: 'accessToken' },
// //         user: {
// //           id: 'userId',
// //           email: 'test@example.com',
// //           userType: 'user',
// //           status: 'active',
// //         },
// //       });
// //     });
// //     it('should throw an error if password is invalid', async () => {
// //       bcrypt.compare = jest.fn().mockResolvedValue(false);
// //       (User as any).findOne = jest.fn().mockResolvedValue({
// //         email: 'test@example.com',
// //         password: 'hashedPassword',
// //       });
// //       await expect(
// //         AuthService.signin({ email: 'test@example.com', password: 'wrongpassword' })
// //       ).rejects.toThrow('Invalid email or password');
// //     });
// //   });
// //   describe('refreshToken', () => {
// //     it('should generate a new access token', async () => {
// //       verifyJwt.mockReturnValue({ decoded: { id: 'userId' }, valid: true });
// //       signJwt.mockReturnValue('newAccessToken');
// //       (User as any).findById = jest.fn().mockResolvedValue({ _id: 'userId' });
// //       const result = await AuthService.refreshToken('oldRefreshToken');
// //       expect(verifyJwt).toHaveBeenCalledWith('oldRefreshToken');
// //       expect(User.findById).toHaveBeenCalledWith('userId');
// //       expect(signJwt).toHaveBeenCalledWith({ id: 'userId', userType: undefined }, { expiresIn: '1h' });
// //       expect(result).toBe('newAccessToken');
// //     });
// //   });
// // });
// // function expect(hash: { (s: string, salt: string | number): Promise<string>; (s: string, salt: string | number, callback?: ((err: Error | null, hash: string) => void) | undefined, progressCallback?: ((percent: number) => void) | undefined): void; }) {
// //     throw new Error('Function not implemented.');
// // }
// // import AuthService from '../../services/auth.service';
// // import { User } from '../../models/user.model';
// // import bcrypt from 'bcryptjs';
// // import { signJwt, verifyJwt } from '../../utils/jwt.utils';
// // import { jest } from '@jest/globals';  // Use Jest's globals from the package
// // // Mock the necessary modules
// // jest.mock('../../models/user.model');
// // jest.mock('bcryptjs');
// // jest.mock('../../utils/jwt.utils');
// // describe('AuthService', () => {
// //   describe('register', () => {
// //     it('should hash the password and create a new user', async () => {
// //       const hashedPassword = 'hashedPassword';
// //       // Mock bcrypt.hash to return a resolved promise with the hashed password
// //       (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
// //       const saveMock = jest.fn().mockResolvedValue({
// //         _id: 'userId',
// //         email: 'john@example.com',
// //         userType: 'user',
// //       });
// //       (User.findOne as jest.Mock).mockResolvedValue(null);  // User does not exist
// //       (User as jest.Mock).mockImplementation(() => ({
// //         save: saveMock,
// //       }));
// //       (signJwt as jest.Mock).mockReturnValue('accessToken');
// //       const userDetails = {
// //         firstName: 'John',
// //         lastName: 'Doe',
// //         email: 'john@example.com',
// //         password: 'password',
// //         confirmPassword: 'password',
// //       };
// //       const result = await AuthService.register(userDetails);
// //       // Assertions
// //       expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
// //       expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
// //       expect(saveMock).toHaveBeenCalled();
// //       expect(signJwt).toHaveBeenCalledWith(
// //         { id: 'userId', userType: 'user' },
// //         { expiresIn: '1h' }
// //       );
// //       expect(result).toEqual({
// //         message: 'User created successfully',
// //         token: { accessToken: 'accessToken' },
// //       });
// //     });
// //     it('should throw an error if user already exists', async () => {
// //       // Mock User.findOne to simulate that a user already exists
// //       (User.findOne as jest.Mock).mockResolvedValue({ email: 'john@example.com' });
// //       const userDetails = {
// //         email: 'john@example.com',
// //         password: 'password',
// //         confirmPassword: 'password',
// //       };
// //       await expect(AuthService.register(userDetails)).rejects.toThrow(
// //         'User already exists with this email.'
// //       );
// //     });
// //   });
// //   describe('signin', () => {
// //     it('should return tokens if credentials are valid', async () => {
// //       const user = {
// //         _id: 'userId',
// //         email: 'test@example.com',
// //         password: 'hashedPassword',
// //         userType: 'user',
// //         status: 'active',
// //       };
// //       // Mock bcrypt.compare to simulate password comparison success
// //       (bcrypt.compare as jest.Mock).mockResolvedValue(true);
// //       // Mock signJwt to return fake tokens
// //       (signJwt as jest.Mock)
// //         .mockReturnValueOnce('accessToken')
// //         .mockReturnValueOnce('refreshToken');
// //       // Mock User.findOne to return the user
// //       (User.findOne as jest.Mock).mockResolvedValue(user);
// //       const result = await AuthService.signin({
// //         email: 'test@example.com',
// //         password: 'password',
// //       });
// //       // Assertions
// //       expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
// //       expect(signJwt).toHaveBeenCalledTimes(2);
// //       expect(result).toEqual({
// //         msg: 'User signed in successfully',
// //         refreshToken: { refreshToken: 'refreshToken' },
// //         accessToken: { accessToken: 'accessToken' },
// //         user: {
// //           id: 'userId',
// //           email: 'test@example.com',
// //           userType: 'user',
// //           status: 'active',
// //         },
// //       });
// //     });
// //     it('should throw an error if password is invalid', async () => {
// //       // Mock bcrypt.compare to return false, simulating invalid password
// //       (bcrypt.compare as jest.Mock).mockResolvedValue(false);
// //       // Mock User.findOne to return the user
// //       (User.findOne as jest.Mock).mockResolvedValue({
// //         email: 'test@example.com',
// //         password: 'hashedPassword',
// //       });
// //       await expect(
// //         AuthService.signin({ email: 'test@example.com', password: 'wrongpassword' })
// //       ).rejects.toThrow('Invalid email or password');
// //     });
// //   });
// //   describe('refreshToken', () => {
// //     it('should generate a new access token', async () => {
// //       // Mock verifyJwt to return valid decoded JWT
// //       (verifyJwt as jest.Mock).mockReturnValue({ decoded: { id: 'userId' }, valid: true });
// //       // Mock signJwt to return a new access token
// //       (signJwt as jest.Mock).mockReturnValue('newAccessToken');
// //       // Mock User.findById to return the user
// //       (User.findById as jest.Mock).mockResolvedValue({ _id: 'userId' });
// //       const result = await AuthService.refreshToken('oldRefreshToken');
// //       // Assertions
// //       expect(verifyJwt).toHaveBeenCalledWith('oldRefreshToken');
// //       expect(User.findById).toHaveBeenCalledWith('userId');
// //       expect(signJwt).toHaveBeenCalledWith({ id: 'userId', userType: undefined }, { expiresIn: '1h' });
// //       expect(result).toBe('newAccessToken');
// //     });
// //   });
// // });
// import AuthService from '../../services/auth.service';
// import { User, UType, UStatus } from '../../models/user.model';
// import { signJwt, verifyJwt } from '../../utils/jwt.utils';
// import bcrypt from 'bcryptjs';
// // import jest from 'jest';
// import { jest } from '@jest/globals';
// import { beforeEach, describe, it } from 'node:test';
// // Mock dependencies
// jest.mock('../models/user.model');
// jest.mock('../utils/jwt.utils');
// jest.mock('bcryptjs');
// describe('AuthService', () => {
//   beforeEach(() => {
//     jest.resetAllMocks();
//   });
//   describe('register', () => {
//     it('should register a new user successfully', async () => {
//       const mockUserDetails = {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john@example.com',
//         mobileNumber: '1234567890',
//         password: 'password123',
//       };
//       (User.findOne as jest.Mock).mockResolvedValue(null);
//       (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
//       (User.prototype.save as jest.Mock) = jest.fn();
//       (signJwt as jest.Mock).mockReturnValue('mockedAccessToken');
//       const result = await AuthService.register(mockUserDetails);
//       expect(User.findOne).toHaveBeenCalledWith({ email: mockUserDetails.email });
//       expect(bcrypt.hash).toHaveBeenCalledWith(mockUserDetails.password, 10);
//       expect(User.prototype.save).toHaveBeenCalled();
//       expect(signJwt).toHaveBeenCalled();
//       expect(result).toEqual({
//         message: "User created sucessfully",
//         token: { accessToken: 'mockedAccessToken' }
//       });
//     });
//     it('should throw an error if user already exists', async () => {
//       const mockUserDetails = {
//         email: 'existing@example.com',
//         password: 'password123',
//       };
//       (User.findOne as jest.Mock).mockResolvedValue({ email: mockUserDetails.email });
//       await expect(AuthService.register(mockUserDetails)).rejects.toThrow('User already exists with this email.');
//     });
//   });
//   describe('signin', () => {
//     it('should sign in a user successfully', async () => {
//       const mockUserDetails = {
//         email: 'user@example.com',
//         password: 'password123',
//       };
//       const mockUser = {
//         _id: 'userId',
//         email: mockUserDetails.email,
//         password: 'hashedPassword',
//         userType: UType.User,
//         status: UStatus.Active,
//       };
//       (User.findOne as jest.Mock).mockResolvedValue(mockUser);
//       (bcrypt.compare as jest.Mock).mockResolvedValue(true);
//       (signJwt as jest.Mock).mockReturnValueOnce('mockedAccessToken').mockReturnValueOnce('mockedRefreshToken');
//       const result = await AuthService.signin(mockUserDetails);
//       expect(User.findOne).toHaveBeenCalledWith({ email: mockUserDetails.email });
//       expect(bcrypt.compare).toHaveBeenCalledWith(mockUserDetails.password, mockUser.password);
//       expect(signJwt).toHaveBeenCalledTimes(2);
//       expect(result).toEqual({
//         msg: "User signed in successfully",
//         refreshToken: { refreshToken: 'mockedRefreshToken' },
//         accessToken: { accessToken: 'mockedAccessToken' },
//         user: {
//           id: mockUser._id,
//           email: mockUser.email,
//           userType: mockUser.userType,
//           status: mockUser.status,
//         },
//       });
//     });
//     it('should throw an error if user does not exist', async () => {
//       const mockUserDetails = {
//         email: 'nonexistent@example.com',
//         password: 'password123',
//       };
//       (User.findOne as jest.Mock).mockResolvedValue(null);
//       await expect(AuthService.signin(mockUserDetails)).rejects.toThrow('Invalid email or password');
//     });
//     it('should throw an error if password is incorrect', async () => {
//       const mockUserDetails = {
//         email: 'user@example.com',
//         password: 'wrongpassword',
//       };
//       (User.findOne as jest.Mock).mockResolvedValue({ password: 'hashedPassword' });
//       (bcrypt.compare as jest.Mock).mockResolvedValue(false);
//       await expect(AuthService.signin(mockUserDetails)).rejects.toThrow('Invalid email or password');
//     });
//   });
//   describe('refreshToken', () => {
//     it('should refresh token successfully', async () => {
//       const mockToken = 'validRefreshToken';
//       const mockDecodedToken = { decoded: { id: 'userId' }, valid: true };
//       const mockUser = { _id: 'userId', userType: UType.User };
//       (verifyJwt as jest.Mock).mockReturnValue(mockDecodedToken);
//       (User.findById as jest.Mock).mockResolvedValue(mockUser);
//       (signJwt as jest.Mock).mockReturnValue('newAccessToken');
//       const result = await AuthService.refreshToken(mockToken);
//       expect(verifyJwt).toHaveBeenCalledWith(mockToken);
//       expect(User.findById).toHaveBeenCalledWith('userId');
//       expect(signJwt).toHaveBeenCalledWith(
//         { id: mockUser._id, user_type: mockUser.userType },
//         { expiresIn: '1h' }
//       );
//       expect(result).toBe('newAccessToken');
//     });
//     it('should throw an error if refresh token is not found', async () => {
//       await expect(AuthService.refreshToken('')).rejects.toThrow('Refresh token not found.');
//     });
//     it('should throw an error if refresh token is invalid', async () => {
//       (verifyJwt as jest.Mock).mockReturnValue({ valid: false });
//       await expect(AuthService.refreshToken('invalidToken')).rejects.toThrow('Invalid refresh token.');
//     });
//     it('should throw an error if user is not found', async () => {
//       const mockDecodedToken = { decoded: { id: 'nonexistentUserId' }, valid: true };
//       (verifyJwt as jest.Mock).mockReturnValue(mockDecodedToken);
//       (User.findById as jest.Mock).mockResolvedValue(null);
//       await expect(AuthService.refreshToken('validToken')).rejects.toThrow('Invalid refresh token.');
//     });
//   });
//   describe('updateUser', () => {
//     it('should update user successfully', async () => {
//       const mockUserId = 'userId';
//       const mockUpdateDetails = { email: 'newemail@example.com' };
//       const mockUpdatedUser = { _id: mockUserId, ...mockUpdateDetails };
//       (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);
//       const result = await AuthService.updateUser(mockUserId, mockUpdateDetails);
//       expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, mockUpdateDetails, { new: true });
//       expect(result).toEqual({ msg: "Account Updated Successfully" });
//     });
//     it('should update password successfully', async () => {
//       const mockUserId = 'userId';
//       const mockUpdateDetails = { password: 'newPassword' };
//       const mockUpdatedUser = { _id: mockUserId };
//       (bcrypt.hash as jest.Mock).mockResolvedValue('hashedNewPassword');
//       (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);
//       const result = await AuthService.updateUser(mockUserId, mockUpdateDetails, 'password');
//       expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10);
//       expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
//         mockUserId,
//         { password: 'hashedNewPassword' },
//         { new: true }
//       );
//       expect(result).toEqual({ msg: "Account Updated Successfully" });
//     });
//     it('should return error message if user is not found', async () => {
//       const mockUserId = 'nonexistentUserId';
//       const mockUpdateDetails = { email: 'newemail@example.com' };
//       (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
//       const result = await AuthService.updateUser(mockUserId, mockUpdateDetails);
//       expect(result).toEqual({ msg: "Account Updated Error" });
//     });
//   });
// });
// function expect(hash: { (s: string, salt: string | number): Promise<string>; (s: string, salt: string | number, callback?: ((err: Error | null, hash: string) => void) | undefined, progressCallback?: ((percent: number) => void) | undefined): void; }) {
//     throw new Error('Function not implemented.');
// }
// import { jest } from '@jest/globals';
// import AuthService from '../../services/auth.service';
// import { User, UType, UStatus, IUser } from '../../models/user.model';
// import { signJwt, verifyJwt } from '../../utils/jwt.utils';
// import bcrypt from 'bcryptjs';
// // // import jest from 'jest';
// // import { jest } from '@jest/globals';
// import { beforeEach, describe, it } from 'node:test';
// // Mock dependencies
// jest.mock('../models/user.model');
// jest.mock('../utils/jwt.utils');
// jest.mock('bcryptjs');
// // Helper type for mocked functions
// type MockedFunction<T extends (...args: any[]) => any> = jest.MockedFunction<T>;
// describe('AuthService', () => {
//   beforeEach(() => {
//     jest.resetAllMocks();
//   });
//   describe('register', () => {
//     it('should register a new user successfully', async () => {
//       const mockUserDetails = {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john@example.com',
//         mobileNumber: '1234567890',
//         password: 'password123',
//       };
//       (User.findOne as MockedFunction<typeof User.findOne>).mockResolvedValue(null);
//       (bcrypt.hash as MockedFunction<typeof bcrypt.hash>).mockResolvedValue('hashedPassword', 10)
//       (User.prototype.save as jest.Mock) = jest.fn().mockResolvedValue({
//         _id: 'mockedUserId',
//         ...mockUserDetails,
//         password: 'hashedPassword',
//       });
//       (signJwt as MockedFunction<typeof signJwt>).mockReturnValue('mockedAccessToken');
//       const result = await AuthService.register(mockUserDetails);
//       expect(User.findOne as MockedFunction<typeof User.findOne>).toHaveBeenCalledWith({ email: mockUserDetails.email } as IUser);
//       expect(bcrypt.hash as MockedFunction<typeof bcrypt.hash>).toHaveBeenCalledWith(mockUserDetails.password, 10);
//       expect(User.prototype.save).toHaveBeenCalled();
//       expect(signJwt).toHaveBeenCalled();
//       expect(result).toEqual({
//         message: "User created successfully",
//         token: { accessToken: 'mockedAccessToken' }
//       });
//     });
//     it('should throw an error if user already exists', async () => {
//       const mockUserDetails = {
//         email: 'existing@example.com',
//         password: 'password123',
//       };
//       (User.findOne as MockedFunction<typeof User.findOne>).mockResolvedValue({ email: mockUserDetails.email } as IUser);
//       await expect(AuthService.register(mockUserDetails) as MockedFunction<typeof IUser>).rejects.toThrow('User already exists with this email.');
//     });
//   });
//   describe('signin', () => {
//     it('should sign in a user successfully', async () => {
//       const mockUserDetails = {
//         email: 'user@example.com',
//         password: 'password123',
//       };
//       const mockUser = {
//         _id: 'userId',
//         email: mockUserDetails.email,
//         password: 'hashedPassword',
//         userType: UType.User,
//         status: UStatus.Active,
//       } as IUser;
//       (User.findOne as MockedFunction<typeof User.findOne>).mockResolvedValue(mockUser);
//       (bcrypt.compare as MockedFunction<typeof bcrypt.compare>).mockResolvedValue(true);
//       (signJwt as MockedFunction<typeof signJwt>)
//         .mockReturnValueOnce('mockedAccessToken')
//         .mockReturnValueOnce('mockedRefreshToken');
//       const result = await AuthService.signin(mockUserDetails);
//       expect(User.findOne).toHaveBeenCalledWith({ email: mockUserDetails.email });
//       expect(bcrypt.compare).toHaveBeenCalledWith(mockUserDetails.password, mockUser.password);
//       expect(signJwt).toHaveBeenCalledTimes(2);
//       expect(result).toEqual({
//         msg: "User signed in successfully",
//         refreshToken: { refreshToken: 'mockedRefreshToken' },
//         accessToken: { accessToken: 'mockedAccessToken' },
//         user: {
//           id: mockUser._id,
//           email: mockUser.email,
//           userType: mockUser.userType,
//           status: mockUser.status,
//         },
//       });
//     });
//     it('should throw an error if user does not exist', async () => {
//       const mockUserDetails = {
//         email: 'nonexistent@example.com',
//         password: 'password123',
//       };
//       (User.findOne as MockedFunction<typeof User.findOne>).mockResolvedValue(null);
//       await expect(AuthService.signin(mockUserDetails)).rejects.toThrow('Invalid email or password');
//     });
//     it('should throw an error if password is incorrect', async () => {
//       const mockUserDetails = {
//         email: 'user@example.com',
//         password: 'wrongpassword',
//       };
//       const mockUser = {
//         email: mockUserDetails.email,
//         password: 'hashedPassword',
//       } as IUser;
//       (User.findOne as MockedFunction<typeof User.findOne>).mockResolvedValue(mockUser);
//       (bcrypt.compare as MockedFunction<typeof bcrypt.compare>).mockResolvedValue(false);
//       await expect(AuthService.signin(mockUserDetails)).rejects.toThrow('Invalid email or password');
//     });
//   });
//   describe('refreshToken', () => {
//     it('should refresh token successfully', async () => {
//       const mockToken = 'validRefreshToken';
//       const mockDecodedToken = { decoded: { id: 'userId' }, valid: true };
//       const mockUser = { _id: 'userId', userType: UType.User } as IUser;
//       (verifyJwt as MockedFunction<typeof verifyJwt>).mockReturnValue(mockDecodedToken);
//       (User.findById as MockedFunction<typeof User.findById>).mockResolvedValue(mockUser);
//       (signJwt as MockedFunction<typeof signJwt>).mockReturnValue('newAccessToken');
//       const result = await AuthService.refreshToken(mockToken);
//       expect(verifyJwt).toHaveBeenCalledWith(mockToken);
//       expect(User.findById).toHaveBeenCalledWith('userId');
//       expect(signJwt).toHaveBeenCalledWith(
//         { id: mockUser._id, user_type: mockUser.userType },
//         { expiresIn: '1h' }
//       );
//       expect(result).toBe('newAccessToken');
//     });
//     it('should throw an error if refresh token is not found', async () => {
//       await expect(AuthService.refreshToken('')).rejects.toThrow('Refresh token not found.');
//     });
//     it('should throw an error if refresh token is invalid', async () => {
//       const mockToken = 'invalidToken';
//       (verifyJwt as MockedFunction<typeof verifyJwt>).mockReturnValue({ valid: false });
//       await expect(AuthService.refreshToken(mockToken)).rejects.toThrow('Invalid refresh token.');
//     });
//     it('should throw an error if user is not found', async () => {
//       const mockToken = 'validToken';
//       const mockDecodedToken = { decoded: { id: 'nonexistentUserId' }, valid: true };
//       (verifyJwt as MockedFunction<typeof verifyJwt>).mockReturnValue(mockDecodedToken);
//       (User.findById as MockedFunction<typeof User.findById>).mockResolvedValue(null);
//       await expect(AuthService.refreshToken(mockToken)).rejects.toThrow('Invalid refresh token.');
//     });
//   });
//   describe('updateUser', () => {
//     it('should update user successfully', async () => {
//       const mockUserId = 'userId';
//       const mockUpdateDetails = { email: 'newemail@example.com' };
//       const mockUpdatedUser = { _id: mockUserId, ...mockUpdateDetails } as IUser;
//       (User.findByIdAndUpdate as MockedFunction<typeof User.findByIdAndUpdate>).mockResolvedValue(mockUpdatedUser);
//       const result = await AuthService.updateUser(mockUserId, mockUpdateDetails);
//       expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, mockUpdateDetails, { new: true });
//       expect(result).toEqual({ msg: "Account Updated Successfully" });
//     });
//     it('should update password successfully', async () => {
//       const mockUserId = 'userId';
//       const mockUpdateDetails = { password: 'newPassword' };
//       const mockUpdatedUser = { _id: mockUserId } as IUser;
//       (bcrypt.hash as MockedFunction<typeof bcrypt.hash>).mockResolvedValue('hashedNewPassword');
//       (User.findByIdAndUpdate as MockedFunction<typeof User.findByIdAndUpdate>).mockResolvedValue(mockUpdatedUser);
//       const result = await AuthService.updateUser(mockUserId, mockUpdateDetails, 'password');
//       expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10);
//       expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
//         mockUserId,
//         { password: 'hashedNewPassword' },
//         { new: true }
//       );
//       expect(result).toEqual({ msg: "Account Updated Successfully" });
//     });
//     it('should return error message if user is not found', async () => {
//       const mockUserId = 'nonexistentUserId';
//       const mockUpdateDetails = { email: 'newemail@example.com' };
//       (User.findByIdAndUpdate as MockedFunction<typeof User.findByIdAndUpdate>).mockResolvedValue(null);
//       const result = await AuthService.updateUser(mockUserId, mockUpdateDetails);
//       expect(result).toEqual({ msg: "Account Updated Error" });
//     });
//   });
// });
// function expect(findOne: { <ResultDoc = import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{ _id: unknown; }>>(filter: import("mongoose").RootFilterQuery<IUser>, projection: import("mongoose").ProjectionType<IUser> | null | undefined, options: import("mongoose").QueryOptions<IUser> & { lean: true; }): import("mongoose").Query<(import("mongoose").FlattenMaps<IUser> & Required<{ _id: import("mongoose").FlattenMaps<unknown>; }>) | null, ResultDoc, {}, IUser, "findOne", {}>; <ResultDoc = import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{ _id: unknown; }>>(filter?: import("mongoose").RootFilterQuery<IUser> | undefined, projection?: import("mongoose").ProjectionType<IUser> | null | undefined, options?: import("mongoose").QueryOptions<IUser> | null | undefined): import("mongoose").Query<ResultDoc | null, ResultDoc, {}, IUser, "findOne", {}>; <ResultDoc = import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{ _id: unknown; }>>(filter?: import("mongoose").RootFilterQuery<IUser> | undefined, projection?: import("mongoose").ProjectionType<IUser> | null | undefined): import("mongoose").Query<ResultDoc | null, ResultDoc, {}, IUser, "findOne", {}>; <ResultDoc = import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{ _id: unknown; }>>(filter?: import("mongoose").RootFilterQuery<IUser> | undefined): import("mongoose").Query<ResultDoc | null, ResultDoc, {}, IUser, "findOne", {}>; }) {
//     throw new Error('Function not implemented.');
// }
// import { jest } from '@jest/globals';
// import AuthService from '../../services/auth.service';
// import { User, UType, UStatus, IUser } from '../../models/user.model';
// import { signJwt, verifyJwt } from '../../utils/jwt.utils';
// import bcrypt from 'bcryptjs';
// // import { jest } from '@jest/globals';
// import { beforeEach, describe, it } from 'node:test';
// // Mock dependencies
// jest.mock('../../models/user.model');
// jest.mock('../../utils/jwt.utils');
// jest.mock('bcryptjs');
// // Helper type for mocked functions
// type MockedFunction<T extends (...args: any[]) => any> = jest.MockedFunction<T>;
// describe('AuthService', () => {
//   beforeEach(() => {
//     jest.resetAllMocks();
//   });
//   describe('register', () => {
//     it('should register a new user successfully', async () => {
//       const mockUserDetails: IUser = {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john@example.com',
//         mobileNumber: '1234567890',
//         password: 'password123',
//       };
//       // Mocking the database and utilities
//       (User.findOne as MockedFunction<typeof User.findOne>).mockResolvedValue(null);
//       (bcrypt.hash as MockedFunction<typeof bcrypt.hash>).mockResolvedValue('hashedPassword');
//       (User.prototype.save as jest.Mock).mockResolvedValue({
//         _id: 'mockedUserId',
//         ...mockUserDetails,
//         password: 'hashedPassword',
//       } as IUser);
//       (signJwt as MockedFunction<typeof signJwt>).mockReturnValue('mockedAccessToken');
//       const result = await AuthService.register(mockUserDetails);
//       expect(User.findOne).toHaveBeenCalledWith({ email: mockUserDetails.email } as Partial<IUser>);
//       expect(bcrypt.hash).toHaveBeenCalledWith(mockUserDetails.password, 10) ;
//       expect(User.prototype.save).toHaveBeenCalled();
//       expect(signJwt).toHaveBeenCalledWith({ id: 'mockedUserId', userType: undefined }, { expiresIn: '1h' });
//       expect(result).toEqual({
//         message: "User created successfully",
//         token: { accessToken: 'mockedAccessToken' }
//       });
//     });
//     it('should throw an error if user already exists', async () => {
//       const mockUserDetails = {
//         email: 'existing@example.com',
//         password: 'password123',
//       };
//       (User.findOne as MockedFunction<typeof User.findOne>).mockResolvedValue({ email: mockUserDetails.email } as IUser);
//       await expect(AuthService.register(mockUserDetails)).rejects.toThrow('User already exists with this email.');
//     });
//   });
//   describe('signin', () => {
//     it('should sign in a user successfully', async () => {
//       const mockUserDetails = {
//         email: 'user@example.com',
//         password: 'password123',
//       };
//       const mockUser: IUser = {
//         _id: 'userId',
//         email: mockUserDetails.email,
//         password: 'hashedPassword',
//         userType: UType.User,
//         status: UStatus.Active,
//       };
//       (User.findOne as MockedFunction<typeof User.findOne>).mockResolvedValue(mockUser);
//       (bcrypt.compare as MockedFunction<typeof bcrypt.compare>).mockResolvedValue(true);
//       (signJwt as MockedFunction<typeof signJwt>)
//         .mockReturnValueOnce('mockedAccessToken')
//         .mockReturnValueOnce('mockedRefreshToken');
//       const result = await AuthService.signin(mockUserDetails);
//       expect(User.findOne).toHaveBeenCalledWith({ email: mockUserDetails.email });
//       expect(bcrypt.compare).toHaveBeenCalledWith(mockUserDetails.password, mockUser.password);
//       expect(signJwt).toHaveBeenCalledTimes(2);
//       expect(result).toEqual({
//         msg: "User signed in successfully",
//         refreshToken: { refreshToken: 'mockedRefreshToken' },
//         accessToken: { accessToken: 'mockedAccessToken' },
//         user: {
//           id: mockUser._id,
//           email: mockUser.email,
//           userType: mockUser.userType,
//           status: mockUser.status,
//         },
//       });
//     });
//     it('should throw an error if user does not exist', async () => {
//       const mockUserDetails = {
//         email: 'nonexistent@example.com',
//         password: 'password123',
//       };
//       (User.findOne as MockedFunction<typeof User.findOne>).mockResolvedValue(null);
//       await expect(AuthService.signin(mockUserDetails)).rejects.toThrow('Invalid email or password');
//     });
//     it('should throw an error if password is incorrect', async () => {
//       const mockUserDetails = {
//         email: 'user@example.com',
//         password: 'wrongpassword',
//       };
//       const mockUser: IUser = {
//         email: mockUserDetails.email,
//         password: 'hashedPassword',
//       };
//       (User.findOne as MockedFunction<typeof User.findOne>).mockResolvedValue(mockUser);
//       (bcrypt.compare as MockedFunction<typeof bcrypt.compare>).mockResolvedValue(false);
//       await expect(AuthService.signin(mockUserDetails)).rejects.toThrow('Invalid email or password');
//     });
//   });
//   describe('refreshToken', () => {
//     it('should refresh token successfully', async () => {
//       const mockToken = 'validRefreshToken';
//       const mockDecodedToken = { decoded: { id: 'userId' }, valid: true };
//       const mockUser: IUser = { _id: 'userId', userType: UType.User };
//       (verifyJwt as MockedFunction<typeof verifyJwt>).mockReturnValue(mockDecodedToken);
//       (User.findById as MockedFunction<typeof User.findById>).mockResolvedValue(mockUser);
//       (signJwt as MockedFunction<typeof signJwt>).mockReturnValue('newAccessToken');
//       const result = await AuthService.refreshToken(mockToken);
//       expect(verifyJwt).toHaveBeenCalledWith(mockToken);
//       expect(User.findById).toHaveBeenCalledWith('userId');
//       expect(signJwt).toHaveBeenCalledWith(
//         { id: mockUser._id, user_type: mockUser.userType },
//         { expiresIn: '1h' }
//       );
//       expect(result).toBe('newAccessToken');
//     });
//     it('should throw an error if refresh token is invalid', async () => {
//       const mockToken = 'invalidToken';
//       (verifyJwt as MockedFunction<typeof verifyJwt>).mockReturnValue({ valid: false });
//       await expect(AuthService.refreshToken(mockToken)).rejects.toThrow('Invalid refresh token.');
//     });
//     it('should throw an error if user is not found', async () => {
//       const mockToken = 'validToken';
//       const mockDecodedToken = { decoded: { id: 'nonexistentUserId' }, valid: true };
//       (verifyJwt as MockedFunction<typeof verifyJwt>).mockReturnValue(mockDecodedToken);
//       (User.findById as MockedFunction<typeof User.findById>).mockResolvedValue(null);
//       await expect(AuthService.refreshToken(mockToken)).rejects.toThrow('Invalid refresh token.');
//     });
//   });
//   describe('updateUser', () => {
//     it('should update user successfully', async () => {
//       const mockUserId = 'userId';
//       const mockUpdateDetails = { email: 'newemail@example.com' };
//       const mockUpdatedUser: IUser = { _id: mockUserId, ...mockUpdateDetails };
//       (User.findByIdAndUpdate as MockedFunction<typeof User.findByIdAndUpdate>).mockResolvedValue(mockUpdatedUser);
//       const result = await AuthService.updateUser(mockUserId, mockUpdateDetails);
//       expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, mockUpdateDetails, { new: true });
//       expect(result).toEqual({ msg: "Account Updated Successfully" });
//     });
//     it('should update password successfully', async () => {
//       const mockUserId = 'userId';
//       const mockUpdateDetails = { password: 'newPassword' };
//       const mockUpdatedUser: IUser = { _id: mockUserId };
//       (bcrypt.hash as MockedFunction<typeof bcrypt.hash>).mockResolvedValue('hashedNewPassword');
//       (User.findByIdAndUpdate as MockedFunction<typeof User.findByIdAndUpdate>).mockResolvedValue(mockUpdatedUser);
//       const result = await AuthService.updateUser(mockUserId, mockUpdateDetails, 'password');
//       expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10);
//       expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
//         mockUserId,
//         { password: 'hashedNewPassword' },
//         { new: true }
//       );
//       expect(result).toEqual({ msg: "Account Updated Successfully" });
//     });
//     it('should return error message if user is not found', async () => {
//       const mockUserId = 'nonexistentUserId';
//       const mockUpdateDetails = { email: 'newemail@example.com' };
//       (User.findByIdAndUpdate as MockedFunction<typeof User.findByIdAndUpdate>).mockResolvedValue(null);
//       const result = await AuthService.updateUser(mockUserId, mockUpdateDetails);
//       expect(result).toEqual({ msg: "Account Updated Error" });
//     });
//   });
// });
// function expect(findOne: { <ResultDoc = import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{ _id: unknown; }>>(filter: import("mongoose").RootFilterQuery<IUser>, projection: import("mongoose").ProjectionType<IUser> | null | undefined, options: import("mongoose").QueryOptions<IUser> & { lean: true; }): import("mongoose").Query<(import("mongoose").FlattenMaps<IUser> & Required<{ _id: import("mongoose").FlattenMaps<unknown>; }>) | null, ResultDoc, {}, IUser, "findOne", {}>; <ResultDoc = import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{ _id: unknown; }>>(filter?: import("mongoose").RootFilterQuery<IUser> | undefined, projection?: import("mongoose").ProjectionType<IUser> | null | undefined, options?: import("mongoose").QueryOptions<IUser> | null | undefined): import("mongoose").Query<ResultDoc | null, ResultDoc, {}, IUser, "findOne", {}>; <ResultDoc = import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{ _id: unknown; }>>(filter?: import("mongoose").RootFilterQuery<IUser> | undefined, projection?: import("mongoose").ProjectionType<IUser> | null | undefined): import("mongoose").Query<ResultDoc | null, ResultDoc, {}, IUser, "findOne", {}>; <ResultDoc = import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{ _id: unknown; }>>(filter?: import("mongoose").RootFilterQuery<IUser> | undefined): import("mongoose").Query<ResultDoc | null, ResultDoc, {}, IUser, "findOne", {}>; }) {
//     throw new Error('Function not implemented.');
// }
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_service_1 = __importDefault(require("../../services/auth.service"));
const user_model_1 = require("../../models/user.model");
const jwt_utils_1 = require("../../utils/jwt.utils");
const globals_1 = require("@jest/globals");
const node_test_1 = require("node:test");
globals_1.jest.mock('bcryptjs');
globals_1.jest.mock('../../models/user.model');
globals_1.jest.mock('../../utils/jwt.utils');
(0, node_test_1.describe)('AuthService Tests', () => {
    const mockUser = {
        _id: '605c72ed4ad5f5e95c17b0f4',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'hashedpassword123',
        userType: 'User',
        status: 'Active',
    };
    (0, node_test_1.describe)('register', () => {
        (0, node_test_1.it)('should register a new user successfully', async () => {
            user_model_1.User.findOne.mockResolvedValue(null);
            bcryptjs_1.default.hash.mockImplementation(async () => 'hashedpassword123');
            jwt_utils_1.signJwt.mockReturnValue('access-token');
            user_model_1.User.prototype.save.mockResolvedValue(mockUser);
            const userDetails = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                password: 'password123',
                confirmPassword: 'password123',
            };
            const result = await auth_service_1.default.register(userDetails);
            expect(user_model_1.User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
            expect(bcryptjs_1.default.hash).toHaveBeenCalledWith('password123', 10);
            expect(result).toEqual({
                message: 'User created successfully'
                // token: { accessToken: 'access-token' }
            });
        });
        (0, node_test_1.it)('should throw an error if the user already exists', async () => {
            user_model_1.User.findOne.mockResolvedValue(mockUser);
            const userDetails = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                password: 'password123',
                confirmPassword: 'password123',
            };
            await expect(auth_service_1.default.register(userDetails)).rejects.toThrow('User already exists with this email');
            expect(user_model_1.User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
        });
    });
    (0, node_test_1.describe)('signin', () => {
        (0, node_test_1.it)('should sign in successfully with valid credentials', async () => {
            user_model_1.User.findOne.mockResolvedValue(mockUser);
            bcryptjs_1.default.compare.mockImplementation(async () => true);
            jwt_utils_1.signJwt.mockReturnValueOnce('access-token').mockReturnValueOnce('refresh-token');
            const userDetails = {
                email: 'john@example.com',
                password: 'password123',
            };
            const result = await auth_service_1.default.signin(userDetails);
            expect(user_model_1.User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
            expect(bcryptjs_1.default.compare).toHaveBeenCalledWith('password123', 'hashedpassword123');
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
        (0, node_test_1.it)('should throw an error for invalid email or password', async () => {
            user_model_1.User.findOne.mockResolvedValue(mockUser);
            bcryptjs_1.default.compare.mockImplementation(async () => false);
            const userDetails = {
                email: 'john@example.com',
                password: 'wrongpassword',
            };
            await expect(auth_service_1.default.signin(userDetails)).rejects.toThrow('Invalid email or password');
            expect(bcryptjs_1.default.compare).toHaveBeenCalledWith('wrongpassword', 'hashedpassword123');
        });
        (0, node_test_1.it)('should throw an error if the user does not exist', async () => {
            user_model_1.User.findOne.mockResolvedValue(null); // No user found
            const userDetails = {
                email: 'nonexistent@example.com',
                password: 'password123',
            };
            await expect(auth_service_1.default.signin(userDetails)).rejects.toThrow('Invalid email or password');
            expect(user_model_1.User.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
        });
    });
    (0, node_test_1.describe)('refreshToken', () => {
        (0, node_test_1.it)('should refresh access token when valid refresh token is provided', async () => {
            jwt_utils_1.verifyJwt.mockReturnValue({ decoded: { id: mockUser._id }, valid: true });
            jwt_utils_1.signJwt.mockReturnValue('new-access-token');
            user_model_1.User.findById.mockResolvedValue(mockUser);
            const result = await auth_service_1.default.refreshToken('valid-refresh-token');
            expect(jwt_utils_1.verifyJwt).toHaveBeenCalledWith('valid-refresh-token');
            expect(user_model_1.User.findById).toHaveBeenCalledWith(mockUser._id);
            expect(result).toBe('new-access-token');
        });
        (0, node_test_1.it)('should throw an error for invalid refresh token', async () => {
            jwt_utils_1.verifyJwt.mockReturnValue({ valid: false });
            await expect(auth_service_1.default.refreshToken('invalid-refresh-token')).rejects.toThrow('Invalid refresh token');
            expect(jwt_utils_1.verifyJwt).toHaveBeenCalledWith('invalid-refresh-token');
        });
    });
    (0, node_test_1.describe)('updateUser', () => {
        (0, node_test_1.it)('should update the user password successfully', async () => {
            bcryptjs_1.default.hash.mockImplementation(async () => 'new-hashed-password');
            user_model_1.User.findByIdAndUpdate.mockResolvedValue(mockUser);
            const result = await auth_service_1.default.updateUser(mockUser._id, { password: 'newpassword123' }, 'password');
            expect(bcryptjs_1.default.hash).toHaveBeenCalledWith('newpassword123', 10);
            expect(user_model_1.User.findByIdAndUpdate).toHaveBeenCalledWith(mockUser._id, { password: 'new-hashed-password' }, { new: true });
            expect(result).toEqual({ msg: 'Account Updated Successfully' });
        });
        (0, node_test_1.it)('should update the user details successfully', async () => {
            user_model_1.User.findByIdAndUpdate.mockResolvedValue(mockUser);
            const result = await auth_service_1.default.updateUser(mockUser._id, { firstName: 'Jane' });
            expect(user_model_1.User.findByIdAndUpdate).toHaveBeenCalledWith(mockUser._id, { firstName: 'Jane' }, { new: true });
            expect(result).toEqual({ msg: 'Account Updated Successfully' });
        });
        (0, node_test_1.it)('should return an error if user update fails', async () => {
            user_model_1.User.findByIdAndUpdate.mockResolvedValue(null);
            const result = await auth_service_1.default.updateUser(mockUser._id, { firstName: 'Jane' });
            expect(result).toEqual({ msg: 'Account Updated Error' });
        });
    });
});
