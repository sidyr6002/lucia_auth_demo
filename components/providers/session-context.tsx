"use client";

import { createContext, useContext } from "react";
import { useSession as useLuciaSession } from "@/lib/lucia";

type ContextType = Awaited<ReturnType<typeof useLuciaSession>>;

const SessionContext = createContext<ContextType>({
    user: null,
    session: null,
});

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({
    children,
    value,
}: React.PropsWithChildren<{ value: ContextType }>) => {
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};
