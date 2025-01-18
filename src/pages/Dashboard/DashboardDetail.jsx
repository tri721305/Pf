import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getFirewall } from "./dashboardSlice";
import { Liquid } from "@ant-design/plots";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardMenuBar from "./DashboardMenuBar";
import CardChart from "./CardChart";
import SystemInfo from "./SystemInfo";
import moment from "moment";
import DataTable from "@/components/data-table";
import CusBtn from "@/custom/CusBtn";
import { Info } from "lucide-react";
import Typography from "@/components/main-typography";
import { dashboardActions } from "./dashboardSlice";
import Navigation from "@/components/navigation-menu";
const DashboardDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [data, setData] = useState();

  useEffect(() => {
    dispatch(
      getFirewall({
        storeId: params?.id,
      })
    ).then((res) => {
      console.log("detail", res?.payload);
      if (res?.payload) {
        dispatch(
          dashboardActions.setChildrenBreakCrumb(res?.payload?.storeName)
        );
        setData(res?.payload);
      }
    });
    return () => {
      dispatch(dashboardActions.resetState({}));
    };
  }, []);

  const configCPU = {
    percent: Number(data?.systemStatus?.cpu_usage?.percent_used) / 100,
    height: 150,
    width: 150,
    wave: {
      length: 128,
    },
    outline: {
      border: 2,
      distance: 4,
      style: {
        stroke: "#FFC100",
        strokeOpacity: 0.65,
      },
    },
    theme: {
      styleSheet: {
        brandColor: "#FAAD14",
      },
    },
  };
  const configMemory2 = {
    percent: Number(data?.systemStatus?.disk_usage?.percent_used) / 100,
    height: 150,
    width: 150,
    wave: {
      length: 128,
    },
    outline: {
      border: 2,
      distance: 4,
      style: {
        stroke: "#33d4a4",
        strokeOpacity: 0.65,
      },
    },
    theme: {
      styleSheet: {
        brandColor: "#33d4a4",
      },
    },
  };

  const columnsGateways = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "RTT",
      accessorKey: "rtt",
    },
    {
      header: "RTTsd",
      accessorKey: "rttsd",
    },
    {
      header: "Loss",
      accessorKey: "loss",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
  ];
  const columnsInterfaces = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "descr",
    },
    {
      header: "State",
      accessorKey: "enable",
    },
    {
      header: "Media",
      accessorKey: "media",
    },
    {
      header: "IP Address",
      accessorKey: "ipaddr",
    },
  ];

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="flex justify-between ">
        <DashboardMenuBar className="w-fit mb-2" />
        <CusBtn
          title={
            <>
              <Info />
              Info
            </>
          }
        />
      </div>
      <div>
        <div className="flex">
          <CardChart className="min-w-[40%] mr-2 " title="System information">
            <SystemInfo
              status={data?.status}
              hostName={data?.hostname}
              systemStatus={data?.systemStatus}
              version={data?.version}
              uptime={data?.uptime}
              updateTime={data?.updateTime}
            />
          </CardChart>
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex gap-2 subcard flex-1">
              <Card className="flex w-fit h-fit  flex-1 flex-col ">
                <CardHeader className="items-center pb-0">
                  <CardTitle>CPU Usage</CardTitle>
                  <CardDescription>
                    {moment().format("MMMM Do YYYY")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                  <Liquid {...configCPU} />
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    <ul className="list-disc">
                      <li className="text-[12px]">
                        {data?.systemStatus?.cpu_info?.cpu_type}
                      </li>
                      <li className="text-[12px]">
                        {data?.systemStatus?.cpu_info?.cpu_count_detail}
                      </li>
                    </ul>
                  </div>
                  {/* <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div> */}
                </CardFooter>
              </Card>
              <CardChart
                title="Disk Usage"
                className=" flex-1 h-fit"
                footer={
                  <div className="flex items-center gap-2 font-medium leading-none ">
                    <ul className="list-disc">
                      <li>{data?.systemStatus?.disk_usage?.device}</li>
                      <li>
                        Total Size:
                        {data?.systemStatus?.disk_usage?.total_size}{" "}
                      </li>
                    </ul>
                  </div>
                }
              >
                <Liquid {...configMemory2} />
              </CardChart>
            </div>
            <div className="flex gap-2 subcard flex-1">
              <div className="flex-1">
                {data?.gatewayStatus?.length > 0 && (
                  <CardChart title="Gateways Status w-full">
                    <DataTable
                      columns={columnsGateways}
                      data={data?.gatewayStatus}
                    />
                  </CardChart>
                )}
              </div>
              <div className="flex-1">
                {data?.interfaceStatus?.length > 0 && (
                  <CardChart title="Interfaces Status">
                    <DataTable
                      columns={columnsInterfaces}
                      data={data?.interfaceStatus}
                    />
                  </CardChart>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDetail;
