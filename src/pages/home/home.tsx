import { AdminHome } from "./components/AdminHome/AdminHome.tsx";
import {
    ProductCreateFormContextProvider,
    useProductCreateForm,
} from "./components/CreateProductModal/contexts/useProductCreationModal/contexts.ts";
import { useUserContext } from "../../contexts/userContext/context.ts";
import { UserPermission } from "../../contexts/userContext/types.ts";
import React from "react";
import { Text } from "@mantine/core";

export function HomePage() {
    const user = useUserContext();
    const form = useProductCreateForm({
        initialValues: {
            price: 0,
            quantity: 0,
            description: "",
            name: "",
            article: "",
        },
        validate: {
            price: value => (value > 0 ? null : "Цена не может быть меньше 0"),
            quantity: value =>
                value > 0 ? null : "Количество не может быть меньше 0",
            name: value =>
                value.length > 3
                    ? null
                    : "Название не может быть короче 3-х символов",
            article: value =>
                value.length > 3
                    ? null
                    : "Артикул не может быть короче 3-х символов",
        },
    });

    return user.user.permission == UserPermission.Admin ? (
        <ProductCreateFormContextProvider form={form}>
            <AdminHome />
        </ProductCreateFormContextProvider>
    ) : (
        <Text>А ты сотрудник</Text>
    );
}
