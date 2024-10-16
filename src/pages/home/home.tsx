import { AdminHome } from "./components/AdminHome/AdminHome.tsx";
import {
    ProductCreateFormContextProvider,
    useProductCreateForm,
} from "./components/CreateProductModal/contexts/useProductCreationModal/contexts.ts";

export function HomePage() {
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

    return (
        <ProductCreateFormContextProvider form={form}>
            <AdminHome />
        </ProductCreateFormContextProvider>
    );
}
