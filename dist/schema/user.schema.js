"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.signInUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({
        required_error: "users's first name is required",
    })
        .trim()
        .max(20),
    lastName: zod_1.z
        .string({
        required_error: "users's last name is required",
    })
        .trim()
        .max(20),
    email: zod_1.z
        .string({
        required_error: "users's email is needed",
    })
        .trim(),
    mobileNumber: zod_1.z
        .string({
        required_error: "your mobile number is required.",
    })
        .trim(),
    password: zod_1.z
        .string({ required_error: "Your password is required" })
        .trim()
        .max(15),
    confirmPassword: zod_1.z.string({
        required_error: "Your password must be the same as your current",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
});
exports.signInUserSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Email is required",
    })
        .email("Invalid email format"),
    password: zod_1.z
        .string({
        required_error: "Password is required",
    })
        .min(6, "Password must be at least 6 characters long")
        .trim(),
});
exports.updateUserSchema = zod_1.z.object({
    type: zod_1.z.object({
        type: zod_1.z.string().optional(),
    }),
    body: zod_1.z.object({
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        mobileNumber: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
    }),
});
