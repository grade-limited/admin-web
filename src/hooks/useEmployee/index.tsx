import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { useGetEmployees } from "@/queries/employees";
import { IOption } from "../useRole/types";

const useEmployee = () => {
  const { setSearch, getQueryParams } = usePaginate({
    defaultParams: {
      limit: 40,
    },
  });

  const [employee, setEmployee] = React.useState<IOption[]>([]);
  const { data: employeeData, isLoading: employeeLoading } = useGetEmployees(
    getQueryParams()
  );

  React.useEffect(() => {
    if (!employeeData) return;
    var d: IOption[] = [];
    employeeData?.data?.data?.map?.(
      (s: { id: string; first_name: string; last_name: string }) => {
        d.push({
          value: s.id,
          label: `${s.first_name} ${s.last_name}`,
          data: s,
        });
      }
    );
    setEmployee(d);
  }, [employeeData]);

  return {
    isEmployeeLoading: employeeLoading,
    employee,
    searchEmployee: (value: string) => {
      setSearch(value);
    },
  };
};

export default useEmployee;
