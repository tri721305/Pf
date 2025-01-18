import React, { useState, useRef, forwardRef, useEffect } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search } from "./search";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { current } from "@reduxjs/toolkit";
import Typography from "./main-typography";

const DataComboBox = ({ multiple = false, value, setValue, ...props }) => {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(props?.value ? props?.value : "");
  const handleSetValue = (val) => {
    if (value?.includes(val)) {
      value.splice(value.indexOf(val), 1);
      setValue(value?.filter((item) => item !== val));
    } else {
      setValue((prevValue) => [...prevValue, val]);
    }
  };
  useEffect(() => {}, []);
  console.log("multiple", multiple);
  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" flex items-center !h-fit cus-btn-select justify-between"
        >
          <div className="min-w-[300px] flex gap-2 h-fit max-w-[300px] flex-wrap">
            {multiple ? (
              value?.length ? (
                value.map((val, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
                  >
                    {
                      props?.options.find(
                        (framework) => framework.value === val
                      )?.label
                    }
                  </div>
                ))
              ) : props?.placeholder ? (
                <Typography>{props?.placeholder}</Typography>
              ) : (
                "Select ..."
              )
            ) : value ? (
              <Typography limit={30}>
                {
                  props?.options?.find((opt) => opt.value === parseInt(value))
                    ?.label
                }
              </Typography>
            ) : (
              <p className="text-sm font-normal text-muted-foreground">
                {props?.placeholder}
              </p>
            )}
          </div>
          {value && (
            <X
              className="cus-btn-select-close w-[14px] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setValue(multiple ? [] : null);
                setOpen(false);
              }}
            />
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          {/* <ChevronsUpDown className="opacity-50" /> */}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search ..."
            onValueChange={props?.onSearch}
          />

          <CommandList>
            <CommandEmpty>{props?.notFoundContent}</CommandEmpty>
            <CommandGroup>
              {multiple
                ? props?.options?.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={() => {
                        handleSetValue(framework.value);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value?.includes(framework?.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))
                : props?.options?.map((option, index) => {
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          // console.log("select", currentValue);
                          // let vl = currentValue?.split("-")[0];
                          let vl = option.value;
                          setValue(vl === value ? "" : vl);
                          // props?.onChange(currentValue);
                          setOpen(false);
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    );
                  })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DataComboBox;
