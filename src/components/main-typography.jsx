import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const Typography = ({ children, ...props }) => {
  let limit = props?.limit;
  return limit < children?.length ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p {...props}>{children?.slice(0, limit) + "..."}</p>
        </TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <p {...props}>{children}</p>
  );
  //   return <p>{children}</p>;
};

export default Typography;
