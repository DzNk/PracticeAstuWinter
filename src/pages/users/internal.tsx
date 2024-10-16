import { useUsersPage } from "./hooks/useUsersPage.ts";
import { useUserPageColumns } from "./hooks/columns.ts";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru/index.cjs";
import { Button, Center, SegmentedControl, Stack, Title } from "@mantine/core";
import { EditUserModal } from "./components/EditUserModal.tsx";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { UserDataRequest } from "../../api";

export function Internal() {
    const {
        rowCount,
        data,
        pagination,
        setPagination,
        globalFilter,
        setGlobalFilter,
        reloadTable,
        permission,
        setPermission,
    } = useUsersPage();
    const columns = useUserPageColumns();
    const [opened, handlers] = useDisclosure(false);
    const [editingData, setEditingData] = useState<UserDataRequest | null>(
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
        initialState: { showColumnFilters: true },
        paginationDisplayMode: "pages",
        localization: MRT_Localization_RU,
        enableColumnFilters: false,
        enableTopToolbar: true,
        enableRowActions: true,
        renderTopToolbarCustomActions: () => (
            <>
                <Button
                    onClick={() => {
                        setEditingData(null);
                        handlers.open();
                    }}>
                    Создать пользователя
                </Button>
                <SegmentedControl
                    value={permission}
                    onChange={setPermission}
                    data={[
                        { label: "Все", value: "all" },
                        { label: "Администратор", value: "admin" },
                        { label: "Сотрудник", value: "user" },
                    ]}
                />
            </>
        ),
        renderRowActionMenuItems: ({ row }) => {
            const handleEditClick = () => {
                setEditingData(row.original);
                handlers.open();
            };

            return (
                <Button onClick={handleEditClick}>Обновить пользователя</Button>
            );
        },
    });

    return (
        <div>
            <EditUserModal
                opened={opened}
                close={handlers.close}
                reloadTable={reloadTable}
                user={editingData}
            />
            <Stack>
                <Center>
                    <Title order={2}>Пользователи</Title>
                </Center>
                <MantineReactTable table={table} />
            </Stack>
        </div>
    );
}
