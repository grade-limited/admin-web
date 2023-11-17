import instance from "@/services";
import { IQuestionId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateQuestion, IUpdateQuestion } from "./types";

const getQuestions = (params: any) => {
  return instance.get(`/questions`, {
    params,
  });
};

export const useGetQuestions = (params: any) => {
  return useQuery(["/questions", params], () => getQuestions(params), {
    select(data) {
      return data.data;
    },
  });
};
const getQuestionsById = (id?: string) => {
  return instance.get(`/questions/${id}`);
};

export const useGetQuestionsById = (id?: string) => {
  return useQuery(["/questions/:id", id], () => getQuestionsById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

const updateQuestionsById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateQuestion | any;
}) => {
  return instance.patch(`/questions/${id}`, {
    ...data,
  });
};

export const useUpdateQuestionsById = () => {
  const query = useQueryClient();
  return useMutation(updateQuestionsById, {
    onSuccess: () => {
      query.invalidateQueries(["/questions"]);
      query.invalidateQueries(["/questions/:id"]);
      query.invalidateQueries(["validate"]);
    },
  });
};
const createQuestions = (data: ICreateQuestion) => {
  return instance.post("/questions", data);
};

export const useCreateQuestions = () => {
  const queryClient = useQueryClient();
  return useMutation(createQuestions, {
    onSuccess: () => queryClient.invalidateQueries(["/questions"]),
  });
};

const deleteQuestions = ({ id, params }: { id: IQuestionId; params?: any }) => {
  return instance.delete(`/questions/${id}`, { params });
};

export const useDeleteQuestions = () => {
  const query = useQueryClient();
  return useMutation(deleteQuestions, {
    onSuccess: () => {
      query.invalidateQueries(["/questions"]);
      query.invalidateQueries(["/questions/:id"]);
    },
  });
};
