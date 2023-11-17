import React from "react";
import { ISession } from "../../types";
import moment from "moment";
import { Button, Typography } from "@mui/material";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import { useUserSessionSignOut } from "@/queries/sessions";

const SessionCard: React.FC<ISession> = ({
  id,
  device_details,
  logged_out_at,
  logged_in_at,
}) => {
  const { mutateAsync: userSessionSignOut } = useUserSessionSignOut();

  const onSubmit = async (id: any) => {
    message.open({
      type: "loading",
      content: "Signing out from the session..",
      duration: 0,
    });
    const res = await handleResponse(() => userSessionSignOut(id), [200]);
    message.destroy();
    if (res.status) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  return (
    <div className="-mt-[24px] pb-1 flex flex-row flex-wrap">
      <div className="flex-1 grow">
        {device_details ? (
          <>
            <Typography
              variant="subtitle2"
              className="uppercase text-xs leading-6"
            >
              Device Details:
            </Typography>
            <p className="text-[11px] text-text-light whitespace-pre-wrap">
              {device_details}
            </p>
          </>
        ) : (
          <div />
        )}
      </div>
      <div className="pr-12">
        <Typography variant="subtitle2" className="uppercase text-xs leading-6">
          Log Details
        </Typography>
        <p className="text-[11px] text-text-light">
          Logged in on {moment(logged_in_at).calendar()}
        </p>
        {logged_out_at ? (
          <p className="text-[11px] text-text-light">
            Logged out on {moment(logged_out_at).calendar()}
          </p>
        ) : (
          <Button
            size="small"
            variant="contained"
            className="bg-error-dark text-xs mt-[3px]"
            color={"error"}
            onClick={() => onSubmit(id)}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
