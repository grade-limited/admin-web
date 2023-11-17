import instance from "@/services";
import { IChapterId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateChapter, IUpdateChapter } from "./types";

const getChapters = (params: any) => {
  return instance.get(`/chapters`, {
    params,
  });
};

export const useGetChapters = (params: any) => {
  return useQuery(["/chapters", params], () => getChapters(params), {
    select(data) {
      return data.data;
    },
  });
};
const getChaptersById = (id?: string) => {
  return instance.get(`/chapters/${id}`);
};

export const useGetChaptersById = (id?: string) => {
  return useQuery(["/chapters/:id", id], () => getChaptersById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

const updateChaptersById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateChapter | any;
}) => {
  return instance.patch(`/chapters/${id}`, {
    ...data,
  });
};

export const useUpdateChaptersById = () => {
  const query = useQueryClient();
  return useMutation(updateChaptersById, {
    onSuccess: () => {
      query.invalidateQueries(["/chapters"]);
      query.invalidateQueries(["/chapters/:id"]);
      query.invalidateQueries(["validate"]);
    },
  });
};
const createChapters = (data: ICreateChapter) => {
  return instance.post("/chapters", data);
};

export const useCreateChapters = () => {
  const queryClient = useQueryClient();
  return useMutation(createChapters, {
    onSuccess: () => queryClient.invalidateQueries(["/chapters"]),
  });
};

const deleteChapters = ({ id, params }: { id: IChapterId; params?: any }) => {
  return instance.delete(`/chapters/${id}`, { params });
};

export const useDeleteChapters = () => {
  const query = useQueryClient();
  return useMutation(deleteChapters, {
    onSuccess: () => {
      query.invalidateQueries(["/chapters"]);
      query.invalidateQueries(["/chapters/:id"]);
    },
  });
};
