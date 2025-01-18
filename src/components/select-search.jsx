import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Typography from "./main-typography";
import "./style.scss";
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const SelectSearch = ({ value, setValue, options, ...props }) => {
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState("");
  console.log("width", props?.width);
  return (
    <Popover labelInValue open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          aria-expanded={open}
          className={` ${
            props?.width ? `w-[${props?.width}]` : "w-[300px]"
          } flex items-center  cus-btn-select justify-between`}
        >
          {value ? (
            <Typography limit={30}>
              {options?.find((framework) => framework.value === value)?.label}
            </Typography>
          ) : (
            <Typography className="text-[#71717a] font-normal" limit={30}>
              {props?.placeholder ?? ""}
            </Typography>
          )}
          <div className="flex items-center">
            {value?.length > 0 && (
              <X
                className="cus-btn-select-close w-[14px]"
                onClick={(e) => {
                  e.stopPropagation();

                  setValue("");
                  setOpen(false);
                }}
              />
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No data found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options?.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onValueChange={(e) => {
                    console.log("value change", e);
                  }}
                  onSelect={(currentValue) => {
                    setValue(framework.value == value ? "" : framework.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectSearch;
