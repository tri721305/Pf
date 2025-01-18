import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getDetailPC } from "./pcManagerSlice";
import RadialShape from "@/components/radial-shape";
import Typography from "@/components/main-typography";
import CustomCard from "@/components/card";
import moment from "moment";
import DataTable from "@/components/data-table";
import { Search } from "@/components/search";
import formatBytes from "@/constant/function";
const PCDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [dataDetail, setDataDetail] = useState();
  const data = null;

  const columnsInterface = [
    {
      header: "Name",
      accessorKey: "Name",
    },
    {
      header: "MTU",
      accessorKey: "Mtu",
    },
    {
      header: "IPv4",
      accessorKey: "Ipv4",
    },
    {
      header: "IPv6",
      accessorKey: "Ipv6",
    },
    {
      header: "Sent",
      accessorKey: "ByteSent",
      cell: ({ row }) =>
        row.getValue("ByteSent") ? formatBytes(row.getValue("ByteSent")) : "",
    },
    {
      header: "Received",
      accessorKey: "ByteReceived",
      cell: ({ row }) =>
        row.getValue("ByteReceived")
          ? formatBytes(row.getValue("ByteReceived"))
          : "",
    },
    {
      header: "Path",
      accessorKey: "Path",
      cell: ({ row }) =>
        row.getValue("Path")?.length > 0 ? (
          <div className="flex flex-col gap-1">
            {row.getValue("Path")?.map((item, index) => (
              <div className="p-1 text-center rounded-sm bg-blue-100 text-blue-500">
                {item}
              </div>
            ))}
          </div>
        ) : (
          ""
        ),
    },

    {
      header: "Address",
      accessorKey: "HardwareAddr",
    },
  ];

  const columnsApp = [
    {
      header: "Name",
      accessorKey: "Name",
    },
    {
      header: "Size",
      accessorKey: "Size",
      cell: ({ row }) =>
        row.getValue("Size") ?? formatBytes(row.getValue("Size")),
    },
    {
      header: "Publisher",
      accessorKey: "Publisher",
    },
    {
      header: "Version",
      accessorKey: "Version",
    },
    {
      header: "InstalledDate",
      accessorKey: "InstalledDate",
    },
  ];
  useEffect(() => {
    dispatch(
      getDetailPC({
        id: params?.id,
      })
    ).then((res) => {
      setDataDetail(res?.payload);
    });
  }, []);

  return (
    <div>
      <div className="flex gap-2">
        <RadialShape
          data={data}
          name="Memory Used"
          description="Description"
          sub="Sub"
        />
        <RadialShape
          data={data}
          name="CPU Used"
          description="Description"
          sub="Sub"
        />
        <RadialShape
          data={data}
          name="Disk Used"
          description="Description"
          sub="Sub"
        />
      </div>
      <div className="pcinfo flex gap-2">
        <CustomCard
          name="System Information"
          body={
            <div className="flex flex-col gap-2 py-2">
              <div className="flex  justify-between">
                <Typography>Status: </Typography>
                <Typography className="bg-green-100 text-green-500 px-4 rounded-sm">
                  {dataDetail?.status?.toUpperCase()}
                </Typography>
              </div>
              <div className="flex justify-between">
                <Typography>Name: </Typography>
                <Typography>{dataDetail?.machineName}</Typography>
              </div>
              <div className="flex justify-between">
                <Typography>OS: </Typography>
                <Typography>
                  {dataDetail?.os + "(" + dataDetail?.osDescription + ")"}
                </Typography>
              </div>
              <div className="flex justify-between">
                <Typography>Arc. : </Typography>
                <Typography>{dataDetail?.architecture}</Typography>
              </div>
              <div className="flex justify-between">
                <Typography>Model : </Typography>
                <Typography>{dataDetail?.model}</Typography>
              </div>
              <div className="flex justify-between">
                <Typography>CPU : </Typography>
                <Typography>{dataDetail?.cpu}</Typography>
              </div>

              <div className="flex justify-between">
                <Typography>S/n : </Typography>
                <Typography>{dataDetail?.serialNumber}</Typography>
              </div>

              <div className="flex justify-between">
                <Typography>UUID : </Typography>
                <Typography>{dataDetail?.uuid}</Typography>
              </div>

              <div className="flex justify-between">
                <Typography>Version : </Typography>
                <Typography>{dataDetail?.version}</Typography>
              </div>

              <div className="flex justify-between">
                <Typography>PC Time : </Typography>
                <Typography>
                  {moment(dataDetail?.currentTime).format(
                    "DD-MM-YYYY HH:mm:ss"
                  )}
                </Typography>
              </div>

              <div className="flex justify-between">
                <Typography>Update Time : </Typography>
                <Typography>
                  {moment(new Date(dataDetail?.updatedAt)).fromNow()}
                </Typography>
              </div>
            </div>
          }
        />
        {dataDetail?.interfaces?.length > 0 && (
          <CustomCard
            className="flex-1"
            name="Interfaces"
            body={
              <div>
                <DataTable
                  columns={columnsInterface}
                  data={dataDetail?.interfaces}
                />
              </div>
            }
          />
        )}
      </div>
      <div>
        {dataDetail?.application?.length > 0 && (
          <CustomCard
            name="Applications"
            body={
              <div>
                <DataTable
                  showToolbar
                  filterBy={["Name", "Pushlis"]}
                  columns={columnsApp}
                  data={dataDetail?.application}
                />
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default PCDetail;
