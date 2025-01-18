import React, { useEffect, useState } from "react";
import { getAdminUsers, getAreas } from "../StoreManager/storeManagerSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import CusBtn from "@/custom/CusBtn";
import { Edit, Plus } from "lucide-react";
import { Search } from "@/components/search";
import DataTable from "@/components/data-table";
import AssignUser from "./Dialog/AssignUser";
const AreaManager = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [listAreas, setListAreas] = useState();
  const [showDialogAssign, setShowDialogAssign] = useState(false);
  const [listOptionUser, setListOptionUser] = useState();
  const columns = [
    {
      header: "Id",
      accessorKey: "id",
    },
    {
      header: "Area Name",
      accessorKey: "areaName",
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
      width: "80px",
      cell: ({}) => (
        <div>
          <CusBtn
            title={
              <>
                <Edit />
              </>
            }
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getAreas({})).then((res) => {
      setListAreas(res?.payload);
    });
  }, [loading]);

  console.log("Options");
  return (
    <div>
      AreaManager
      <div className="flex flex-1 gap-2">
        <Search />
        <CusBtn
          onClick={() => {
            console.log("askjdhaksdhaksjh", showDialogAssign);
            setShowDialogAssign(true);
          }}
          title={
            <>
              <Plus />
              Assign User
            </>
          }
        />
        <CusBtn
          title={
            <>
              <Plus />
              Add Area
            </>
          }
        />
      </div>
      {listAreas?.length > 0 && (
        <div className="mt-2">
          <DataTable
            onRowClick={(e) => {
              console.log("e");
            }}
            columns={columns}
            data={listAreas}
          />
        </div>
      )}
      {showDialogAssign && (
        <AssignUser
          open={showDialogAssign}
          setOpen={setShowDialogAssign}
          title="Assign User"
          listArea={listAreas}
          onOpenChange={(e) => {
            setShowDialogAssign(!showDialogAssign);
          }}
        />
      )}
    </div>
  );
};

export default AreaManager;
