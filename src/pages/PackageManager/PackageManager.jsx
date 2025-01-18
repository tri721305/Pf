import React, { useEffect, useState } from "react";
import { Search } from "@/components/search";
import CusBtn from "@/custom/CusBtn";
import { Edit, Plus, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { getListPackage } from "./packageManagerSlice";
import DataTable from "@/components/data-table";
import moment from "moment";
import UpdateDialog from "./Dialog/UpdateDialog";
import Confirm from "@/components/confirm";
const PackageManager = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const columns = [
    {
      header: "Package Name",
      accessorKey: "name",
    },
    {
      header: "Installed URL",
      accessorKey: "installUrl",
    },
    {
      header: "Version",
      accessorKey: "version",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        row?.getValue("createdAt")
          ? moment(row.getValue("createdAt")).format("DD-MM-YYYY HH:mm:ss")
          : "",
    },
    {
      header: "Updated At",
      accessorKey: "updatedAt",
      cell: ({ row }) =>
        row?.getValue("updatedAt")
          ? moment(row.getValue("updatedAt")).format("DD-MM-YYYY HH:mm:ss")
          : "",
    },
    {
      id: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-1">
          <CusBtn
            onClick={(e) => {
              setSelectedRow(row?.original);
              setShowDialog(true);
            }}
            title={<Edit />}
          />
          <CusBtn
            onClick={(e) => {
              setSelectedRow(row?.original);
              setShowConfirm(true);
            }}
            title={<Trash />}
            variant="destructive"
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (isLoading) {
      dispatch(getListPackage({})).then((res) => {
        console.log("res", res?.payload);
        setData(res?.payload);
        setIsLoading(false);
      });
    }
  }, [isLoading]);
  return (
    <div>
      <div className="flex gap-2">
        <Search />
        <CusBtn
          title={
            <>
              <Plus /> Add
            </>
          }
        />
      </div>
      {data?.length > 0 && (
        <div className="mt-2">
          <DataTable loading={isLoading} columns={columns} data={data} />
        </div>
      )}
      {showDialog && (
        <UpdateDialog
          open={showDialog}
          onOpenChange={(e) => {
            setShowDialog(!showDialog);
          }}
          setOpen={setShowDialog}
          data={selectedRow}
          setIsLoading={setIsLoading}
        />
      )}
      {showConfirm && (
        <Confirm
          open={showConfirm}
          onOpenChange={(e) => {
            setShowConfirm(!showConfirm);
          }}
          onConfirm={() => {
            console.log("delete");
          }}
        />
      )}
    </div>
  );
};

export default PackageManager;
