"use client"; // This directive indicates that this file is intended to be used on the client side.

import { cn } from "@/lib/utils"; // Importing a utility function 'cn' from a local utils library. This function is likely used to concatenate class names.

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string; // Optional className prop to allow custom styling.
}

// Skeleton component definition
const Skeleton: React.FC<SkeletonProps> = ({
  className, // Destructuring className from props
  ...props // Collecting the rest of the props into a variable called 'props'
}) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)} // Applying default and custom class names
      {...props} // Spreading the remaining props onto the div element
    />
  );
};

// Exporting the Skeleton component for use in other parts of the application
export { Skeleton };
