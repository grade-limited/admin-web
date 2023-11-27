import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

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
