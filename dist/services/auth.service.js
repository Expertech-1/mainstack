"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const jwt_utils_1 = require("../utils/jwt.utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthService {
    static async register(userDetails) {
        const { firstName, lastName, email, mobileNumber, password, confirmPassword } = userDetails;
        const existingUser = await user_model_1.User.findOne({ email });
        if (existingUser)
            throw new Error('User already exists with this email.');
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new user_model_1.User({
            firstName,
            lastName,
            email,
            mobileNumber,
            password: hashedPassword,
            userType: user_model_1.UType.User,
            status: user_model_1.UStatus.Active
        });
        const accessToken = (0, jwt_utils_1.signJwt)({ id: user._id, userType: user.userType }, { expiresIn: '1h' });
        await user.save();
        return { message: "User created sucessfully", token: { accessToken } };
    }
    static async signin(userDetails) {
        const { email, password } = userDetails;
        const existingUser = await user_model_1.User.findOne({ email });
        if (!existingUser)
            throw new Error('Invalid email or password');
        const isMatch = await bcryptjs_1.default.compare(password, existingUser.password);
        if (!isMatch)
            throw new Error('Invalid email or password');
        const accessToken = (0, jwt_utils_1.signJwt)({ id: existingUser._id, userType: existingUser.userType }, { expiresIn: '1h' });
        const refreshToken = (0, jwt_utils_1.signJwt)({ id: existingUser._id, userType: existingUser.userType }, { expiresIn: '7d' });
        return {
            msg: "User signed in successfully",
            refreshToken: {
                refreshToken
            },
            accessToken: {
                accessToken,
            },
            user: {
                id: existingUser._id,
                email: existingUser.email,
                userType: existingUser.userType,
                status: existingUser.status,
            },
        };
    }
    static async refreshToken(token) {
        if (!token)
            throw new Error('Refresh token not found.');
        const decoded = (0, jwt_utils_1.verifyJwt)(token);
        // console.log(decoded);
        if (decoded.valid === false)
            throw new Error('Invalid refresh token.');
        const user = await user_model_1.User.findById(decoded.decoded.id);
        if (!user)
            throw new Error('Invalid refresh token.');
        const newAccessToken = (0, jwt_utils_1.signJwt)({ id: user._id, user_type: user.userType }, { expiresIn: '1h' });
        return newAccessToken;
    }
    static async updateUser(userId, updateDetails, typeChgn) {
        if (typeChgn === "password") {
            const { password } = updateDetails;
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const user = await user_model_1.User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
            if (user) {
                return { msg: "Account Updated Successfully" };
            }
            else {
                return { msg: "Account Updated Error" };
            }
        }
        const user = await user_model_1.User.findByIdAndUpdate(userId, updateDetails, { new: true });
        if (user) {
            return { msg: "Account Updated Successfully" };
        }
        else {
            return { msg: "Account Updated Error" };
        }
    }
}
exports.default = AuthService;
