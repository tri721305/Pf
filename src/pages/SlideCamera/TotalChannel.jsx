import React, { useState } from "react";
import DataDialog from "@/components/dialog";
import DataTable from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import CusBtn from "@/custom/CusBtn";
import { Plus, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeItem } from "./slideCameraSlice";
import Confirm from "@/components/confirm";
import ModalAddChannel from "./ModalAddChannel";
import { toast } from "sonner";
import moment from "moment";
const TotalChannel = ({ open, onOpenChange, data, setIsLoading, setOpen }) => {
  const dispatch = useDispatch();
  const [rowSelection, setRowSelection] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAddChannel, setShowAddChannel] = useState(false);
  const onDelete = () => {};
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
      header: "Store Id",
      accessorKey: "storeId",
    },
    {
      header: "Port",
      accessorKey: "port",
    },
    {
      header: "Channel Number",
      accessorKey: "channelNumber",
    },
  ];
  console.log("rowSelection", rowSelection);
  return (
    <DataDialog title={data?.name} open={open} onOpenChange={onOpenChange}>
      <div>
        <div className="flex gap-1 w-full justify-end py-2">
          <CusBtn
            title={<Plus />}
            onClick={() => {
              setShowAddChannel(true);
            }}
          />
          <CusBtn
            onClick={() => {
              setShowConfirm(true);
            }}
            variant="destructive"
            title={<Trash />}
          />
        </div>
        <DataTable
          showSelection
          rowSelectionEnable={rowSelection}
          setRowSelectionEnable={setRowSelection}
          columns={columns}
          data={data?.items}
        />
        {showConfirm && (
          <Confirm
            open={showConfirm}
            onOpenChange={() => {
              setShowConfirm(!showConfirm);
            }}
            onConfirm={() => {
              let dataSubmit = rowSelection?.map((value) => value?.id);
              dispatch(
                removeItem({
                  ids: dataSubmit,
                })
              ).then((res) => {
                if (res?.payload) {
                  toast.success("Remove item 's success ", {
                    description: moment().format("YYYY/MM/DD hh:mm:ss"),
                    action: {
                      label: "Undo",
                      onClick: () => console.log("Undo"),
                    },
                  });
                  setShowConfirm(false);
                  setOpen(false);
                  setIsLoading(true);
                }
              });
            }}
          />
        )}
        {showAddChannel && (
          <ModalAddChannel
            open={showAddChannel}
            onOpenChange={() => {
              setShowAddChannel(!showAddChannel);
            }}
            data={data}
            setOpen={setShowAddChannel}
            setIsLoading={setIsLoading}
            setShowParent={setOpen}
          />
        )}
      </div>
    </DataDialog>
  );
};

export default TotalChannel;
