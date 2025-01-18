import React, { useState } from "react";
import DataDialog from "@/components/dialog";
import CusBtn from "@/custom/CusBtn";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Form, FormLabel } from "@/components/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import FormSelect from "@/components/form-select";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { createGroup } from "./slideCameraSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import moment from "moment";

const AddSlideDialog = ({
  open,
  onOpenChange,
  title,
  listGroups,
  setListGroups,
}) => {
  const form = useForm();
  const dispatch = useDispatch();
  const [inputItem, setInputItem] = useState();
  const [groups, setGroups] = useState(listGroups);
  const { control, handleSubmit, watch, setValue, reset, register } = useForm({
    resolver: yupResolver(
      yup.object({
        name: yup.string(),
        groupName: yup.string(),
        description: yup.string(),
      })
    ),
  });
  return (
    <DataDialog
      width={500}
      open={open}
      title={title}
      onOpenChange={onOpenChange}
      footer={
        <div className=" w-full flex justify-end">
          <CusBtn
            onClick={handleSubmit((e) => {
              dispatch(createGroup(e)).then((res) => {
                if (res?.payload) {
                  toast.success("Group has been created", {
                    description: moment().format("YYYY/MM/DD hh:mm:ss"),
                    action: {
                      label: "Undo",
                      onClick: () => console.log("Undo"),
                    },
                  });
                } else {
                  toast.error("Uh oh! Something went wrong.", {
                    description: moment().format("YYYY/MM/DD hh:mm:ss"),
                    action: {
                      label: "Undo",
                      onClick: () => console.log("Undo"),
                    },
                  });
                }
              });
            })}
            title="Save"
          />
        </div>
      }
    >
      <div>
        <Form {...form}>
          <FormLabel>Name</FormLabel>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input placeholder="Name" onChange={field.onChange} />
            )}
          />
          {/* <FormLabel>Group Name</FormLabel> */}
          <Controller
            control={control}
            name="groupName"
            render={({ field }) => (
              <FormSelect
                options={groups?.map((vl) => ({
                  label: vl?.group,
                  value: vl?.group,
                }))}
                label="Group Name"
                footer={
                  <>
                    <Separator />
                    <div className="flex gap-2 p-2">
                      <Input
                        onChange={(e) => {
                          setInputItem(e.target.value);
                        }}
                        placeholder="Add Item"
                      />
                      <CusBtn
                        onClick={() => {
                          if (inputItem) {
                            setGroups((prev) => [
                              ...prev,
                              { group: inputItem },
                            ]);
                          }
                        }}
                        title={
                          <>
                            <Plus /> Add Item
                          </>
                        }
                      />
                    </div>
                  </>
                }
                onValueChange={field.onChange}
                placeholder="Group Name"
              />
            )}
          />

          <FormLabel>Description</FormLabel>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Input placeholder="Description" onChange={field.onChange} />
            )}
          />
        </Form>
      </div>
    </DataDialog>
  );
};

export default AddSlideDialog;
