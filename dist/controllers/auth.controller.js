"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const user_schema_1 = require("../schema/user.schema");
const cookie_utils_1 = require("../utils/cookie.utils");
const zod_1 = __importDefault(require("zod"));
class AuthController {
    static async register(req, res) {
        try {
            const body = user_schema_1.createUserSchema.parse(req.body);
            const user = await auth_service_1.default.register(body);
            res.status(201).json(user);
        }
        catch (err) {
            // if (err instanceof z.ZodError) {
            //   return res.status(400).json({ message: err.errors });
            // }
            return res.status(400).json({ message: err.message });
        }
    }
    static async refreshToken(req, res) {
        try {
            const refreshToken = req.cookies['refreshToken'];
            const token = await auth_service_1.default.refreshToken(refreshToken);
            res.status(201).json(token);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    static async signin(req, res) {
        try {
            const body = user_schema_1.signInUserSchema.parse(req.body);
            const result = await auth_service_1.default.signin(body);
            (0, cookie_utils_1.setCookie)(res, 'refreshToken', result.refreshToken.refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.status(200).json({ message: result.msg, token: result.accessToken, user: result.user });
        }
        catch (err) {
            if (err instanceof zod_1.default.ZodError) {
                return res.status(400).json({ message: err.errors });
            }
            return res.status(400).json({ message: err.message });
        }
    }
    static async signout(req, res) {
        try {
            const user = res.locals.user;
            (0, cookie_utils_1.clearCookie)(res, 'refreshToken');
            return res.status(200).json({ message: `User ${user.email} signed out successfully.` });
        }
        catch (err) {
            return res.status(500).json({ message: 'Error signing out. Please try again later.' });
        }
    }
    static async updateUser(req, res) {
        try {
            const validatedData = user_schema_1.updateUserSchema.parse({
                type: req.query,
                body: req.body,
            });
            const userId = res.locals.user._id;
            const { type = '' } = validatedData.type;
            const updateData = validatedData.body;
            const user = await auth_service_1.default.updateUser(userId, updateData, type);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}
exports.default = AuthController;
