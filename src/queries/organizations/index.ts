import instance from "@/services";
import { IOrganizationId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateOrganization, IUpdateOrganization } from "./type";

//Get All
const getOrganizations = (params: any) => {
  return instance.get(`/organizations`, {
    params,
  });
};

export const useGetOrganizations = (params: any) => {
  return useQuery(["/organizations", params], () => getOrganizations(params), {
    select(data) {
      return data.data;
    },
  });
};

//Get Using ID
const getOrganizationsById = (id?: string) => {
  return instance.get(`/organizations/${id}`);
};

export const useGetOrganizationsById = (id?: string) => {
  return useQuery(["/organizations/:id", id], () => getOrganizationsById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

//Update organizations details
const updateOrganizationsById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateOrganization | any;
}) => {
  return instance.patch(`/organizations/${id}`, {
    ...data,
  });
};

export const useUpdateOrganizationsById = () => {
  const query = useQueryClient();
  return useMutation(updateOrganizationsById, {
    onSuccess: () => {
      query.invalidateQueries(["/organizations"]);
      query.invalidateQueries(["/organizations/:id"]);
    },
  });
};

//Create Function
const createOrganization = (data: ICreateOrganization) => {
  return instance.post("/organizations", data);
};

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation(createOrganization, {
    onSuccess: () => queryClient.invalidateQueries(["/organizations"]),
  });
};

//Delete Function
const deleteOrganization = ({
  id,
  params,
}: {
  id: IOrganizationId;
  params?: any;
}) => {
  return instance.delete(`/organizations/${id}`, { params });
};

export const useDeleteOrganization = () => {
  const query = useQueryClient();
  return useMutation(deleteOrganization, {
    onSuccess: () => {
      query.invalidateQueries(["/organizations"]);
      query.invalidateQueries(["/organizations/:id"]);
    },
  });
};
