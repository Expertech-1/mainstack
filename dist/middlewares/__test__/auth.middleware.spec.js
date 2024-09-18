"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_utils_1 = require("../../utils/jwt.utils");
const user_model_1 = require("../../models/user.model");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware")); // Update this path
jest.mock('../../utils/jwt.utils');
jest.mock('../../models/user.model');
describe('authorizeUser middleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction = jest.fn();
    beforeEach(() => {
        mockRequest = {
            headers: {},
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return 401 if no token is provided', async () => {
        await (0, auth_middleware_1.default)(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'You are not signed in. Please log in first.' });
        expect(nextFunction).not.toHaveBeenCalled();
    });
    it('should call next() if token is valid and user is found', async () => {
        const mockUser = { _id: 'user123', name: 'Test User' };
        mockRequest.headers = { authorization: 'Bearer validtoken' };
        jwt_utils_1.verifyJwt.mockReturnValue({ valid: true, expired: false, decoded: { id: 'user123' } });
        user_model_1.User.findById.mockResolvedValue(mockUser);
        await (0, auth_middleware_1.default)(mockRequest, mockResponse, nextFunction);
        expect(jwt_utils_1.verifyJwt).toHaveBeenCalledWith('validtoken');
        expect(user_model_1.User.findById).toHaveBeenCalledWith('user123');
        expect(mockResponse.locals?.user).toEqual(mockUser);
        expect(nextFunction).toHaveBeenCalled();
    });
    it('should return 401 if user is not found', async () => {
        mockRequest.headers = { authorization: 'Bearer validtoken' };
        jwt_utils_1.verifyJwt.mockReturnValue({ valid: true, expired: false, decoded: { id: 'user123' } });
        user_model_1.User.findById.mockResolvedValue(null);
        await (0, auth_middleware_1.default)(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found. Please log in again.' });
        expect(nextFunction).not.toHaveBeenCalled();
    });
    it('should return 403 if token is expired', async () => {
        mockRequest.headers = { authorization: 'Bearer expiredtoken' };
        jwt_utils_1.verifyJwt.mockReturnValue({ valid: false, expired: true, decoded: null });
        await (0, auth_middleware_1.default)(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid or expired token. Please log in again.' });
        expect(nextFunction).not.toHaveBeenCalled();
    });
    it('should return 403 if token is invalid', async () => {
        mockRequest.headers = { authorization: 'Bearer invalidtoken' };
        jwt_utils_1.verifyJwt.mockReturnValue({ valid: false, expired: false, decoded: null });
        await (0, auth_middleware_1.default)(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid token.' });
        expect(nextFunction).not.toHaveBeenCalled();
    });
});
