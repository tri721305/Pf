import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
const components = [
  {
    title: "System",
    key: "system",
    children: [
      {
        title: "Routing",
        key: "routing",
        href: "/routing",
      },
      {
        title: "User Manager",
        key: "usermanager",
        href: "/usermanager",
      },
      {
        title: "Package Manager",
        key: "packagemanager",
        href: "/packagemanager",
      },
      {
        title: "General",
        key: "general",
        href: "/general",
      },
      {
        title: "Advanced Setting",
        key: "advancedsetting",
        href: "/advancedsetting",
      },
    ],
  },
  {
    title: "Interfaces",
    key: "interfaces",
    children: [],
  },
  {
    title: "Firewall",
    key: "firewall",
    children: [
      {
        title: "Aliases",
        key: "aliases",
        href: "/aliases",
      },
      {
        title: "Rules",
        key: "rules",
        href: "/rules",
      },
      {
        title: "Traffic Shaper",
        key: "trafficshaper",
        href: "/trafficshaper",
      },
    ],
  },
  {
    title: "Services",
    key: "services",
    children: [
      {
        title: "DHCP Server",
        key: "dhcp",
        href: "/dhcp",
      },
      {
        title: "Cron",
        key: "cron",
        href: "/cron",
      },
      {
        title: "People Counter",
        key: "peoplecounter",
        href: "/peoplecounter",
      },
      {
        title: "Finger",
        key: "finger",
        href: "/finger",
      },
    ],
  },
  {
    title: "Status",
    key: "status",
    children: [
      {
        title: "Monitor Device Status",
        key: "monitordevicestatus",
        href: "/monitordevicestatus",
      },
      {
        title: "DHCP Lease",
        key: "dhcplease",
        href: "/dhcplease",
      },
    ],
  },
  {
    title: "Diagnostics",
    key: "diagnostics",
    children: [
      {
        title: "Controller Log",
        key: "controllerlog",
        href: "/controllerlog",
      },
      {
        title: "Event History",
        key: "eventhistory",
        href: "/eventhistory",
      },
    ],
  },
  {
    title: "Help",
    key: "help",
    children: [
      {
        title: "How to use",
        key: "howtouse",
        href: "/howtouse",
      },
    ],
  },
];

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
const Navigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        {components.map((item, index) => {
          return (
            <NavigationMenuItem>
              <NavigationMenuTrigger>{item?.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {item?.children.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {/* {component.title} */}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
