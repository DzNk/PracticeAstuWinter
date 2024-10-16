import { createFormContext } from "@mantine/form";
import { UserDataRequest } from "../../../../../api";

export const [
    EditUserFormContextProvider,
    useUserEditFormContext,
    useUserEditForm,
] = createFormContext<UserDataRequest>();
