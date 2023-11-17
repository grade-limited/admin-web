import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { useGetRoles } from "@/queries/roles";
import { IOption } from "./types";

const useRole = () => {
  const { setSearch, getQueryParams } = usePaginate({
    defaultParams: {
      limit: 40,
    },
  });

  const [role, setRole] = React.useState<IOption[]>([]);
  const { data: roleData, isLoading: roleLoading } = useGetRoles(
    getQueryParams()
  );

  React.useEffect(() => {
    if (!roleData) return;
    var d: IOption[] = [];
    roleData?.data?.data?.map?.((s: { id: string; name: string }) => {
      d.push({
        value: s.id,
        label: s.name,
        data: s,
      });
    });
    setRole(d);
  }, [roleData]);

  return {
    isRoleLoading: roleLoading,
    role,
    searchRole: (value: string) => {
      setSearch(value);
    },
  };
};

export default useRole;
