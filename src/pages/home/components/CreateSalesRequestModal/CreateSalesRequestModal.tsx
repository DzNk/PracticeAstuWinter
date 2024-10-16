import {
    Button,
    Fieldset,
    Flex,
    Modal,
    NumberInput,
    TextInput,
} from "@mantine/core";
import { IconPlaylistAdd } from "@tabler/icons-react";
import { ProductsService, SalesRequest } from "../../../../api";
import { notifications } from "@mantine/notifications";
import { useSalesRequestFormContext } from "./contexts/useSalesRequestModal/contexts.ts";
import { EmployeeSelect } from "../EmployeeSelect/select.tsx";

interface SalesRequestModalProps {
    opened: boolean;
    close: () => void;
    reloadTable: () => void;
}

export function CreateSalesRequestModal({
    opened,
    close,
    reloadTable,
}: SalesRequestModalProps) {
    const formContext = useSalesRequestFormContext();

    const handleSubmit = (values: SalesRequest) => {
        ProductsService.createSalesRequest({ body: values }).then(
            responseReceived => {
                if (responseReceived?.data?.ok) {
                    formContext.reset();
                    reloadTable();
                    close();
                    notifications.show({
                        title: "Успешно создано",
                        message: "Запрос на продажу создан",
                        color: "green",
                    });
                } else {
                    notifications.show({
                        title: "Ошибка",
                        message:
                            responseReceived?.data?.message ||
                            "Произошла ошибка при создании запроса на продажу",
                        color: "red",
                    });
                }
            }
        );
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={"Создание запроса на продажу"}
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
                        <EmployeeSelect
                            label={"Сотрудник"}
                            {...formContext.getInputProps("userId")}
                        />
                        <TextInput
                            label={"Артикул"}
                            disabled
                            {...formContext.getInputProps("article")}
                        />
                        <NumberInput
                            label={"Цена единицы товара"}
                            hideControls
                            {...formContext.getInputProps("price")}
                        />
                        <NumberInput
                            label={"Доход сотрудника с продажи единицы товара"}
                            hideControls
                            {...formContext.getInputProps("income")}
                        />
                        <NumberInput
                            label={"Количество"}
                            hideControls
                            {...formContext.getInputProps("quantity")}
                        />
                    </Fieldset>
                    <Button
                        type="submit"
                        fullWidth={true}
                        rightSection={<IconPlaylistAdd />}>
                        {"Создать"}
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
}
