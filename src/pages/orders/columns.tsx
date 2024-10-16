import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { ProductOrderItem } from "../../api";
import { useUserContext } from "../../contexts/userContext/context.ts";
import { UserPermission } from "../../contexts/userContext/types.ts";

function formatNumber(value: number): string {
    let formatted = value.toFixed(2);

    if (formatted.endsWith(".00")) {
        formatted = formatted.slice(0, -3);
    }

    return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function useOrdersPageColumns() {
    const user = useUserContext();
    const isAdmin = user.user.permission == UserPermission.Admin;
    return useMemo<MRT_ColumnDef<ProductOrderItem>[]>(
        () => [
            {
                accessorKey: "id",
                header: "Номер",
                size: 30,
            },
            {
                accessorKey: "date",
                header: "Дата формирования",
                Cell: ({ row }) =>
                    new Date(row.original.date).toLocaleDateString(),
                size: 30,
            },
            {
                accessorKey: "username",
                header: "Сотрудник",
                size: 50,
            },
            isAdmin
                ? {
                      accessorKey: "price",
                      header: "Стоимость товаров",
                      Cell: ({ row }) =>
                          `${formatNumber(row.original.price)} руб.`,
                      size: 50,
                  }
                : {
                      accessorKey: "income",
                      header: "Доход за продажу",
                      Cell: ({ row }) =>
                          `${formatNumber(row.original.income)} руб.`,
                      size: 50,
                  },
            {
                accessorKey: "finished",
                header: isAdmin ? "Завершен" : "Оплачен",
                Cell: ({ row }) => (row.original.finished ? "Да" : "Нет"),
                size: 50,
            },
        ],
        [user]
    );
}
