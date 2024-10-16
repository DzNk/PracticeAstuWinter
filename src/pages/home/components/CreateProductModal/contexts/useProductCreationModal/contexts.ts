import { createFormContext } from "@mantine/form";
import { ProductCreateRequest } from "../../../../../../api";

export const [
    ProductCreateFormContextProvider,
    useProductCreateFormContext,
    useProductCreateForm,
] = createFormContext<ProductCreateRequest>();
