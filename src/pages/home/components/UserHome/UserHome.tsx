import { useUserHomePageColumns } from "./columns.ts";
import { useUserHomePage } from "./hooks/useUserHomePage.ts";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru/index.cjs";
import { Button, Center, Stack, Title } from "@mantine/core";

export function UserHome() {
    const columns = useUserHomePageColumns();
    const { data, createOrder } = useUserHomePage();

    const table = useMantineReactTable({
        columns,
        data,
        paginationDisplayMode: "pages",
        localization: MRT_Localization_RU,
        enableColumnFilters: true,
        enableTopToolbar: true,
        renderTopToolbarCustomActions: ({ table }) => {
            const ids = table
                .getSelectedRowModel()
                .rows.map(row => row.original.id);
            return (
                <Button
                    onClick={() => {
                        createOrder(ids);
                    }}>
                    Создать ордер
                </Button>
            );
        },
        enableRowSelection: true,
    });

    return (
        <Stack>
            <Center>
                <Title order={2}>Запросы на реализацию</Title>
            </Center>
            <MantineReactTable table={table} />
        </Stack>
    );
}
