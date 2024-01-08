import { useGetOrdersById } from "@/queries/orders";
import previewAttachment from "@/utilities/s3Attachment";
import Iconify from "@components/iconify";
import { Avatar, IconButton } from "@mui/material";
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
  const { data, isLoading } = useGetOrdersById(id);

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
              {[data?.user?.first_name, data?.user?.last_name].join(" ")}{" "}
              <Link to={`/app/users/i/${data?.id}`}>
                <IconButton size="small">
                  <Iconify icon="ph:arrow-square-out-bold" />
                </IconButton>
              </Link>
              <Link to={`/app/orders/i/${data?.id}/edit`}>
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
                Recipient Information
              </p>
            </div>
            <p className="col-span-1">Name</p>
            <p className="col-span-2">: {data?.recipient_name}</p>
            <p className="col-span-1">Number</p>
            <p className="col-span-2">: {data?.recipient_number}</p>
            <p className="col-span-1">Email</p>
            <p className="col-span-2">: {data?.recipient_email}</p>
            <p className="col-span-1">Address</p>
            <p className="col-span-2">: {data?.recipient_address}</p>
            <p className="col-span-1">Created At</p>
            <p className="col-span-2">
              {data?.created_at
                ? `: ${moment(data?.created_at).format("ll")}`
                : ": "}
            </p>
            <p className="col-span-1">Updated At</p>
            <p className="col-span-2">
              {data?.updated_at
                ? `: ${moment(data?.updated_at).format("ll")}`
                : ":"}
            </p>
          </div>
          <div className="grid grid-cols-3 col-span-2 border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-3xl">
            <div className="col-span-3">
              <p className="flex flex-row justify-e items-center font-semibold text-base pb-3">
                Order Information
              </p>
            </div>
            <p className="col-span-1">Status</p>
            <p className="col-span-2">: {data?.status}</p>
            <p>Delivery Fee</p>
            <p className="col-span-2">: {data?.delivery_fee}</p>
            <p>Discount</p>
            <p className="col-span-2">: {data?.discount}</p>
            <p>Delivery Date</p>
            <p className="col-span-2">
              {" "}
              {data?.expected_delivery_date
                ? `: ${moment(data?.expected_delivery_date).format("ll")}`
                : ": -"}
            </p>
          </div>
        </div>
        <div className="border gap-1 border-slate-200 p-5 break-all rounded-3xl">
          <p className=" font-semibold text-base pb-3">Product Information</p>
          <div className="flex flex-col gap-4">
            {data?.products?.map?.((product: any, index: number) => (
              <div className="flex flex-row gap-3" key={index}>
                <div>
                  <Avatar
                    variant="rounded"
                    className="mt-1"
                    alt={product?.name}
                    src={previewAttachment(product?.thumbnail_url)}
                  />
                </div>
                <div>
                  <p className="font-bold">
                    {product?.name}
                    <Link to={`/app/products/i/${product?.id}`}>
                      <IconButton size="small">
                        <Iconify icon="ph:arrow-square-out-bold" />
                      </IconButton>
                    </Link>
                  </p>
                  <p className="text-sm text-slate-600">
                    ${product?.ProductOrderJunction?.unit_price} x{" "}
                    <b>{product?.ProductOrderJunction?.quantity} items</b> ={" "}
                    <b>${product?.ProductOrderJunction?.total_price}</b>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Details;
