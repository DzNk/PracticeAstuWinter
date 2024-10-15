import { useEffect } from "react";
import { deleteUserData } from "../../contexts/userContext/contextProvider.tsx";
import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/userContext/context.ts";

export function LogoutPage() {
    const navigate = useNavigate();
    const userContext = useUserContext();
    useEffect(() => {
        userContext.setUnauthenticated();
        deleteUserData();
        navigate("/");
    }, []);

    return null;
}
