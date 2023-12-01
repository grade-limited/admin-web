import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateCampaign, IUpdateCampaign } from "./types";
import { ICampaignId } from "@/types";

//Get All Campaigns
const getCampaigns = (params: any) => {
  return instance.get(`/campaigns`, {
    params,
  });
};

export const useGetCampaigns = (params: any) => {
  return useQuery(["/campaigns", params], () => getCampaigns(params), {
    select(data) {
      return data.data;
    },
  });
};

//Get Campaigns by ID
const getCampaignsById = (id?: string) => {
  return instance.get(`/campaigns/${id}`);
};

export const useGetCampaignsById = (id?: string) => {
  return useQuery(["/campaigns/:id", id], () => getCampaignsById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

//Create Campaign
const createCampaign = (data: ICreateCampaign) => {
  return instance.post("/campaigns", data);
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation(createCampaign, {
    onSuccess: () => queryClient.invalidateQueries(["/campaigns"]),
  });
};

//Update Campaign
const updateCampaignsById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateCampaign | any;
}) => {
  return instance.patch(`/campaigns/${id}`, {
    ...data,
  });
};

export const useUpdateCampaignsById = () => {
  const query = useQueryClient();
  return useMutation(updateCampaignsById, {
    onSuccess: () => {
      query.invalidateQueries(["/campaigns"]);
      query.invalidateQueries(["/campaigns/:id"]);
      query.invalidateQueries(["validate"]);
    },
  });
};

//Delete Campaign
const deleteCampaign = ({ id, params }: { id: ICampaignId; params?: any }) => {
  return instance.delete(`/campaigns/${id}`, { params });
};

export const useDeleteCampaign = () => {
  const query = useQueryClient();
  return useMutation(deleteCampaign, {
    onSuccess: () => {
      query.invalidateQueries(["/campaigns"]);
      query.invalidateQueries(["/campaigns/:id"]);
    },
  });
};

//Suspend Campaign
const suspendCampaign = ({ id, params }: { id: ICampaignId; params?: any }) => {
  return instance.put(`/campaigns/${id}`, { params });
};

export const useSuspendCampaign = () => {
  const query = useQueryClient();
  return useMutation(suspendCampaign, {
    onSuccess: () => {
      query.invalidateQueries(["/campaigns"]);
      query.invalidateQueries(["/campaigns/:id"]);
    },
  });
};
