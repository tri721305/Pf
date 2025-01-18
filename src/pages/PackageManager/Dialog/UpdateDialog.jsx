import React, { useEffect } from "react";
import DataDialog from "@/components/dialog";
import CusBtn from "@/custom/CusBtn";
import { Save } from "lucide-react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDispatch } from "react-redux";
import { updatePackage } from "../packageManagerSlice";
import { toast } from "sonner";
import moment from "moment";
const UpdateDialog = ({ open, setOpen, onOpenChange, data, setIsLoading }) => {
  const form = useForm();
  const dispatch = useDispatch();
  const { control, handleSubmit, watch, setValue, reset } = useForm({
    resolver: yupResolver(
      yup.object({
        name: yup.string(),
        installUrl: yup.string(),
        version: yup.string(),
      })
    ),
  });
  const handleSave = (value) => {
    dispatch(updatePackage({ ...value, id: data?.id })).then((res) => {
      if (res?.payload) {
        toast.success("Update Package 's already success", {
          description: moment().format("YYYY/MM/DD hh:mm:ss"),
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        setIsLoading(true);
        setOpen(false);
      }
    });
  };
  useEffect(() => {
    reset({
      name: data?.name,
      installUrl: data?.installUrl,
      version: data?.version,
    });
  }, []);
  return (
    <DataDialog
      open={open}
      title="Update Package"
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
        <div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} placeholder="Name" />
                </FormItem>
              );
            }}
          />
          <Controller
            name="installUrl"
            control={control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <Input {...field} placeholder="Url" />
                </FormItem>
              );
            }}
          />
          <Controller
            name="version"
            control={control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Version</FormLabel>
                  <Input {...field} placeholder="Version" />
                </FormItem>
              );
            }}
          />
        </div>
      </Form>
    </DataDialog>
  );
};

export default UpdateDialog;
