import React, { useEffect, useState } from "react";
import DataDialog from "@/components/dialog";
import CusBtn from "@/custom/CusBtn";
import { Plus, Trash } from "lucide-react";
import DataTable from "@/components/data-table";
import { ceil } from "lodash";
import Typography from "@/components/main-typography";
import {
  addUserToGroup,
  getUsersInGroup,
  removeUserFromGroup,
} from "./slideCameraSlice";
import { useDispatch } from "react-redux";
import DebounceSelect from "@/components/debounce-select";
import axiosClient from "@/api/axiosClient";
import { API_GET_ADMIN_USER } from "@/constant/api";
import { getAdminUsers } from "../StoreManager/storeManagerSlice";
import moment from "moment";
import { toast } from "sonner";
import Confirm from "@/components/confirm";
const DetailGroupDialog = ({ open, setOpen, onOpenChange, data }) => {
  const dispatch = useDispatch();
  const [dataTable, setDataTable] = useState();
  const [userOptions, setUserOptions] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const columns = [
    {
      header: "Id",
      accessorKey: "id",
    },
    {
      header: "User Name",
      accessorKey: "user",
      cell: ({ row }) => {
        console.log("row", row.getValue("user"));
        return <Typography>{row.getValue("user")?.fullUsername}</Typography>;
      },
    },
    {
      id: "Actions",
      width: "60px",

      cell: ({ row }) => {
        return (
          <div>
            <CusBtn
              onClick={() => {
                setSelectedUser(row.getValue("id"));
                setShowConfirm(true);
              }}
              title={<Trash />}
              variant="destructive"
            />
          </div>
        );
      },
    },
  ];
  const funcGetUserInfo = async (user) => {
    if (user) {
      let listData = await axiosClient.post(API_GET_ADMIN_USER, {
        search: user,
      });
      return listData?.data?.object?.data?.map((item) => ({
        label: item?.fullUsername,
        value: item?.username,
      }));
    } else {
      return userOptions;
    }
  };
  useEffect(() => {
    if (loading) {
      dispatch(getUsersInGroup({ groupName: data })).then((res) => {
        setDataTable(res?.payload);
        setLoading(false);
      });
    }
  }, [loading]);
  useEffect(() => {
    dispatch(getAdminUsers({})).then((res) => {
      let listOpt = res?.payload?.data?.map((vl, index) => {
        return { label: vl?.fullUsername, value: vl?.username };
      });
      setUserOptions(listOpt);
      //   setListAdmin(res?.payload);
    });
  }, []);
  console.log("selectedUser", selectedUser);
  return (
    <DataDialog
      title="List Users Available In Group"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div>
        <div className="flex justify-end p-2 gap-2">
          <DebounceSelect
            showSearch
            placeholder="User Manager"
            fetchOptions={funcGetUserInfo}
            listOptions={userOptions}
            onChange={(newValue) => {
              let val = newValue?.split("-")[0];
              setUser(val);
            }}
            key="users"
          />
          <CusBtn
            onClick={() => {
              console.log("Add", user);
              dispatch(
                addUserToGroup({
                  groupName: data,
                  usernames: [user],
                })
              ).then((res) => {
                if (res?.payload) {
                  toast.success("Add user to group 's success", {
                    description: moment().format("YYYY/MM/DD hh:mm:ss"),
                    action: {
                      label: "Undo",
                      onClick: () => console.log("Undo"),
                    },
                  });
                  setLoading(true);
                }
              });
            }}
            title={
              <>
                <Plus /> Add
              </>
            }
          />
        </div>
        {dataTable?.length > 0 && (
          <div>
            <DataTable loading={loading} columns={columns} data={dataTable} />
          </div>
        )}
        {showConfirm && (
          <Confirm
            open={showConfirm}
            setOpen={setShowConfirm}
            onOpenChange={() => {
              setShowConfirm(!showConfirm);
            }}
            onConfirm={() => {
              console.log("remove User");
              dispatch(
                removeUserFromGroup({
                  id: selectedUser,
                })
              ).then((res) => {
                if (res?.payload) {
                  toast.success("Remove User From Group 's Success", {
                    description: moment().format("YYYY/MM/DD hh:mm:ss"),
                  });
                  setLoading(true);
                  setShowConfirm(false);
                }
              });
            }}
          />
        )}
      </div>
    </DataDialog>
  );
};
``;
export default DetailGroupDialog;
