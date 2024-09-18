import { Response } from 'express';
import { setCookie, clearCookie } from '../../utils/cookie.utils'; 

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('Cookie Utility Functions', () => {
  let res: Response;

  beforeEach(() => {
    jest.resetAllMocks();
    res = mockResponse();
  });

  describe('setCookie', () => {
    it('should set a cookie with default options', () => {
      setCookie(res, 'testCookie', 'testValue');

      expect(res.cookie).toHaveBeenCalledWith('testCookie', 'testValue', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    });

    it('should set a cookie with custom options', () => {
      setCookie(res, 'optionsCookie', 'optionsValue', { maxAge: 3600000, path: '/custom' });

      expect(res.cookie).toHaveBeenCalledWith('optionsCookie', 'optionsValue', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/custom',
        maxAge: 3600000,
      });
    });
  });

  describe('clearCookie', () => {
    it('should clear a cookie with default options', () => {
      clearCookie(res, 'testCookie');

      expect(res.clearCookie).toHaveBeenCalledWith('testCookie', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
      });
    });

    it('should clear a cookie with custom path', () => {
      clearCookie(res, 'optionsCookie', { path: '/custom' });

      expect(res.clearCookie).toHaveBeenCalledWith('optionsCookie', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/custom',
      });
    });
  });

  describe('Production environment', () => {
    const originalNodeEnv = process.env.NODE_ENV;

    beforeAll(() => {
      process.env.NODE_ENV = 'production';
    });

    afterAll(() => {
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('should set secure cookies in production', () => {
      setCookie(res, 'productionCookie', 'secureValue');

      expect(res.cookie).toHaveBeenCalledWith('productionCookie', 'secureValue', expect.objectContaining({
        secure: true,
        sameSite: 'strict',
      }));
    });
  });
});