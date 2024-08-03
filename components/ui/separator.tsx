"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

/**
 * A customizable separator component.
 *
 * @component
 * @example
 * // Usage:
 * // <Separator orientation="horizontal" decorative={true} />
 *
 * @param {string} className - Additional CSS class names for the separator.
 * @param {string} orientation - The orientation of the separator. Defaults to 'horizontal'.
 * @param {boolean} decorative - Whether the separator is decorative or not. Defaults to true.
 * @param {React.Ref} ref - Reference to the separator element.
 * @returns {React.ReactElement} The rendered separator component.
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
