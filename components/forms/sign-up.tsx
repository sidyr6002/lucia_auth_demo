"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema } from "@/lib/schemas/authentication";
import { passwordInfo } from "@/lib/schemas/info";

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
import { useToast } from "@/components/ui/use-toast";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Info } from "lucide-react";

import { signUp } from "@/actions/auth/sign-up";

const SignUpForm = () => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleSignUp = async (data: z.infer<typeof signUpSchema>) => {
        const res = await signUp(data);

        if (res.error) {
            //console.log(res.error);
            toast({
                variant: "destructive",
                description: res.error,
            })
            return;
        }   

        //console.log(res.data);
        toast({
            variant: "success",
            description: res.data,
        })

        form.reset();
        router.refresh();
        router.push("/");
    };

    return (
        <Card className="mx-auto max-w-2xl sm:w-96 shadow-md shadow-stone-800/30">
            <CardHeader>
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your details below and create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="grid gap-4"
                        onSubmit={form.handleSubmit(handleSignUp)}
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
                                            placeholder="Enter your email"
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
                            name="name"
                            render={({ field }) => (
                                <FormItem className="grid gap-0">
                                    <FormLabel className="text-xs font-semibold text-neutral-700">
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your name"
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
                                        <div className="relative flex items-center rounded-sm bg-zinc-200">
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                className="pr-9 rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-200 focus-within:bg-zinc-300"
                                                autoComplete="off"
                                                {...field}
                                            />
                                            <HoverCard>
                                                <HoverCardTrigger>
                                                    <Info className="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 mx-2 text-red-400" />
                                                </HoverCardTrigger>
                                                <HoverCardContent
                                                    side="right"
                                                    className="p-3"
                                                >
                                                    <span className="text-xs">
                                                        {passwordInfo}
                                                    </span>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-rose-500 text-sm" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="grid gap-0">
                                    <FormLabel className="text-xs font-semibold text-neutral-700">
                                        Confirm Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password again"
                                            className="rounded-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-200 focus-within:bg-zinc-300"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-rose-500 text-sm" />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full rounded-full my-4"
                        >
                            Sign Up
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SignUpForm;
