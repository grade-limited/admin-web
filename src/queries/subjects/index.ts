import instance from "@/services";
import { ISubjectId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateSubject, IUpdateSubject } from "./types";

const getSubjects = (params: any) => {
  return instance.get(`/subjects`, {
    params,
  });
};

export const useGetSubjects = (params: any) => {
  return useQuery(["/subjects", params], () => getSubjects(params), {
    select(data) {
      return data.data;
    },
  });
};
const getSubjectsById = (id?: string) => {
  return instance.get(`/subjects/${id}`);
};

export const useGetSubjectsById = (id?: string) => {
  return useQuery(["/subjects/:id", id], () => getSubjectsById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

const updateSubjectsById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateSubject | any;
}) => {
  return instance.patch(`/subjects/${id}`, {
    ...data,
  });
};

export const useUpdateSubjectsById = () => {
  const query = useQueryClient();
  return useMutation(updateSubjectsById, {
    onSuccess: () => {
      query.invalidateQueries(["/subjects"]);
      query.invalidateQueries(["/subjects/:id"]);
      query.invalidateQueries(["validate"]);
    },
  });
};
const createSubject = (data: ICreateSubject) => {
  return instance.post("/subjects", data);
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation(createSubject, {
    onSuccess: () => queryClient.invalidateQueries(["/subjects"]),
  });
};

const deleteSubject = ({ id, params }: { id: ISubjectId; params?: any }) => {
  return instance.delete(`/subjects/${id}`, { params });
};

export const useDeleteSubject = () => {
  const query = useQueryClient();
  return useMutation(deleteSubject, {
    onSuccess: () => {
      query.invalidateQueries(["/subjects"]);
      query.invalidateQueries(["/subjects/:id"]);
    },
  });
};
