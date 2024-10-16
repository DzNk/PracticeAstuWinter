import { Internal } from "./internal.tsx";
import React from "react";
import {
    EditUserFormContextProvider,
    useUserEditForm,
} from "./components/contexts/useUserEditModal/contexts.ts";

export function UserPage() {
    const form = useUserEditForm({
        initialValues: { permission: null, username: "", password: "" },
    });
    return (
        <EditUserFormContextProvider form={form}>
            <Internal />
        </EditUserFormContextProvider>
    );
}
