import useQueryContext from "@/hooks/useQueryContext";
import {
	useDeleteCategories,
	// useSuspendCategories
} from "@/queries/categories";
import { ICategoryId } from "@/types";
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
		useDeleteCategories();

	const onDelete = async (
		id: ICategoryId,
		permanent: any = null,
		restore: any = null
	) => {
		message.open({
			type: "loading",
			content: permanent
				? "Deleting Category Permanently.."
				: restore
				? "Restoring Category.."
				: "Deleting Category..",
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
	//   useSuspendCategory();

	// const onSuspend = async (id: ICategoryId) => {
	//   message.open({
	//     type: "loading",
	//     content: "Suspending Category..",
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

	const { watch } = useQueryContext();

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
			renderCell: (data: any) =>
				data?.row?.description ? <p>{data?.row?.description}</p> : "-",
		},
		...((watch("only_parent") as boolean)
			? ([] as GridColDef[])
			: ([
					{
						headerName: "Parent Category",
						headerAlign: "center",
						field: "parent",
						align: "center",
						flex: 1,
						minWidth: 250,
						filterable: false,
						sortable: false,
						renderCell: (data: any) =>
							data?.row?.parent ? (
								<Link to={`/app/categories/i/${data?.row?.parent_id}`}>
									<Chip label={data?.row?.parent?.name} />
								</Link>
							) : (
								// <Tag color="default">{data?.row?.brand?.name}</Tag>
								"-"
							),
					},
			  ] as GridColDef[])),
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
						<Link to={`/app/categories/i/${params.id}`}>
							<Button type="dashed">View</Button>
						</Link>
					}
					label="Details"
				/>,
				<GridActionsCellItem
					icon={
						<Iconify
							icon={"ic:twotone-restore-page"}
							className="text-lg"
						/>
					}
					disabled={isDeleteLoading}
					showInMenu
					label="Restore"
					onClick={() => onDelete(params.id, null, true)}
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
