import { useGetEmployeeshipById } from "@/queries/employeeship";
import Iconify from "@components/iconify";
import { IconButton } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import { Spin } from "antd";
import moment from "moment";
import React from "react";
import { Link, useParams } from "react-router-dom";
// import useQueryContext from "@/hooks/useQueryContext";
// import { useGetProducts } from "@/queries/products";
// import Column from "./components/Column";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
  const { data, isLoading } = useGetEmployeeshipById(id);
  // const {
  //   getQueryParams,
  //   page,
  //   limit = 10,
  //   setPage,
  //   setLimit,
  // } = useQueryContext();

  // const { data: prodData, isLoading: isProdLoading } = useGetProducts({
  //   ...getQueryParams,
  //   brand_id: id,
  // });

  return (
    <Spin spinning={isLoading}>
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 pl-5 rounded-3xl">
          <div>
            <p className="text-2xl font-bold flex flex-row items-center gap-2">
              {[data?.user?.first_name, data?.row?.user?.last_name].join(" ")}
              <Link to={`/app/employeeship/i/${data?.id}/edit`}>
                <IconButton size="small">
                  <Iconify icon="fluent:edit-12-regular" />
                </IconButton>
              </Link>
            </p>
            <p className="text-text-light font-semibold">
              @{data?.user?.username || "-"}
            </p>

            <p className="text-text-light text-xs mt-2">
              Created {moment(data?.created_at).calendar()}
            </p>

            <p className="text-text-light text-xs">
              Last Updated {moment(data?.updated_at).calendar()}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 content-center gap-2 py-3">
          <div className="grid grid-cols-3 col-span-2 border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-3xl">
            <div className="col-span-3">
              <p className="flex flex-row items-center font-semibold text-base pb-3">
                Employeeship Info
                {data?.user ? (
                  <Link to={`/app/users/i/${data?.user?.id}`}>
                    <IconButton size="small" title="User Details Page">
                      <Iconify icon="ph:arrow-square-out-bold" />
                    </IconButton>
                  </Link>
                ) : (
                  ""
                )}
              </p>
            </div>
            <p>Id</p>
            <p className="col-span-2">: {data?.user_id}</p>
            <p>Employee ID</p>
            <p className="col-span-2">: {data?.employee_id}</p>
            <p>Branch</p>
            <p className="col-span-2">
              : {data?.branch ? <>{data?.branch} </> : "-"}
            </p>
            <p>Department</p>
            <p className="col-span-2">
              : {data?.depertment ? <>{data?.depertment} </> : "-"}
            </p>
            <p>Designation</p>
            <p className="col-span-2">
              : {data?.designation ? <>{data?.designation} </> : "-"}
            </p>
            <p>Business Unit</p>
            <p className="col-span-2">
              : {data?.business_unit ? <>{data?.business_unit} </> : "-"}
            </p>
            <p>Desk Info</p>
            <p className="col-span-2">
              : {data?.desk_info ? <>{data?.desk_info} </> : "-"}
            </p>
          </div>

          <div className="grid grid-cols-3 col-span-2 border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-3xl">
            <div className="col-span-3">
              <p className="flex flex-row justify-e items-center font-semibold text-base pb-3">
                Organization Info
                {data?.organization ? (
                  <Link to={`/app/organizations/i/${data?.organization_id}`}>
                    <IconButton size="small" title="User Details Page">
                      <Iconify icon="ph:arrow-square-out-bold" />
                    </IconButton>
                  </Link>
                ) : (
                  ""
                )}
              </p>
            </div>
            <p>Id</p>
            <p className="col-span-2">
              : {data?.organization_id ? <>{data?.organization_id} </> : "-"}
            </p>
            <p>Name</p>
            <p className="col-span-2">
              :{" "}
              {data?.organization?.name ? (
                <>{data?.organization?.name} </>
              ) : (
                "-"
              )}
            </p>
            <p>Phone</p>
            <p className="col-span-2">
              :{" "}
              {data?.organization?.contact_number ? (
                <>{data?.organization?.contact_number} </>
              ) : (
                "-"
              )}
            </p>
            <p>Email</p>
            <p className="col-span-2">
              :{" "}
              {data?.organization?.contact_email ? (
                <>{data?.organization?.contact_email} </>
              ) : (
                "-"
              )}
            </p>
            <p>Type</p>
            <p className="col-span-2">
              :{" "}
              {data?.organization?.business_type ? (
                <>{data?.organization?.business_type} </>
              ) : (
                "-"
              )}
            </p>
            <p>Subtype</p>
            <p className="col-span-2">
              :{" "}
              {data?.organization?.business_subtype ? (
                <>{data?.organization?.business_subtype} </>
              ) : (
                "-"
              )}
            </p>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Details;
