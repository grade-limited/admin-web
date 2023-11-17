import instance from "@/services";
import { IUserId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUpdateUser } from "./types";

const getUsers = (params: any) => {
  return instance.get(`/users`, {
    params,
  });
};

export const useGetUsers = (params: any) => {
  return useQuery(["/users", params], () => getUsers(params));
};

const getUsersById = (id?: IUserId) => {
  return instance.get(`/users/${id}`);
};

export const useGetUsersById = (id?: IUserId) => {
  return useQuery(["/users/:id", id], () => getUsersById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

const deleteUser = ({ id, params }: { id: IUserId; params?: any }) => {
  return instance.delete(`/users/${id}`, { params });
};

export const useDeleteUser = () => {
  const query = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: () => {
      query.invalidateQueries(["/users"]);
      query.invalidateQueries(["/users/:id"]);
    },
  });
};

const suspendUser = ({ id, params }: { id: IUserId; params?: any }) => {
  return instance.put(`/users/${id}`, { params });
};

export const useSuspendUser = () => {
  const query = useQueryClient();
  return useMutation(suspendUser, {
    onSuccess: () => {
      query.invalidateQueries(["/users"]);
      query.invalidateQueries(["/users/:id"]);
    },
  });
};

const updateUsersById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateUser | any;
}) => {
  return instance.patch(`/users/${id}`, {
    ...data,
  });
};

export const useUpdateUsersById = () => {
  const query = useQueryClient();
  return useMutation(updateUsersById, {
    onSuccess: () => {
      query.invalidateQueries(["/users"]);
      query.invalidateQueries(["/users/:id"]);
      query.invalidateQueries(["validate"]);
    },
  });
};
