import { createFormContext } from "@mantine/form";
import { UserLogin } from "../../../../api";

export const [
    UserLoginFormContextProvider,
    useLoginPageFormContext,
    useLoginPageForm,
] = createFormContext<UserLogin>();
