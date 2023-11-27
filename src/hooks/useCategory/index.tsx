import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { useGetCategories } from "@/queries/categories";
import { IOption } from "./types";

const useCategory = () => {
  const { setSearch, getQueryParams } = usePaginate({
    defaultParams: {
      limit: 40,
    },
  });

  const [category, setCategory] = React.useState<IOption[]>([]);
  const { data: categoryData, isLoading: categoryLoading } = useGetCategories(
    getQueryParams()
  );

  React.useEffect(() => {
    if (!categoryData) return;
    var d: IOption[] = [];
    categoryData?.data?.map?.((s: { id: string; name: string }) => {
      d.push({
        value: s.id,
        label: s.name,
        data: s,
      });
    });
    setCategory(d);
  }, [categoryData]);

  return {
    isCategoryLoading: categoryLoading,
    category,
    searchCategory: (value: string) => {
      setSearch(value);
    },
  };
};

export default useCategory;
