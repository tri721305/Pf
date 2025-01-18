import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
const CustomSwitch = ({ checked, onCheckedChange, text, ...props }) => {
  return (
    <div className="flex flex-col space-x-2">
      <Label htmlFor="airplane-mode">{text}</Label>

      <Switch
        {...props}
        checked={checked}
        className="mt-[8px]"
        onCheckedChange={onCheckedChange}
        id="airplane-mode "
      />
    </div>
  );
};

export default CustomSwitch;
