import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateEmployeeship, IUpdateEmployeeship } from "./types";
import { IEmployeeId } from "@/types";

//Get All Employeeship
const getEmployeeship = (params: any) => {
  return instance.get(`/employeeships`, {
    params,
  });
};

export const useGetEmployeeship = (params: any) => {
  return useQuery(["/employeeships", params], () => getEmployeeship(params), {
    select(data) {
      return data.data;
    },
  });
};

//Get Employeeship by ID
const getEmployeeshipById = (id?: string) => {
  return instance.get(`/employeeships/${id}`);
};

export const useGetEmployeeshipById = (id?: string) => {
  return useQuery(["/employeeships/:id", id], () => getEmployeeshipById(id), {
    enabled: !!id,
    select(data) {
      return data.data.data;
    },
  });
};

//Create Employee
const createEmployee = (data: ICreateEmployeeship) => {
  return instance.post("/employeeships", data);
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(createEmployee, {
    onSuccess: () => queryClient.invalidateQueries(["/employeeships"]),
  });
};

//Update Employee
const updateEmployeeshipById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateEmployeeship | any;
}) => {
  return instance.patch(`/employeeships/${id}`, {
    ...data,
  });
};

export const useUpdateEmployeeshipById = () => {
  const query = useQueryClient();
  return useMutation(updateEmployeeshipById, {
    onSuccess: () => {
      query.invalidateQueries(["/employeeships"]);
      query.invalidateQueries(["/employeeships/:id"]);
      query.invalidateQueries(["validate"]);
    },
  });
};

//Delete Employee
const deleteEmployee = ({ id, params }: { id: IEmployeeId; params?: any }) => {
  return instance.delete(`/employeeships/${id}`, { params });
};

export const useDeleteEmployeeship = () => {
  const query = useQueryClient();
  return useMutation(deleteEmployee, {
    onSuccess: () => {
      query.invalidateQueries(["/employeeships"]);
      query.invalidateQueries(["/employeeships/:id"]);
    },
  });
};

//Suspend Employee
const suspendEmployee = ({ id, params }: { id: IEmployeeId; params?: any }) => {
  return instance.put(`/employeeships/${id}`, { params });
};

export const useSuspendEmployeeship = () => {
  const query = useQueryClient();
  return useMutation(suspendEmployee, {
    onSuccess: () => {
      query.invalidateQueries(["/employeeships"]);
      query.invalidateQueries(["/employeeships/:id"]);
    },
  });
};
