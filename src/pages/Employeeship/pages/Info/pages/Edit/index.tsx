import {
  useGetEmployeeshipById,
  useUpdateEmployeeshipById,
} from "@/queries/employeeship";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Input, Spin, message, Cascader } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

import { joiResolver } from "@hookform/resolvers/joi";
import { employeeshipUpdateResolver } from "./resolver";
import ErrorSuffix from "@components/antd/ErrorSuffix";
// import Iconify from "@components/iconify";
// import useOrganization from "@/hooks/useOrganization";
// import useUserHook from "@/hooks/useUserHook";
import { IOption } from "@/hooks/useRole/types";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const { organization, isOrganizationLoading, searchOrganization } =
  //   useOrganization();
  // const { user, isUserLoading, searchUser } = useUserHook();
  const { data, isLoading } = useGetEmployeeshipById(id);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    resolver: joiResolver(employeeshipUpdateResolver),
  });
  const [employeeshipInfo, setEmployeeshipInfo] = React.useState<any>([]);
  const { mutateAsync: update, isLoading: isEmployeeshipUpdating } =
    useUpdateEmployeeshipById();

  React.useEffect(() => {
    if (!data) return;
    setEmployeeshipInfo(data);
  }, [data]);

  React.useEffect(() => {
    if (!employeeshipInfo || isDirty) return;
    reset({
      employeeship_status: employeeshipInfo?.employeeship_status,
      // organization_id: employeeshipInfo?.organization_id,
      // user_id: employeeshipInfo?.user_id,
      employee_id: employeeshipInfo?.employee_id,
      depertment: employeeshipInfo?.depertment,
      designation: employeeshipInfo?.designation,
      branch: employeeshipInfo?.branch,
      desk_info: employeeshipInfo?.desk_info,
      business_unit: employeeshipInfo?.business_unit,
    });
  }, [employeeshipInfo]);

  const statusData: IOption[] = [
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "confirmed",
      label: "Confirmed",
    },
    {
      value: "declined",
      label: "Declined",
    },
  ];
  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Employeeship..",
      duration: 0,
    });
    const res = await handleResponse(() =>
      update({
        id,
        data,
      })
    );
    message.destroy();
    if (res.status) {
      reset();
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
        >
          <p className="font-medium mb-2">Information</p>
          <div className="border p-3 rounded-md bg-slate-50">
            {/* <div className="flex flex-row items-center gap-10"> */}
            <div className="mt-2">
              <Controller
                control={control}
                name={"employeeship_status"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-1">
                      Employeeship Status
                      <ErrorSuffix error={error} size="small" />
                    </Label>
                    <Cascader
                      size={"large"}
                      placeholder={"Select Status"}
                      className="relative w-full"
                      allowClear={true}
                      value={value}
                      showSearch
                      options={statusData}
                      onChange={(v) => onChange(v?.[0])}
                      onBlur={onBlur}
                      status={error ? "error" : ""}
                    />
                  </>
                )}
              />
            </div>
            {/* <div className="mt-2">
              <Controller
                control={control}
                name={"user_id"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-1">
                      User
                      <ErrorSuffix error={error} size="small" />
                    </Label>
                    <Cascader
                    
                      value={value}
                      size="large"
                      showSearch
                      className="w-full"
                      placeholder={"Select an User..."}
                      suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
                      onChange={(v) => onChange(v?.[0])}
                      options={user}
                      onSearch={searchUser}
                      loading={isUserLoading}
                      status={error ? "error" : ""}
                    />
                  </>
                )}
              />
            </div> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="mt-2">
                <Controller
                  control={control}
                  name={"employee_id"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Label isRequired className="my-2">
                        Employee ID
                        <ErrorSuffix error={error} size="small" />
                      </Label>
                      <Input
                        placeholder={"Enter Employee ID"}
                        size={"large"}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? "error" : ""}
                        //   suffix={<ErrorSuffix error={error} />}
                      />
                    </>
                  )}
                />
              </div>
              {/* <div className="mt-2">
                <Controller
                  control={control}
                  name={"organization_id"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Label className="my-2">
                        Organization
                        <ErrorSuffix error={error} size="small" />
                      </Label>
                      <Cascader
                        value={value}
                        size="large"
                        showSearch
                        className="w-full"
                        placeholder={"Select an Organization..."}
                        suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
                        onChange={(v) => onChange(v?.[0])}
                        options={organization}
                        onSearch={searchOrganization}
                        loading={isOrganizationLoading}
                        status={error ? "error" : ""}
                      />
                    </>
                  )}
                />
              </div> */}
              <div className="mt-2">
                <Controller
                  control={control}
                  name={"branch"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Label isRequired className="my-2">
                        Branch
                        <ErrorSuffix error={error} size="small" />
                      </Label>
                      <Input
                        placeholder={"Enter Branch Name"}
                        size={"large"}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? "error" : ""}
                        //   suffix={<ErrorSuffix error={error} />}
                      />
                    </>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="mt-2">
                <Controller
                  control={control}
                  name={"depertment"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Label isRequired className="my-2">
                        Department
                        <ErrorSuffix error={error} size="small" />
                      </Label>
                      <Input
                        placeholder={"Enter Department"}
                        size={"large"}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? "error" : ""}
                        //   suffix={<ErrorSuffix error={error} />}
                      />
                    </>
                  )}
                />
              </div>
              <div className="mt-2">
                <Controller
                  control={control}
                  name={"designation"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Label isRequired className="my-2">
                        Designation
                        <ErrorSuffix error={error} size="small" />
                      </Label>
                      <Input
                        placeholder={"Enter Designation"}
                        size={"large"}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? "error" : ""}
                        //   suffix={<ErrorSuffix error={error} />}
                      />
                    </>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="mt-2">
                <Controller
                  control={control}
                  name={"business_unit"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Label className="my-2">
                        Business Unit
                        <ErrorSuffix error={error} size="small" />
                      </Label>
                      <Input
                        placeholder={"Enter Business Unit"}
                        size={"large"}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? "error" : ""}
                        //   suffix={<ErrorSuffix error={error} />}
                      />
                    </>
                  )}
                />
              </div>
              <div className="mt-2">
                <Controller
                  control={control}
                  name={"desk_info"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Label className="my-2">
                        Desk Info
                        <ErrorSuffix error={error} size="small" />
                      </Label>
                      <Input
                        placeholder={"Enter Desk Info"}
                        size={"large"}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? "error" : ""}
                        //   suffix={<ErrorSuffix error={error} />}
                      />
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          {isDirty && (
            <Button
              variant="contained"
              size="large"
              type={"submit"}
              className="w-full mt-4"
              disabled={isEmployeeshipUpdating}
            >
              Save Changes
            </Button>
          )}
        </form>
      </div>
    </Spin>
  );
};

export default Edit;
