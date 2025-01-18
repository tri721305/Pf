import React, { useEffect, useState } from "react";
import { Search } from "@/components/search";
import DataComboBox from "@/components/combobox";
import { LoadingSpinner } from "@/components/spin";
import DebounceSelect from "@/components/debounce-select";
import {
  getAdminUsers,
  getStores,
  getAreas,
  getStoreDetails,
} from "./storeManagerSlice";
import { useDispatch } from "react-redux";
import axiosClient from "@/api/axiosClient";
import { API_GET_ADMIN_USER } from "@/constant/api";
import DataSelect from "@/components/select";
import CusBtn from "@/custom/CusBtn";
import { Button } from "@/components/custom/button";
import { Camera, Import, Plus, SearchIcon } from "lucide-react";
import DataTable from "@/components/data-table";
import Typography from "@/components/main-typography";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "@/components/data-table-actions";
import DataDialog from "@/components/dialog";
import Confirm from "@/components/confirm";
import StoreDialog from "./StoreDialog";
const StoreManager = () => {
  const dispatch = useDispatch();
  const [listAdmin, setListAdmin] = useState();
  const [userOptions, setUserOptions] = useState();
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState();
  const [area, setArea] = useState();
  const [listArea, setListArea] = useState();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState();
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  const [selectedStore, setSelectedStore] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const columns = [
    {
      accessorKey: "storeName",
      header: "Store",
      cell: ({ row }) => {
        return (
          <Typography limit={30} className="font-bold">
            {row.getValue("storeName")}
          </Typography>
        );
      },
    },
    {
      accessorKey: "area",
      header: "Area",
      cell: ({ row }) => {
        return (
          <Typography className="font-bold">
            {row.getValue("area")?.areaName}
          </Typography>
        );
      },
    },
    {
      accessorKey: "user",
      header: "Manager",
      cell: ({ row }) => {
        return (
          <Typography className="font-bold">
            {row.getValue("user")?.fullUsername}
          </Typography>
        );
      },
    },
    {
      accessorKey: "userDeputy",
      header: "Deputy",
      cell: ({ row }) => {
        return (
          <Typography className="font-bold">
            {row.getValue("userDeputy")?.fullUsername}
          </Typography>
        );
      },
    },
    {
      accessorKey: "userHead",
      header: "Leader",
      cell: ({ row }) => {
        return (
          <Typography className="font-bold">
            {row.getValue("userHead")?.fullUsername}
          </Typography>
        );
      },
    },
    {
      accessorKey: "userDeputyDepartment",
      header: "Deputy Department",
      cell: ({ row }) => {
        return (
          <Typography className="font-bold">
            {row.getValue("userDeputyDepartment")?.fullUsername}
          </Typography>
        );
      },
    },
    {
      accessorKey: "organization",
      header: "Organization",
      cell: ({ row }) => {
        return (
          <Typography className="font-bold">
            {row.getValue("organization")?.name}
          </Typography>
        );
      },
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => {
        return (
          <Badge
            className={` font-bold ${
              row.getValue("active") == true ? "bg-green-500 " : "bg-red-500"
            }`}
          >
            {row.getValue("active") == true ? "ONLINE" : "OFFLINE"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onEdit={() => {
            let storeId = row.getValue("storeName")?.split("-")[0]?.trim();
            setSelectedStore(storeId);
            setShowEdit(true);
          }}
          onDelete={() => {
            let storeId = row.getValue("storeName")?.split("-")[0];
            setSelectedStore(storeId);
            setShowConfirm(true);
          }}
        />
      ),
    },
  ];
  const funcGetAdminInfo = (user) => {
    if (user) {
      dispatch(getAdminUsers({ search: "62485" })).then((res) => {
        return res?.payload?.data?.map((item) => ({
          label: item?.fullUsername,
          value: item?.username,
        }));
      });
    } else {
      return userOptions;
    }
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
  funcGetUserInfo();
  useEffect(() => {
    dispatch(getAdminUsers({})).then((res) => {
      let listOpt = res?.payload?.data?.map((vl, index) => {
        return { label: vl?.fullUsername, value: vl?.username };
      });
      setUserOptions(listOpt);
      setListAdmin(res?.payload);
    });
    dispatch(getAreas({})).then((res) => {
      let newFormat = res?.payload?.map((item, index) => ({
        label: item?.areaName,
        value: item?.id,
      }));
      setListArea(newFormat);
    });
  }, []);
  useEffect(() => {
    if (loading) {
      dispatch(
        getStores({
          areaId: area,
          nonArea: false,
          nonUser: false,
          pagination: pagination,
          search: search,
        })
      ).then((res) => {
        setDataTable(res?.payload);
        setLoading(false);
      });
    }
  }, [loading]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 ">
        {userOptions && (
          <DebounceSelect
            showSearch
            placeholder="User Manager"
            fetchOptions={funcGetUserInfo}
            listOptions={userOptions}
            onChange={(newValue) => {
              let val = newValue?.split("-")[0];
              setUser(val);
            }}
            key="users"
          />
        )}
        <DataSelect options={listArea} placeholder="Select Area" />
        <DataSelect
          options={[
            { label: "Siêu thị chưa gán IT phụ trách", value: 1 },
            {
              label: "Tất cả",
              value: 2,
            },
          ]}
          placeholder="IT State"
        />
        <DataSelect
          options={[
            {
              label: "Siêu thị chưa gán miền",
              value: 1,
            },
            {
              label: "Tất cả",
              value: 2,
            },
          ]}
          placeholder="Area State"
        />
        <Search
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <CusBtn
          title={
            <>
              <SearchIcon /> Search
            </>
          }
          onClick={() => {
            setLoading(true);
          }}
        />
      </div>
      <div className="flex gap-1">
        <CusBtn
          title={
            <>
              <Plus /> Add
            </>
          }
        />
        <CusBtn
          title={
            <>
              <Import /> Import Users
            </>
          }
        />
        <CusBtn
          title={
            <>
              <Camera /> Update Password Camera
            </>
          }
        />
      </div>
      {dataTable?.data?.length > 0 && (
        <div>
          <DataTable
            columns={columns}
            data={dataTable?.data}
            pagination={{
              pageIndex: pagination.pageIndex,
              pageSize: pagination.pageSize,
              totalPages: dataTable?.recordsTotal,
              onPageChange: (pageNumber) => {
                setPagination((prev) => ({ ...prev, pageIndex: pageNumber }));
                setLoading(true);
              },
            }}
          />
        </div>
      )}
      {showEdit && (
        <StoreDialog
          open={showEdit}
          onOpenChange={() => {
            setShowEdit(!showEdit);
          }}
          data={selectedStore}
        ></StoreDialog>
      )}
      {showConfirm && (
        <Confirm
          open={showConfirm}
          onOpenChange={() => {
            setShowConfirm(!showConfirm);
          }}
        />
      )}
    </div>
  );
};

export default StoreManager;
