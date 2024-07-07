import prisma from "@/utils/db";
import { Lucia, TimeSpan } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

import { User as DatabaseUser } from "@prisma/client";

import { GitHub, Google } from 'arctic'
import { cache } from "react";
import { cookies } from "next/headers";
import { User, Session } from "lucia";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(2, "d"),
    sessionCookie: {
        name: "lucia_session",
        attributes: {
            secure: process.env.NODE_ENV === "production",
        },
    },
    getUserAttributes: (user) => {
        return {
            name: user.name,
            email: user.email,
            githubId: user.githubId,
            googleId: user.googleId,
        };
    },
});

export const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!);
export const google = new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!, process.env.NEXT_APP_URL! + "/authenticate/google/callback");

export const useSession = cache(
    async (): Promise< { user: User; session: Session } | { user: null; session: null } > => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
            return {
                user: null,
                session: null,
            };
        }

        const result = await lucia.validateSession(sessionId);

        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(
                    result.session.id
                );

                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                );
            }

            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                );
            }
        } catch {}

        return result;
    }
);

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: Omit<DatabaseUser, "id" | "hashedPassword">;
    }
}
