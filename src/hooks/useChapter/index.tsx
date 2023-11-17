import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { useGetChapters } from "@/queries/chapters";
import { IOption } from "./types";

const useChapter = () => {
  const { setSearch, getQueryParams } = usePaginate({
    defaultParams: {
      limit: 40,
    },
  });

  const [chapter, setChapter] = React.useState<IOption[]>([]);
  const { data: chapterData, isLoading: chapterLoading } = useGetChapters(
    getQueryParams()
  );
  console.log(chapterData);
  React.useEffect(() => {
    if (!chapterData) return;
    var d: IOption[] = [];
    chapterData?.data?.map?.((s: { id: string; name: string }) => {
      d.push({
        value: s.id,
        label: s.name,
        data: s,
      });
    });
    setChapter(d);
  }, [chapterData]);

  return {
    isChapterLoading: chapterLoading,
    chapter,
    searchChapter: (value: string) => {
      setSearch(value);
    },
  };
};

export default useChapter;
