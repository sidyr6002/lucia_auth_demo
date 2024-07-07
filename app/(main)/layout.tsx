"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useSession } from "@/components/providers/session-context";

import { signOut } from "@/actions/auth/sign-out";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Home",
        href: "/home",
        description: "Link to home page",
    },
    {
        title: "Server Component",
        href: "/server",
        description: "Link to server component",
    },
    {
        title: "Client Component",
        href: "/client",
        description: "Link to client component",
    },
];

const Navigation = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { toast } = useToast();
    const { user } = useSession();

    useEffect(() => {
        if (!user) {
            router.push("/authenticate");
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    const handleSignOut = async () => {
        const res = await signOut();


        if (res.error) {
            toast({
                variant: "destructive",
                description: res.error,
            });

            return;
        }

        toast({
            variant: "success",
            description: res.data,
        });
    };

    return (
        <div className="h-svh w-full grid grid-rows-12">
            <div className="row-span-1 w-full bg-stone-800 relative flex justify-between items-center ">
                <div className="mx-4 rounded-full overflow-hidden cursor-pointer" onClick={() => router.push("https://lucia-auth.com/")}>
                    <Image src="https://avatars.githubusercontent.com/u/124423533?s=200&v=4" alt="logo" width={40} height={40} />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {components.map((component) => {
                                const isActive = pathname === component.href;
                                return (
                                    <NavigationMenuItem key={component.title}>
                                        <Link
                                            href={component.href}
                                            className="flex w-full items-center justify-between"
                                            legacyBehavior
                                            passHref
                                        >
                                            <NavigationMenuLink
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    "w-full bg-transparent hover:bg-zinc-400/20 text-white hover:text-white focus:bg-zinc-400/30 focus:text-white",
                                                    isActive &&
                                                        "bg-zinc-400/20 text-white"
                                                )}
                                            >
                                                {component.title}
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                );
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="ml-auto max-w-80 flex mx-7 justify-between items-center gap-4">
                    <div className="hidden md:block text-white truncate text-sm cursor-pointer hover:text-zinc-300 transition duration-200">
                        {user.email !== null && user.email}
                        {user.githubId !== null && 
                            <p className="flex gap-2">
                                <span className="text-zinc-400">Github ID:</span>
                                 {user.githubId}
                            </p>
                        }
                    </div>
                    <Button
                        size="sm"
                        onClick={handleSignOut}
                        className="bg-rose-500 hover:bg-rose-600"
                    >
                        Logout
                    </Button>
                </div>
            </div>
            <div className="row-span-11">{children}</div>
        </div>
    );
};

export default Navigation;
