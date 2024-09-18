"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("../../controllers/auth.controller"));
const auth_service_1 = __importDefault(require("../../services/auth.service"));
const cookie_utils_1 = require("../../utils/cookie.utils");
jest.mock('../../services/auth.service');
jest.mock('../../utils/cookie.utils');
describe('AuthController', () => {
    let mockRequest;
    let mockResponse;
    let responseObject;
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
            auth_service_1.default.register.mockResolvedValue(mockUser);
            mockRequest.body = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                mobileNumber: '1234567890',
                password: 'password',
                confirmPassword: 'password',
            };
            await auth_controller_1.default.register(mockRequest, mockResponse);
            expect(responseObject.status).toHaveBeenCalledWith(201);
            expect(responseObject.json).toHaveBeenCalledWith(mockUser);
        });
        it('should handle validation errors', async () => {
            mockRequest.body = { email: 'invalid-email' };
            // const zodError = new ZodError([{ code: 'invalid_string', message: 'Invalid email', path: ['email'] }]);
            await auth_controller_1.default.register(mockRequest, mockResponse);
            expect(responseObject.status).toHaveBeenCalledWith(400);
            expect(responseObject.json).toHaveBeenCalledWith({ message: 'Invalid email' });
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
            auth_service_1.default.signin.mockResolvedValue(mockResult);
            mockRequest.body = { email: 'test@example.com', password: 'password' };
            await auth_controller_1.default.signin(mockRequest, mockResponse);
            expect(cookie_utils_1.setCookie).toHaveBeenCalledWith(mockResponse, 'refreshToken', 'refresh-token', expect.any(Object));
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
            await auth_controller_1.default.signout(mockRequest, mockResponse);
            expect(cookie_utils_1.clearCookie).toHaveBeenCalledWith(mockResponse, 'refreshToken');
            expect(responseObject.status).toHaveBeenCalledWith(200);
            expect(responseObject.json).toHaveBeenCalledWith({ message: 'User test@example.com signed out successfully.' });
        });
    });
    describe('refreshToken', () => {
        it('should refresh token successfully', async () => {
            const mockToken = 'new-access-token';
            auth_service_1.default.refreshToken.mockResolvedValue(mockToken);
            mockRequest.cookies = { refreshToken: 'old-refresh-token' };
            await auth_controller_1.default.refreshToken(mockRequest, mockResponse);
            expect(responseObject.status).toHaveBeenCalledWith(201);
            expect(responseObject.json).toHaveBeenCalledWith(mockToken);
        });
    });
    describe('updateUser', () => {
        it('should update user successfully', async () => {
            const mockUpdatedUser = { id: '1', email: 'updated@example.com' };
            auth_service_1.default.updateUser.mockResolvedValue(mockUpdatedUser);
            mockRequest.query = { type: 'profile' };
            mockRequest.body = { email: 'updated@example.com' };
            mockResponse.locals = { user: { _id: '1' } };
            await auth_controller_1.default.updateUser(mockRequest, mockResponse);
            expect(responseObject.status).toHaveBeenCalledWith(200);
            expect(responseObject.json).toHaveBeenCalledWith(mockUpdatedUser);
        });
        it('should handle user not found', async () => {
            auth_service_1.default.updateUser.mockResolvedValue(null);
            mockRequest.query = { type: 'profile' };
            mockRequest.body = { email: 'updated@example.com' };
            mockResponse.locals = { user: { _id: '1' } };
            await auth_controller_1.default.updateUser(mockRequest, mockResponse);
            expect(responseObject.status).toHaveBeenCalledWith(404);
            expect(responseObject.json).toHaveBeenCalledWith({ message: 'User not found' });
        });
    });
});
