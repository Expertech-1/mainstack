"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = signJwt;
exports.verifyJwt = verifyJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
function signJwt(object, options) {
    return jsonwebtoken_1.default.sign(object, secret, {
        ...(options && options),
        algorithm: "HS256",
    });
}
function verifyJwt(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret, { algorithms: ["HS256"] });
        return { valid: true, expired: false, decoded };
    }
    catch (error) {
        return {
            valid: false,
            expired: error.message = "jwt expired",
            decoded: null,
        };
    }
}
