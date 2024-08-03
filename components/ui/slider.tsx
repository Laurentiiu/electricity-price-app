"use client";

// Importing necessary modules from React and Radix UI Slider
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

// Importing a utility function for conditional class names
import { cn } from "@/lib/utils";

// Creating a Slider // Creating a Slider component using React.forwardRef to pass refs to the SliderPrimitive.Root component
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>, // Type for the ref
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> // Type for the props
>(({ className, ...props }, ref) => (
  // SliderPrimitive.Root is the main container for the slider
  <SliderPrimitive.Root
    ref={ref} // Forwarding ref to the root element
    className={cn(
      "relative flex w-full touch-none select-none items-center", // Default styles for the slider
      className // Additional class names passed via props
    )}
    {...props} // Spreading other props to the root element
  >
    {/* Displaying the minimum value of the slider */}
    <p className="absolute -top-[30px] left-0 text-xs font-medium">
      {props.min}
    </p>
    {/* Track of the slider */}
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      {/* Range of the slider */}
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    {/* Thumb of the slider, which is the draggable part */}
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    {/* Displaying the maximum value of the slider */}
    <p className="absolute -top-[30px] right-0 text-xs font-medium">
      {props.max}
    </p>
  </SliderPrimitive.Root>
));

// Setting the display name for the Slider component
Slider.displayName = SliderPrimitive.Root.displayName;

// Exporting the Slider component for use in other parts of the application
export { Slider };
