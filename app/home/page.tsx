"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HomePage = () => {
    const router = useRouter();

    return (
        <div className="h-svh w-full flex flex-col gap-4 justify-center items-center">
            <h1 className="text-7xl font-semibold">Lucia Demo</h1>
            <div className="flex gap-3">
                <Button className="rounded-full bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/authenticate")}>
                    Login
                </Button>
                <Button variant="outline" className="rounded-full" onClick={() => window.open("https://lucia-auth.com")}>
                    Documentation
                </Button>

            </div>
        </div>
    );
};

export default HomePage;
