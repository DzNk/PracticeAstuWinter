import { Button, Center, Stack, Title } from "@mantine/core";
import { useOrdersPageColumns } from "./columns.tsx";
import { useOrdersPage } from "./useOrdersPage.ts";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru/index.cjs";
import { useUserContext } from "../../contexts/userContext/context.ts";
import { UserPermission } from "../../contexts/userContext/types.ts";

export function OrdersPage() {
    const user = useUserContext();
    const isAdmin = user.user.permission == UserPermission.Admin;
    const columns = useOrdersPageColumns();
    const {
        rowCount,
        data,
        pagination,
        setPagination,
        globalFilter,
        setGlobalFilter,
        setFinished,
        getPdf,
    } = useOrdersPage();

    const table = useMantineReactTable({
        columns,
        data,
        manualPagination: true,
        rowCount: rowCount,
        onPaginationChange: setPagination,
        manualFiltering: true,
        onGlobalFilterChange: setGlobalFilter,
        state: { pagination, globalFilter },
        paginationDisplayMode: "pages",
        localization: MRT_Localization_RU,
        enableColumnFilters: false,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => {
            return (
                <Stack
                    p={"10px"}
                    gap={"xs"}>
                    {!row.original.finished && isAdmin && (
                        <Button
                            onClick={() => {
                                setFinished(row.original.id);
                            }}>
                            Отметить завершенной
                        </Button>
                    )}
                    <Button
                        onClick={() => {
                            getPdf(row.original.id);
                        }}>
                        Скачать PDF
                    </Button>
                </Stack>
            );
        },
    });

    return (
        <Stack>
            <Center>
                <Title order={2}>Продажи</Title>
            </Center>
            <MantineReactTable table={table} />
        </Stack>
    );
}
