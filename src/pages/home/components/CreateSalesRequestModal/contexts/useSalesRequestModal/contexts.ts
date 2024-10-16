import { createFormContext } from "@mantine/form";
import { SalesRequest } from "../../../../../../api";

export const [
    SalesRequestFormContextProvider,
    useSalesRequestFormContext,
    useSalesRequestForm,
] = createFormContext<SalesRequest>();
