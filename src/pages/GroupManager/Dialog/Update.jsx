import React, { useEffect } from "react";
import DataDialog from "@/components/dialog";
import clsx from "clsx";
import Typography from "@/components/main-typography";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomSwitch from "@/components/custom-switch";
import { Input } from "@/components/ui/input";
import CusBtn from "@/custom/CusBtn";
import { Save } from "lucide-react";
import { useDispatch } from "react-redux";
import { createUpdateGroup } from "../groupManagerSlice";
import { toast } from "sonner";
import moment from "moment";
const Update = ({ data, open, setOpen, onOpenChange, setIsLoading }) => {
  const form = useForm();
  const dispatch = useDispatch();
  const { control, reset, watch, handleSubmit } = useForm({
    resolver: yupResolver(
      yup.object({
        active: yup.boolean(),
        name: yup.string(),
        description: yup.string(),
      })
    ),
  });

  const handleSave = (value) => {
    let dataSubmit = data
      ? {
          id: data?.id,
          ...value,
        }
      : {
          name: value?.name,
          description: value?.description,
        };
    dispatch(createUpdateGroup(dataSubmit))
      .then((res) => {
        if (res?.payload) {
          toast.success("Group's been already Updated", {
            description: moment().format("YYYY/MM/DD hh:mm:ss"),
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          setIsLoading(true);
          setOpen(false);
        } else {
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    reset({
      active: data?.active,
      name: data?.groupName,
      description: data?.description,
    });
  }, [data]);
  return (
    <DataDialog
      title="Group"
      open={open}
      setOpen={setOpen}
      onOpenChange={onOpenChange}
      footer={
        <div className="flex justify-end w-full">
          <CusBtn
            onClick={handleSubmit(handleSave)}
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
        <Form {...form}>
          {data && (
            <Controller
              name="active"
              control={control}
              render={({ field }) => {
                return (
                  <CustomSwitch
                    text="Active"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                );
              }}
            />
          )}
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
          <Controller
            name="description"
            control={control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Input placeholder="Description" {...field} />
                </FormItem>
              );
            }}
          />
        </Form>
      </div>
    </DataDialog>
  );
};

export default Update;
