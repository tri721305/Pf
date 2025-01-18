import React from "react";
import { Button } from "./ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CustomTabs = ({ onValueChange, value, setValue, items, ...props }) => {
  return (
    <Tabs
      // onValueChange={(e) => {
      //   console.log("onValueChange", e);
      //   setValue(e);
      // }}
      onValueChange={onValueChange}
      defaultValue={props?.defaultValue}
      className=""
    >
      <TabsList className="flex  w-fit ">
        {/* <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger> */}
        {items?.map((item, index) => (
          <TabsTrigger className="min-w-[120px]" value={item?.key}>
            {item?.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items?.map((item, index) => {
        return (
          <TabsContent className="w-full" value={item?.key}>
            <Card>
              <CardHeader>
                <CardTitle>{item?.label}</CardTitle>
                <CardDescription>{item?.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">{item?.children}</CardContent>
              <CardFooter>{item?.footer}</CardFooter>
            </Card>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default CustomTabs;
