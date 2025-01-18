import React, { useState, useEffect } from "react";
import DataDialog from "@/components/dialog";
import DebounceSelect from "@/components/debounce-select";
import TimePicker from "@/components/time-picker";
import axiosClient from "@/api/axiosClient";
import { API_GET_ADMIN_USER } from "@/constant/api";
import SelectSearch from "@/components/select-search";
import { useDispatch } from "react-redux";
import { getListRole } from "../cameraPermissionSlice";
import CusBtn from "@/custom/CusBtn";
import { Save } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/components/data-table";
import moment from "moment";
import SelectMultiple from "@/components/select-multiple";
import { assignAreaRole } from "../cameraPermissionSlice";
import Confirm from "@/components/confirm";
import { toast } from "sonner";
const AddRoleArea = ({
  open,
  setOpen,
  onOpenChange,
  listAreas,
  listOrganizations,
  listOptionsUser,
  setLoading,
}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [organization, setOrganization] = useState();
  const [area, setArea] = useState([]);
  const [listRoles, setListRoles] = useState();
  const [rowSelection, setRowSelection] = useState();
  const [expiredAt, setExpiredAt] = useState();
  const [showConfirm, setShowConfirm] = useState();
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
    } else {
      return listOptionsUser;
    }
  };
  const handleSave = () => {
    let dataSubmit = {
      areaIds: area,
      orgId: organization,
      roleIds: rowSelection?.map((item) => item?.id),
      usernames: user,
      expiredAt: expiredAt,
    };
    dispatch(assignAreaRole(dataSubmit)).then((res) => {
      if (res?.payload) {
        toast.success("Roles has been already added", {
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

  return (
    <DataDialog
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
            showSearch
            multiple={true}
            placeholder="User"
            fetchOptions={funcGetUserInfo}
            listOptions={listOptionsUser}
            value={user}
            setValue={setUser}
            key="users"
          />
          <SelectMultiple
            width={"200px"}
            options={listAreas}
            placeholder="Area"
            value={area}
            setValue={setArea}
          />
          <SelectSearch
            width={"200px"}
            options={listOrganizations}
            placeholder="Organization"
            value={organization}
            setValue={setOrganization}
          />

          <TimePicker
            onChange={(e) => {
              let newFormat = moment(e).format("YYYY-MM-DD HH:mm:ss ");
              setExpiredAt(newFormat);
            }}
          />
        </div>

        {listRoles?.length > 0 && (
          <div className="mt-2">
            <DataTable
              showSelection={true}
              columns={columns}
              data={listRoles}
              rowSelectionEnable={rowSelection}
              setRowSelectionEnable={setRowSelection}
            />
          </div>
        )}
      </div>
    </DataDialog>
  );
};

export default AddRoleArea;
