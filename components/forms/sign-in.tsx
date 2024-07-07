"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signInSchema } from "@/lib/schemas/authentication";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "@/actions/auth/sign-in";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const SignInForm = () => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSignIn = async (data: z.infer<typeof signInSchema>) => {
        const res = await signIn(data);

        console.log(res);

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

        form.reset();
        router.refresh();
        router.push("/server");
    };



    return (
        <Card className="mx-auto max-w-2xl sm:w-96 shadow-md shadow-stone-800/30">
            <CardHeader>
                <CardTitle className="text-2xl">Sign In</CardTitle>
                <CardDescription>
                    Enter your credentials below and sign in
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="grid gap-4"
                        onSubmit={form.handleSubmit(handleSignIn)}
                        autoComplete="off"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="grid gap-0">
                                    <FormLabel className="text-xs font-semibold text-neutral-700">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="m@example.com"
                                            className="rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-200 focus-within:bg-zinc-300"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-rose-500 text-sm" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="grid gap-0">
                                    <FormLabel className="text-xs font-semibold text-neutral-700">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            className="pr-9 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-200 focus-within:bg-zinc-300"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-rose-500 text-xs" />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full rounded-full mt-3"
                        >
                            Sign In
                        </Button>
                    </form>
                    <div
                        className={cn(
                            "w-full text-xs text-center my-5 relative font-medium",
                            "after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:border after:w-5 after:border-stone-700 after:ml-1",
                            "before:contet-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:border before:w-5 before:border-stone-700 before:-translate-x-6"
                        )}
                    >
                        Or Sign in with
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            onClick={() => router.push("/authenticate/google")}
                            className="w-full rounded-full gap-2"
                        >
                            <FaGoogle className="text-blue-600 w-4 h-4" />{" "}
                            <span>Google</span>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push("/authenticate/github")}
                            className="w-full rounded-full gap-2"
                        >
                            <FaGithub className="text-blue-600 w-4 h-4" />{" "}
                            <span>GitHub</span>
                        </Button>
                    </div>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SignInForm;
