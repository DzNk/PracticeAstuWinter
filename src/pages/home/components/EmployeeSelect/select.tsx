import { Select, SelectProps } from "@mantine/core";
import { useEffect, useState } from "react";
import { Employee, UserService } from "../../../../api";

type ControlledValueProps = {
    value: number;
    onChange: (value: number) => void;
};

type CommonSelectProps = Omit<SelectProps, "value" | "onChange" | "data">;

type Props = Partial<ControlledValueProps> & CommonSelectProps;

export function EmployeeSelect(props: Props) {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        UserService.listEmployees().then(response => {
            setEmployees(response.data.employees);
        });
    }, []);

    const data = employees.map(employee => ({
        value: employee.id.toString(),
        label: employee.username,
    }));

    const { value, onChange, ...rest } = props;

    return (
        <Select
            data={data}
            value={value?.toString()}
            onChange={selectedValue => {
                if (onChange && selectedValue) {
                    onChange(Number(selectedValue));
                }
            }}
            searchable
            {...rest}
        />
    );
}
