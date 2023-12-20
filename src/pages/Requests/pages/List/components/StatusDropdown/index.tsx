import { IOption } from "@/hooks/useRole/types";
import { useUpdateRequestsById } from "@/queries/requests";
import handleResponse from "@/utilities/handleResponse";
import Iconify from "@components/iconify";
import {
  // Button,
  Dialog,
  // DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useToggle } from "@tam11a/react-use-hooks";
import { Select, Steps, message } from "antd";
import React from "react";
import OrgCreate from "../OrgCreate";
import EmployeeCreate from "../EmployeeCreate";

const StatusDropdown: React.FC<any> = (params) => {
  const { mutateAsync: update } = useUpdateRequestsById();
  const [status, setStatus] = React.useState<any>(params?.row?.request_status);
  const { state: open, toggleState: onClose } = useToggle();

  const onSubmit = async (id: any, data: any) => {
    message.open({
      type: "loading",
      content: "Updating Quotation..",
      duration: 0,
    });
    const res = await handleResponse(() => update({ id, data }));
    message.destroy();
    if (res.status) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  const statusData: IOption[] = [
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "in progress",
      label: "In progress",
    },
    {
      value: "approved",
      label: "Approved",
    },

    {
      value: "declined",
      label: "Declined",
    },
  ];

  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  // const prev = () => {
  //   setCurrent(current - 1);
  // };
  const steps = [
    {
      title: "Organization",
      description: "Create Organization",
      content: <OrgCreate params={params} next={next} />,
      icon: <Iconify icon="gg:organisation" />,
    },
    {
      title: "Employee",
      description: "Create Employee",
      content: (
        <EmployeeCreate
          params={params}
          next={() => {
            onSubmit(params?.row?.id, { request_status: "approved" });
            onClose();
            setStatus("approved");
          }}
        />
      ),
      icon: <Iconify icon="clarity:employee-group-line" />,
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    subTitle: item.description,
    icon: item.icon,
  }));

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          className: "w-full max-w-3xl rounded-lg",
        }}
      >
        <DialogTitle className="flex flex-row items-center justify-between">
          <p className="font-bold text-base">
            Register <br />{" "}
            <span className="text-sm font-semibold text-slate-500">
              New{" "}
              <span className="capitalize">{steps[current].title} Account</span>
            </span>
          </p>
          <IconButton onClick={onClose}>
            <Iconify icon="mdi:close" />
          </IconButton>
        </DialogTitle>

        <Steps
          current={current}
          items={items}
          // percent={60}
          labelPlacement="vertical"
          size="small"
          className="px-6 mx-auto max-w-xl"
        />

        <div className="px-4 my-5">{steps[current].content}</div>
        {/* 
        <DialogActions className="px-3 pb-3">
          {current > 0 && (
            <Button
              variant="outlined"
              size="small"
              //   disabled={isSignupLoading}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button
              color="primary"
              size="small"
              variant="contained"
              className="bg-primary hover:bg-primary-600"
              onClick={() => next()}
              //   disabled={isSignupLoading}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              className="bg-primary hover:bg-primary-600"
              variant="contained"
              size="small"
              color="primary"
              //   type="submit"
              //   disabled={isSignupLoading}
            >
              Done
            </Button>
          )}
        </DialogActions> */}
      </Dialog>
      <Select
        size={"large"}
        placeholder={"Select Status"}
        className="w-full"
        bordered={false}
        value={status}
        options={statusData}
        onChange={(v) => {
          if (v === "approved") {
            onClose();
          } else {
            onSubmit(params?.row?.id, { request_status: v });
            setStatus(v);
          }
        }}
      />
    </div>
  );
};

export default StatusDropdown;
