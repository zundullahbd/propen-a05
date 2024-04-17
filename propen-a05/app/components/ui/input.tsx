// input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps & { icon?: React.ReactNode }>(
  ({ className, type, placeholder, icon, ...props }, ref) => {
    return (
      <div className='relative'>
        {icon && (
          <div className='absolute left-0 top-1/2 -translate-y-1/2 pl-3'>
            {icon}
          </div>
        )}
        <input
          type={type}
          style={{ width: "385px" }} // Set the width using inline styles
          className={cn(
            "inline-flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-black",
            className
          )}
          ref={ref}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };