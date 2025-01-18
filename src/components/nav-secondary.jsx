import * as React from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router";
export function NavSecondary({ items, ...props }) {
  const navigate = useNavigate();
  return (
    <SidebarGroup {...props}>
      {items?.map((item, index) => {
        return (
          <SidebarGroupContent>
            <SidebarGroupLabel>{item.parent}</SidebarGroupLabel>
            <SidebarMenu>
              {item.child.map((children, i) => {
                return (
                  <SidebarMenuItem key={children.title}>
                    <SidebarMenuButton asChild size="md">
                      <p
                        onClick={() => {
                          navigate(`/${children.url}`);
                        }}
                        href={children.url}
                      >
                        <children.icon />
                        <span>{children.title}</span>
                      </p>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        );
      })}
    </SidebarGroup>
  );
}
