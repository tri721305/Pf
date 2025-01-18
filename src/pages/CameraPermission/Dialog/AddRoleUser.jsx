import React, { useEffect, useState } from "react";
import DataDialog from "@/components/dialog";
import CusBtn from "@/custom/CusBtn";
import { Save } from "lucide-react";
import DebounceSelect from "@/components/debounce-select";
import TimePicker from "@/components/time-picker";
import DataTable from "@/components/data-table";
import axiosClient from "@/api/axiosClient";
import { API_GET_ADMIN_USER, API_GET_STORE } from "@/constant/api";
import { getListRole } from "../cameraPermissionSlice";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from "react-redux";
import moment from "moment";
import { assignUserRole } from "../cameraPermissionSlice";
import { toast } from "sonner";
const AddRoleUser = ({
  open,
  setOpen,
  onOpenChange,
  listOptionsUser,
  listOptionsStore,
  setLoading,
}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [store, setStore] = useState([]);
  const [listRoles, setListRoles] = useState();
  const [rowSelection, setRowSelection] = useState();
  const [expiredAt, setExpiredAt] = useState();
  const funcGetUserInfo = async (user) => {
    if (user) {
      let listData = await axiosClient.post(API_GET_ADMIN_USER, {
        search: user,
      });

      let newOptionsFormat = listData?.data?.object?.data?.filter(
        (item) => !listOptionsUser?.find((vl) => vl?.value == item?.username)
      );
      if (newOptionsFormat?.length > 0) {
        let newList = newOptionsFormat?.map((item) => ({
          label: item?.fullUsername,
          value: item?.username,
        }));
        let newListAfterAdd = [...newList, ...listOptionsUser];
        return newListAfterAdd;
      }
      //   return listData?.data?.object?.data?.map((item) => ({
      //     label: item?.fullUsername,
      //     value: item?.y,
      //   }));
    } else {
      return listOptionsUser;
    }
  };
  const funcGetStoreInfo = async (store) => {
    if (store) {
      let listData = await axiosClient.post(API_GET_STORE, {
        search: store,
      });

      let newOptionsFormat = listData?.data?.object?.data?.filter(
        (item) => !listOptionsStore?.find((vl) => vl?.value == item?.id)
      );

      if (newOptionsFormat?.length > 0) {
        let newList = newOptionsFormat?.map((item) => ({
          label: item?.storeName,
          value: item?.id,
        }));
        let newListAfterAdd = [...newList, ...listOptionsStore];
        return newListAfterAdd;
      } else {
        return newList;
      }
      //   return listData?.data?.object?.data?.map((item) => ({
      //     label: item?.storeName,
      //     value: item?.id,
      //   }));
    } else {
      return listOptionsStore;
    }
  };
  const handleSave = () => {
    let dataSubmit = {
      expiredAt: expiredAt,
      roleIds: rowSelection?.map((item) => item?.id),
      storeIds: store,
      usernames: user,
    };
    dispatch(assignUserRole(dataSubmit)).then((res) => {
      if (res?.payload) {
        toast.success("Roles has been added", {
          description: moment().format("YYYY/MM/DD hh:mm:ss"),
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        setLoading(true);
        setOpen(false);
      }
    });
    console.log("submit", dataSubmit);
  };
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            return table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            return row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "Role Name",
      accessorKey: "roleName",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Update Time",
      accessorKey: "updateTime",
      cell: ({ row }) => {
        return row.getValue("updateTime")
          ? moment(row.getValue("updateTime")).format("DD/MM/YYYY hh:mm:ss")
          : "";
      },
    },
  ];
  useEffect(() => {
    dispatch(getListRole({})).then((res) => {
      let newFormat = res?.payload?.filter((item) =>
        item?.roleName?.includes("CAMERA")
      );
      setListRoles(newFormat);
    });
  }, []);

  console.log("listOptionsUser", listOptionsUser);
  return (
    <DataDialog
      // width="900"
      open={open}
      title="Department & Users permission"
      onOpenChange={onOpenChange}
      footer={
        <div className="flex justify-end  w-full">
          <CusBtn
            onClick={handleSave}
            title={
              <>
                <Save /> Save
              </>
            }
          />
        </div>
      }
    >
      <div>
        <div className="flex gap-2 items-start">
          <DebounceSelect
            // options={listOptionsUser}
            showSearch
            placeholder="User"
            fetchOptions={funcGetUserInfo}
            listOptions={listOptionsUser}
            multiple={true}
            // onChange={(newValue) => {
            //   let val = newValue?.split("-")[0];
            //   setUser(val);
            // }}
            value={user}
            setValue={setUser}
            key="users"
          />
          <DebounceSelect
            showSearch
            listOptions={listOptionsStore}
            multiple={true}
            value={store}
            setValue={setStore}
            placeholder="Store"
            fetchOptions={funcGetStoreInfo}
          />
          <TimePicker
            onChange={(e) => {
              let newFormat = moment(e).format("DD-MM-YYYY HH:mm:ss ");
              console.log("dữ liệu ngày ", newFormat);
              setExpiredAt(newFormat);
            }}
          />
        </div>
        {listRoles?.length > 0 && (
          <div className="mt-2">
            <DataTable
              showSelection
              rowSelectionEnable={rowSelection}
              setRowSelectionEnable={setRowSelection}
              pagination={true}
              columns={columns}
              data={listRoles}
            />
          </div>
        )}
      </div>
    </DataDialog>
  );
};

export default AddRoleUser;
