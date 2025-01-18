import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
const DataSelect = (props) => {
  return (
    <Select onValueChange={props?.onChange} defaultValue={props?.value}>
      <SelectTrigger className={`min-w-[180px] ${props?.className}`}>
        <SelectValue
          placeholder={
            <p className="text-sm font-normal text-muted-foreground">
              {props?.value ? (
                <p className="text-sm font-normal text-black">
                  {
                    props?.options?.find(
                      (opt) => opt.value === parseInt(props?.value)
                    )?.label
                  }
                </p>
              ) : (
                <p className="text-sm font-normal text-muted-foreground">
                  {props?.placeholder}
                </p>
              )}
            </p>
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{props?.label}</SelectLabel>
          {props?.options?.map((item, index) => (
            <SelectItem key={item?.value} value={item?.value}>
              {item?.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DataSelect;
