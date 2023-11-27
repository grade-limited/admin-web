import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateEmployee, IUpdateEmployee } from "./types";
import { IEmployeeId } from "@/types";

const getEmployees = (params: any) => {
  return instance.get(`/employees`, {
    params,
  });
};

export const useGetEmployees = (params: any) => {
  return useQuery(["/employees", params], () => getEmployees(params), {
    select(data) {
      return data.data;
    },
  });
};

const createEmployee = (data: ICreateEmployee) => {
  return instance.post("/employees", data);
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(createEmployee, {
    onSuccess: () => queryClient.invalidateQueries(["/employees"]),
  });
};

const getEmployeesById = (id?: string) => {
  return instance.get(`/employees/${id}`);
};

export const useGetEmployeesById = (id?: string) => {
  return useQuery(["/employees/:id", id], () => getEmployeesById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

const updateEmployeesById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateEmployee | any;
}) => {
  return instance.patch(`/employees/${id}`, {
    ...data,
  });
};

export const useUpdateEmployeesById = () => {
  const query = useQueryClient();
  return useMutation(updateEmployeesById, {
    onSuccess: () => {
      query.invalidateQueries(["/employees"]);
      query.invalidateQueries(["/employees/:id"]);
      query.invalidateQueries(["validate"]);
    },
  });
};

const deleteEmployee = ({ id, params }: { id: IEmployeeId; params?: any }) => {
  return instance.delete(`/employees/${id}`, { params });
};

export const useDeleteEmployee = () => {
  const query = useQueryClient();
  return useMutation(deleteEmployee, {
    onSuccess: () => {
      query.invalidateQueries(["/employees"]);
      query.invalidateQueries(["/employees/:id"]);
    },
  });
};

const suspendEmployee = ({ id, params }: { id: IEmployeeId; params?: any }) => {
  return instance.put(`/employees/${id}`, { params });
};

export const useSuspendEmployee = () => {
  const query = useQueryClient();
  return useMutation(suspendEmployee, {
    onSuccess: () => {
      query.invalidateQueries(["/employees"]);
      query.invalidateQueries(["/employees/:id"]);
    },
  });
};
