"use client"; // This directive indicates that the file should be treated as a client-side module.

import * as React from "react"; // Importing React library.
import { cva, type VariantProps } from "class-variance-authority"; // Importing cva function and VariantProps type from class-variance-authority.

import { cn } from "@/lib/utils"; // Importing a utility function for class names.

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    // Defining variants for the badge component.
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    // Setting the default variant.
    defaultVariants: {
      variant: "default",
    },
  }
);

// Defining the properties (props) that the Badge component can accept.
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// The Badge component definition.
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    // The component renders a div with dynamic class names based on the variant and any additional class names passed in.
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// Exporting the Badge component and badgeVariants for use in other parts of the application.
export { Badge, badgeVariants };
