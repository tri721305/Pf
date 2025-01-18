import React, { useState, useEffect } from "react";
import DataDialog from "@/components/dialog";
import SelectSearch from "@/components/select-search";
import TimePicker from "@/components/time-picker";
import moment from "moment";
import { getListRole } from "../cameraPermissionSlice";
import { useDispatch } from "react-redux";
import DataTable from "@/components/data-table";
import SelectMultiple from "@/components/select-multiple";
import CusBtn from "@/custom/CusBtn";
import { Save } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { assignRole } from "../cameraPermissionSlice";
import { toast } from "sonner";
const AddCameraPermission = ({
  open,
  onOpenChange,
  setOpen,
  listDepartments,
  listOptions,
}) => {
  const dispatch = useDispatch();
  const [listRoles, setListRoles] = useState();
  const [dateString, setDateString] = useState();
  const [rowSelection, setRowSelection] = useState();
  const [positions, setPostitions] = useState([]);
  const [expiredAt, setExpiredAt] = useState();
  const [department, setDepartment] = useState();
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

  const handleSave = (e) => {
    let dataSubmit = {
      departmentId: department,
      positionIds: positions,
      roleIds: rowSelection?.map((item) => item?.id),
      expiredAt: expiredAt,
    };
    console.log("dataSubmit", dataSubmit);
    dispatch(assignRole(dataSubmit)).then((res) => {
      toast.success("Assign Role 's success", {
        description: moment().format("YYYY/MM/DD hh:mm:ss"),
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    });
  };

  useEffect(() => {
    dispatch(getListRole({})).then((res) => {
      let newFormat = res?.payload?.filter((item) =>
        item?.roleName?.includes("CAMERA")
      );
      console.log("newFormat", newFormat);

      setListRoles(newFormat);
    });
  }, []);

  console.log("rowSelectioon", rowSelection);
  return (
    <DataDialog
      // width="900"
      open={open}
      title="Department & Users permission"
      onOpenChange={onOpenChange}
      footer={
        <div className="flex justify-end w-full">
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
        <div className="flex gap-2">
          <SelectSearch
            value={department}
            setValue={setDepartment}
            key="department"
            options={listDepartments}
            placeholder="Department"
          />
          <SelectMultiple
            value={positions}
            setValue={setPostitions}
            options={listOptions}
            placeholder="Positions"
          />

          <TimePicker
            onChange={(e) => {
              let newFormat = moment(e).format("DD/MM/YYYY HH:mm:ss ");
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

export default AddCameraPermission;
