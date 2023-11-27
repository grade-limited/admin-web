import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

//Get All List
const getCategories = (params: any) => {
  return instance.get(`/Categories`, {
    params,
  });
};

export const useGetCategories = (params: any) => {
  return useQuery(["/Categories", params], () => getCategories(params), {
    select(data) {
      return data.data;
    },
  });
};
