"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_utils_1 = require("../utils/jwt.utils");
const user_model_1 = require("../models/user.model");
const authorizeUser = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization || req.headers.Authorization;
    const accessToken = authorizationHeader?.replace(/^Bearer\s/, "");
    if (!accessToken) {
        return res.status(401).json({ message: 'You are not signed in. Please log in first.' });
    }
    const { valid, expired, decoded } = (0, jwt_utils_1.verifyJwt)(accessToken);
    if (valid && !expired && decoded && typeof decoded !== 'string') {
        const { id } = decoded;
        const user = await user_model_1.User.findById(id);
        if (!user) {
            return res.status(401).json({ message: 'User not found. Please log in again.' });
        }
        res.locals.user = user;
        return next();
    }
    if (expired) {
        return res.status(403).json({ message: 'Invalid or expired token. Please log in again.' });
    }
    return res.status(403).json({ message: 'Invalid token.' });
};
exports.default = authorizeUser;
