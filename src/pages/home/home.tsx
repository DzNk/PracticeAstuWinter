import { Center, Stack, Title } from "@mantine/core";
import { useHomePage } from "./hooks/useHomePage.ts";

import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useHomePageColumns } from "./columns.ts";

import { MRT_Localization_RU } from "mantine-react-table/locales/ru/index.cjs";

export function HomePage() {
    const { data, pagination, setPagination, globalFilter, setGlobalFilter } =
        useHomePage();
    const columns = useHomePageColumns();
    const table = useMantineReactTable({
        columns,
        data,
        manualPagination: true,
        onPaginationChange: setPagination,
        manualFiltering: true,
        onGlobalFilterChange: setGlobalFilter,
        state: { pagination, globalFilter },
        paginationDisplayMode: "pages",
        localization: MRT_Localization_RU,
        enableColumnFilters: false,
    });

    return (
        <div>
            <Stack>
                <Center>
                    <Title order={2}>Товары</Title>
                </Center>
                <MantineReactTable table={table} />
            </Stack>
        </div>
    );
}
