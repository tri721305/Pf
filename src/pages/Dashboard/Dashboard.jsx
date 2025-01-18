import React, { useEffect, useState } from "react";

import { Search } from "@/components/search";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import "./style.scss";
import { Edit, Sigma, Trash, Wifi, WifiOff } from "lucide-react";
import CusTable from "@/components/table-main";
import { getListFireWalls, getStatistics } from "./dashboardSlice";
import { useDispatch } from "react-redux";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/main-typography";
import DataTable from "@/components/data-table";
import CusBtn from "@/custom/CusBtn";
import DataDialog from "@/components/dialog";
import { useNavigate } from "react-router";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listData, setListData] = useState();
  const [loading, setLoading] = useState(true);
  const [statistic, setStatistic] = useState();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  const [showDetail, setShowDetail] = useState(false);
  const columns = [
    {
      accessorKey: "storeName",
      header: "Store",
      cell: ({ row }) => {
        return (
          <Typography className="font-bold" limit={16}>
            {row.getValue("storeName")}
          </Typography>
        );
      },
    },
    // {
    //   accessorKey: "hostname",
    //   header: "Host Name",
    //   cell: ({ row }) => {
    //     return <Typography limit={10}>{row.getValue("hostname")}</Typography>;
    //   },
    // },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <Badge
            className={` font-bold ${
              row.getValue("status") == "online"
                ? "bg-green-500 "
                : "bg-red-500"
            }`}
          >
            {row.getValue("status")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "gatewayStatus",
      header: "Gateway Status",
      cell: ({ row }) => {
        let dataRow = row.getValue("gatewayStatus");
        return (
          <div className="flex gap-1">
            {dataRow?.map((vl, i) => (
              <Badge
                className={` ${
                  vl?.status == "online" ? "bg-green-500 " : "bg-red-500"
                }`}
              >
                {vl?.name}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "areaName",
      header: "Area",
    },
    {
      accessorKey: "version",
      header: "Version",
    },
    {
      header: "Ctrl . Version",
      accessorKey: "mwg_controller_version",
    },
    {
      accessorKey: "uptime",
      header: "Uptime",
      cell: ({ row }) => {
        return <Typography limit={20}>{row.getValue("uptime")}</Typography>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-1">
            <CusBtn
              onClick={() => {
                navigate(
                  `/Dashboard/${row
                    ?.getValue("storeName")
                    ?.split("-")[0]
                    .trim()}`
                );
              }}
              className="p-3"
              title={<Edit />}
            />
            <CusBtn className="p-3" title={<Trash />} />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (loading) {
      dispatch(
        getListFireWalls({
          search: search,
          status: "",
          pagination: pagination,
        })
      ).then((res) => {
        if (res?.payload) {
          setListData(res?.payload);
        }
        setLoading(false);
      });
    }
  }, [loading]);
  useEffect(() => {
    dispatch(getStatistics({})).then((res) => {
      setStatistic(res?.payload);
    });
  }, []);
  console.log("data", listData);
  return (
    <div className="pfsense-body ">
      <div className="ml-auto flex items-center space-x-4">
        <Search
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            console.log("keydown", e);
            if (e.code == "Enter") {
              setLoading(true);
            }
          }}
        />
      </div>
      <div>
        <div className="grid gap-4 mt-2 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Store</CardTitle>
              <Sigma />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statistic?.pfsense?.online + statistic?.pfsense?.offline}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Online Store
              </CardTitle>
              <Wifi />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statistic?.pfsense?.online}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Offline Store
              </CardTitle>
              <WifiOff />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statistic?.pfsense?.offline}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-2 ">
        {listData?.data && (
          <DataTable
            columns={columns}
            data={listData?.data}
            pagination={{
              pageIndex: pagination.pageIndex,
              pageSize: pagination.pageSize,
              totalPages: listData?.recordsTotal,
              onPageChange: (pageNumber) => {
                setPagination((prev) => ({ ...prev, pageIndex: pageNumber }));
                setLoading(true);
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
