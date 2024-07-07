import { github, google, lucia } from "@/lib/lucia";
import prisma from "@/utils/db";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";

interface GitHubUser {
    id: string;
    login: string;
    name: string;
}

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const codeVerifier = cookies().get("google_oauth_code_verifier")?.value ?? null;
    const state = url.searchParams.get("state");
    const storedState = cookies().get("google_oauth_state")?.value ?? null;

    if (!code || !codeVerifier || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400,
        });
    }

    try {
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);
        console.log(tokens);
        const googleUserResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });
        const googleUser = await googleUserResponse.json();

        console.log(googleUser);

        const existingUser = await prisma.user.findUnique({
            where: {
                googleId: googleUser.sub,
            },
        });


        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/",
                },
            });
        }

        const newUser = await prisma.user.create({
            data: {
                name: googleUser.name,
                googleId: googleUser.sub,
                email: googleUser.email,
            }
        });

        const session = await lucia.createSession(newUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/",
            },
        });
    } catch (error) {
        console.log("[GOOGLE_CALLBACK]", error);

        if (error instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400,
            });
        }

        return new Response(null, {
            status: 500,
        });
    }
}
