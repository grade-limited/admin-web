// import {
//   useDeleteBrand,
//   // useSuspendBrand
// } from "@/queries/brands";
// import { IBrandId } from "@/types";
// import handleResponse from "@/utilities/handleResponse";
// import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Button, Tag } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

const Column = (): GridColDef[] => {
  // const { mutateAsync: Delete, isLoading: isDeleteLoading } = useDeleteBrand();
  // const navigate = useNavigate();
  // const onDelete = async (
  //   id: IBrandId,
  //   permanent: any = null,
  //   restore: any = null
  // ) => {
  //   message.open({
  //     type: "loading",
  //     content: permanent
  //       ? "Deleting Brand Permanently.."
  //       : restore
  //       ? "Restoring Brand.."
  //       : "Deleting Brand..",
  //     duration: 0,
  //   });
  //   const res = await handleResponse(() =>
  //     Delete({
  //       id,
  //       params: {
  //         permanent,
  //         restore,
  //       },
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

  // const { mutateAsync: Suspend, isLoading: isSuspendLoading } =
  //   useSuspendBrand();

  // const onSuspend = async (id: IBrandId) => {
  //   message.open({
  //     type: "loading",
  //     content: "Suspending Brand..",
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
      minWidth: 200,
      flex: 1,
      filterable: false,
      sortable: false,
      // valueGetter(params) {
      //   return (
      //     [params?.row?.name, params?.row?.last_name].join(" ") || "-"
      //   );
      // },
    },
    {
      headerName: "Description",
      headerAlign: "center",
      field: "description",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
    },
    {
      headerName: "Category",
      headerAlign: "center",
      field: "category",
      align: "center",
      flex: 1,
      minWidth: 180,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.category ? (
          <Tag color="default">{data?.row?.category?.name}</Tag>
        ) : (
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
    // {
    //   headerName: "Deleted At",
    //   headerAlign: "center",
    //   field: "deleted_at",
    //   align: "center",
    //   flex: 1,
    //   width: 280,
    //   minWidth: 250,
    //   filterable: false,
    //   sortable: false,
    //   valueFormatter(params) {
    //     return moment(params.value).format("lll");
    //   },
    // },
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
            <Link to={`/app/brands/i/${params.id}`}>
              <Button type="dashed">View</Button>
            </Link>
          }
          label="Details"
        />,
        <GridActionsCellItem
          icon={
            <Link to={`/app/brands/i/${params.id}/edit`}>
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
        //     params.row.is_active ? "Suspend Brand" : "Activate Brand"
        //   }
        //   onClick={() => onSuspend(params.id)}
        // />,
        // <GridActionsCellItem
        //   icon={
        //     <Iconify icon={"ic:twotone-restore-page"} className="text-lg" />
        //   }
        //   disabled={isDeleteLoading}
        //   showInMenu
        //   label="Restore"
        //   onClick={() => onDelete(params.id, null, true)}
        // />,
        // <GridActionsCellItem
        //   icon={
        //     <Iconify
        //       icon={"icon-park-twotone:delete-five"}
        //       className="text-lg"
        //     />
        //   }
        //   disabled={isDeleteLoading}
        //   showInMenu
        //   label="Permanently Delete"
        //   onClick={() => onDelete(params.id, true)}
        // />,
      ],
    },
  ];
};
export default Column;
