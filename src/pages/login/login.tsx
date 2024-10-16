import {
    useLoginPageForm,
    UserLoginFormContextProvider,
} from "./contexts/useLoginPageContext/context.ts";
import { LoginForm } from "./form.tsx";
import { UserLogin, UserService } from "../../api";
import { saveUser } from "../../contexts/userContext/contextProvider.tsx";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/userContext/context.ts";

export function LoginPage() {
    const navigate = useNavigate();
    const userContext = useUserContext();
    const form = useLoginPageForm({
        initialValues: { username: "", password: "" },
        validate: {
            username: value =>
                value.length > 3
                    ? null
                    : "Логин не может быть короче 3-x символов",
            password: value =>
                value.length > 8
                    ? null
                    : "Пароль не может быть короче 8-и символов",
        },
    });

    const handleSubmit = (values: UserLogin) => {
        UserService.loginUser({ body: values }).then(responseReceived => {
            if (responseReceived?.data?.ok) {
                saveUser({
                    username: values.username,
                    isAuthenticated: true,
                    permission: responseReceived.data.permission,
                });
                userContext.setAuthenticated();
                userContext.setPermission(responseReceived.data.permission);
                navigate("/");
            } else {
                notifications.show({
                    title: "Ошибка входа",
                    message: "Неверный логин или пароль",
                    color: "red",
                });
            }
        });
    };

    return (
        <UserLoginFormContextProvider form={form}>
            <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                <LoginForm />
            </form>
        </UserLoginFormContextProvider>
    );
}
