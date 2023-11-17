import React from "react";
import useQueryContext from "@/hooks/useQueryContext";
import { Card, Spin, Tag } from "antd";
import { useGetUsersStatsReport } from "@/queries/reports";
import moment from "moment";

const Overview: React.FC = () => {
	const { watch } = useQueryContext();
	const { data: stats, isLoading } = useGetUsersStatsReport({
		start_date: moment(watch("range")?.[0]).startOf("day").toISOString(),
		end_date: moment(watch("range")?.[1]).endOf("day").toISOString(),
	});

	return (
		<div className="p-3">
			<Spin spinning={isLoading}>
				<div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mb-6">
					<Card
						size="small"
						className="shadow-md bg-[#B3ECF4]"
						bordered={false}
					>
						<h1 className="font-semibold text-text-light">Total Users</h1>

						<div className="flex flex-row items-center justify-between">
							<span className="font-bold text-xl text-text-dark">
								{stats?.total_users || 0}
							</span>
							<Tag
								color="#fff"
								className="text-text-light font-semibold rounded-xl"
							>
								+2.5%
							</Tag>
						</div>
					</Card>
					<Card
						size="small"
						className="shadow-md bg-[#FEE0A0]"
						bordered={false}
					>
						<h1 className="font-semibold text-text-light">New Users</h1>

						<div className="flex flex-row items-center justify-between">
							<span className="font-bold text-xl text-text-dark">
								{stats?.new_users || 0}
							</span>
							<Tag
								color="#fff"
								className="text-text-light font-semibold rounded-xl"
							>
								+2.5%
							</Tag>
						</div>
					</Card>
					<Card
						size="small"
						className="shadow-md bg-[#A8FFE4]"
						bordered={false}
					>
						<h1 className="font-semibold text-text-light">New Subsciptions</h1>

						<div className="flex flex-row items-center justify-between">
							<span className="font-bold text-xl text-text-dark">
								{stats?.new_subscriptions || 0}
							</span>
							<Tag
								color="#fff"
								className="text-text-light font-semibold rounded-xl"
							>
								+2.5%
							</Tag>
						</div>
					</Card>

					<Card
						size="small"
						className="shadow-md bg-[#ffbebe]"
						bordered={false}
					>
						<h1 className="font-semibold text-text-light">Deleted Accounts</h1>

						<div className="flex flex-row items-center justify-between">
							<span className="font-bold text-xl text-text-dark">
								{stats?.deleted_users || 0}
							</span>
							<Tag
								color="#fff"
								className="text-text-light font-semibold rounded-xl"
							>
								+2.5%
							</Tag>
						</div>
					</Card>
					<Card
						size="small"
						className="shadow-md bg-[#E7CFFF]"
						bordered={false}
					>
						<h1 className="font-semibold text-text-light">
							Total Subscription Requests
						</h1>

						<div className="flex flex-row items-center justify-between">
							<span className="font-bold text-xl text-text-dark">
								{stats?.total_subscription_requests || 0}
							</span>
							<Tag
								color="#fff"
								className="text-text-light font-semibold rounded-xl"
							>
								+2.5%
							</Tag>
						</div>
					</Card>
					<Card
						size="small"
						className="shadow-md bg-[#c2ffc2]"
						bordered={false}
					>
						<h1 className="font-semibold text-text-light">
							New Reffered Users
						</h1>

						<div className="flex flex-row items-center justify-between">
							<span className="font-bold text-xl text-text-dark">
								{stats?.new_reffered_users || 0}
							</span>
							<Tag
								color="#fff"
								className="text-text-light font-semibold rounded-xl"
							>
								+2.5%
							</Tag>
						</div>
					</Card>
					<Card
						size="small"
						className="shadow-md bg-[#e1f8ff]"
						bordered={false}
					>
						<h1 className="font-semibold text-text-light">
							Today's Active Users
						</h1>

						<div className="flex flex-row items-center justify-between">
							<span className="font-bold text-xl text-text-dark">
								{stats?.total_active_users || 0}
							</span>
							<Tag
								color="#fff"
								className="text-text-light font-semibold rounded-xl"
							>
								+2.5%
							</Tag>
						</div>
					</Card>
					<Card
						size="small"
						className="shadow-md bg-[#ffd8be]"
						bordered={false}
					>
						<h1 className="font-semibold text-text-light">
							Total Suspended Accounts
						</h1>

						<div className="flex flex-row items-center justify-between">
							<span className="font-bold text-xl text-text-dark">
								{stats?.total_suspended_accounts || 0}
							</span>
							<Tag
								color="#fff"
								className="text-text-light font-semibold rounded-xl"
							>
								+2.5%
							</Tag>
						</div>
					</Card>
				</div>
			</Spin>
		</div>
	);
};

export default Overview;
