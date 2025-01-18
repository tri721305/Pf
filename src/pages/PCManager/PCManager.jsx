import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DebounceSelect from "@/components/debounce-select";
import DataSelect from "@/components/select";
import { Input } from "@/components/ui/input";
import SelectMultiple from "@/components/select-multiple";
import { getPCManger } from "./pcManagerSlice";
import { useDispatch } from "react-redux";
import { Search } from "@/components/search";
import SelectSearch from "@/components/select-search";
import DataTable from "@/components/data-table";
import formatBytes from "@/constant/function";
import moment from "moment";
import { useForm, Controller, useFieldArray, Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CusBtn from "@/custom/CusBtn";
import { getStores, getAreas } from "../StoreManager/storeManagerSlice";
const osList = ["Windows", "Ubuntu", "Mac"];

const PCManager = () => {
  const dispatch = useDispatch();
  const form = useForm();
  const navigate = useNavigate();
  const { control, handleSubmit, watch, setValue, reset } = useForm({
    resolver: zodResolver,
    defaultValues: {
      sn: "",
      storeId: "",
      os: "",
      status: "",
      areaId: "",
    },
  });
  const [selectedRow, setSelectedRow] = useState();
  const [listArea, setListArea] = useState();
  const [listData, setListData] = useState();
  const [listStoreOptions, setListStoreOptions] = useState();
  const testSn = watch("sn");
  const testStore = watch("storeId");
  const testOs = watch("os");

  const columns = [
    {
      header: "Store",
      accessorKey: "store",
    },
    {
      header: "Machine Name",
      accessorKey: "machineName",
    },
    {
      header: "Model",
      accessorKey: "model",
    },

    {
      header: "OS",
      accessorKey: "os",
    },
    {
      header: "Arc.",
      accessorKey: "",
    },
    {
      header: "App",
      accessorKey: "countApplication",
    },
    {
      header: "CPU Cores",
      accessorKey: "core",
    },
    {
      header: "Memory",
      accessorKey: "memory",
      cell: ({ row }) =>
        row?.getValue("memory") ? formatBytes(row?.getValue("memory")) : "",
    },
    {
      header: "CPU Used",
      accessorKey: "resources",
      cell: ({ row }) =>
        row?.getValue("resources")?.Cpu ? (
          <div
            className={` ${
              row?.getValue("resources")?.Cpu?.Percent < 60
                ? "bg-green-100  text-green-500"
                : row?.getValue("resources")?.Cpu?.Percent < 80
                ? "bg-yellow-200 text-yellow-500"
                : "bg-red-100 text-red-500"
            }
                 rounded-[4px] p-[4px] w-[80px] text-center
      `}
          >{`${row?.getValue("resources")?.Cpu?.Percent?.toFixed(2)}%`}</div>
        ) : (
          ""
        ),
    },
    {
      header: "Memory Used",
      accessorKey: "resources",
      cell: ({ row }) =>
        row?.getValue("resources")?.Memory ? (
          <div
            className={` ${
              row?.getValue("resources")?.Memory?.Percent < 60
                ? "bg-green-100  text-green-500"
                : row?.getValue("resources")?.Memory?.Percent < 80
                ? "bg-yellow-200 text-yellow-500"
                : "bg-red-100 text-red-500"
            }
                   rounded-[4px] p-[4px] w-[80px] text-center
        `}
          >{`${row?.getValue("resources")?.Memory?.Percent?.toFixed(2)}%`}</div>
        ) : (
          ""
        ),
    },
    {
      header: "Disk Used",
      accessorKey: "resources",
      cell: ({ row }) =>
        row?.getValue("resources")?.Disk ? (
          <div
            className={` ${
              row?.getValue("resources")?.Disk?.Percent < 60
                ? "bg-green-100  text-green-500"
                : row?.getValue("resources")?.Disk?.Percent < 80
                ? "bg-yellow-200 text-yellow-500"
                : "bg-red-100 text-red-500"
            }
                     rounded-[4px] p-[4px] w-[80px] text-center
          `}
          >{`${row?.getValue("resources")?.Memory?.Percent?.toFixed(2)}%`}</div>
        ) : (
          ""
        ),
    },
    {
      header: "Version",
      accessorKey: "version",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div
          className={
            row.getValue("status") == "online"
              ? "bg-green-100  text-green-500  rounded-[4px] p-[4px] w-[80px] text-center"
              : "bg-red-100 text-red-500 rounded-[4px] p-[4px] w-[80px] text-center"
          }
        >
          {row.getValue("status")?.toUpperCase()}
        </div>
      ),
    },
    {
      header: "Updated At",
      accessorKey: "updatedAt",
      cell: ({ row }) =>
        row?.getValue("updatedAt")
          ? moment(row.getValue("updatedAt")).format("YYYY-MM-DD HH:mm:ss")
          : "",
    },
  ];
  useEffect(() => {
    dispatch(getPCManger({})).then((res) => {
      setListData(res?.payload);
    });
  }, []);

  useEffect(() => {
    dispatch(getStores({})).then((res) => {
      setListStoreOptions(res?.payload);
    });
    dispatch(getAreas({})).then((res) => {
      console.log("res", res?.payload);
    });
  }, []);
  console.log("selectedRow", selectedRow);
  return (
    <div>
      <Form {...form}>
        <div className="flex gap-2">
          <Controller
            name="sn"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Serial Number" />
            )}
          />
          <Controller
            name="storeId"
            control={control}
            render={({ field }) => {
              return <DebounceSelect {...field} placeholder="Store" />;
            }}
          />
          <Controller
            name="os"
            control={control}
            render={({ field }) => {
              return (
                <DataSelect
                  options={osList.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  {...field}
                  placeholder="Os"
                />
              );
            }}
          />
          <Controller
            name="areaId"
            control={control}
            render={({ field }) => {
              return <SelectSearch {...field} placeholder="Area" />;
            }}
          />
        </div>
      </Form>
      {listData?.data?.length > 0 && (
        <div className="mt-4">
          <DataTable
            onRowClick={(e) => {
              // setSelectedRow(e?.original);

              console.log(e?.original?.id);
              navigate(`${e?.original?.id}`);
            }}
            columns={columns}
            data={listData?.data}
          />
        </div>
      )}
    </div>
  );
};

export default PCManager;
