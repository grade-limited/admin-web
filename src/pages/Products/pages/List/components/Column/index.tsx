import { useDeleteProduct } from "@/queries/products";
import { IProductId } from "@/types";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import { Chip } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Button } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

const Column = (): GridColDef[] => {
  const { mutateAsync: Delete, isLoading: isDeleteLoading } =
    useDeleteProduct();
  const onDelete = async (
    id: IProductId,
    permanent: any = null,
    restore: any = null
  ) => {
    message.open({
      type: "loading",
      content: permanent
        ? "Deleting Product Permanently.."
        : restore
        ? "Restoring Product.."
        : "Deleting Product..",
      duration: 0,
    });
    const res = await handleResponse(() =>
      Delete({
        id,
        params: {
          permanent,
          restore,
        },
      })
    );

    message.destroy();

    if (res.status) {
      message.success(res.message);
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  // const { mutateAsync: Suspend, isLoading: isSuspendLoading } =
  //   useSuspendEmployee();

  // const onSuspend = async (id: IProductId) => {
  //   message.open({
  //     type: "loading",
  //     content: "Suspending Employee..",
  //     duration: 0,
  //   });
  //   const res = await handleResponse(() =>
  //     Suspend({
  //       id,
  //     })
  //   );

  //   message.destroy();

  //   if (res.status) {
  //     message.success(res.message);
  //     return true;
  //   } else {
  //     message.error(res.message);
  //     return false;
  //   }
  // };

  return [
    {
      headerName: "ID",
      headerAlign: "center",
      field: "id",
      align: "center",
      flex: 1,
      filterable: false,
      sortable: false,
    },
    {
      headerName: "Title",
      headerAlign: "center",
      field: "name",
      align: "center",
      minWidth: 350,
      flex: 1,
      filterable: false,
      sortable: false,
      // valueGetter(params) {
      //   return (
      //     [params?.row?.name, params?.row?.last_name].join(" ") || "-"
      //   );
      // },
    },
    // {
    //   headerName: "Description",
    //   headerAlign: "center",
    //   field: "description",
    //   align: "center",
    //   flex: 1,
    //   minWidth: 250,
    //   filterable: false,
    //   sortable: false,
    //   renderCell: (data: any) =>
    //     data?.row?.description ? <p>{data?.row?.description}</p> : "-",
    // },
    // {
    // 	headerName: "Price",
    // 	headerAlign: "center",
    // 	field: "price",
    // 	align: "center",
    // 	flex: 1,
    // 	minWidth: 250,
    // 	filterable: false,
    // 	sortable: false,
    // 	renderCell: (data: any) =>
    // 		data?.row?.price ? (
    // 			<p>{data?.row?.price}</p>
    // 		) : (
    // 			// <Tag color="default">{data?.row?.brand?.name}</Tag>
    // 			"-"
    // 		),
    // },
    {
      headerName: "Brand",
      headerAlign: "center",
      field: "brand",
      align: "center",
      flex: 1,
      minWidth: 200,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.brand ? (
          <Link to={`/app/brands/i/${data?.row?.brand_id}`}>
            <Chip label={data?.row?.brand?.name} />
          </Link>
        ) : (
          // <Tag color="default">{data?.row?.brand?.name}</Tag>
          "-"
        ),
    },
    {
      headerName: "Category",
      headerAlign: "center",
      field: "category",
      align: "center",
      flex: 1,
      minWidth: 200,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.category ? (
          <Link to={`/app/categories/i/${data?.row?.category_id}`}>
            <Chip label={data?.row?.category?.name} />
          </Link>
        ) : (
          // <Tag color="default">{data?.row?.brand?.name}</Tag>
          "-"
        ),
    },
    {
      headerName: "Created At",
      headerAlign: "center",
      field: "created_at",
      align: "center",
      flex: 1,
      width: 200,
      minWidth: 180,
      filterable: false,
      sortable: false,
      valueFormatter(params) {
        return moment(params.value).format("lll");
      },
    },
    {
      headerName: "Updated At",
      headerAlign: "center",
      field: "updated_at",
      align: "center",
      flex: 1,
      width: 200,
      minWidth: 180,
      filterable: false,
      sortable: false,
      valueFormatter(params) {
        return moment(params.value).format("lll");
      },
    },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      minWidth: 160,
      getActions: (params) => [
        <GridActionsCellItem
          disableRipple
          disableTouchRipple
          disableFocusRipple
          className="hover: bg-transparent"
          icon={
            <Link to={`/app/products/i/${params.id}`}>
              <Button type="dashed">View</Button>
            </Link>
          }
          label="Details"
        />,
        <GridActionsCellItem
          icon={
            <Link to={`/app/products/i/${params.id}/edit`}>
              <Iconify icon={"fluent:edit-12-regular"} className="text-lg" />
            </Link>
          }
          label="Edit"
        />,
        // <GridActionsCellItem
        //   icon={
        //     params.row.is_active ? (
        //       <Iconify icon={"lucide:shield-ban"} className="text-lg" />
        //     ) : (
        //       <Iconify icon={"tabler:shield-up"} className="text-lg" />
        //     )
        //   }
        //   disabled={isSuspendLoading}
        //   showInMenu
        //   label={
        //     params.row.is_active ? "Suspend Employee" : "Activate Employee"
        //   }
        //   onClick={() => onSuspend(params.id)}
        // />,
        <GridActionsCellItem
          icon={
            <Iconify icon={"icon-park-twotone:delete"} className="text-lg" />
          }
          disabled={isDeleteLoading}
          showInMenu
          label="Delete"
          onClick={() => onDelete(params.id)}
        />,
        <GridActionsCellItem
          icon={
            <Iconify
              icon={"icon-park-twotone:delete-five"}
              className="text-lg"
            />
          }
          disabled={isDeleteLoading}
          showInMenu
          label="Permanently Delete"
          onClick={() => onDelete(params.id, true)}
        />,
      ],
    },
  ];
};

export default Column;
