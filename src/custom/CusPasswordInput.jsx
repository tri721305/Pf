import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import CusBtn from "./CusBtn";

const CusPasswordInput = forwardRef(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative rounded-md">
      <input
        type={showPassword ? "text" : "password"}
        className={
          !className
            ? "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            : className
        }
        ref={ref}
        {...props}
      />
      <CusBtn
        type="button"
        size="icon"
        variant="ghost"
        className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md text-muted-foreground"
        onClick={(e) => {
          //   e.stopPagination();
          console.log("togge");
          setShowPassword((prev) => !prev);
        }}
        title={showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
      />
    </div>
  );
});

export default CusPasswordInput;
