import instance from "@/services";
import { IOrderId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUpdateOrder } from "./types";

//Get All List
const getQuotations = (params: any) => {
  return instance.get(`/quotations`, {
    params,
  });
};

export const useGetQuotations = (params: any) => {
  return useQuery(["/quotations", params], () => getQuotations(params), {
    select(data) {
      return data.data;
    },
  });
};

//Get Using ID
const getQuotationsById = (id?: string) => {
  return instance.get(`/quotations/${id}`);
};

export const useGetQuotationsById = (id?: string) => {
  return useQuery(["/quotations/:id", id], () => getQuotationsById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

//Update quotations details
const updateQuotationsById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateOrder | any;
}) => {
  return instance.patch(`/quotations/${id}`, {
    ...data,
  });
};

export const useUpdateQuotationsById = () => {
  const query = useQueryClient();
  return useMutation(updateQuotationsById, {
    onSuccess: () => {
      query.invalidateQueries(["/quotations"]);
      query.invalidateQueries(["/quotations/:id"]);
    },
  });
};

//Delete Function
const deleteQuotations = ({ id, params }: { id: IOrderId; params?: any }) => {
  return instance.delete(`/quotations/${id}`, { params });
};

export const useDeleteQuotations = () => {
  const query = useQueryClient();
  return useMutation(deleteQuotations, {
    onSuccess: () => {
      query.invalidateQueries(["/quotations"]);
      query.invalidateQueries(["/quotations/:id"]);
    },
  });
};
