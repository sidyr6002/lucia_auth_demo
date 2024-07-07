"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/providers/session-context";
import Error from "@/components/error-page";
import { Loader2 } from "lucide-react";

const ClientPage = () => {
    const router = useRouter();
    const { user } = useSession();

    useEffect(() => {
        if (!user) {
            router.push("/authenticate");
        }
    }, [user, router]);

    if (!user) {
        return (
            <div className="h-svh w-full flex items-center justify-center">
                <Loader2 className="w-16 h-16 animate-spin text-zinc-300" />
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-2">
            <h1 className="text-3xl">Hello, {user.name}</h1>
            <p className="text-lg">
                This is the{" "}
                <span className="font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                    Client
                </span>{" "}
                component
            </p>
        </div>
    );
};

export default ClientPage;
