import { useEffect, useState } from "react";
import { ProductItem, ProductsService } from "../../../api";

export function useHomePage() {
    const [data, setData] = useState<ProductItem[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [globalFilter, setGlobalFilter] = useState("");

    useEffect(() => {
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
        });
    }, [pagination, globalFilter]);

    return { data, pagination, setPagination, globalFilter, setGlobalFilter };
}
