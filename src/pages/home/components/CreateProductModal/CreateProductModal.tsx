import { useEffect } from "react";
import {
    Button,
    Fieldset,
    Flex,
    Modal,
    NumberInput,
    Textarea,
    TextInput,
} from "@mantine/core";
import { IconPlaylistAdd, IconEdit } from "@tabler/icons-react";
import { useProductCreateFormContext } from "./contexts/useProductCreationModal/contexts.ts";
import { ProductEditRequest, ProductsService } from "../../../../api";
import { notifications } from "@mantine/notifications";

interface ProductModalProps {
    opened: boolean;
    close: () => void;
    reloadTable: () => void;
    product?: ProductEditRequest | null;
}

export function CreateProductModal({
    opened,
    close,
    reloadTable,
    product,
}: ProductModalProps) {
    const formContext = useProductCreateFormContext();

    useEffect(() => {
        if (product) {
            formContext.setValues(product);
        } else {
            formContext.reset();
        }
    }, [product]);

    const handleSubmit = (values: ProductEditRequest) => {
        const serviceCall = product
            ? ProductsService.editProduct({ body: values })
            : ProductsService.createProduct({ body: values });

        serviceCall.then(responseReceived => {
            if (responseReceived?.data?.ok) {
                formContext.reset();
                reloadTable();
                close();
                notifications.show({
                    title: product ? "Успешно обновлено" : "Успешно создано",
                    message: product ? "Товар обновлен" : "Товар создан",
                    color: "green",
                });
            } else {
                notifications.show({
                    title: "Ошибка",
                    message:
                        responseReceived?.data?.message ||
                        "Произошла ошибка при сохранении товара",
                    color: "red",
                });
            }
        });
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={product ? "Редактирование товара" : "Создание товара"}
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
                            label={"Название"}
                            {...formContext.getInputProps("name")}
                        />
                        <TextInput
                            label={"Артикул"}
                            disabled={!!product}
                            {...formContext.getInputProps("article")}
                        />
                        <NumberInput
                            label={"Цена"}
                            hideControls
                            {...formContext.getInputProps("price")}
                        />
                        <NumberInput
                            label={"Количество"}
                            hideControls
                            {...formContext.getInputProps("quantity")}
                        />
                        <Textarea
                            label={"Описание"}
                            {...formContext.getInputProps("description")}
                        />
                    </Fieldset>
                    <Button
                        type="submit"
                        fullWidth={true}
                        rightSection={
                            product ? <IconEdit /> : <IconPlaylistAdd />
                        }>
                        {product ? "Обновить" : "Создать"}
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
}
