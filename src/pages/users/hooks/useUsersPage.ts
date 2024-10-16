import { useEffect, useState } from "react";
import { UserDataRequest, UserService } from "../../../api";

export function useUsersPage() {
    const [permission, setPermission] = useState("all");

    const [data, setData] = useState<UserDataRequest[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [globalFilter, setGlobalFilter] = useState("");
    const [rowCount, setRowCount] = useState(0);

    function mapPermission(permission: string): number | null {
        switch (permission) {
            case "admin":
                return 4;
            case "user":
                return 7;
            default:
                return null;
        }
    }

    function reloadTable() {
        UserService.listUsers({
            body: {
                keyword: globalFilter,
                permission: mapPermission(permission),
                pagination: {
                    page: pagination.pageIndex + 1,
                    perPage: pagination.pageSize,
                },
            },
        }).then(responseReceived => {
            const users = responseReceived.data?.users;
            if (!users) return;
            setData(users);

            const rowCount = responseReceived.data?.paginationInfo;
            if (!rowCount) return;
            setRowCount(rowCount.rowCount);
        });
    }

    useEffect(() => {
        reloadTable();
    }, [pagination, globalFilter, permission]);

    return {
        rowCount,
        data,
        pagination,
        setPagination,
        globalFilter,
        setGlobalFilter,
        reloadTable,
        permission,
        setPermission,
    };
}
