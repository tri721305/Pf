import React, { useEffect, useState } from "react";
import { Search } from "@/components/search";
import CusBtn from "@/custom/CusBtn";
import { Edit, Plus, SearchIcon } from "lucide-react";
import {
  getSlideCamera,
  getListGroup,
  getListPositions,
} from "./slideCameraSlice";
import { useDispatch } from "react-redux";
import DataTable from "@/components/data-table";
import Typography from "@/components/main-typography";
import CardChart from "../Dashboard/CardChart";
import DataSelect from "@/components/select";
import AddSlideDialog from "./AddSlideDialog";
import TotalChannel from "./TotalChannel";
import DetailGroupDialog from "./DetailGroupDialog";
const SlideCamera = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [listGroups, setListGroups] = useState();
  const [group, setGroup] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [showGroup, setShowGroup] = useState(false);
  const [showModalItems, setShowModalItems] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Group Name",
      accessorKey: "groupName",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Total Items",
      accessorKey: "items",
      cell: ({ row }) => {
        return (
          <>
            <CusBtn
              className="min-w-[120px]"
              title={`${row.getValue("items")?.length} Items`}
              onClick={(e) => {
                console.log("Click", row);
                setSelectedItem(row?.original);
                setShowModalItems(true);
              }}
            />
          </>
        );
      },
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
    },
    {
      header: "Updated At",
      accessorKey: "updatedAt",
    },
  ];
  const columnsGroup = [
    {
      header: "Group Name",
      accessorKey: "group",
    },
    {
      id: "Actions",
      width: "60px",
      cell: ({ row }) => {
        return (
          <div>
            <CusBtn
              onClick={() => {
                setSelectedGroup(row.getValue("group"));
                setShowGroup(true);
              }}
              title={<Edit />}
            />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getListGroup({})).then((res) => {
      if (res?.payload) {
        let newFormat = res?.payload?.map((item) => ({ group: item }));
        setListGroups(newFormat);
      }
    });
    console.log("ajskdnaksjdh ");
  }, []);
  useEffect(() => {
    if (isLoading) {
      dispatch(
        getSlideCamera({
          groupName: group,
        })
      ).then((res) => {
        setData(res?.payload);
        setIsLoading(false);
      });
    }
  }, [isLoading]);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <DataSelect
          options={listGroups?.map((group, index) => {
            return { label: group?.group, value: group?.group };
          })}
          placeholder="Select Group"
          className="max-w-[20%]"
          onChange={(e) => {
            setGroup(e);
          }}
        />
        <CusBtn
          title={
            <>
              <SearchIcon />
              Search
            </>
          }
          onClick={() => {
            setIsLoading(true);
          }}
        />
        <CusBtn
          title={
            <>
              <Plus /> Add
            </>
          }
          onClick={() => {
            setShowAdd(true);
          }}
        />
      </div>
      <div className="flex gap-2 mt-2">
        {data?.length > 0 && (
          <CardChart className="w-[70%]" isShowDate={false}>
            <DataTable
              loading={isLoading}
              columns={columns}
              pagination={true}
              data={data}
            />
          </CardChart>
        )}
        {listGroups?.length > 0 && (
          <CardChart className="flex-1" isShowDate={false}>
            <DataTable
              columns={columnsGroup}
              pagination={true}
              data={listGroups}
            />
          </CardChart>
        )}
        {showAdd && (
          <AddSlideDialog
            open={showAdd}
            listGroups={listGroups}
            setListGroups={setListGroups}
            title="Add Slide Camera"
            onOpenChange={() => {
              setShowAdd(!showAdd);
            }}
          />
        )}
        {showModalItems && (
          <TotalChannel
            open={showModalItems}
            data={selectedItem}
            onOpenChange={() => {
              setShowModalItems(!showModalItems);
            }}
            setIsLoading={setIsLoading}
            setOpen={setShowModalItems}
          />
        )}
        {showGroup && (
          <DetailGroupDialog
            open={showGroup}
            setOpen={setShowGroup}
            onOpenChange={() => {
              setShowGroup(!showGroup);
            }}
            data={selectedGroup}
          />
        )}
      </div>
    </div>
  );
};

export default SlideCamera;
