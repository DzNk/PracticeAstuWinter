import { useEffect, useState } from "react";
import { ProductOrderItem, ProductsService } from "../../api";
import { notifications } from "@mantine/notifications";
import { saveAs } from "file-saver";

export function useOrdersPage() {
    const [data, setData] = useState<ProductOrderItem[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [globalFilter, setGlobalFilter] = useState("");
    const [rowCount, setRowCount] = useState(0);

    function reloadTable() {
        ProductsService.listProductOrders({
            body: {
                keyword: globalFilter,
                pagination: {
                    page: pagination.pageIndex + 1,
                    perPage: pagination.pageSize,
                },
            },
        }).then(responseReceived => {
            const productOrderItems = responseReceived.data?.items;
            if (!productOrderItems) return;
            setData(productOrderItems);

            const rowCount = responseReceived.data?.paginationInfo;
            if (!rowCount) return;
            setRowCount(rowCount.rowCount);
        });
    }

    function setFinished(id: number) {
        ProductsService.finishOrder({
            body: {
                id: id,
            },
        }).then(response => {
            if (response?.data.ok) {
                notifications.show({
                    title: "Завершено",
                    message: "Ордер успешно завершен",
                    color: "green",
                });
                reloadTable();
            } else {
                notifications.show({
                    title: "Ошибка",
                    message: "Не удалось завершить заказ",
                    color: "red",
                });
            }
        });
    }

    function getPdf(id: number) {
        ProductsService.getOrderPdf({
            body: {
                id: id,
            },
        }).then(response => {
            const data = response.data;
            if (data.fileName) {
                const byteCharacters = atob(data.file);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);

                const blob = new Blob([byteArray], { type: data.fileType });

                saveAs(blob, data.fileName);
            }
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
        setFinished,
        getPdf,
    };
}
