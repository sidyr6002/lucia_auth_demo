import React from "react";
import { useSession } from "@/lib/lucia";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const { user } = await useSession();

    if (!user) {
        redirect("/authenticate");
    }

    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-2">
            <h1 className="text-3xl">Hello, {user.name}</h1>
            <p className="text-lg">
                This is the{" "}
                <span className="font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                    Server
                </span>{" "}
                component
            </p>
        </div>
    );
};

export default DashboardPage;
