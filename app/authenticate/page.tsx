import React from "react";
import AuthenticateTab from "@/components/autenticate-tab";
import SignInForm from "@/components/forms/sign-in";
import SignUpForm from "@/components/forms/sign-up";
import { useSession } from "@/lib/lucia";
import { redirect } from "next/navigation";

const AuthenticatePage = async () => {

    const { user } = await useSession();

    if (user) {
        redirect("/server");
    }
    
    return (
        <div className="relative h-svh w-full bg-stone-200/40">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <AuthenticateTab
                    signIn={<SignInForm />}
                    signUp={<SignUpForm />}
                />
            </div>
        </div>
    );
};

export default AuthenticatePage;
