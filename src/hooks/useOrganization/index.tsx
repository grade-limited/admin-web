import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { useGetOrganizations } from "@/queries/organizations";
import { IOption } from "./types";

const useOrganization = () => {
  const { setSearch, getQueryParams } = usePaginate({
    defaultParams: {
      limit: 40,
    },
  });

  const [organization, setOrganization] = React.useState<IOption[]>([]);
  const { data: organizationData, isLoading: organizationLoading } =
    useGetOrganizations(getQueryParams());

  React.useEffect(() => {
    if (!organizationData) return;
    var d: IOption[] = [];
    organizationData?.data?.map?.((s: { id: string; name: string }) => {
      d.push({
        value: s.id,
        label: s.name,
        data: s,
      });
    });
    setOrganization(d);
  }, [organizationData]);

  return {
    isOrganizationLoading: organizationLoading,
    organization,
    searchOrganization: (value: string) => {
      setSearch(value);
    },
  };
};

export default useOrganization;
