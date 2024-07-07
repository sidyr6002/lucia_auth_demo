import { github, lucia } from "@/lib/lucia";
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
    const state = url.searchParams.get("state");
    const storedState = cookies().get("github_oauth_state")?.value ?? null;
    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400,
        });
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });
        const githubUser: GitHubUser = await githubUserResponse.json();

        const existingUser = await prisma.user.findUnique({
            where: {
                githubId: githubUser.id.toString(),
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
                name: githubUser.name,
                githubId: githubUser.id.toString(),
                gitLogin: githubUser.login,
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
        console.log("[GITHUB_CALLBACK]", error);

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
