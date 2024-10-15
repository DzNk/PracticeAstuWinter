import classes from "./login.module.css";
import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useLoginPageFormContext } from "./contexts/useLoginPageContext/context.ts";
import { IconLogin } from "@tabler/icons-react";

export function LoginForm() {
    const formContext = useLoginPageFormContext();

    return (
        <div className={classes.wrapper}>
            <Stack>
                <TextInput
                    placeholder={"Введите логин"}
                    label={"Логин"}
                    {...formContext.getInputProps("username")}
                />

                <PasswordInput
                    placeholder={"Введите пароль"}
                    label={"Пароль"}
                    {...formContext.getInputProps("password")}
                />
                <Button
                    rightSection={<IconLogin />}
                    type={"submit"}>
                    Войти
                </Button>
            </Stack>
        </div>
    );
}
