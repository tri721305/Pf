import React from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Inbox,
  Search,
  Settings,
  LayoutDashboard,
  HdmiPort,
  Store,
  SlidersHorizontalIcon,
  Camera,
  Package,
  Monitor,
  Terminal,
  History,
  Redo,
  Cable,
  LandPlot,
  Boxes,
  PencilRuler,
  User,
  Aperture,
  UserPen,
  SquareStack,
} from "lucide-react";
import { useParams } from "react-router";
import { ScrollArea } from "@/components/ui/scroll-area";
// import useCheckActiveNav from "@/hooks/use-check-active";
import logo from "@/assets/images/logo.png";
import logo1 from "@/assets/images/logo1.png";
const CusSidebar = () => {
  // const { checkActiveNav } = useCheckActiveNav();

  const itemsMenu = [
    {
      groupName: "",
      children: [
        {
          title: "Dashboard",
          url: "dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Port Monitor",
          url: "portmonitor",
          icon: HdmiPort,
        },
      ],
    },
    {
      groupName: "Admin Manager",
      children: [
        {
          title: "Store Manager",
          url: "storemanager",
          icon: Store,
        },
        {
          title: "Slide Manager",
          url: "slide",
          icon: SlidersHorizontalIcon,
        },
        {
          title: "Camera Permission",
          url: "camera",
          icon: Camera,
        },
        {
          title: "Package Manager",
          url: "package",
          icon: Package,
        },
        {
          title: "Port Manager",
          url: "portmanager",
          icon: Cable,
        },
        {
          title: "Area Manager",
          url: "areamanager",
          icon: LandPlot,
        },
        {
          title: "Group Manager",
          url: "groupmanager",
          icon: Boxes,
        },
        {
          title: "Role Manager",
          url: "rolemanager",
          icon: PencilRuler,
        },
        {
          title: "User Manager",
          url: "usermanager",
          icon: User,
        },
        {
          title: "UnixService Manager",
          url: "unixservicemanager",
          icon: Aperture,
        },
        {
          title: "Batch Command",
          url: "batchcommand",
          icon: SquareStack,
        },
        {
          title: "Report",
          url: "report",
          icon: UserPen,
        },
      ],
    },
    {
      groupName: "Remote",
      children: [
        {
          title: "VNC",
          url: "vnc",
          icon: Monitor,
        },
        {
          title: "SSH",
          url: "ssh",
          icon: Terminal,
        },
        {
          title: "Remote History",
          url: "remotehistory",
          icon: History,
        },
        {
          title: "Quick Login History",
          url: "quickloginhistory",
          icon: Redo,
        },
      ],
    },
  ];

  return (
    <div className="max-w-[256px]">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            {/* <div className="flex justify-center items-center">
              <img className="w-[80%]" src={logo1} alt="logo" />
            </div> */}
          </SidebarHeader>
          <SidebarContent>
            <ScrollArea>
              {itemsMenu.map((item, index) => (
                <SidebarGroup>
                  <SidebarGroupLabel className="text-[0.875rem] ">
                    {item.groupName}
                  </SidebarGroupLabel>
                  <SidebarContent>
                    <SidebarMenu>
                      {item.children.map((child, i) => (
                        <SidebarMenuItem
                          className="text-[1rem] p-1 text-[#000]"
                          key={child.title}
                        >
                          <SidebarMenuButton asChild>
                            <a className="py-[20px]" href={child.url}>
                              <child.icon />
                              <span>{child.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarContent>
                </SidebarGroup>
              ))}
            </ScrollArea>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
};

export default CusSidebar;
