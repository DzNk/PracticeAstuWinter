import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext/context.ts";

export const PrivateRouters = () => {
    const { user } = useUserContext();
    return user.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
