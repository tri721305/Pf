import React, { useState, useEffect } from "react";
// import { Form } from "@/components/ui/form";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DataDialog from "@/components/dialog";
import SelectSearch from "@/components/select-search";
import CusBtn from "@/custom/CusBtn";
import { Save } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import DataSelect from "@/components/select";
import * as zod from "zod";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateOrgPort } from "../portManagerSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import moment from "moment";
const listPortType = ["CAMERA_APP", "CAMERA_WEB", "VNC", "SSH", "WEB"];
const DetailDialog = ({
  open,
  setOpen,
  onOpenChange,
  data,
  listOrg,
  tab,
  setLoading,
}) => {
  const form = useForm();
  const [org, setOrg] = useState();
  const dispatch = useDispatch();
  const { control, handleSubmit, watch, setValue, reset, register } = useForm({
    resolver: yupResolver(
      yup.object({
        org: yup.string(),
        port: yup.number(),
        portType: yup.string(),
        name: yup.string(),
      })
    ),
  });
  const handleSave = (value) => {
    let dataSubmit = { ...value, orgId: tab, id: data?.id };
    dispatch(updateOrgPort(dataSubmit)).then((res) => {
      if (res?.payload) {
        toast.success("Port's already updated", {
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

  useEffect(() => {
    if (data) {
      setOrg(tab);
      reset({
        port: data?.port,
        portType: data?.portType,
        name: data?.name,
      });
    }
  }, [tab]);
  return (
    <DataDialog
      open={open}
      width="500px"
      title="Port"
      onOpenChange={onOpenChange}
      footer={
        <div className="w-full flex justify-end">
          <CusBtn
            onClick={handleSubmit(handleSave)}
            title={
              <>
                <Save />
                Save
              </>
            }
          />
        </div>
      }
    >
      <Form {...form}>
        <div className="flex flex-col  gap-2">
          <Controller
            name="org"
            control={control}
            render={({ field }) => {
              console.log("field", field.onChange);
              return (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  {/* <Input {...field} placeholder="Serial Number" /> */}
                  <SelectSearch
                    placeholder="Organization"
                    options={listOrg?.map((item) => ({
                      label: item?.name,
                      value: item?.id,
                    }))}
                    value={org}
                    setValue={setOrg}
                  />
                </FormItem>
              );
            }}
          />

          <Controller
            name="port"
            control={control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Port</FormLabel>
                  {/* <Input {...field} placeholder="Serial Number" /> */}
                  <Input type="number" placeholder="Port" {...field} />
                </FormItem>
              );
            }}
          />

          <Controller
            name="portType"
            control={control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Port Type</FormLabel>
                  <DataSelect
                    options={listPortType?.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    {...field}
                    placeholder="Type"
                  />
                </FormItem>
              );
            }}
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Name" {...field} />
                </FormItem>
              );
            }}
          />
        </div>
      </Form>
    </DataDialog>
  );
};

export default DetailDialog;
