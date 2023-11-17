import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { useGetQsnBank } from "@/queries/qsnbank";
import { IOption } from "./types";

const useQsnBank = () => {
  const { setSearch, getQueryParams } = usePaginate({
    defaultParams: {
      limit: 40,
    },
  });

  const [qsnBank, setQsnBank] = React.useState<IOption[]>([]);
  const { data: qsnbankData, isLoading: qsnBankLoading } = useGetQsnBank(
    getQueryParams()
  );
  console.log(qsnbankData);
  React.useEffect(() => {
    if (!qsnbankData) return;
    var d: IOption[] = [];
    qsnbankData?.data?.map?.((s: { id: string; name: string }) => {
      d.push({
        value: s.id,
        label: s.name,
        data: s,
      });
    });
    setQsnBank(d);
  }, [qsnbankData]);

  return {
    isQsnBankLoading: qsnBankLoading,
    qsnBank,
    searchQsnBank: (value: string) => {
      setSearch(value);
    },
  };
};

export default useQsnBank;
