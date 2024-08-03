"use client";

// Importing necessary modules from React and Radix UI's Popover component
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

// Importing a utility function for conditional class names
import { cn } from "@/lib/utils";

// Creating a Popover component using Radix UI's Popover Root component
const Popover = PopoverPrimitive.Root;

// Creating a PopoverTrigger component using Radix UI's Popover Trigger component
const PopoverTrigger = PopoverPrimitive.Trigger;

// Creating a PopoverContent component with forwardRef to allow ref forwarding
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>, // Type for the ref
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> // Type for the props
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  // Using Radix UI's Portal component to render the content in a different part of the DOM
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref} // Forwarding the ref to the Popover Content component
      align={align} // Aligning the popover content
      sideOffset={sideOffset} // Offset from the side
      className={cn(
        // Applying multiple class names for styling and animations
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className // Additional class names passed as props
      )}
      {...props} // Spreading the remaining props
    />
  </PopoverPrimitive.Portal>
));

// Setting the display name for the PopoverContent component
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// Exporting the components for use in other parts of the application
export { Popover, PopoverTrigger, PopoverContent };
