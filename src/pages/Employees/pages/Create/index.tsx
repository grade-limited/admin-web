import React from "react";
import useRole from "@/hooks/useRole";
import { useCreateEmployee } from "@/queries/employees";
import { useForm, Controller } from "react-hook-form";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { DatePicker, Divider, Input, Select } from "antd";
import Iconify from "@components/iconify";
import { Button } from "@mui/material";
import * as dayjs from "dayjs";
import { Link } from "react-router-dom";

const Create: React.FC = () => {
	// Get Roles
	const { role, isRoleLoading, searchRole } = useRole();
	const { handleSubmit, control, reset } = useForm({
		// resolver: joiResolver(loginResolver),
	});
	const { mutateAsync: create, isLoading: employeeCreating } =
		useCreateEmployee();

	// On Submit Function
	const onSubmit = async (data: any) => {
		message.open({
			type: "loading",
			content: "Creating Employee..",
			duration: 0,
		});
		const res = await handleResponse(
			() =>
				create({
					...data,
				}),
			[201]
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
		<div>
			<div className="max-w-md mt-6 mx-auto text-center">
				<p className="text-lg font-medium mb-2">Create New Employee</p>
				<p className="text-sm text-text-light">
					This page allows administrators to input and store essential
					information about a new employee, such as personal details, job role,
					and contact information, for organizational record-keeping.
				</p>
				<Link
					to={"/app/employees/list"}
					className="text-sm font-medium text-text underline"
				>
					<p className="mt-3">View All Employees</p>
				</Link>
				<Divider />
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
			>
				<p className="font-medium mb-2">Personal Information</p>
				<div className="border p-3 rounded-md bg-slate-50">
					<div>
						<Label isRequired>Full Name</Label>
						<Input.Group compact>
							<Controller
								control={control}
								name={"first_name"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<Input
										className="w-1/2"
										placeholder={"Enter First Name"}
										size={"large"}
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										status={error ? "error" : ""}
										//   suffix={<ErrorSuffix error={error} />}
									/>
								)}
							/>
							<Controller
								control={control}
								name={"last_name"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<Input
										className="w-1/2"
										placeholder={"Enter Last Name"}
										size={"large"}
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										status={error ? "error" : ""}
										//   suffix={<ErrorSuffix error={error} />}
									/>
								)}
							/>
						</Input.Group>
					</div>

					<div>
						<Label className="my-1">Gender</Label>
						<Controller
							control={control}
							name={"gender"}
							rules={{ required: false }}
							defaultValue={"Male"}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Select
									placeholder={"Gender"}
									size={"large"}
									className="relative w-full"
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									options={[
										{ value: "Male", label: "Male" },
										{ value: "Female", label: "Female" },
										{ value: "Non Binary", label: "Non Binary" },
									]}
								/>
							)}
						/>
					</div>

					<div>
						<Label className="mt-2 mb-1">Date of Birth</Label>
						<Controller
							control={control}
							name={"dob"}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<DatePicker
									size="large"
									className={"w-full"}
									allowClear
									placeholder="Date of Birth"
									onChange={onChange}
									onBlur={onBlur}
									value={value ? dayjs(value) : null}
								/>
							)}
						/>
					</div>
				</div>

				<p className="font-medium mb-2 mt-4">Contact Information</p>
				<div className="border p-3 rounded-md bg-slate-50">
					<div>
						<Label className="my-1">Email</Label>
						<Controller
							control={control}
							name={"email"}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input
									placeholder={"Enter Email Address"}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									status={error ? "error" : ""}
									//   suffix={<ErrorSuffix error={error} />}
								/>
							)}
						/>
					</div>

					<div>
						<Label
							isRequired
							className="my-1"
						>
							Phone
						</Label>
						<Controller
							control={control}
							name={"phone"}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input
									// disabled
									placeholder={"Enter Phone Number"}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									status={error ? "error" : ""}
									//   suffix={<ErrorSuffix error={error} />}
								/>
							)}
						/>
					</div>

					<div>
						<Label className="my-1">Address</Label>
						<Controller
							control={control}
							name={"address"}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input.TextArea
									placeholder={"Enter Address..."}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									rows={4}
									value={value}
									status={error ? "error" : ""}
									//   suffix={<ErrorSuffix error={error} />}
								/>
							)}
						/>
					</div>
				</div>

				<p className="font-medium mb-2 mt-4">Access Information</p>
				<div className="border p-3 rounded-md bg-slate-50">
					<Controller
						control={control}
						name={"password"}
						rules={{ required: true }}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<>
								<div>
									<Label
										isRequired
										className="flex flex-row items-center gap-1"
									>
										Password
										{/* {error ? (
                    <ErrorSuffix error={error} />
                  ) : (
                    <Tooltip
                      title={"Password should be atleast 6 characters long."}
                       placement="topLeft"
                    >
                       <Icon color={"action"} className="text-base mb-1">
                        <AiFillInfoCircle />
                      </Icon> 
                    </Tooltip>
                  )}  */}
									</Label>
									<Input.Password
										placeholder="Enter Password"
										size="large"
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										status={error ? "error" : ""}
									/>
								</div>
							</>
						)}
					/>

					<div>
						<Label className="my-1">Role</Label>
						<Controller
							control={control}
							name={"role_id"}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Select
									value={value}
									size="large"
									showSearch
									className="w-full"
									placeholder={"Select a Role..."}
									suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
									onChange={onChange}
									options={role}
									onSearch={searchRole}
									loading={isRoleLoading}
									status={error ? "error" : ""}
								/>
							)}
						/>
					</div>

					<div>
						<Label className="my-1">Maximum Device</Label>
						<Controller
							control={control}
							name={"max_session"}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input
									placeholder={"4"}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									status={error ? "error" : ""}
									//   suffix={<ErrorSuffix error={error} />}
								/>
							)}
						/>
					</div>
				</div>

				<Button
					variant="contained"
					size="large"
					type={"submit"}
					className="w-full mt-4"
					disabled={employeeCreating}
				>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default Create;
