import DebounceSelect from "@/components/debounce-select";
import { Search } from "@/components/search";
import React, { useEffect, useState } from "react";
import DebounceSelectUser from "@/components/debounce-select-user";
import SelectSearch from "@/components/select-search";
import CusBtn from "@/custom/CusBtn";
import { Edit, Plus, SearchIcon } from "lucide-react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { getListGroup } from "./groupManagerSlice";
import DataTable from "@/components/data-table";
import Update from "./Dialog/Update";
import { useNavigate } from "react-router";
const GroupManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listGroup, setListGroup] = useState();
  const [showDialog, setShowDialog] = useState();
  const [user, setUser] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const columns = [
    {
      header: "Group Name",
      accessorKey: "groupName",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Status",
      accessorKey: "active",
      width: "60px",
      cell: ({ row }) =>
        row?.getValue("active") ? (
          <div className="bg-green-100 text-green-500 p-1  text-center rounded-md">
            Active
          </div>
        ) : (
          <div className="bg-red-100 text-red-500 p-1 rounded-md text-center">
            Deactive
          </div>
        ),
    },

    {
      header: "Update Time",
      accessorKey: "updateTime",
      cell: ({ row }) =>
        row.getValue("updateTime")
          ? moment(row.getValue("updateTime")).format("DD-MM-YYYY HH:mm:ss")
          : "",
    },
    {
      id: "actions",
      width: "60px",
      cell: ({ row }) => (
        <div>
          <CusBtn
            onClick={(e) => {
              console.log("click");
              setSelectedRow(row.original);
              setShowDialog(true);
            }}
            title={<Edit />}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (isLoading) {
      dispatch(getListGroup({})).then((res) => {
        setListGroup(res?.payload);
      });
      setIsLoading(false);
    }
  }, [isLoading]);
  console.log("selechtedRow", selectedRow);
  return (
    <div>
      <div className="flex gap-2">
        <Search />
        <DebounceSelectUser value={user} setValue={setUser} />
        <SelectSearch placeholder="Role" />
        <CusBtn
          title={
            <>
              <SearchIcon />
              Search
            </>
          }
        />
        <CusBtn
          onClick={(e) => {
            setSelectedRow();
            setShowDialog(true);
          }}
          title={
            <>
              <Plus /> Add
            </>
          }
        />
      </div>
      {listGroup?.data?.length > 0 && (
        <div className="mt-2">
          <DataTable
            loading={isLoading}
            columns={columns}
            data={listGroup?.data}
            showSelection={true}
            rowSelectionEnable={selectedRow}
            setRowSelectionEnable={setSelectedRow}
            onRowClick={(e) => {
              console.log("e", e);
              // setSelectedRow(e?.original);
              navigate(`${e?.id}`);
            }}
            pagination={true}
          />
        </div>
      )}
      {showDialog && (
        <Update
          open={showDialog}
          setOpen={setShowDialog}
          onOpenChange={() => {
            setShowDialog(!showDialog);
          }}
          data={selectedRow}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
};

export default GroupManager;
