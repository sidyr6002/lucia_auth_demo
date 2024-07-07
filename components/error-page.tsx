import React from "react";

interface ErrorProps {
    message: string;
}

const Error = ({ message }: ErrorProps) => {
    return (
        <div className="text-red-500 h-svh w-full flex items-center justify-center">
            <h1 className="text-3xl font-bold">{message}</h1>
        </div>
    );
};

export default Error;
