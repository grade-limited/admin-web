import { IOption } from "@/hooks/useRole/types";
import {
  useGetQuotationsById,
  useUpdateQuotationsById,
} from "@/queries/quotations";
import handleResponse from "@/utilities/handleResponse";
import previewAttachment from "@/utilities/s3Attachment";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import { Avatar, IconButton } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import { Select, Spin } from "antd";
import moment from "moment";
import React from "react";
import { Link, useParams } from "react-router-dom";
// import useQueryContext from "@/hooks/useQueryContext";
// import { useGetProducts } from "@/queries/products";
// import Column from "./components/Column";

export function findUnitPrice(
  accountType: string,
  quantity: number,
  pricingChart: any = []
): number {
  const priceInfo = pricingChart
    ?.filter?.(
      (item: any) =>
        item.account_type === accountType && item.min_quantity <= quantity
    )
    ?.sort?.((a: any, b: any) => {
      const minQuantityA = parseInt(a.min_quantity, 10);
      const minQuantityB = parseInt(b.min_quantity, 10);
      return minQuantityA - minQuantityB;
    });

  if (!priceInfo?.length) {
    // console.error(
    // 	`No pricing information found for account type: ${accountType}`
    // );
    return parseInt(
      pricingChart
        .filter((item: any) => item.account_type === accountType)
        .sort((a: any, b: any) => {
          const minQuantityA = parseInt(a.min_quantity, 10);
          const minQuantityB = parseInt(b.min_quantity, 10);
          return minQuantityA - minQuantityB;
        })?.[0]?.per_unit || "0",
      10
    );
  }

  return parseInt(priceInfo?.[priceInfo?.length - 1]?.per_unit || "0", 10);
}

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
  const { data, isLoading } = useGetQuotationsById(id);
  const { mutateAsync: update } = useUpdateQuotationsById();

  const [status, setStatus] = React.useState<any>(null);

  React.useEffect(() => {
    if (!data) return;
    setStatus(data?.status);
  }, [data]);

  // React.useEffect(() => {
  //   if (!status) return;
  //   onSubmit({ status });
  // }, [status]);

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Quotation..",
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
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };
  const statusData: IOption[] = [
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "Accepted",
      label: "Accepted",
    },
    {
      value: "Processing",
      label: "Processing",
    },
    {
      value: "Delivered",
      label: "Delivered",
    },
    {
      value: "Declined",
      label: "Declined",
    },
  ];
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
        <div className="flex flex-col sm:flex-row items-start justify-between gap-5 border border-slate-200 p-3 pl-5 rounded-3xl">
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2">
              <p className="text-2xl font-bold flex flex-row items-center">
                {[data?.user?.first_name, data?.user?.last_name].join(" ")}{" "}
              </p>
              <Link to={`/app/users/i/${data?.id}`}>
                <IconButton size="small">
                  <Iconify icon="ph:arrow-square-out-bold" />
                </IconButton>
              </Link>
            </div>
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
          <Select
            size={"large"}
            placeholder={"Select Status"}
            className="relative m-2 "
            value={status}
            options={statusData}
            onChange={(v) => {
              onSubmit({ status: v });
              setStatus(v);
            }}
          />
        </div>
        <div className=" md:grid-cols-4 content-center gap-2 py-3">
          <div className="grid grid-cols-3 col-span-2 border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-3xl">
            <div className="col-span-3">
              <p className="flex flex-row items-center font-semibold text-base pb-3">
                Information
              </p>
            </div>
            <p className="col-span-1">Name</p>
            <p className="col-span-2">: {data?.contact_name}</p>
            <p className="col-span-1">Number</p>
            <p className="col-span-2">: {data?.contact_number}</p>
            <p className="col-span-1">Email</p>
            <p className="col-span-2">: {data?.contact_email}</p>
            <p className="col-span-1">Address</p>
            <p className="col-span-2">: {data?.contact_address}</p>
            <p className="col-span-1">Status</p>
            <p className="col-span-2">: {data?.status}</p>
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
        </div>
        <div className="border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-3xl">
          <p className="font-semibold text-base pb-3">Product Information</p>
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
                  <p className="font-bold">{product?.name}</p>
                  <p className="text-sm text-slate-600">
                    ৳{" "}
                    {findUnitPrice(
                      "bb2e",
                      product?.ProductQuotationJunction?.quantity,
                      product?.price
                    )}{" "}
                    x <b>{product?.ProductQuotationJunction?.id} items</b> ={" "}
                    <b>
                      {" "}
                      ৳{" "}
                      {findUnitPrice(
                        "bb2e",
                        product?.ProductQuotationJunction?.quantity,
                        product?.price
                      ) * product?.ProductQuotationJunction?.id}
                    </b>
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
