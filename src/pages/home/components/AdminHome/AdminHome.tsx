import { Button, Center, Menu, Stack, Title } from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru/index.cjs";
import { useAdminHomePage } from "./hooks/useAdminHomePage.ts";
import { useHomePageColumns } from "../../columns.ts";
import { CreateProductModal } from "../CreateProductModal/CreateProductModal.tsx";
import { useDisclosure } from "@mantine/hooks";
import { ProductEditRequest } from "../../../../api";
import { useState } from "react";
import { CreateSalesRequestModal } from "../CreateSalesRequestModal/CreateSalesRequestModal.tsx";
import { useSalesRequestFormContext } from "../CreateSalesRequestModal/contexts/useSalesRequestModal/contexts.ts";

export function AdminHome() {
    const {
        rowCount,
        data,
        pagination,
        setPagination,
        globalFilter,
        setGlobalFilter,
        reloadTable,
    } = useAdminHomePage();

    const columns = useHomePageColumns();
    const salesForm = useSalesRequestFormContext();
    const [createOpened, createHandlers] = useDisclosure(false);
    const [salesOpened, salesHandlers] = useDisclosure(false);

    const [editingData, setEditingData] = useState<ProductEditRequest | null>(
        null
    );

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
        enableTopToolbar: true,
        enableRowActions: true,
        renderTopToolbarCustomActions: () => (
            <Button
                onClick={() => {
                    setEditingData(null);
                    createHandlers.open();
                }}>
                Создать товар
            </Button>
        ),
        renderRowActionMenuItems: ({ row }) => {
            const handleEditClick = () => {
                setEditingData(row.original);
                createHandlers.open();
            };

            return (
                <Stack
                    p={"10px"}
                    gap={"xs"}>
                    <Button onClick={handleEditClick}>Обновить товар</Button>
                    <Button
                        onClick={() => {
                            salesForm.setValues({
                                quantity: row.original.quantity,
                                price: row.original.price,
                                article: row.original.article,
                            });
                            salesHandlers.open();
                        }}>
                        Создать запрос на продажу
                    </Button>
                </Stack>
            );
        },
    });

    return (
        <div>
            <CreateSalesRequestModal
                opened={salesOpened}
                reloadTable={reloadTable}
                close={salesHandlers.close}
            />
            <CreateProductModal
                opened={createOpened}
                product={editingData}
                reloadTable={reloadTable}
                close={createHandlers.close}
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
