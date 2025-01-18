import React, { useState, useEffect } from "react";
import CustomTabs from "@/components/tabs";
import { useDispatch } from "react-redux";
import { getOrgPort } from "./portManagerSlice";
import { getOrganizations } from "../StoreManager/storeManagerSlice";
import DataTable from "@/components/data-table";
import CusBtn from "@/custom/CusBtn";
import { Edit, Plus } from "lucide-react";
import DetailDialog from "./Dialog/DetailDialog";
const PortManager = () => {
  const [tab, setTab] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [listOrganizations, setListOrganizations] = useState();
  const [listPorts, setListPorts] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const [selectedTab, setSelectedTab] = useState();
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    dispatch(getOrganizations({})).then((res) => {
      setListOrganizations(res?.payload);
    });
  }, []);

  useEffect(() => {
    if (loading) {
      dispatch(getOrgPort({})).then((res) => {
        setListPorts(res?.payload);
        setLoading(false);
      });
    }
  }, [loading]);
  const columns = [
    {
      header: "Port",
      accessorKey: "port",
      id: "port",
      key: "port",
    },
    {
      header: "Name",
      accessorKey: "name",
      id: "name",
      key: "name",
    },
    {
      header: " Port Type",
      accessorKey: "portType",
      id: "portType",
      key: "portType",
    },
    {
      key: "actions",
      id: "actions",

      cell: (data, record) => {
        return (
          <div className="flex gap-1 justify-center">
            <CusBtn
              title={
                <>
                  <Edit />
                </>
              }
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="relative">
      <div className="absolute right-0">
        <CusBtn
          onClick={() => {
            setSelectedRow();
            setShowDialog(true);
          }}
          title={
            <>
              <Plus />
              Add
            </>
          }
        />
      </div>
      <div>
        <CustomTabs
          value={tab}
          setValue={setTab}
          defaultValue="Departments"
          onValueChange={(e) => {
            setTab(e);
          }}
          items={listOrganizations?.map((item, index) => {
            let dataTable = listPorts?.find((i) => i.name == item.name);
            return {
              label: item?.name.toUpperCase(),
              key: item?.id,
              children: (
                <div className="tab-users">
                  <div className="">
                    <div className="role-table rounded-md   shadow-lg pb-0 bg-[white]">
                      <DataTable
                        id={item}
                        className="role__manager"
                        columns={columns}
                        onRowClick={(e) => {
                          setSelectedRow(e?.original);
                          setShowDialog(true);
                        }}
                        data={
                          dataTable?.ports?.length > 0 ? dataTable?.ports : []
                        }
                      />
                    </div>
                  </div>
                </div>
              ),
            };
          })}
        />
      </div>
      {showDialog && (
        <DetailDialog
          open={showDialog}
          setOpen={setShowDialog}
          onOpenChange={() => {
            setShowDialog(false);
          }}
          listOrg={listOrganizations}
          data={selectedRow}
          tab={tab}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default PortManager;
