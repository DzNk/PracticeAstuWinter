import React from "react";

export type User = {
    username: string;
    isAuthenticated: boolean;
    permission: number;
};

export type UserContextType = {
    user: User;
    setUsername: (username: string) => void;
    setAuthenticated: () => void;
    setUnauthenticated: () => void;
    setPermission: (permission: number) => void;
};

export type UserProviderProps = {
    children: React.ReactNode;
};

export enum UserPermission {
    Admin = 7,
    Employee = 4,
}
