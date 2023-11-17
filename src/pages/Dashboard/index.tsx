import useUser from "@/hooks/useUser";
import {
  useGetDashboardStatsReport,
  useGetNewUsersReport,
} from "@/queries/reports";
import DatePicker from "@components/antd/DatePicker";
import { Card, Spin, Tag } from "antd";
import moment from "moment";
import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

const Dashboard: React.FC = () => {
  const user = useUser();
  const [range, setRange] = React.useState<[moment.Moment, moment.Moment]>([
    moment().add(-30, "days"),
    moment(),
  ]);

  const { data: graph, isLoading: isGraphLoading } = useGetNewUsersReport({
    start_date: range[0].startOf("day").toISOString(),
    end_date: range[1].endOf("day").toISOString(),
  });

  const { data: stats, isLoading: isStatsLoading } = useGetDashboardStatsReport(
    {
      start_date: range[0].startOf("day").toISOString(),
      end_date: range[1].endOf("day").toISOString(),
    }
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-row items-start justify-between py-10 px-6">
        <p className="text-2xl">
          Welcome,{" "}
          <span className="font-semibold">
            {[user.first_name, user.last_name].join(" ")}
          </span>
        </p>
        <DatePicker.RangePicker
          // bordered={false}
          value={range}
          size={"large"}
          allowClear={false}
          allowEmpty={[false, false]}
          className="w-fit min-w-[250px]"
          presets={[
            {
              label: "Today",
              value: [moment(), moment()],
            },
            {
              label: "Yesterday",
              value: [moment().add(-1, "days"), moment().add(-1, "days")],
            },
            {
              label: "Last 7 Days",
              value: [moment().add(-7, "days"), moment()],
            },
            {
              label: "Last 30 Days",
              value: [moment().add(-30, "days"), moment()],
            },
            {
              label: "Last 6 Months",
              value: [moment().add(-3, "months"), moment()],
            },
            {
              label: "Last 1 Year",
              value: [moment().add(-1, "year"), moment()],
            },
          ]}
          onChange={(v) => {
            setRange([moment(v?.[0]), moment(v?.[1])]);
          }}
        />
      </div>
      <div className="p-5 ">
        <Spin spinning={isStatsLoading}>
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
              <h1 className="font-semibold text-text-light">
                New Subsciptions
              </h1>

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
              <h1 className="font-semibold text-text-light">
                Deleted Accounts
              </h1>

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
              <h1 className="font-semibold text-text-light">New Questions</h1>

              <div className="flex flex-row items-center justify-between">
                <span className="font-bold text-xl text-text-dark">
                  {stats?.new_questions || 0}
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
              <h1 className="font-semibold text-text-light">New Topics</h1>

              <div className="flex flex-row items-center justify-between">
                <span className="font-bold text-xl text-text-dark">
                  {stats?.new_topics || 0}
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
              <h1 className="font-semibold text-text-light">New Exams</h1>

              <div className="flex flex-row items-center justify-between">
                <span className="font-bold text-xl text-text-dark">
                  {stats?.new_exams || 0}
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
              <h1 className="font-semibold text-text-light">Skipped Exams</h1>

              <div className="flex flex-row items-center justify-between">
                <span className="font-bold text-xl text-text-dark">
                  {stats?.skipped_exams || 0}
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

        <Spin spinning={isGraphLoading}>
          <div className="w-full p-4 pb-8 border border-slate-200 rounded">
            <div className="flex flex-col items-center justify-center text-center py-3 font-bold text-base">
              <p>User Registration Graph</p>
            </div>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={400}
                  data={graph}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    animateNewValues={true}
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Dashboard;
