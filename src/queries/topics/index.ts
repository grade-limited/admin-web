import instance from "@/services";
import { ITopicId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateTopic, IUpdateTopic } from "./types";

const getTopics = (params: any) => {
  return instance.get(`/topics`, {
    params,
  });
};

export const useGetTopics = (params: any) => {
  return useQuery(["/topics", params], () => getTopics(params), {
    select(data) {
      return data.data;
    },
  });
};
const getTopicsById = (id?: string) => {
  return instance.get(`/topics/${id}`);
};

export const useGetTopicsById = (id?: string) => {
  return useQuery(["/topics/:id", id], () => getTopicsById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

const updateTopicsById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateTopic | any;
}) => {
  return instance.patch(`/topics/${id}`, {
    ...data,
  });
};

export const useUpdateTopicsById = () => {
  const query = useQueryClient();
  return useMutation(updateTopicsById, {
    onSuccess: () => {
      query.invalidateQueries(["/topics"]);
      query.invalidateQueries(["/topics/:id"]);
      query.invalidateQueries(["validate"]);
    },
  });
};
const createTopics = (data: ICreateTopic) => {
  return instance.post("/topics", data);
};

export const useCreateTopics = () => {
  const queryClient = useQueryClient();
  return useMutation(createTopics, {
    onSuccess: () => queryClient.invalidateQueries(["/topics"]),
  });
};

const deleteTopics = ({ id, params }: { id: ITopicId; params?: any }) => {
  return instance.delete(`/topics/${id}`, { params });
};

export const useDeleteTopics = () => {
  const query = useQueryClient();
  return useMutation(deleteTopics, {
    onSuccess: () => {
      query.invalidateQueries(["/topics"]);
      query.invalidateQueries(["/topics/:id"]);
    },
  });
};
