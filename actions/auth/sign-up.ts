"use server";

import prisma from "@/utils/db";
import { capitalizeWords } from "@/utils/helpers";

import { z } from "zod";
import { signUpSchema } from "@/lib/schemas/authentication";

import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";

export async function signUp(values: z.infer<typeof signUpSchema>) {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: values.email,
            },
        });

        if (existingUser) {
            throw new Error("Account already exists for this email");
        }

        const argon2id = new Argon2id();
        const hashedPassword = await argon2id.hash(values.password);

        const user = await prisma.user.create({
            data: {
                name: capitalizeWords(values.name),
                email: values.email.toLowerCase(),
                hashedPassword,
            },
        });

        // const session = await lucia.createSession(user.id, {});
        // const sessionCookie = lucia.createSessionCookie(session.id);
        // cookies().set(
        //     sessionCookie.name,
        //     sessionCookie.value,
        //     sessionCookie.attributes
        // );

        return {
            data: "Account created successfully",
        };
    } catch (error: any) {
        console.log("[AUTH_SIGNUP]", error);
        return {
            error: error.message,
        };
    }
}
