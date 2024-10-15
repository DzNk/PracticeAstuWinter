import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { ProductItem } from "../../api";

function formatNumber(value: number): string {
    let formatted = value.toFixed(2);

    if (formatted.endsWith(".00")) {
        formatted = formatted.slice(0, -3);
    }

    return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function useHomePageColumns() {
    return useMemo<MRT_ColumnDef<ProductItem>[]>(
        () => [
            {
                accessorKey: "article",
                header: "Артикул",
                size: 30,
            },
            {
                accessorKey: "name",
                header: "Название",
                size: 50,
            },
            {
                accessorKey: "description",
                header: "Описание",
                size: 100,
            },
            {
                accessorKey: "price",
                header: "Цена",
                Cell: ({ row }) => `${formatNumber(row.original.price)} руб.`,
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
