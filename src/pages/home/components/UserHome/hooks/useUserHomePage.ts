import { useEffect, useState } from "react";
import { ProductsService, SalesItem } from "../../../../../api";
import { notifications } from "@mantine/notifications";

export function useUserHomePage() {
    const [data, setData] = useState<SalesItem[]>([]);

    function reloadTable() {
        ProductsService.getSalesList().then(responseReceived => {
            const requests = responseReceived.data?.items;
            if (!requests) return;
            setData(requests);
        });
    }

    function createOrder(ids: number[]) {
        ProductsService.createOrder({ body: { ids: ids } }).then(response => {
            if (response?.data.ok) {
                reloadTable();
                notifications.show({
                    title: "Успешно",
                    message: "Ордер успешно создан",
                    color: "green",
                });
            }
        });
    }

    useEffect(() => {
        reloadTable();
    }, []);

    return {
        data,
        createOrder,
    };
}
