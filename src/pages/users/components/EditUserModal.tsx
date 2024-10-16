import { useEffect, useState } from "react";
import {
    Button,
    Fieldset,
    Flex,
    Modal,
    PasswordInput,
    TextInput,
    SegmentedControl,
} from "@mantine/core";
import { IconEdit, IconPlaylistAdd } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { UserDataRequest, UserService } from "../../../api";
import { useUserEditFormContext } from "./contexts/useUserEditModal/contexts.ts";

interface EditUserModalProps {
    opened: boolean;
    close: () => void;
    reloadTable: () => void;
    user?: UserDataRequest | null;
}

export function EditUserModal({
    opened,
    close,
    reloadTable,
    user,
}: EditUserModalProps) {
    const formContext = useUserEditFormContext();
    const [role, setRole] = useState("4");

    useEffect(() => {
        if (user) {
            const roleValue = user.permission === 4 ? "4" : "7";
            formContext.setValues({ ...user, permission: Number(roleValue) });
            setRole(roleValue);
        } else {
            formContext.reset();
            setRole("4");
        }
    }, [user]);

    const handleSubmit = (values: UserDataRequest) => {
        const permission = role === "4" ? 4 : 7;
        const updatedValues = { ...values, permission: permission };

        const serviceCall = user
            ? UserService.editUser({ body: updatedValues })
            : UserService.createUser({ body: updatedValues });

        serviceCall.then(responseReceived => {
            if (responseReceived?.data?.ok) {
                formContext.reset();
                reloadTable();
                close();
                notifications.show({
                    title: user ? "Успешно обновлено" : "Успешно создано",
                    message: user
                        ? "Пользователь обновлен"
                        : "Пользователь создан",
                    color: "green",
                });
            } else {
                notifications.show({
                    title: "Ошибка",
                    message:
                        responseReceived?.data?.message ||
                        "Произошла ошибка при сохранении пользователя",
                    color: "red",
                });
            }
        });
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={
                user ? "Редактирование пользователя" : "Создание пользователя"
            }
            size="md">
            <form
                onSubmit={formContext.onSubmit(values => handleSubmit(values))}>
                <Flex
                    direction={"column"}
                    align={"center"}
                    gap={"md"}>
                    <Fieldset
                        legend="Параметры"
                        w={"100%"}>
                        <TextInput
                            label={"Имя"}
                            disabled={!!user}
                            {...formContext.getInputProps("username")}
                        />
                        <PasswordInput
                            label={"Пароль"}
                            disabled={!!user}
                            {...formContext.getInputProps("password")}
                        />
                        <SegmentedControl
                            value={role}
                            mt={20}
                            fullWidth={true}
                            onChange={setRole}
                            data={[
                                { label: "Администратор", value: "7" },
                                { label: "Сотрудник", value: "4" },
                            ]}
                        />
                    </Fieldset>
                    <Button
                        type="submit"
                        fullWidth={true}
                        rightSection={
                            user ? <IconEdit /> : <IconPlaylistAdd />
                        }>
                        {user ? "Обновить" : "Создать"}
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
}
