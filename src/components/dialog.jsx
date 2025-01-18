import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const DataDialog = ({ children, ...props }) => {
  return (
    <Dialog onOpenChange={props?.onOpenChange} open={props?.open}>
      <DialogContent
        className={`sm:max-w-md max-w-fit  ${
          props?.width ? `!min-w-[${props?.width}px]` : "min-w-[1200px]"
        }`}
      >
        <DialogHeader>
          <DialogTitle>{props?.title}</DialogTitle>
          <DialogDescription>{props?.description}</DialogDescription>
        </DialogHeader>

        {children}
        <DialogFooter className="sm:justify-start">
          {/* <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose> */}
          {props?.footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DataDialog;
