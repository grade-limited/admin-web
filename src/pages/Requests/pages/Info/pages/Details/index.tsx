import { useGetRequestsById } from "@/queries/requests";
// import { DataGrid } from "@mui/x-data-grid";
import { Spin } from "antd";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
// import useQueryContext from "@/hooks/useQueryContext";
// import { useGetProducts } from "@/queries/products";
// import Column from "./components/Column";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
  const { data, isLoading } = useGetRequestsById(id);
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
  console.log(data);

  return (
    <Spin spinning={isLoading}>
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 rounded-3xl">
          <div className="p-3">
            <p className="text-2xl font-bold flex flex-row items-center gap-2">
              {data?.organization_name}
              {/* <Link to={`/app/requests/i/${data?.id}/edit`}>
                <IconButton size="small">
                  <Iconify icon="fluent:edit-12-regular" />
                </IconButton>
              </Link> */}
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
          <div className="grid grid-cols-4 col-span-2 border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-3xl">
            <div className="col-span-4">
              <p className="flex flex-row items-center font-semibold text-base pb-3">
                Request Information
              </p>
            </div>
            <p className="col-span-2">Business Type</p>
            <p className="col-span-2">: {data?.business_type}</p>
            <p className="col-span-2">Business Subtype</p>
            <p className="col-span-2">: {data?.business_subtype}</p>
            <p className="col-span-2">Contact Number</p>
            <p className="col-span-2">: {data?.contact_number}</p>
            <p className="col-span-2">Contact Email</p>
            <p className="col-span-2">: {data?.contact_email}</p>
            <p className="col-span-2">Contact Address</p>
            <p className="col-span-2">: {data?.contact_address}</p>
            <p className="col-span-2">Created At</p>
            <p className="col-span-2">
              {data?.created_at
                ? `: ${moment(data?.brand?.created_at).format("ll")}`
                : ": "}
            </p>
            <p className="col-span-2">Updated At</p>
            <p className="col-span-2">
              {data?.updated_at
                ? `: ${moment(data?.brand?.updated_at).format("ll")}`
                : ":"}
            </p>
          </div>
          <div className="grid grid-cols-3 col-span-2 border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-3xl">
            <div className="col-span-3">
              <p className="flex flex-row justify-e items-center font-semibold text-base pb-3">
                Contact Person Information
              </p>
            </div>
            <p className="col-span-1">Id</p>
            <p className="col-span-2">: {data?.contact_person_employee_id}</p>
            <p>Name</p>
            <p className="col-span-2">: {data?.contact_person_name}</p>
            <p>Number</p>
            <p className="col-span-2">: {data?.contact_person_phone}</p>
            <p>Address</p>
            <p className="col-span-2">: {data?.contact_person_address}</p>
            <p>Department</p>
            <p className="col-span-2">: {data?.contact_person_dept}</p>
            <p>Designation</p>
            <p className="col-span-2">: {data?.contact_person_designation}</p>
            <p>Branch</p>
            <p className="col-span-2">: {data?.contact_person_branch}</p>
            <p>Desk info</p>
            <p className="col-span-2">
              : {data?.contact_person_desk_information}
            </p>
            <p>Business Unit</p>
            <p className="col-span-2">: {data?.contact_person_business_unit}</p>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Details;
