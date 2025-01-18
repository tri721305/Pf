import React from "react";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

import moment from "moment";
const chartData = [
  { browser: "safari", visitors: 50, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
};
const CustomCard = (props) => {
  return (
    <Card className={` ${props?.className} flex min-w-[500px] flex-col`}>
      <CardHeader className="items-baseline pb-0">
        <CardTitle>{props?.name}</CardTitle>
        <CardDescription>{moment().format("MMMM Do YYYY")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">{props?.body}</CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {props?.description}
        </div>
        <div className="leading-none text-muted-foreground">{props?.sub}</div>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
