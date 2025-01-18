import { Folder, MoreHorizontal, Share, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavProjects({ projects }) {
  const { isMobile } = useSidebar();

  console.log("projects", projects);
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {projects?.map((project, index) => {
        return (
          <>
            <SidebarGroupLabel>{project?.parent}</SidebarGroupLabel>
            <SidebarMenu>
              {project?.child?.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </>
        );
      })}
    </SidebarGroup>
  );
}
