"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * A reusable input component.
 *
 * @component Input
 * @param {string} className - Additional CSS class names for the input element.
 * @param {string} type - The type of the input element.
 * @param {React.Ref<HTMLInputElement>} ref - The ref object for the input element.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - Additional props for the input element.
 * @returns {JSX.Element} - The rendered input element.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };