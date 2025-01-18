import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/main-typography";
import moment from "moment";
import { useTheme } from "@/components/theme-provider";
const SystemInfo = (props) => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col gap-1 ">
      <div className="flex items-center p-2">
        <Label className="flex-1">Status</Label>
        <Badge
          className={`flex-1 justify-center items-center font-bold ${
            props?.status == "online" ? "bg-green-500 " : "bg-red-500"
          }`}
        >
          {props?.status == "online" ? "Online" : "Offline"}
        </Badge>
      </div>
      <div
        className={`flex items-start p-2 ${
          theme == "dark" ? "bg-[#18181b]" : "bg-[#f3f3f3]"
        } `}
      >
        <Label className="flex-1">Name</Label>
        <Typography className="flex-1">{props?.hostName}</Typography>
      </div>
      <div className="flex items-start p-2">
        <Label className="flex-1">System</Label>
        <div className="flex-1">
          <Typography className="flex-1">
            {props?.systemStatus?.system_platform}
          </Typography>
          <Typography className="flex-1">
            Netgate Id {props?.systemStatus?.system_netgate_id}
          </Typography>
          <Typography className="flex-1">
            Arch {props?.systemStatus?.system_arch}
          </Typography>
        </div>
      </div>
      <div
        className={`flex items-start p-2 ${
          theme == "dark" ? "bg-[#18181b]" : "bg-[#f3f3f3]"
        } `}
      >
        <Label className="flex-1">DNS Server</Label>
        <div className="flex-1">
          {props?.systemStatus?.dns_server?.map((item, index) => (
            <Typography id="index">{item}</Typography>
          ))}
        </div>
      </div>
      <div className="flex items-start p-2 ">
        <Label className="flex-1">Bios</Label>
        <div className="flex-1">
          <Typography>{props?.systemStatus?.bios_vendor}</Typography>
          <Typography>{props?.systemStatus?.bios_version}</Typography>

          <Typography>{props?.systemStatus?.bios_date}</Typography>
        </div>
      </div>
      <div
        className={`flex items-start p-2 ${
          theme == "dark" ? "bg-[#18181b]" : "bg-[#f3f3f3]"
        } `}
      >
        <Label className="flex-1">Version</Label>
        <Typography className="flex-1">{props?.version}</Typography>
      </div>
      <div className="flex items-start p-2">
        <Label className="flex-1">Uptime</Label>
        <Typography className="flex-1">{props?.uptime}</Typography>
      </div>
      <div
        className={`flex items-start p-2 ${
          theme == "dark" ? "bg-[#18181b]" : "bg-[#f3f3f3]"
        } `}
      >
        <Label className="flex-1">Update Time</Label>
        <Typography className="flex-1">
          {moment(new Date(props?.updateTime)).fromNow()}
        </Typography>
      </div>
      <div className="flex items-start p-2">
        <Label className="flex-1">Load average</Label>
        <Typography className="flex-1">
          {props?.systemStatus?.load_avg?.map((item) => item + " ")}
        </Typography>
      </div>
      <div
        className={`flex items-start p-2 ${
          theme == "dark" ? "bg-[#18181b]" : "bg-[#f3f3f3]"
        } `}
      >
        <Label className="flex-1">Controller version</Label>
        <Typography className="flex-1">
          {props?.systemStatus?.mwg_controller_version}
        </Typography>
      </div>
    </div>
  );
};

export default SystemInfo;
