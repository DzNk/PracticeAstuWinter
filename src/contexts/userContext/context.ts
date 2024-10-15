import { createContext, useContext } from "react";
import { UserContextType } from "./types.ts";

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export const useUserContext = () => {
    const user = useContext(UserContext);

    if (user === undefined) {
        throw new Error("useUserContext must be used with a UserContext");
    }

    return user;
};
