import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "mantine-react-table/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import LayoutPage from "./pages/layout";
import { UserProvider } from "./contexts/userContext/contextProvider.tsx";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

export default function App() {
    return (
        <MantineProvider theme={theme}>
            <ModalsProvider>
                <UserProvider>
                    <Notifications />
                    <LayoutPage />
                </UserProvider>
            </ModalsProvider>
        </MantineProvider>
    );
}
