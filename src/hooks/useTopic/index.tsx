import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { useGetTopics } from "@/queries/topics";
import { IOption } from "../useRole/types";

const useTopic = () => {
  const { setSearch, getQueryParams } = usePaginate({
    defaultParams: {
      limit: 40,
    },
  });

  const [topic, setTopic] = React.useState<IOption[]>([]);
  const { data: topicData, isLoading: topicLoading } = useGetTopics(
    getQueryParams()
  );

  React.useEffect(() => {
    if (!topicData) return;
    var d: IOption[] = [];
    topicData?.data?.map?.((s: { id: string; name: string }) => {
      d.push({
        value: s.id,
        label: s.name,
        data: s,
      });
    });
    setTopic(d);
  }, [topicData]);

  return {
    isTopicLoading: topicLoading,
    topic,
    searchTopic: (value: string) => {
      setSearch(value);
    },
  };
};

export default useTopic;
