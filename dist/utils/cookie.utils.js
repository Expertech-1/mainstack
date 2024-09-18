"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCookie = exports.setCookie = void 0;
const isProduction = process.env.NODE_ENV === 'production';
const setCookie = (res, name, token, options = {}) => {
    res.cookie(name, token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        path: options.path || '/',
        maxAge: options.maxAge || 7 * 24 * 60 * 60 * 1000,
    });
};
exports.setCookie = setCookie;
const clearCookie = (res, name, options = {}) => {
    res.clearCookie(name, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        path: options.path || '/',
    });
};
exports.clearCookie = clearCookie;
