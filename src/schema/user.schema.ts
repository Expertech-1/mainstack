import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z
    .string({
      required_error: "users's first name is required",
    })
    .trim()
    .max(20),
  lastName: z
    .string({
      required_error: "users's last name is required",
    })
    .trim()
    .max(20),
  email: z
    .string({
      required_error: "users's email is needed",
    })
    .trim(),
  mobileNumber: z
    .string({
      required_error: "your mobile number is required.",
    })
    .trim(),
  password: z
    .string({ required_error: "Your password is required" })
    .trim()
    .max(15),
  confirmPassword: z.string({
    required_error: "Your password must be the same as your current",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
})

export const signInUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long")
    .trim(),
});

export const updateUserSchema = z.object({
  type: z.object({
    type: z.string().optional(),
  }),
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    mobileNumber: z.string().optional(),
    password: z.string().optional(),
  }),
});

