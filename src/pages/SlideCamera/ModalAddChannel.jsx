import React, { useEffect, useState } from "react";
import DataDialog from "@/components/dialog";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Plus, Save, Trash } from "lucide-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FloatingInput,
  FloatingLabelInput,
} from "@/components/custom/floatinglabel";
import CusBtn from "@/custom/CusBtn";
import { toast } from "sonner";
import { FormLabel, Form } from "@/components/ui/form";
import DebounceSelect from "@/components/debounce-select";
import DataSelect from "@/components/select";
import { getStores } from "../StoreManager/storeManagerSlice";
import { useDispatch } from "react-redux";
import { API_GET_STORE } from "@/constant/api";
import axiosClient from "@/api/axiosClient";
import { getCameraChannel, addCameraSliderItem } from "./slideCameraSlice";
import moment from "moment";
const ModalAddChannel = ({
  open,
  onOpenChange,
  data,
  setIsLoading,
  setOpen,
  setShowParent,
}) => {
  const form = useForm();
  const dispatch = useDispatch();
  const { control, handleSubmit, watch, setValue, reset, register } = useForm({
    resolver: yupResolver(
      yup.object({
        ip: yup.array(),
      })
    ),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ip",
  });
  const [stores, setStores] = useState();
  const [store, setStore] = useState();
  const [listChannels, setListChannels] = useState();
  const ip = watch("ip");

  const funcGetStoreInfo = async (store) => {
    if (store) {
      let listData = await axiosClient.post(API_GET_STORE, {
        search: store,
      });

      return listData?.data?.object?.data?.map((item) => ({
        label: item?.storeName,
        value: item?.id,
      }));
    } else {
      return stores;
    }
  };

  useEffect(() => {
    reset({
      ip: [
        {
          storeId: "",
          port: "",
          channelNumber: "",
          listPorts: [],
          listChannels: [],
        },
      ],
    });
    dispatch(getStores({})).then((res) => {
      if (res?.payload) {
        let listOptions = res?.payload?.data?.map((item, idx) => ({
          label: item?.storeName,
          value: item?.id,
        }));

        setStores(listOptions);
      }
    });
  }, []);

  return (
    <DataDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add Channel to Slide"
      width={"1200px"}
      footer={
        <div className="flex w-full justify-end">
          <CusBtn
            onClick={handleSubmit((e) => {
              let dataSubmit = {
                id: data?.id,
                items: e?.ip?.map((value, index) => ({
                  channelNumber: value?.channelNumber,
                  port: value?.port,
                  storeId: parseInt(value?.storeId),
                })),
              };
              console.log("dataSubmit", dataSubmit);
              dispatch(addCameraSliderItem(dataSubmit)).then((res) => {
                if (res?.payload) {
                  toast.success("Item has been added", {
                    description: moment().format("YYYY/MM/DD hh:mm:ss"),
                    action: {
                      label: "Undo",
                      onClick: () => console.log("Undo"),
                    },
                  });
                  setIsLoading(true);
                  setOpen(false);
                  setShowParent(false);
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
            title={
              <>
                <Save /> Save
              </>
            }
          />
        </div>
      }
    >
      <Form {...form}>
        {fields.map((item, index) => (
          <div className="flex justify-between items-end">
            <Controller
              render={({ field }) => (
                <div className="flex flex-col">
                  {index == 0 && <FormLabel>Store</FormLabel>}
                  <DebounceSelect
                    className="w-[300px]"
                    {...field}
                    showSearch
                    fetchOptions={funcGetStoreInfo}
                    listOptions={stores}
                    debounceTimeout={400}
                    value={store}
                    onChange={(e) => {
                      let storeId = e?.split("-")[0];
                      field.onChange(storeId);

                      dispatch(
                        getCameraChannel({
                          storeId: storeId,
                        })
                      ).then((res) => {
                        if (res?.payload) {
                          console.log("listPorts", res?.payload);
                          //   setListChannels(res?.payload);
                          let listDevices = res?.payload[0]?.devices;
                          if (listDevices?.length > 0) {
                            setValue(
                              `ip.${index}.listPorts`,
                              res?.payload[0]?.devices
                            );
                          }
                        }
                      });
                    }}
                    key="users"
                  />
                </div>
              )}
              name={`ip.${index}.storeId`}
              control={control}
            />
            <Controller
              control={control}
              name={`ip.${index}.port`}
              render={({ field }) => (
                <div className="flex flex-col">
                  {index == 0 && <FormLabel>Port</FormLabel>}
                  <DataSelect
                    options={ip[index]?.listPorts?.map((port, index) => ({
                      label: port?.name,
                      value: port?.port,
                    }))}
                    onChange={(e) => {
                      field.onChange(e);
                      let listChannels = ip[index]?.listPorts?.find(
                        (i) => i?.port == e
                      );

                      setValue(
                        `ip.${index}.listChannels`,
                        listChannels?.channel
                      );
                    }}
                  ></DataSelect>
                </div>
              )}
            />
            <Controller
              control={control}
              name={`ip.${index}.channelNumber`}
              render={({ field }) => (
                <div className="flex flex-col">
                  {index == 0 && <FormLabel>Channel Number</FormLabel>}
                  <DataSelect
                    options={ip[index]?.listChannels?.map((channel, i) => ({
                      label: channel,
                      value: channel,
                    }))}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </div>
              )}
            />

            {index == 0 ? (
              <CusBtn
                onClick={() => {
                  append({
                    storeId: "",
                    port: "",
                    channelNumber: "",
                  });
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
        ))}
      </Form>
    </DataDialog>
  );
};

export default ModalAddChannel;
