import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
import Typography from "./main-typography";

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

const SelectMultiple = ({ value, setValue, options, ...props }) => {
  const [open, setOpen] = React.useState(false);
  //   const [value, setValue] = React.useState([]);

  const handleSetValue = (val) => {
    if (value.includes(val)) {
      value.splice(value.indexOf(val), 1);
      setValue(value.filter((item) => item !== val));
    } else {
      setValue((prevValue) => [...prevValue, val]);
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${
            props?.width ? `w-[${props?.width}]` : "w-[300px]"
          } justify-between h-fit`}
        >
          <div
            className={`flex gap-2 flex-wrap justify-start ${
              props?.width ? `max-w-${props?.width}` : `max-w-[300px]`
            }`}
          >
            {value?.length ? (
              value.map((val, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
                >
                  {options.find((framework) => framework.value === val)?.label}
                </div>
              ))
            ) : props?.placeholder ? (
              <Typography>{props?.placeholder}</Typography>
            ) : (
              "Select ..."
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandList>
                {options?.map((framework) => (
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
                ))}
              </CommandList>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectMultiple;
