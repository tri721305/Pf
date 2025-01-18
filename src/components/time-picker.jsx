import React, { useState } from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { TimePickerDemo } from "./time-picker-demo";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TimePicker = (props) => {
  const form = useForm();

  function onSubmit(data) {
    console.log("Submit", data);
  }
  const [date, setDate] = useState();
  return (
    <Form {...form}>
      <form
        className="flex items-end gap-4 justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="dateTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              {/* <FormLabel className="text-left">DateTime</FormLabel> */}
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP HH:mm:ss")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(data) => {
                      console.log("data date picker", data);
                      field.onChange(data);
                      props?.onChange(data);
                    }}
                    initialFocus
                  />
                  <div className="p-3 border-t border-border">
                    <TimePickerDemo
                      setDate={(data) => {
                        console.log("data date picker time", data);
                        field.onChange(data);
                        props?.onChange(data);
                      }}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
};

export default TimePicker;
