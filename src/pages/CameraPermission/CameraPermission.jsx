import React, { useEffect, useState } from "react";
import {
  getCameraPermission,
  getListPosition,
  removeAreaRole,
} from "./cameraPermissionSlice";
import { useDispatch } from "react-redux";
import DataTable from "@/components/data-table";
import CustomTabs from "@/components/tabs";
import "./style.scss";

import CusBtn from "@/custom/CusBtn";

import { Import, Plus, SearchIcon, Trash } from "lucide-react";
import {
  getListDepartment,
  getListRoleUser,
  getListRoleArea,
} from "./cameraPermissionSlice";
import SelectSearch from "@/components/select-search";
import AddCameraPermission from "./Dialog/AddCameraPermission";
import DebounceSelect from "@/components/debounce-select";
import {
  getAdminUsers,
  getOrganizations,
  getStores,
} from "../StoreManager/storeManagerSlice";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import { API_GET_ADMIN_USER, API_GET_STORE } from "@/constant/api";
import axiosClient from "@/api/axiosClient";
import AddRoleUser from "./Dialog/AddRoleUser";
import { getAreas } from "../StoreManager/storeManagerSlice";
import AddRoleArea from "./Dialog/AddRoleArea";
import Confirm from "@/components/confirm";
const CameraPermission = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [listDepartments, setListDepartments] = useState();
  const [listPositions, setListPositions] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showAddArea, setShowAddArea] = useState(false);
  const [tab, setTab] = useState();
  const [listRoleUser, setListRoleUser] = useState();
  const [listRoleArea, setListRoleArea] = useState();
  const [listOptionsUser, setListOptionsUser] = useState();
  const [listOptionsStore, setListOptionsStore] = useState();
  const [listOptionsUserAdd, setListOptionsUserAdd] = useState();
  const [listAreas, setListAreas] = useState();
  const [rowSelection, setRowSelection] = useState();
  const [area, setArea] = useState();
  const [organization, setOrganization] = useState();
  const [listOrganization, setListOrganization] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [paginationUser, setPaginationUser] = useState({
    pageIndex: 1,
    pageSize: 20,
  });
  const [paginationStore, setPaginationStore] = useState({
    pageIndex: 1,
    pageSize: 20,
  });

  const [paginationArea, setPaginationArea] = useState({
    pageIndex: 1,
    pageSize: 20,
  });
  const [showAddUser, setShowAddUser] = useState(false);
  const [store, setStore] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();
  const funcGetUserInfo = async (user) => {
    if (user) {
      let listData = await axiosClient.post(API_GET_ADMIN_USER, {
        search: user,
      });
      return listData?.data?.object?.data?.map((item) => ({
        label: item?.fullUsername,
        value: item?.id,
      }));
    } else {
      return listOptionsUser;
    }
  };
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
      return listOptionsStore;
    }
  };
  const handleSearchUser = () => {
    setLoading(true);
    let dataSubmit = {
      searchUserId: user,
      searchStoreId: store,
      pagination: paginationUser,
    };
    console.log("Datasubmit user tab", dataSubmit);
    dispatch(getListRoleUser(dataSubmit)).then((res) => {
      setListRoleUser(res?.payload);
      setLoading(false);
    });
  };
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
      header: "Department Name",
      accessorKey: "departmentName",
    },
    {
      header: "Position",
      accessorKey: "positionName",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Description",
      accessorKey: "roleDescription",
    },
    {
      header: "Expired At",
      accessorKey: "expiredAt",
      cell: ({ row }) => {
        return row.getValue("expiredAt")
          ? moment(row.getValue("expiredAt")).format("DD/MM/YYYY HH:mm:ss")
          : "";
      },
    },
  ];
  const columnsUser = [
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
      header: "User Id",
      accessorKey: "username",
    },
    {
      header: "User Name",
      accessorKey: "fullName",
    },
    {
      header: "Store",
      accessorKey: "storeName",
      cell: ({ row }) => {
        console.log(row.original);
        return row.original?.storeId + " - " + row.original?.storeName;
      },
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Role Description",
      accessorKey: "roleDescription",
    },
  ];
  const columnsArea = [
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
      cell: ({ row }) => {
        console.log("row TEST", row.getIsSelected());
        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              return row.toggleSelected(!!value);
            }}
            aria-label="Select row"
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "User Name",
      accessorKey: "username",
    },
    {
      header: "Area",
      accessorKey: "areaName",
    },
    {
      header: "Organization",
      accessorKey: "organization.name",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Role Description",
      accessorKey: "roleDescription",
    },
    {
      header: "Expired At",
      accessorKey: "expiredAt",
      cell: ({ row }) =>
        row.getValue("expiredAt")
          ? moment(row.getValue("expiredAt")).format("YYYY-MM-DD HH:mm:ss")
          : "",
    },
  ];
  useEffect(() => {
    dispatch(getCameraPermission({})).then((res) => {
      setData(res?.payload);
    });
    dispatch(getListDepartment({})).then((res) => {
      let newFormat = res?.payload?.map((item) => ({
        label: item?.DEPARTMENTNAME,
        value: item?.DEPARTMENTID,
      }));
      setListDepartments(newFormat);
    });
    dispatch(getListPosition({})).then((res) => {
      let newFormat = res?.payload?.map((item, index) => ({
        label: item?.POSITIONNAME,
        value: item?.POSITIONID,
      }));
      setListPositions(newFormat);
    });
    dispatch(getAreas({})).then((res) => {
      let newFormat = res?.payload?.map((item) => ({
        label: item?.areaName,
        value: item?.id,
      }));
      setListAreas(newFormat);
    });
    dispatch(getAdminUsers({})).then((res) => {
      let listOptions = res?.payload?.data?.map((item) => ({
        label: item?.fullUsername,
        value: item?.id,
      }));
      let listOptionsAdd = res?.payload?.data?.map((item) => ({
        label: item?.fullUsername,
        value: item?.username,
      }));
      setListOptionsUserAdd(listOptionsAdd);
      setListOptionsUser(listOptions);
    });
    dispatch(getStores({})).then((res) => {
      let listOptions = res?.payload?.data?.map((item) => ({
        label: item?.storeName,
        value: item?.id,
      }));
      setListOptionsStore(listOptions);
    });
    dispatch(getOrganizations({})).then((res) => {
      let newFormat = res?.payload?.map((item) => ({
        label: item?.name,
        value: item?.id,
      }));
      setListOrganization(newFormat);
    });
  }, []);

  useEffect(() => {
    if (loading) {
      if (tab == "Departments") {
      } else if (tab == "Users") {
        dispatch(
          getListRoleUser({
            searchUserId: user,
            searchStoreId: store,
            pagination: paginationUser,
          })
        ).then((res) => {
          setListRoleUser(res?.payload);
          setLoading(false);
        });
      } else if (tab == "Areas") {
        dispatch(
          getListRoleArea({
            searchAreaId: "",
            searchOrgId: "",
            searchUserId: "",
            pagination: paginationArea,
          })
        ).then((res) => {
          let newFormat = {
            ...res?.payload,
            data: res?.payload?.data?.map((item) => ({
              ...item,
              key: item?.id,
            })),
          };
          console.log("newFormat", newFormat);
          setListRoleArea(newFormat);
          setLoading(false);
        });
      }
    }
    // setLoading(false);
  }, [tab, loading]);
  console.log("listRoleArea", listRoleArea?.data);
  return (
    <div>
      <CustomTabs
        value={tab}
        setValue={setTab}
        defaultValue="Departments"
        onValueChange={(e) => {
          console.log("tabs", e);
          setTab(e);
          setLoading(true);
        }}
        items={[
          {
            key: "Departments",
            label: "Departments",
            children: (
              <div className="">
                <div className="flex gap-2 mb-2">
                  <SelectSearch
                    options={listDepartments}
                    placeholder="Department Name"
                  />
                  <SelectSearch
                    options={listPositions}
                    placeholder="Department Name"
                  />
                  <CusBtn
                    title={
                      <>
                        <SearchIcon />
                        Search
                      </>
                    }
                  />
                  <CusBtn
                    onClick={() => {
                      setShowAdd(true);
                    }}
                    title={
                      <>
                        <Plus />
                        Add
                      </>
                    }
                  />
                  <CusBtn
                    variant="destructive"
                    title={
                      <>
                        <Trash /> Delete
                      </>
                    }
                  />
                </div>
                {data?.data?.length > 0 && (
                  <DataTable columns={columns} data={data?.data} />
                )}
              </div>
            ),
          },
          {
            key: "Users",
            label: "Users",
            children: (
              <div>
                <div className="flex gap-2 items-center w-full flex-wrap">
                  <DebounceSelect
                    showSearch
                    placeholder="User"
                    fetchOptions={funcGetUserInfo}
                    listOptions={listOptionsUser}
                    value={user}
                    setValue={setUser}
                    key="users"
                  />
                  <DebounceSelect
                    showSearch
                    listOptions={listOptionsStore}
                    value={store}
                    setValue={setStore}
                    placeholder="Store"
                    fetchOptions={funcGetStoreInfo}
                  />
                  <CusBtn
                    onClick={() => {
                      setLoading(true);
                    }}
                    title={
                      <>
                        <SearchIcon /> Search
                      </>
                    }
                  />
                  <CusBtn
                    onClick={() => {
                      setShowAddUser(true);
                    }}
                    title={
                      <>
                        <Plus /> Add
                      </>
                    }
                  />
                  <CusBtn
                    title={
                      <>
                        <Import /> Import
                      </>
                    }
                  />
                  <CusBtn
                    title={
                      <>
                        <Trash /> Delete
                      </>
                    }
                    variant="destructive"
                  />
                </div>
                {listRoleUser?.data?.length > 0 && (
                  <div className="mt-2">
                    <DataTable
                      data={listRoleUser?.data}
                      columns={columnsUser}
                      loading={loading}
                    />
                  </div>
                )}
              </div>
            ),
          },
          {
            key: "Areas",
            label: "Areas",
            children: (
              <div>
                <div className="flex gap-2 items-center w-full flex-wrap">
                  <DebounceSelect
                    showSearch
                    placeholder="User"
                    fetchOptions={funcGetUserInfo}
                    listOptions={listOptionsUser}
                    value={user}
                    setValue={setUser}
                    key="users"
                  />
                  <SelectSearch
                    value={area}
                    setValue={setArea}
                    options={listAreas}
                    placeholder="Area"
                  />
                  <SelectSearch
                    value={organization}
                    setValue={setOrganization}
                    options={listOrganization}
                    placeholder="Organization"
                  />
                  <CusBtn
                    onClick={() => {
                      setLoading(true);
                    }}
                    title={
                      <>
                        <SearchIcon /> Search
                      </>
                    }
                  />
                  <CusBtn
                    onClick={() => {
                      setShowAddArea(true);
                    }}
                    title={
                      <>
                        <Plus /> Add
                      </>
                    }
                  />
                  <CusBtn
                    title={
                      <>
                        <Import /> Import
                      </>
                    }
                  />
                  <CusBtn
                    title={
                      <>
                        <Trash /> Delete
                      </>
                    }
                    variant="destructive"
                    onClick={(e) => {
                      setShowConfirm(true);
                    }}
                  />
                </div>
                {listRoleArea?.data?.length > 0 && (
                  <div className="mt-2">
                    <DataTable
                      loading={loading}
                      showSelection
                      rowSelectionEnable={rowSelection}
                      setRowSelectionEnable={setRowSelection}
                      columns={columnsArea}
                      data={listRoleArea?.data}
                    />
                  </div>
                )}
              </div>
            ),
          },
        ]}
      />
      {showAdd && (
        <AddCameraPermission
          open={showAdd}
          setOpen={setShowAdd}
          onOpenChange={() => {
            setShowAdd(!showAdd);
          }}
          listDepartments={listDepartments}
          listOptions={listPositions}
        />
      )}
      {showAddUser && (
        <AddRoleUser
          open={showAddUser}
          setOpen={setShowAddUser}
          onOpenChange={() => {
            setShowAddUser(!showAddUser);
          }}
          listOptionsUser={listOptionsUserAdd}
          listOptionsStore={listOptionsStore}
          setLoading={setLoading}
        />
      )}
      {showAddArea && (
        <AddRoleArea
          open={showAddArea}
          setOpen={setShowAddArea}
          onOpenChange={() => {
            setShowAddArea(!showAddArea);
          }}
          listAreas={listAreas}
          listOrganizations={listOrganization}
          listOptionsUser={listOptionsUserAdd}
          setLoading={setLoading}
        />
      )}
      {showConfirm && (
        <Confirm
          open={showConfirm}
          onOpenChange={(e) => {
            setShowConfirm(false);
          }}
          setOpen={setShowConfirm}
          onConfirm={() => {
            let dataSubmit = rowSelection?.map((item) => item?.id);
            console.log("abcx", dataSubmit);

            dispatch(removeAreaRole({ ids: dataSubmit })).then((res) => {
              if (res?.payload) {
                setListRoleArea();
                setLoading(true);
                setShowConfirm(false);
              }
            });
          }}
        />
      )}
    </div>
  );
};

export default CameraPermission;
