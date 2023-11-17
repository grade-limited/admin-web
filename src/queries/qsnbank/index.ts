import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateQsnBank, IUpdateQsnBank } from "./types";
import { IQsnBankId } from "@/types";

const getQsnBank = (params: any) => {
  return instance.get(`/question-bank`, {
    params,
  });
};

export const useGetQsnBank = (params: any) => {
  return useQuery(["/question-bank", params], () => getQsnBank(params), {
    select(data) {
      return data.data;
    },
  });
};

const getQsnBankById = (id?: string) => {
  return instance.get(`/question-bank/${id}`);
};

export const useGetQsnBankById = (id?: string) => {
  return useQuery(["/question-bank/:id", id], () => getQsnBankById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

const updateQsnBankById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateQsnBank | any;
}) => {
  return instance.patch(`/question-bank/${id}`, {
    ...data,
  });
};

export const useUpdateQsnBankById = () => {
  const query = useQueryClient();
  return useMutation(updateQsnBankById, {
    onSuccess: () => {
      query.invalidateQueries(["/question-bank"]);
      query.invalidateQueries(["/question-bank/:id"]);
      query.invalidateQueries(["validate"]);
    },
  });
};
const createQsnBank = (data: ICreateQsnBank) => {
  return instance.post("/question-bank", data);
};

export const useCreateQsnBank = () => {
  const queryClient = useQueryClient();
  return useMutation(createQsnBank, {
    onSuccess: () => queryClient.invalidateQueries(["/question-bank"]),
  });
};

const deleteQsnBank = ({ id, params }: { id: IQsnBankId; params?: any }) => {
  return instance.delete(`/question-bank/${id}`, { params });
};

export const useDeleteQsnBank = () => {
  const query = useQueryClient();
  return useMutation(deleteQsnBank, {
    onSuccess: () => {
      query.invalidateQueries(["/question-bank"]);
      query.invalidateQueries(["/question-bank/:id"]);
    },
  });
};
