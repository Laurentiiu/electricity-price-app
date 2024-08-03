"use client"; // This directive indicates that the code is intended to run on the client side.

import * as React from "react"; // Import React library
import { Slot } from "@radix-ui/react-slot"; // Import Slot component from Radix UI
import { type VariantProps, cva } from "class-variance-authority"; // Import VariantProps type and cva function from class-variance-authority

import { cn } from "@/lib/utils"; // Import a utility function for class names

// Define button variants using class-variance-authority (cva)
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    // Define different variants for the button
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      // Define different sizes for the button
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    // Set default variants
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Define the ButtonProps interface which extends the default button attributes and variant props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Optional prop to render the button as a child component
}

// Define the Button component using React.forwardRef to pass refs to the button element
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Determine the component to render, either a Slot or a button element
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref} // Forward the ref to the component
        className={cn(buttonVariants({ variant, size, className }))} // Apply the computed class names
        {...props} // Spread the remaining props to the component
      />
    );
  }
);

// Set the display name for the Button component
Button.displayName = "Button";

// Export the Button component and buttonVariants for external use
export { Button, buttonVariants };
