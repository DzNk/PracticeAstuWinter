import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { UserDataRequest } from "../../../api";

function getUserPermission(permission: number): string {
    switch (permission) {
        case 7:
            return "Администратор";
        case 4:
            return "Сотрудник";
        default:
            return "Неизвестно";
    }
}

export function useUserPageColumns() {
    return useMemo<MRT_ColumnDef<UserDataRequest>[]>(
        () => [
            {
                accessorKey: "username",
                header: "Имя пользователя",
            },
            {
                accessorKey: "permission",
                header: "Тип",
                filterVariant: "checkbox",
                Cell: ({ row }) =>
                    `${getUserPermission(row.original.permission)}`,
            },
        ],
        []
    );
}
