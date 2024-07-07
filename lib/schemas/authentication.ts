import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter",
        })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter",
        })
        .regex(/[0-9]/, {
            message: "Password must contain at least one number",
        })
        .regex(/[^a-zA-Z0-9]/, {
            message: "Password must contain at least one special character",
        }),
});

export const signUpSchema = z
    .object({
        name: z.string().min(4, { message: "Name is required" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter",
            })
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter",
            })
            .regex(/[0-9]/, {
                message: "Password must contain at least one number",
            })
            .regex(/[^a-zA-Z0-9]/, {
                message: "Password must contain at least one special character",
            }),
        confirmPassword: z
            .string()
            .min(8, {
                message: "Confirm Password must be at least 8 characters long",
            })
            .regex(/[a-z]/, {
                message:
                    "Confirm Password must contain at least one lowercase letter",
            })
            .regex(/[A-Z]/, {
                message:
                    "Confirm Password must contain at least one uppercase letter",
            })
            .regex(/[0-9]/, {
                message: "Confirm Password must contain at least one number",
            })
            .regex(/[^a-zA-Z0-9]/, {
                message:
                    "Confirm Password must contain at least one special character",
            }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });
