import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateCategories, IUpdateCategories } from "./types";
import { ICategoryId } from "@/types";

//Get All List
const getCategories = (params: any) => {
  return instance.get(`/categories`, {
    params,
  });
};

export const useGetCategories = (params: any) => {
  return useQuery(["/categories", params], () => getCategories(params), {
    select(data) {
      return data.data;
    },
  });
};

//Get Using ID
const getCategoriesById = (id?: string) => {
  return instance.get(`/categories/${id}`);
};

export const useGetCategoriesById = (id?: string) => {
  return useQuery(["/categories/:id", id], () => getCategoriesById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

//Update Details
const updateCategoriesById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateCategories | any;
}) => {
  return instance.patch(`/categories/${id}`, {
    ...data,
  });
};

export const useUpdateCategoriesById = () => {
  const query = useQueryClient();
  return useMutation(updateCategoriesById, {
    onSuccess: () => {
      query.invalidateQueries(["/categories"]);
      query.invalidateQueries(["/categories/:id"]);
    },
  });
};

//Create Function
const createCategories = (data: ICreateCategories) => {
  return instance.post("/categories", data);
};

export const useCreateCategories = () => {
  const queryClient = useQueryClient();
  return useMutation(createCategories, {
    onSuccess: () => queryClient.invalidateQueries(["/categories"]),
  });
};

//Delete Function
const deleteCategories = ({
  id,
  params,
}: {
  id: ICategoryId;
  params?: any;
}) => {
  return instance.delete(`/categories/${id}`, { params });
};

export const useDeleteCategories = () => {
  const query = useQueryClient();
  return useMutation(deleteCategories, {
    onSuccess: () => {
      query.invalidateQueries(["/categories"]);
      query.invalidateQueries(["/categories/:id"]);
    },
  });
};
