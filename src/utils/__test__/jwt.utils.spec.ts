import jwt from 'jsonwebtoken';
import { signJwt, verifyJwt } from '../../utils/jwt.utils'; 

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

const mockJwtSecret = 'test-secret';
process.env.JWT_SECRET = mockJwtSecret;

describe('JWT Utility Functions', () => {
  const testPayload = { userId: '123', username: 'testuser' };

  describe('signJwt', () => {
    it('should sign a JWT with default options', () => {
      const token = signJwt(testPayload);
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });

    it('should sign a JWT with custom options', () => {
      const options = { expiresIn: '1h' };
      const token = signJwt(testPayload, options);
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      expect(decoded).toHaveProperty('exp');
    });
  });

  describe('verifyJwt', () => {
    it('should verify a valid token', () => {
      const token = signJwt(testPayload);
      const result = verifyJwt(token);
      expect(result.valid).toBe(true);
      expect(result.expired).toBe(false);
      expect(result.decoded).toMatchObject(testPayload);
    });

    it('should handle an expired token', () => {
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new jwt.TokenExpiredError('jwt expired', new Date());
      });

      const token = signJwt(testPayload);
      const result = verifyJwt(token);
      expect(result.valid).toBe(false);
      expect(result.expired).toBe(true);
      expect(result.decoded).toBe(null);
    });

    it('should handle an invalid token', () => {
      const result = verifyJwt('invalid.token.here');
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
      expect(() => signJwt(testPayload)).toThrow();
    });
  });
});