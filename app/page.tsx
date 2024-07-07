"use client";
import { useSession } from "@/components/providers/session-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const { user } = useSession();

    useEffect(() => {
        if (user) {
            router.push("/server");
        } else {
            router.push("/home");
        }
        return () => {};
    }, []);

    return null;
}
