import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "mantine-react-table/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import LayoutPage from "./pages/layout";
import { UserProvider } from "./contexts/userContext/contextProvider.tsx";
import { Notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { client } from "./api";

export default function App() {
    useEffect(() => {
        client.setConfig({
            baseUrl: import.meta.env.VITE_API_BASE_URL,
        });
    }, []);

    return (
        <MantineProvider theme={theme}>
            <UserProvider>
                <Notifications />
                <LayoutPage />
            </UserProvider>
        </MantineProvider>
    );
}
