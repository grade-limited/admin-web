import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { useGetBrands } from "@/queries/brands";
import { IOption } from "./types";

const useBrand = () => {
  const { setSearch, getQueryParams } = usePaginate({
    defaultParams: {
      limit: 5,
    },
  });
  const [defaultValue, setDefaultValue] = React.useState<any>(null);
  const [brand, setBrand] = React.useState<IOption[]>([]);
  const { data: brandData, isLoading: brandLoading } = useGetBrands(
    getQueryParams()
  );
  React.useEffect(() => {
    if (!brandData) return;
    var d: IOption[] = [];
    brandData?.data?.map?.((s: { id: string; name: string }) => {
      d.push({
        value: s.id,
        label: s.name,
        data: s,
      });
    });
    if (
      defaultValue &&
      !d?.filter?.((x) => x.value === defaultValue.id)?.length
    ) {
      d.push({
        value: defaultValue.id,
        label: defaultValue.name,
        data: defaultValue,
      });
    }

    setBrand(d);
  }, [brandData, defaultValue]);

  return {
    isBrandLoading: brandLoading,
    brand,
    setDefaultBrand: setDefaultValue,
    searchBrand: (value: string) => {
      setSearch(value);
    },
  };
};

export default useBrand;
