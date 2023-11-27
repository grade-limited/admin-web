import instance from "@/services";
import { IProductId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateProduct, IUpdateProduct } from "./type";

//Get All
const getProducts = (params: any) => {
  return instance.get(`/products`, {
    params,
  });
};

export const useGetProducts = (params: any) => {
  return useQuery(["/products", params], () => getProducts(params), {
    select(data) {
      return data.data;
    },
  });
};

//Get Using ID
const getProductsById = (id?: string) => {
  return instance.get(`/products/${id}`);
};

export const useGetProductsById = (id?: string) => {
  return useQuery(["/products/:id", id], () => getProductsById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

//Update products details
const updateProductsById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateProduct | any;
}) => {
  return instance.patch(`/products/${id}`, {
    ...data,
  });
};

export const useUpdateProductsById = () => {
  const query = useQueryClient();
  return useMutation(updateProductsById, {
    onSuccess: () => {
      query.invalidateQueries(["/products"]);
      query.invalidateQueries(["/products/:id"]);
    },
  });
};

//Create Function
const createProduct = (data: ICreateProduct) => {
  return instance.post("/products", data);
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(createProduct, {
    onSuccess: () => queryClient.invalidateQueries(["/products"]),
  });
};

//Delete Function
const deleteProduct = ({ id, params }: { id: IProductId; params?: any }) => {
  return instance.delete(`/products/${id}`, { params });
};

export const useDeleteProduct = () => {
  const query = useQueryClient();
  return useMutation(deleteProduct, {
    onSuccess: () => {
      query.invalidateQueries(["/products"]);
      query.invalidateQueries(["/products/:id"]);
    },
  });
};
