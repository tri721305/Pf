import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import moment from "moment";
const CardChart = ({ children, isShowDate = true, ...props }) => {
  return (
    <Card className={`flex  flex-col  ${props?.className}`}>
      {props?.title && (
        <CardHeader className="items-center pb-0">
          <CardTitle>{props?.title}</CardTitle>
          {isShowDate && (
            <CardDescription>{moment().format("MMMM Do YYYY")}</CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className="flex-1 p-0">{children}</CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {props?.footer}
      </CardFooter>
    </Card>
  );
};

export default CardChart;
