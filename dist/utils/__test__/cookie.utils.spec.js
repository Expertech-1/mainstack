"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_utils_1 = require("../../utils/cookie.utils");
const mockResponse = () => {
    const res = {};
    res.cookie = jest.fn().mockReturnValue(res);
    res.clearCookie = jest.fn().mockReturnValue(res);
    return res;
};
describe('Cookie Utility Functions', () => {
    let res;
    beforeEach(() => {
        jest.resetAllMocks();
        res = mockResponse();
    });
    describe('setCookie', () => {
        it('should set a cookie with default options', () => {
            (0, cookie_utils_1.setCookie)(res, 'testCookie', 'testValue');
            expect(res.cookie).toHaveBeenCalledWith('testCookie', 'testValue', {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        });
        it('should set a cookie with custom options', () => {
            (0, cookie_utils_1.setCookie)(res, 'optionsCookie', 'optionsValue', { maxAge: 3600000, path: '/custom' });
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
            (0, cookie_utils_1.clearCookie)(res, 'testCookie');
            expect(res.clearCookie).toHaveBeenCalledWith('testCookie', {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
            });
        });
        it('should clear a cookie with custom path', () => {
            (0, cookie_utils_1.clearCookie)(res, 'optionsCookie', { path: '/custom' });
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
            (0, cookie_utils_1.setCookie)(res, 'productionCookie', 'secureValue');
            expect(res.cookie).toHaveBeenCalledWith('productionCookie', 'secureValue', expect.objectContaining({
                secure: true,
                sameSite: 'strict',
            }));
        });
    });
});
