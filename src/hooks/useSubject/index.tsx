import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { useGetSubjects } from "@/queries/subjects";
import { IOption } from "./types";

const useSubject = () => {
  const { setSearch, getQueryParams } = usePaginate({
    defaultParams: {
      limit: 40,
    },
  });

  const [subject, setSubject] = React.useState<IOption[]>([]);
  const { data: subjectData, isLoading: subjectLoading } = useGetSubjects(
    getQueryParams()
  );
  console.log(subjectData);
  React.useEffect(() => {
    if (!subjectData) return;
    var d: IOption[] = [];
    subjectData?.data?.map?.((s: { id: string; name: string }) => {
      d.push({
        value: s.id,
        label: s.name,
        data: s,
      });
    });
    setSubject(d);
  }, [subjectData]);

  return {
    isSubjectLoading: subjectLoading,
    subject,
    searchSubject: (value: string) => {
      setSearch(value);
    },
  };
};

export default useSubject;
