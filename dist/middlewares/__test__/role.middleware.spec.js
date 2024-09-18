"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roles_utils_1 = require("../../utils/roles.utils"); // Adjust the path as necessary
const role_middleware_1 = __importDefault(require("../../middlewares/role.middleware")); // Update this path
describe('requiresRole Middleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        nextFunction = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call next() if user has required role', async () => {
        mockResponse.locals = { user: { roles: [roles_utils_1.Role.Admin] } };
        const middleware = (0, role_middleware_1.default)([roles_utils_1.Role.Admin]);
        await middleware(mockRequest, mockResponse, nextFunction);
        expect(nextFunction).toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();
        expect(mockResponse.json).not.toHaveBeenCalled();
    });
    it('should return 403 if user does not have required role', async () => {
        mockResponse.locals = { user: { roles: [roles_utils_1.Role.User] } };
        const middleware = (0, role_middleware_1.default)([roles_utils_1.Role.Admin]);
        await middleware(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'You do not have the required permissions.' });
        expect(nextFunction).not.toHaveBeenCalled();
    });
    it('should return 403 if user is not signed in', async () => {
        mockResponse.locals = {};
        const middleware = (0, role_middleware_1.default)([roles_utils_1.Role.Admin]);
        await middleware(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'You are not signed in.' });
        expect(nextFunction).not.toHaveBeenCalled();
    });
    it('should call next() if user has one of multiple required roles', async () => {
        mockResponse.locals = { user: { roles: [roles_utils_1.Role.Sales] } };
        const middleware = (0, role_middleware_1.default)([roles_utils_1.Role.Admin, roles_utils_1.Role.Sales]);
        await middleware(mockRequest, mockResponse, nextFunction);
        expect(nextFunction).toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();
        expect(mockResponse.json).not.toHaveBeenCalled();
    });
    it('should handle errors and pass them to next()', async () => {
        mockResponse.locals = { user: { roles: [roles_utils_1.Role.User] } };
        const middleware = (0, role_middleware_1.default)([roles_utils_1.Role.Admin]);
        const error = new Error('Test error');
        jest.spyOn(Array.prototype, 'some').mockImplementationOnce(() => {
            throw error;
        });
        await middleware(mockRequest, mockResponse, nextFunction);
        expect(nextFunction).toHaveBeenCalledWith(error);
        expect(mockResponse.status).not.toHaveBeenCalled();
        expect(mockResponse.json).not.toHaveBeenCalled();
    });
});
