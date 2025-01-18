import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import CusBtn from "@/custom/CusBtn";
import { Plus } from "lucide-react";
const FormSelect = (props) => {
  return (
    <FormItem>
      <FormLabel>{props?.label}</FormLabel>
      <Select
        onValueChange={props?.onValueChange}
        defaultValue={props?.defaultValue}
        value={props?.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={props?.placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {props?.options?.map((option, index) => (
            <SelectItem value={option?.value} key={option?.value}>
              {option?.label}
            </SelectItem>
          ))}
          {props?.footer}
        </SelectContent>
      </Select>
      {props?.description && (
        <FormDescription>{props?.description}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
};

export default FormSelect;
