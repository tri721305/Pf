import DataDialog from "@/components/dialog";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Select } from "@/components/ui/select";
import DataSelect from "@/components/select";
import DebounceSelect from "@/components/debounce-select";
import { useDispatch } from "react-redux";
import { getAdminUsers } from "@/pages/StoreManager/storeManagerSlice";
import CusBtn from "@/custom/CusBtn";
import { Save } from "lucide-react";
const AssignUser = ({ open, setOpen, onOpenChange, listArea }) => {
  const form = useForm();
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [listOptionsUser, setListOptionsUser] = useState();
  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(
      yup.object({
        id: yup.number(),
        listUsers: yup.array(),
      })
    ),
  });

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
      //   return listData?.data?.object?.data?.map((item) => ({
      //     label: item?.fullUsername,
      //     value: item?.y,
      //   }));
    } else {
      return listOptionsUser;
    }
  };
  useEffect(() => {
    dispatch(getAdminUsers({})).then((res) => {
      let listOptionsAdd = res?.payload?.data?.map((item) => ({
        label: item?.fullUsername,
        value: item?.username,
      }));
      setListOptionsUser(listOptionsAdd);
    });
  }, []);
  console.log("optiuons", listOptionsUser, listArea);
  return (
    <DataDialog
      title="Assign User"
      open={open}
      setOpen={setOpen}
      onOpenChange={onOpenChange}
      width="500px"
      footer={
        <div className="flex w-full justify-end">
          <CusBtn
            onClick={(e) => {
              let datasubmit = {
                a: "s",
              };
              console.log("datasubmit");
            }}
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
        <Controller
          name="id"
          control={control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Area</FormLabel>
                {/* <Input {...field} placeholder="Serial Number" /> */}
                <DataSelect
                  options={listArea?.map((item) => ({
                    label: item?.areaName,
                    value: item?.id,
                  }))}
                  placeholder="Area"
                ></DataSelect>
              </FormItem>
            );
          }}
        />
        <Controller
          name="listUsers"
          control={control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>User(s)</FormLabel>
                <DebounceSelect
                  showSearch
                  placeholder="User"
                  fetchOptions={funcGetUserInfo}
                  listOptions={listOptionsUser}
                  multiple={true}
                  value={user}
                  setValue={setUser}
                  key="users"
                />
              </FormItem>
            );
          }}
        />
      </Form>
    </DataDialog>
  );
};

export default AssignUser;
