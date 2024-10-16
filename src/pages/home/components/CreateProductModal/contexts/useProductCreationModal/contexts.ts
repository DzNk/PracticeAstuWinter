import { createFormContext } from "@mantine/form";
import { ProductEditRequest } from "../../../../../../api";

export const [
    ProductCreateFormContextProvider,
    useProductCreateFormContext,
    useProductCreateForm,
] = createFormContext<ProductEditRequest>();
