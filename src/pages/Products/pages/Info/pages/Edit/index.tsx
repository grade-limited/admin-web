import { useGetProductsById, useUpdateProductsById } from "@/queries/products";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import {
	Cascader,
	Input,
	Spin,
	message,
	Upload as AntUpload,
	Button as AntButton,
	Image,
	Select,
} from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import previewAttachment from "@/utilities/s3Attachment";
import moment from "moment";
import useBrand from "@/hooks/useBrand";
import Iconify from "@components/iconify";
import instance from "@/services";
import { Icon } from "@iconify/react";
import { stringAvatar } from "@/utilities/stringAvatar";
import JoditEditor from "jodit-react";
import { joiResolver } from "@hookform/resolvers/joi";
import { productUpdateResolver } from "./resolver";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import useSearchCategory from "@/hooks/useSearchCategory";

const Edit: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [messageApi, contextHolder] = message.useMessage();

	const { data, isLoading } = useGetProductsById(id);
	const {
		isLoading: isCategoryLoading,
		data: category,
		findHierarchy,
	} = useSearchCategory();

	const { brand, isBrandLoading, searchBrand, setDefaultBrand } = useBrand();
	const {
		handleSubmit,
		control,
		reset,
		formState: { isDirty },
	} = useForm({
		resolver: joiResolver(productUpdateResolver),
	});

	const [productInfo, setProductInfo] = React.useState<any>([]);
	const { mutateAsync: update, isLoading: isProductUpdating } =
		useUpdateProductsById();

	React.useEffect(() => {
		if (!data) return;
		setProductInfo(data);
		// setdefaultcategory(data?.category);
		setDefaultBrand(data?.brand);
	}, [data]);
	// console.log(productInfo, brand);

	React.useEffect(() => {
		if (!productInfo || isDirty) return;
		reset({
			name: productInfo?.name,
			description: productInfo?.description,
			thumbnail_url: productInfo?.thumbnail_url,
			brand_id: productInfo?.brand_id,
			category_id: productInfo?.category_id,
			sku: productInfo?.sku,
			unit_of_measure: productInfo?.unit_of_measure,
			attachments: productInfo?.attachments,
			minimum_order_quantity: productInfo?.minimum_order_quantity || [],
			price: productInfo?.price || [],
			market_price: productInfo?.market_price,
		});
	}, [productInfo]);

	// On Submit Function
	const onSubmit = async (data: any) => {
		message.open({
			type: "loading",
			content: "Updating Product..",
			duration: 0,
		});
		const res = await handleResponse(() =>
			update({
				id,
				data: {
					...data,
					category_id: data?.category_id?.[data?.category_id?.length - 1],
				},
			})
		);
		message.destroy();
		if (res.status) {
			reset();
			message.success(res.message);
		} else {
			message.error(res.message);
		}
	};

	return (
		<Spin spinning={isLoading}>
			<div>
				{contextHolder}
				<div className=" flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 rounded-3xl max-w-xl mb-4 mx-auto">
					{data?.thumbnail_url ? (
						<Image
							className="rounded-2xl w-24 h-auto object-contain"
							src={previewAttachment(data?.thumbnail_url)}
							alt={data?.name}
							{...stringAvatar(data?.name)}
						/>
					) : (
						""
					)}
					<div className="pl-2">
						<p className="text-2xl font-bold flex flex-row items-center gap-2">
							{data?.name}
						</p>
						<p className="text-text-light text-xs mt-2">
							Created {moment(data?.created_at).calendar()}
						</p>
						<p className="text-text-light text-xs">
							Last Updated {moment(data?.updated_at).calendar()}
						</p>
					</div>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
				>
					<p className="font-medium mb-2">Information</p>
					<div className="border p-3 rounded-md bg-slate-50">
						<span>
							<Controller
								control={control}
								name={"thumbnail_url"}
								render={({
									field: { onChange, value },
									fieldState: { error },
								}) => (
									<>
										<Label className="pb-3">
											Thumbnail Image
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<AntUpload
											fileList={
												value
													? [
															{
																uid: value,
																url: previewAttachment(value),
																preview: previewAttachment(value),
																thumbUrl: previewAttachment(value),
																name: value,
																fileName: value,
																status: "done",
																error,
															},
													  ]
													: undefined
											}
											maxCount={1}
											listType="picture-card"
											showUploadList={{
												showDownloadIcon: true,
											}}
											action={`${instance.getUri()}files/upload/multiple`}
											method="POST"
											name="files"
											onChange={(i) => {
												if (i.file.status === "done") {
													onChange(i.file.response?.[0]?.filename);
												}
												//   if (i.file.status === "success") {
												//     messageApi.info("Please click update to save changes");
												//   }

												if (i.file.status === "removed") onChange(null);

												if (i.file.status === "error") {
													messageApi.error(i.file.response?.message);
												}
											}}
										>
											{value ? null : (
												<AntButton
													className="flex flex-col items-center justify-center text-sm gap-1"
													type="text"
												>
													<span>
														<Icon icon={"material-symbols:upload"} />
													</span>
													Upload
												</AntButton>
											)}
										</AntUpload>
									</>
								)}
							/>
						</span>
						<div>
							<Controller
								control={control}
								name={"name"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label isRequired>
											Name
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input
											placeholder={"Enter Product Name"}
											size={"large"}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
											//   suffix={<ErrorSuffix error={error} />}
										/>
									</>
								)}
							/>
						</div>
						<div className="flex flex-col sm:flex-row gap-2">
							<div className="flex-1">
								<Controller
									control={control}
									name={"sku"}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<>
											<Label className="my-1">
												SKU Code
												<ErrorSuffix
													error={error}
													size="small"
												/>
											</Label>
											<Input
												placeholder={"Enter Product SKU Code"}
												size={"large"}
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												status={error ? "error" : ""}
												//   suffix={<ErrorSuffix error={error} />}
											/>
										</>
									)}
								/>
							</div>

							<div className="flex-1">
								<Controller
									control={control}
									name={"unit_of_measure"}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<>
											<Label className="my-1">
												Unit of Measure
												<ErrorSuffix
													error={error}
													size="small"
												/>
											</Label>
											<Input
												placeholder={"Enter Unit of Measure"}
												size={"large"}
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												status={error ? "error" : ""}
												//   suffix={<ErrorSuffix error={error} />}
											/>
										</>
									)}
								/>
							</div>
						</div>
						<div>
							<Controller
								control={control}
								name={"description"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label className="my-1">
											Description
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										{/* <Input.TextArea
											placeholder={"Enter Description of the Product"}
											size={"large"}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
											//   suffix={<ErrorSuffix error={error} />}
										/> */}
										<JoditEditor
											value={value}
											config={{
												statusbar: false,
												readonly: false, // all options from https://xdsoft.net/jodit/docs/,
												// placeholder: "Aa...",
												removeButtons: ["image"],
											}}
											// tabIndex={1} // tabIndex of textarea
											onBlur={(x) => {
												onChange(x);
											}} // preferred to use only this option to update the content for performance reasons
											onChange={() => {}}
										/>
									</>
								)}
							/>
						</div>
						<Controller
							control={control}
							name={"attachments"}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<>
									<Label className="my-2">
										Product Gallery
										<ErrorSuffix
											error={error}
											size="small"
										/>
									</Label>
									<AntUpload
										fileList={
											value?.length
												? Array.from(value, (x: any) => ({
														uid: value,
														url: previewAttachment(x),
														preview: previewAttachment(x),
														thumbUrl: previewAttachment(x),
														name: value,
														fileName: value,
														status: "done",
														error,
												  }))
												: undefined
										}
										listType="picture-card"
										showUploadList={{
											showDownloadIcon: true,
										}}
										action={`${instance.getUri()}files/upload/multiple`}
										method="POST"
										name="files"
										onChange={(i) => {
											console.log(
												i,
												i.fileList,
												Array.from(
													i.fileList,
													(x: any) => x.response?.[0]?.filename
												)
											);
											if (i.file.status === "done") {
												onChange(
													Array.from(
														i.fileList,
														(x: any) => x.response?.[0]?.filename
													)
												);
											}
											//   if (i.file.status === "success") {
											//     messageApi.info("Please click update to save changes");
											//   }

											if (i.file.status === "removed") onChange([]);

											if (i.file.status === "error") {
												messageApi.error(i.file.response?.message);
											}
										}}
									>
										{value ? null : (
											<AntButton
												className="flex flex-col items-center justify-center text-sm gap-1"
												type="text"
											>
												<span>
													<Icon icon={"material-symbols:upload"} />
												</span>
												Upload
											</AntButton>
										)}
									</AntUpload>
								</>
							)}
						/>
						<div>
							<Controller
								control={control}
								name={"category_id"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label
											isRequired
											className="my-1"
										>
											Category
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Cascader
											value={
												value
													? (findHierarchy(value) as any) || value
													: undefined
											}
											size="large"
											showSearch
											className="w-full"
											placeholder={"Select a Parent Category..."}
											suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
											onChange={onChange}
											options={category}
											fieldNames={{ label: "name", value: "id" }}
											onBlur={onBlur}
											changeOnSelect
											// onSearch={searchCategory}
											loading={isCategoryLoading}
											status={error ? "error" : ""}
											expandTrigger="hover"
										/>
									</>
								)}
							/>
						</div>
						<div>
							<Controller
								control={control}
								name={"brand_id"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label className="my-1">
											Brand
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Cascader
											value={value}
											size="large"
											showSearch
											className="w-full"
											placeholder={"Select a Brand..."}
											suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
											onChange={(v) => onChange(v?.[0])}
											options={brand}
											onBlur={onBlur}
											onSearch={searchBrand}
											loading={isBrandLoading}
											status={error ? "error" : ""}
										/>
									</>
								)}
							/>
						</div>

						<div>
							<Controller
								control={control}
								name={"market_price"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label className="my-1">
											Market Price
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input
											value={value}
											size="large"
											className="w-full"
											suffix={
												<Iconify
													className="text-slate-500"
													icon={"fa6-solid:bangladeshi-taka-sign"}
												/>
											}
											placeholder={"Enter Market Price"}
											onChange={onChange}
											onBlur={onBlur}
											status={error ? "error" : ""}
										/>
									</>
								)}
							/>
						</div>
						<div>
							{/* 
              minimum_order_quantity: {
                account_type: string;
                quantity: number;
              }[]
              
              */}
							<Controller
								control={control}
								name={"minimum_order_quantity"}
								render={({
									field: { onChange, value },
									fieldState: { error },
								}) => (
									<>
										<Label className="my-2">
											Minimum Order Quantity
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										{value?.map((x: any, i: number) => (
											<div className="flex flex-row gap-2 mb-2">
												<Select
													size="large"
													value={x?.account_type}
													className="w-full"
													onChange={(v) => {
														const temp = [...value];
														temp[i].account_type = v;
														onChange(temp);
													}}
												>
													<Select.Option value="b2b">Business</Select.Option>
													<Select.Option value="bb2e">Employee</Select.Option>
												</Select>
												<Input
													size="large"
													value={x?.quantity}
													className="w-full"
													onChange={(v) => {
														const temp = [...value];
														temp[i].quantity = v.target.value;
														onChange(temp);
													}}
													prefix={"Min Qty:"}
												/>
												<Button
													onClick={() => {
														const temp = [...value];
														temp.splice(i, 1);
														onChange(temp);
													}}
												>
													Remove
												</Button>
											</div>
										))}
										<Button
											fullWidth
											variant="outlined"
											className="mt-2"
											onClick={() => {
												onChange([
													...value,
													{ account_type: "b2b", quantity: 0 },
												]);
											}}
										>
											Add Minimum Order Quantity
										</Button>
									</>
								)}
							/>

							{/* 
            'price': {
                account_type: string;
                min_quantity: number;
                per_unit: number;
              }[];
            */}

							<Controller
								control={control}
								name={"price"}
								render={({
									field: { onChange, value },
									fieldState: { error },
								}) => (
									<>
										<Label className="my-2">
											Price Chart
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										{value?.map((x: any, i: number) => (
											<div className="flex flex-row gap-2 mb-2">
												<Select
													size="large"
													value={x?.account_type}
													className="w-full"
													onChange={(v) => {
														const temp = [...value];
														temp[i].account_type = v;
														onChange(temp);
													}}
												>
													<Select.Option value="b2b">Business</Select.Option>
													<Select.Option value="bb2e">Employee</Select.Option>
												</Select>
												<Input
													size="large"
													value={x?.min_quantity}
													className="w-full"
													onChange={(v) => {
														const temp = [...value];
														temp[i].min_quantity = v.target.value;
														onChange(temp);
													}}
													prefix={"Min Qty:"}
												/>
												<Input
													size="large"
													value={x?.per_unit}
													className="w-full"
													onChange={(v) => {
														const temp = [...value];
														temp[i].per_unit = v.target.value;
														onChange(temp);
													}}
													prefix={"Unit Cost:"}
												/>
												<Button
													onClick={() => {
														const temp = [...value];
														temp.splice(i, 1);
														onChange(temp);
													}}
												>
													Remove
												</Button>
											</div>
										))}
										<Button
											fullWidth
											variant="outlined"
											className="mt-2"
											onClick={() => {
												onChange([
													...value,
													{ account_type: "b2b", min_quantity: 0, per_unit: 0 },
												]);
											}}
										>
											Add Price
										</Button>
									</>
								)}
							/>
						</div>
					</div>

					{isDirty && (
						<Button
							variant="contained"
							size="large"
							type={"submit"}
							className="w-full mt-4"
							disabled={isProductUpdating}
						>
							Save Changes
						</Button>
					)}
				</form>
			</div>
		</Spin>
	);
};

export default Edit;
