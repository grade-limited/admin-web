import instance from "@/services";
import { IBrandId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getBrands = (params: any) => {
  return instance.get(`/brands`, {
    params,
  });
};

export const useGetBrands = (params: any) => {
  return useQuery(["/brands", params], () => getBrands(params), {
    select(data) {
      return data.data;
    },
  });
};

const deleteBrand = ({ id, params }: { id: IBrandId; params?: any }) => {
  return instance.delete(`/brands/${id}`, { params });
};

export const useDeleteBrand = () => {
  const query = useQueryClient();
  return useMutation(deleteBrand, {
    onSuccess: () => {
      query.invalidateQueries(["/brands"]);
      query.invalidateQueries(["/brands/:id"]);
    },
  });
};
