import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAdminUsers } from "@/pages/StoreManager/storeManagerSlice";
import DebounceSelect from "./debounce-select";
const DebounceSelectUser = ({ value, setValue }) => {
  const dispatch = useDispatch();
  const [listOptionsUser, setListOptionsUser] = useState();
  // const [user, setUser] = useState();
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
  useEffect(() => {
    dispatch(getAdminUsers({})).then((res) => {
      let options = res?.payload?.data?.map((item, index) => ({
        label: item?.fullUsername,
        value: item?.username,
      }));
      setListOptionsUser(options);
    });
  }, []);
  return (
    <div>
      <DebounceSelect
        showSearch
        placeholder="User"
        fetchOptions={funcGetUserInfo}
        listOptions={listOptionsUser}
        // multiple={true}
        value={value}
        setValue={setValue}
        key="users"
      />
    </div>
  );
};

export default DebounceSelectUser;
