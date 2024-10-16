import { AdminHome } from "./components/AdminHome/AdminHome.tsx";
import {
    ProductCreateFormContextProvider,
    useProductCreateForm,
} from "./components/CreateProductModal/contexts/useProductCreationModal/contexts.ts";
import { useUserContext } from "../../contexts/userContext/context.ts";
import { UserPermission } from "../../contexts/userContext/types.ts";
import React from "react";
import {
    SalesRequestFormContextProvider,
    useSalesRequestForm,
} from "./components/CreateSalesRequestModal/contexts/useSalesRequestModal/contexts.ts";
import { UserHome } from "./components/UserHome/UserHome.tsx";

export function HomePage() {
    const user = useUserContext();
    const createForm = useProductCreateForm({
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

    const salesRequestForm = useSalesRequestForm({
        initialValues: {
            price: 0,
            quantity: 0,
            article: "",
            userId: -1,
            income: 0,
        },
        validate: {
            price: value => (value > 0 ? null : "Цена не может быть меньше 0"),
            quantity: value =>
                value > 0 ? null : "Количество не может быть меньше 0",
            userId: value => (value > 0 ? null : "Выберите сотрудника"),
        },
    });

    return user.user.permission == UserPermission.Admin ? (
        <ProductCreateFormContextProvider form={createForm}>
            <SalesRequestFormContextProvider form={salesRequestForm}>
                <AdminHome />
            </SalesRequestFormContextProvider>
        </ProductCreateFormContextProvider>
    ) : (
        <UserHome />
    );
}
