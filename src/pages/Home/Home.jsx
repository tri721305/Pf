import React from "react";
import { Button } from "@/components/ui/button";
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
import { Calendar, Inbox, Search, Settings } from "lucide-react";
import CusBtn from "@/custom/CusBtn";
import CusSidebar from "@/custom/CusSidebar";
// Menu items.

const Home = () => {
  const items = [
    {
      title: "Home",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];
  return (
    <div>
      <SidebarProvider>
        <CusSidebar />
        <main>
          <SidebarTrigger />
          <Button
            loading={true}
            onClick={() => {
              console.log("click");
            }}
          >
            Hello
          </Button>
          <CusBtn title="Loading" loading={true} />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Home;
