import React from "react";

export type User = {
    username: string;
    isAuthenticated: boolean;
};

export type UserContextType = {
    user: User;
    setUsername: (username: string) => void;
    setAuthenticated: () => void;
    setUnauthenticated: () => void;
};

export type UserProviderProps = {
    children: React.ReactNode;
};
