import instance from "@/services";
import { IRequestId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateRequest, IUpdateRequest } from "./types";

//Get All List
const getRequests = (params: any) => {
  return instance.get(`/requests`, {
    params,
  });
};

export const useGetRequests = (params: any) => {
  return useQuery(["/requests", params], () => getRequests(params), {
    select(data) {
      return data.data;
    },
  });
};

//Get Using ID
const getRequestsById = (id?: string) => {
  return instance.get(`/requests/${id}`);
};

export const useGetRequestsById = (id?: string) => {
  return useQuery(["/requests/:id", id], () => getRequestsById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

//Update requests details
const updateRequestsById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateRequest | any;
}) => {
  return instance.patch(`/requests/${id}`, {
    ...data,
  });
};

export const useUpdateRequestsById = () => {
  const query = useQueryClient();
  return useMutation(updateRequestsById, {
    onSuccess: () => {
      query.invalidateQueries(["/requests"]);
      query.invalidateQueries(["/requests/:id"]);
    },
  });
};

//Create Function
const createRequest = (data: ICreateRequest) => {
  return instance.post("/requests", data);
};

export const useCreateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation(createRequest, {
    onSuccess: () => queryClient.invalidateQueries(["/requests"]),
  });
};

//Delete Function
const deleteRequest = ({ id, params }: { id: IRequestId; params?: any }) => {
  return instance.delete(`/requests/${id}`, { params });
};

export const useDeleteRequest = () => {
  const query = useQueryClient();
  return useMutation(deleteRequest, {
    onSuccess: () => {
      query.invalidateQueries(["/requests"]);
      query.invalidateQueries(["/requests/:id"]);
    },
  });
};
