import instance from "@/services";
import { IOrderId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUpdateOrder } from "./types";

//Get All List
const getOrders = (params: any) => {
  return instance.get(`/orders`, {
    params,
  });
};

export const useGetOrders = (params: any) => {
  return useQuery(["/orders", params], () => getOrders(params), {
    select(data) {
      return data.data;
    },
  });
};

//Get Using ID
const getOrdersById = (id?: string) => {
  return instance.get(`/orders/${id}`);
};

export const useGetOrdersById = (id?: string) => {
  return useQuery(["/orders/:id", id], () => getOrdersById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

//Update orders details
const updateOrdersById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateOrder | any;
}) => {
  return instance.patch(`/orders/${id}`, {
    ...data,
  });
};

export const useUpdateOrdersById = () => {
  const query = useQueryClient();
  return useMutation(updateOrdersById, {
    onSuccess: () => {
      query.invalidateQueries(["/orders"]);
      query.invalidateQueries(["/orders/:id"]);
    },
  });
};

//Delete Function
const deleteOrders = ({ id, params }: { id: IOrderId; params?: any }) => {
  return instance.delete(`/orders/${id}`, { params });
};

export const useDeleteOrders = () => {
  const query = useQueryClient();
  return useMutation(deleteOrders, {
    onSuccess: () => {
      query.invalidateQueries(["/orders"]);
      query.invalidateQueries(["/orders/:id"]);
    },
  });
};
