import React from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface AuthenticateTabProps {
    signIn: React.ReactNode;
    signUp: React.ReactNode;
}

const AuthenticateTab = async ({
    signIn,
    signUp,
    ...props
}: AuthenticateTabProps) => {

    return (
        <Tabs defaultValue="signin" className="max-w-3xl" {...props}>
            <TabsList className="grid w-full grid-cols-2 bg-neutral-200 rounded-3xl">
                <TabsTrigger
                    value="signin"
                    className="rounded-full data-[state=active]:bg-blue-600/95 data-[state=active]:text-white"
                >
                    Sign In
                </TabsTrigger>
                <TabsTrigger
                    value="signup"
                    className="rounded-full data-[state=active]:bg-blue-600/95 data-[state=active]:text-white"
                >
                    Sign Up
                </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">{signIn}</TabsContent>
            <TabsContent value="signup">{signUp}</TabsContent>
        </Tabs>
    );
};

export default AuthenticateTab;
