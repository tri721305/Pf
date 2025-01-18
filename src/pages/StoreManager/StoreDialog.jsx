import React, { useEffect, useState } from "react";
import DataDialog from "@/components/dialog";
import DataSelect from "@/components/select";
import {
  FloatingInput,
  FloatingLabel,
} from "@/components/custom/floatinglabel";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormSelect from "@/components/form-select";
import { Checkbox } from "@/components/ui/checkbox";
import DebounceSelect from "@/components/debounce-select";
import { useDispatch } from "react-redux";
import { getStoreDetails } from "./storeManagerSlice";
import { getAdminUsers, getAreas, getOrganizations } from "./storeManagerSlice";
import CusBtn from "@/custom/CusBtn";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import DataTable from "@/components/data-table";
import { Plus, Trash } from "lucide-react";
import axiosClient from "@/api/axiosClient";
import "./style.scss";
import { API_GET_ADMIN_USER } from "@/constant/api";
import Typography from "@/components/main-typography";
const StoreDialog = ({ open, onOpenChange, title, data }) => {
  const dispatch = useDispatch();

  // =================================== REACT HOOK FORM ===================================
  const form = useForm();
  const { control, handleSubmit, watch, setValue, reset, register } = useForm({
    resolver: yupResolver(
      yup.object({
        organization: yup.string(),
        ip: yup.array(),
        area: yup.string(),
        manager: yup.string(),
        headUsername: yup.number(),
        deputyUsername: yup.string(),
        deputyDepartmentUsername: yup.string(),
        note: yup.string(),
      })
    ),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ip",
  });
  const test = watch("organization");
  const ip = watch("ip");
  const area = watch("area");
  const manager = watch("manager");
  const headUsername = watch("headUsername");
  const deputyUsername = watch("deputyUsername");
  const note = watch("note");
  const deputyDepartmentUsername = watch("deputyDepartmentUsername");
  const [storeDetail, setStoreDetail] = useState();
  const [listArea, setListArea] = useState();
  const [listOrganization, setListOrganization] = useState();
  const [userOptions, setUserOptions] = useState();
  const [userManagers, setUserManagers] = useState();

  const columns = [
    {
      accessorKey: "port",
      header: "Port",
      cell: ({ row }) => {
        return (
          <Typography limit={30} className="font-medium">
            {row.getValue("port")}
          </Typography>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Device Name",
    },

    {
      accessorKey: "dvrType",
      header: "DVR Type",
    },
    {
      accessorKey: "ip",
      header: "IP Local",
    },
    {
      accessorKey: "ac",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <CusBtn className="bg-red-600 hover:bg-red-500" title={<Trash />} />
        );
      },
    },
  ];

  const onSubmit = (e) => {
    console.log("e");
  };

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
    dispatch(
      getStoreDetails({
        id: parseInt(data),
      })
    ).then((res) => {
      if (res?.payload) {
        console.log("storedeTail", res?.payload);
        let listUsers = [
          { ...res?.payload?.getgetUserHead },
          { ...res?.payload?.user },
          { ...res?.payload?.userDeputy },
          { ...res?.payload?.userDeputyDepartment },
        ];
        dispatch(getAdminUsers({})).then((resUsers) => {
          console.log("resUser", resUsers);
          if (resUsers?.payload?.data?.length > 0) {
            let newOptions = resUsers?.payload?.data?.map((item) => ({
              label: item?.fullUsername,
              value: item?.username,
            }));
            let newOptionsMNG = resUsers?.payload?.data?.map((item) => ({
              label: item?.fullUsername,
              value: item?.id,
            }));

            if (
              res?.payload?.user &&
              !newOptions?.some(
                (item) => item?.value == res?.payload?.user?.username
              )
            ) {
              newOptions.push({
                label: res?.payload?.user?.fullName,
                value: res?.payload?.user?.username,
              });

              newOptionsMNG.push({
                label: res?.payload?.user?.fullName,
                value: res?.payload?.user?.id,
              });
            }
            if (
              res?.payload?.userDeputy &&
              res?.payload?.userDeputy.username !==
                res?.payload?.user?.username &&
              !newOptions?.some(
                (item) => item?.value == res?.payload?.userDeputy?.username
              )
            ) {
              newOptions.push({
                label: res?.payload?.userDeputy?.fullName,
                value: res?.payload?.userDeputy?.username,
              });
            }

            if (
              res?.payload?.userDeputyDepartment &&
              res?.payload?.userDeputyDepartment?.username !==
                res?.payload?.user?.username &&
              res?.payload?.userDeputyDepartment?.username !==
                res?.payload?.userDeputy?.username &&
              !newOptions?.some(
                (item) =>
                  item?.value == res?.payload?.userDeputyDepartment?.username
              )
            ) {
              newOptions.push({
                label: res?.payload?.userDeputyDepartment?.fullName,
                value: res?.payload?.userDeputyDepartment?.username,
              });
            }
            if (
              res?.payload?.getUserHead &&
              res?.payload?.getUserHead?.username !==
                res?.payload?.user?.username &&
              res?.payload?.getUserHead?.username !==
                res?.payload?.userDeputy?.username &&
              res?.payload?.getUserHead?.username !==
                res?.payload?.userDeputyDepartment?.username &&
              !newOptions?.some(
                (item) => item?.value == res?.payload?.getUserHead?.username
              )
            ) {
              newOptions.push({
                label: res?.payload?.getUserHead?.fullName,
                value: res?.payload?.getUserHead?.username,
              });
            }

            setUserOptions(newOptions);
            setUserManagers(newOptionsMNG);
          }
        });
      }

      setStoreDetail(res?.payload);

      reset({
        organization: res?.payload?.organization?.id,
        ip: res?.payload?.ips,
        area: res?.payload?.area?.id,
        manager: res?.payload?.user?.id,
        deputyDepartmentUsername: res?.payload?.userDeputyDepartment?.username,
        deputyUsername: res?.payload?.userDeputy?.username,
        headUsername: res?.payload?.getUserHead?.username,
        note: res?.payload?.note,
      });
    });
  }, []);

  useEffect(() => {
    dispatch(getAreas({})).then((res) => {
      let newFormat = res?.payload?.map((item, index) => ({
        label: item?.areaName,
        value: item?.id,
      }));
      setListArea(newFormat);
    });
    dispatch(getOrganizations({})).then((res) => {
      let newFormat = res?.payload?.map((item) => ({
        label: item?.name,
        value: item?.id,
      }));
      setListOrganization(newFormat);
    });
  }, []);

  console.log("storeDetail", storeDetail?.ports);
  return (
    <DataDialog
      footer={
        <div className="flex justify-end gap-2 items-center w-full">
          <CusBtn variant="outline" title="Close" />
          <CusBtn
            onClick={handleSubmit((e) => {
              console.log("first", e);
            })}
            title="Save"
          />
        </div>
      }
      open={open}
      onOpenChange={onOpenChange}
      title={title}
    >
      <div className="flex gap-2 ">
        <div className="detail-left flex-1 flex flex-col gap-6">
          <div className="h-[60vh] flex flex-col gap-6 p-4 overflow-auto scrollarea-container">
            <div className="flex flex-col gap-4">
              <Form {...form}>
                <Controller
                  control={control}
                  name="organization"
                  render={({ field }) => (
                    <FormSelect
                      label="Organization"
                      onValueChange={field.onChange}
                      placeholder="Select Organization"
                      options={listOrganization}
                      value={test}
                    />
                  )}
                />
                <FormLabel>Ip</FormLabel>
                <div className="flex flex-col gap-2">
                  {fields.map((item, index) => (
                    <Controller
                      render={({ field }) => (
                        <div className="flex gap-2">
                          <FloatingInput {...field} />
                          {index == 0 ? (
                            <CusBtn
                              onClick={() => {
                                append(" ");
                              }}
                              title={<Plus />}
                            />
                          ) : (
                            <CusBtn
                              className="bg-red-600 hover:bg-red-500"
                              onClick={() => {
                                remove(index);
                              }}
                              title={<Trash />}
                            />
                          )}
                        </div>
                      )}
                      name={`ip.${index}`}
                      control={control}
                    />
                  ))}
                </div>
                <Controller
                  control={control}
                  name="Area"
                  render={({ field }) => (
                    <FormSelect
                      label="Area"
                      onValueChange={field.onChange}
                      placeholder="Select Area"
                      options={listArea}
                      value={area}
                    />
                  )}
                />
                <FormLabel>Manager</FormLabel>
                {userOptions && (
                  <Controller
                    control={control}
                    name="manager"
                    render={({ field }) => (
                      <DebounceSelect
                        {...field}
                        showSearch
                        placeholder="Manager"
                        fetchOptions={funcGetUserInfo}
                        listOptions={userManagers}
                        debounceTimeout={400}
                        value={manager}
                        onChange={
                          // (newValue) => {
                          // console.log("newValue", newValue);
                          // let val = newValue?.split("-")[0];
                          // setUser(val);
                          field.onChange
                        }
                        key="users"
                      />
                    )}
                  />
                )}
                <FormLabel>Deputy</FormLabel>
                {userOptions && (
                  <Controller
                    control={control}
                    name="deputyUsername"
                    render={({ field }) => (
                      <DebounceSelect
                        {...field}
                        showSearch
                        // value={manager}
                        value={deputyUsername}
                        placeholder="Deputy"
                        fetchOptions={funcGetUserInfo}
                        listOptions={userOptions}
                        debounceTimeout={400}
                        onChange={field.onChange}
                        key="users"
                      />
                    )}
                  />
                )}

                <FormLabel>Leader</FormLabel>
                {userOptions && (
                  <Controller
                    control={control}
                    name="headUsername"
                    render={({ field }) => (
                      <DebounceSelect
                        {...field}
                        showSearch
                        placeholder="Leader"
                        value={headUsername}
                        fetchOptions={funcGetUserInfo}
                        listOptions={userOptions}
                        debounceTimeout={400}
                        onChange={
                          // (newValue) => {
                          // console.log("newValue", newValue);
                          // let val = newValue?.split("-")[0];
                          // setUser(val);
                          field.onChange
                        }
                        key="users"
                      />
                    )}
                  />
                )}

                <FormLabel>Deputy Department</FormLabel>
                {userOptions && (
                  <Controller
                    control={control}
                    name="deputyDepartmentUsername"
                    render={({ field }) => (
                      <DebounceSelect
                        {...field}
                        showSearch
                        placeholder="Deputy Department"
                        fetchOptions={funcGetUserInfo}
                        listOptions={userOptions}
                        debounceTimeout={400}
                        value={deputyDepartmentUsername}
                        onChange={
                          // (newValue) => {
                          // console.log("newValue", newValue);
                          // let val = newValue?.split("-")[0];
                          // setUser(val);
                          field.onChange
                        }
                        key="users"
                      />
                    )}
                  />
                )}

                <FormLabel>Note</FormLabel>

                <Controller
                  control={control}
                  name="note"
                  render={({ field }) => (
                    <Textarea
                      value={note}
                      placeholder="Note"
                      className="resize-none"
                      {...field}
                    />
                  )}
                />

                {/* <Button
                onClick={handleSubmit((e) => {
                  console.log("submit", e);
                })}
                type="submit"
              >
                Submit
              </Button> */}
              </Form>
            </div>

            <div className="flex mt-2 items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Is primary store
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms2" />
              <label
                htmlFor="terms2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Force Active
              </label>
            </div>
          </div>
        </div>
        {/* <Separator orientation="vertical" /> */}
        <div className="detail-right flex flex-col gap-2 flex-1">
          <div className="flex gap-1">
            <CusBtn title="Add Device" />
            <CusBtn title="Clone Device" />
          </div>
          {storeDetail?.ports?.length > 0 && (
            <div>
              <DataTable columns={columns} data={storeDetail?.ports} />
            </div>
          )}
        </div>
      </div>
    </DataDialog>
  );
};

export default StoreDialog;
