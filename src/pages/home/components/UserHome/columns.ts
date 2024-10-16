import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { SalesItem } from "../../../../api";

function formatNumber(value: number): string {
    let formatted = value.toFixed(2);

    if (formatted.endsWith(".00")) {
        formatted = formatted.slice(0, -3);
    }

    return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function useUserHomePageColumns() {
    return useMemo<MRT_ColumnDef<SalesItem>[]>(
        () => [
            {
                accessorKey: "productName",
                header: "Название",
                size: 30,
            },
            {
                accessorKey: "price",
                header: "Цена",
                Cell: ({ row }) => `${formatNumber(row.original.price)} руб.`,
                size: 30,
            },
            {
                accessorKey: "income",
                header: "Выплата за единицу",
                size: 30,
            },
            {
                accessorKey: "quantity",
                header: "Количество",
                size: 30,
            },
        ],
        []
    );
}
