import instance from "@/services";
import { IBrandId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateBrand, IUpdateBrand } from "./types";

//Get All List
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

//Get Using ID
const getBrandsById = (id?: string) => {
  return instance.get(`/brands/${id}`);
};

export const useGetBrandsById = (id?: string) => {
  return useQuery(["/brands/:id", id], () => getBrandsById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

//Update brands details
const updateBrandsById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateBrand | any;
}) => {
  return instance.patch(`/brands/${id}`, {
    ...data,
  });
};

export const useUpdateBrandsById = () => {
  const query = useQueryClient();
  return useMutation(updateBrandsById, {
    onSuccess: () => {
      query.invalidateQueries(["/brands"]);
      query.invalidateQueries(["/brands/:id"]);
    },
  });
};

//Create Function
const createBrand = (data: ICreateBrand) => {
  return instance.post("/brands", data);
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation(createBrand, {
    onSuccess: () => queryClient.invalidateQueries(["/brands"]),
  });
};

//Delete Function
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
