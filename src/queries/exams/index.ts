import instance from "@/services";
import { IExamId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateExam, IUpdateExam } from "./types";

const getExams = (params: any) => {
  return instance.get(`/exams`, {
    params,
  });
};

export const useGetExams = (params: any) => {
  return useQuery(["/exams", params], () => getExams(params), {
    select(data) {
      return data.data;
    },
  });
};
const getExamsById = (id?: string) => {
  return instance.get(`/exams/${id}`);
};

export const useGetExamsById = (id?: string) => {
  return useQuery(["/exams/:id", id], () => getExamsById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

const updateExamsById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateExam | any;
}) => {
  return instance.patch(`/exams/${id}`, {
    ...data,
  });
};

export const useUpdateExamsById = () => {
  const query = useQueryClient();
  return useMutation(updateExamsById, {
    onSuccess: () => {
      query.invalidateQueries(["/exams"]);
      query.invalidateQueries(["/exams/:id"]);
      query.invalidateQueries(["validate"]);
    },
  });
};
const createExams = (data: ICreateExam) => {
  return instance.post("/exams", data);
};

export const useCreateExams = () => {
  const queryClient = useQueryClient();
  return useMutation(createExams, {
    onSuccess: () => queryClient.invalidateQueries(["/exams"]),
  });
};

const deleteExams = ({ id, params }: { id: IExamId; params?: any }) => {
  return instance.delete(`/exams/${id}`, { params });
};

export const useDeleteExams = () => {
  const query = useQueryClient();
  return useMutation(deleteExams, {
    onSuccess: () => {
      query.invalidateQueries(["/exams"]);
      query.invalidateQueries(["/exams/:id"]);
    },
  });
};
