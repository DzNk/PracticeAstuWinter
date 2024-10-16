import { Button, Center, Stack, Title } from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru/index.cjs";
import { useAdminHomePage } from "./hooks/useAdminHomePage.ts";
import { useHomePageColumns } from "../../columns.ts";
import { CreateProductModal } from "../CreateProductModal/CreateProductModal.tsx";
import { useDisclosure } from "@mantine/hooks";
import { ProductEditRequest } from "../../../../api";
import { useState } from "react";

export function AdminHome() {
    const {
        data,
        pagination,
        setPagination,
        globalFilter,
        setGlobalFilter,
        reloadTable,
    } = useAdminHomePage();

    const columns = useHomePageColumns();
    const [opened, handlers] = useDisclosure(false);
    const [editingData, setEditingData] = useState<ProductEditRequest | null>(
        null
    );

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
        enableTopToolbar: true,
        enableRowActions: true,
        renderTopToolbarCustomActions: () => (
            <Button
                onClick={() => {
                    setEditingData(null); // Устанавливаем null, чтобы открыть для создания
                    handlers.open();
                }}>
                Создать товар
            </Button>
        ),
        renderRowActionMenuItems: ({ row }) => {
            const handleEditClick = () => {
                setEditingData(row.original); // Устанавливаем данные продукта для редактирования
                handlers.open();
            };

            return <Button onClick={handleEditClick}>Обновить товар</Button>;
        },
    });

    return (
        <div>
            <CreateProductModal
                opened={opened}
                product={editingData} // Передаем данные для редактирования
                reloadTable={reloadTable}
                close={handlers.close}
            />
            <Stack>
                <Center>
                    <Title order={2}>Товары</Title>
                </Center>
                <MantineReactTable table={table} />
            </Stack>
        </div>
    );
}
