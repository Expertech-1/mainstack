"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_utils_1 = require("../../utils/jwt.utils");
// Mock the dotenv config and process.env
jest.mock('dotenv', () => ({
    config: jest.fn(),
}));
const mockJwtSecret = 'test-secret';
process.env.JWT_SECRET = mockJwtSecret;
describe('JWT Utility Functions', () => {
    const testPayload = { userId: '123', username: 'testuser' };
    describe('signJwt', () => {
        it('should sign a JWT with default options', () => {
            const token = (0, jwt_utils_1.signJwt)(testPayload);
            expect(typeof token).toBe('string');
            expect(token.split('.')).toHaveLength(3);
        });
        it('should sign a JWT with custom options', () => {
            const options = { expiresIn: '1h' };
            const token = (0, jwt_utils_1.signJwt)(testPayload, options);
            const decoded = jsonwebtoken_1.default.decode(token);
            expect(decoded).toHaveProperty('exp');
        });
    });
    describe('verifyJwt', () => {
        it('should verify a valid token', () => {
            const token = (0, jwt_utils_1.signJwt)(testPayload);
            const result = (0, jwt_utils_1.verifyJwt)(token);
            expect(result.valid).toBe(true);
            expect(result.expired).toBe(false);
            expect(result.decoded).toMatchObject(testPayload);
        });
        it('should handle an expired token', () => {
            jest.spyOn(jsonwebtoken_1.default, 'verify').mockImplementationOnce(() => {
                throw new jsonwebtoken_1.default.TokenExpiredError('jwt expired', new Date());
            });
            const token = (0, jwt_utils_1.signJwt)(testPayload);
            const result = (0, jwt_utils_1.verifyJwt)(token);
            expect(result.valid).toBe(false);
            expect(result.expired).toBe(true);
            expect(result.decoded).toBe(null);
        });
        it('should handle an invalid token', () => {
            const result = (0, jwt_utils_1.verifyJwt)('invalid.token.here');
            expect(result.valid).toBe(false);
            expect(result.expired).toBe(false);
            expect(result.decoded).toBe(null);
        });
    });
    describe('Environment variables', () => {
        const originalEnv = process.env;
        beforeEach(() => {
            jest.resetModules();
            process.env = { ...originalEnv };
        });
        afterAll(() => {
            process.env = originalEnv;
        });
        it('should throw an error if JWT_SECRET is not set', () => {
            delete process.env.JWT_SECRET;
            expect(() => (0, jwt_utils_1.signJwt)(testPayload)).toThrow();
        });
    });
});
