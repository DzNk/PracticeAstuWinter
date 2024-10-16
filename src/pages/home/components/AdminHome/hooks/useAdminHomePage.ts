import { useEffect, useState } from "react";
import { ProductItem, ProductsService } from "../../../../../api";

export function useAdminHomePage() {
    const [data, setData] = useState<ProductItem[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [globalFilter, setGlobalFilter] = useState("");
    const [rowCount, setRowCount] = useState(0);

    function reloadTable() {
        ProductsService.getProductsList({
            body: {
                keyword: globalFilter,
                pagination: {
                    page: pagination.pageIndex + 1,
                    perPage: pagination.pageSize,
                },
            },
        }).then(responseReceived => {
            const products = responseReceived.data?.products;
            if (!products) return;
            setData(products);

            const rowCount = responseReceived.data?.paginationInfo;
            if (!rowCount) return;
            setRowCount(rowCount.rowCount);
        });
    }

    useEffect(() => {
        reloadTable();
    }, [pagination, globalFilter]);

    return {
        rowCount,
        data,
        pagination,
        setPagination,
        globalFilter,
        setGlobalFilter,
        reloadTable,
    };
}
