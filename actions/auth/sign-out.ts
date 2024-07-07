"use server";

import { lucia, useSession } from "@/lib/lucia";
import { cookies } from "next/headers";

export async function signOut() {
    try {
        const { session } = await useSession();

        if (!session) {
            throw new Error("Unauthorized Access");
        }

        await lucia.invalidateSession(session.id);

        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        return {
            data: "Logged out successfully",
        };
    } catch (error: any) {
        console.log("[AUTH_SIGNOUT]", error);
        return {
            error: error.message,
        };
    }
}
