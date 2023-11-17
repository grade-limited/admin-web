import Iconify from "@components/iconify";
import { Container, ListItemText, Skeleton } from "@mui/material";
import { usePaginate } from "@tam11a/react-use-hooks";
import { Collapse } from "antd";
import React from "react";
import { ISession } from "./types";
import SessionCard from "./Components/SessionCard";
import moment from "moment";
import { useGetUserSessions } from "@/queries/sessions";
import { useParams } from "react-router-dom";
export const { Panel } = Collapse;

const Session: React.FC = () => {
  const params = useParams();
  const { getQueryParams } = usePaginate({
    defaultParams: {},
  });
  const { data, isLoading: sessionsLoading } = useGetUserSessions({
    user: params.id,
    ...getQueryParams(),
    sort: "logged_in_at",
  });
  const [sessions, setSessions] = React.useState<any>([]);
  React.useEffect(() => {
    if (!data) return;
    setSessions(data?.data?.data);
  }, [data]);
  return (
    <Container maxWidth={"sm"}>
      <Collapse
        expandIcon={({ isActive }) => (
          <Iconify
            icon={"material-symbols:settings-outline-rounded"}
            className={`text-xl ${
              isActive ? `text-primary-700` : "text-primary-500"
            }`}
            style={{
              transform: isActive ? "rotateZ(90deg)" : "unset",
              transition: "transform 1s",
            }}
          />
        )}
        expandIconPosition={"end"}
        className="my-6  px-2 py-[1px] bg-slate-100"
        ghost
      >
        <div>
          {sessionsLoading &&
            Array(7)
              .fill?.("")
              .map?.((_v, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  className="h-16 rounded my-2"
                />
              ))}
        </div>
        {sessions?.map?.((s: ISession) => {
          return (
            <Panel
              header={
                <ListItemText
                  primary={s.ip_address}
                  secondary={
                    <>
                      <p>{s.address_details}</p>
                    </>
                  }
                  className="p-0 m-0"
                  primaryTypographyProps={{
                    variant: "subtitle2",
                  }}
                  secondaryTypographyProps={{
                    variant: "caption",
                    className: "flex justify-between w-full",
                  }}
                />
              }
              key={s.id}
              collapsible="header"
              // collapsible={s.status === "Open" ? "header" : "disabled"}
              className="my-2 bg-white rounded"
              extra={
                <p className="text-[11px] text-text-light">
                  Last logged in on {moment(s.last_login).calendar()}
                </p>
              }
            >
              <SessionCard {...s} key={s.id} />
            </Panel>
          );
        })}
      </Collapse>
    </Container>
  );
};

export default Session;
