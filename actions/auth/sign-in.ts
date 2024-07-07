"use server";

import prisma from "@/utils/db";

import { z } from "zod";
import { signInSchema } from "@/lib/schemas/authentication";

import { lucia, useSession } from "@/lib/lucia";
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";

export async function signIn(values: z.infer<typeof signInSchema>) {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: values.email,
            },
        });

        if (!existingUser || !existingUser.hashedPassword) {
            throw new Error("User doesn't exist or account is depregated");
        }

        const argon2id = new Argon2id();
        const validPassword = await argon2id.verify(
            existingUser.hashedPassword,
            values.password
        );

        if (!validPassword) {
            throw new Error("Invalid Credentials");
        }

        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        return {
            data: `Welcome back! ${existingUser.name}`,
        };
    } catch (error: any) {
        console.log("[AUTH_SIGNIN]", error);
        return {
            error: error.message,
        };
    }
}
