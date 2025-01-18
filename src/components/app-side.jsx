"use client";

import * as React from "react";
import {
  AreaChart,
  BookOpen,
  Bot,
  Camera,
  Command,
  Frame,
  Group,
  GroupIcon,
  HdmiPort,
  LayoutDashboard,
  LifeBuoy,
  Map,
  Monitor,
  Package,
  PcCase,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Store,
} from "lucide-react";
import ThemeSwitch from "./theme-switch";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
const data = {
  user: {
    name: "Đặng Hoàng Minh Trí",
    email: "193278",
    avatar: "/avatars/shadcn.jpg",
  },

  navSecondary: [
    {
      parent: "",
      child: [
        {
          title: "Dashboard",
          url: "Dashboard",
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
      parent: "Admin Manager",
      child: [
        {
          title: "Store Manager",
          url: "storemanager",
          icon: Store,
        },
        {
          title: "Slide Camera",
          url: "Slidecamera",
          icon: Camera,
        },
        { title: "Camera Permission", url: "CameraPermission", icon: Camera },
        { title: "PC Manager", url: "PCManager", icon: Monitor },
        {
          title: "Package Manager",
          url: "PackageManager",
          icon: Package,
        },
        {
          title: "Port Manager",
          url: "portmanager",
          icon: HdmiPort,
        },
        {
          title: "Area Manager",
          url: "AreaManager",
          icon: AreaChart,
        },
        {
          title: "Group Manager",
          url: "GroupManager",
          icon: Group,
        },
        {
          title: "Role Manager",
          url: "GroupManager",
          icon: GroupIcon,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const userInfo = useSelector((state) => state?.auth?.users);
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Pfsense</span>
                  <span className="truncate text-xs">Data ultility</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.navSecondary} className="" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
