import React, { useEffect, useState } from "react";
import { User, UserProviderProps } from "./types.ts";
import { UserContext } from "./context.ts";

export function loadUser(): User {
    const userDataJson = localStorage.getItem("userData");

    let userData: User;
    if (userDataJson !== null) {
        userData = JSON.parse(userDataJson);
    } else {
        userData = { username: "", isAuthenticated: false };
    }

    return userData;
}

export function saveUser(user: User) {
    const userData = JSON.stringify(user);
    localStorage.setItem("userData", userData);
}

export function deleteUserData() {
    localStorage.removeItem("userData");
}

export const UserProvider: React.FC<UserProviderProps> = (
    props: UserProviderProps
) => {
    const { children } = props;

    const [user, setUser] = useState<User>(loadUser);

    function setUsername(username: string) {
        const user = loadUser();
        user.username = username;
        saveUser(user);
        setUser(user);
    }

    function setAuthenticated() {
        const user = loadUser();
        user.isAuthenticated = true;
        saveUser(user);
        setUser(user);
    }

    function setUnauthenticated() {
        const user = loadUser();
        user.isAuthenticated = false;
        setUser(user);
    }

    useEffect(() => {
        const userData = loadUser();
        setUser(userData);
    }, []);

    const result = {
        user,
        setUsername,
        setAuthenticated,
        setUnauthenticated,
    };

    return (
        <UserContext.Provider value={result}>{children}</UserContext.Provider>
    );
};
