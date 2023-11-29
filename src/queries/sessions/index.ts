import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getEmployeeSessions = (params: any) => {
  return instance.get(`/sessions/employees`, {
    params,
  });
};

export const useGetEmployeeSessions = (params: any) => {
  return useQuery(["/sessions/employees", params], () =>
    getEmployeeSessions(params)
  );
};

const employeeSessionSignOut = (id: number) => {
  return instance.put(`/sessions/employees/${id}`);
};

export const useEmployeeSessionSignOut = () => {
  const query = useQueryClient();
  return useMutation(employeeSessionSignOut, {
    onSuccess: () => {
      query.invalidateQueries(["/sessions/employees"]);
      query.invalidateQueries(["/admin/validate"]);
    },
  });
};

const getUserSessions = (params: any) => {
  return instance.get(`/sessions/users`, {
    params,
  });
};

export const useGetUserSessions = (params: any) => {
  return useQuery(["/sessions/users", params], () => getUserSessions(params));
};

const userSessionSignOut = (id: number) => {
  return instance.put(`/sessions/users/${id}`);
};

export const useUserSessionSignOut = () => {
  const query = useQueryClient();
  return useMutation(userSessionSignOut, {
    onSuccess: () => {
      query.invalidateQueries(["/sessions/users"]);
      query.invalidateQueries(["/admin/validate"]);
    },
  });
};
