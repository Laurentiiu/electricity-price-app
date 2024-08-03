'use client';

// Importing necessary libraries and components
import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

// Root component for Tabs, using Radix UI's TabsPrimitive.Root
const Tabs = TabsPrimitive.Root;

/**
 * TabsList Component
 *
 * This component renders the list of tabs. It uses React's forwardRef to pass
 * refs down to the TabsPrimitive.List component. The className prop allows for
 * additional styling to be passed in.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.className - Additional class names for styling.
 * @param {Object} props.ref - Ref forwarded to the TabsPrimitive.List component.
 * @returns {JSX.Element} The rendered TabsList component.
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-8 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground sm:h-10',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * TabsTrigger Component
 *
 * This /**
 * TabsTrigger Component
 *
 * This component renders an individual tab trigger. It uses React's forwardRef
 * to pass refs down to the TabsPrimitive.Trigger component. The className prop
 * allows for additional styling to be passed in.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.className - Additional class names for styling.
 * @param {Object} props.ref - Ref forwarded to the TabsPrimitive.Trigger component.
 * @returns {JSX.Element} The rendered TabsTrigger component.
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-1.5 py-0.5 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm sm:px-3 sm:py-1.5 sm:text-sm',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 * TabsContent Component
 *
 * This component renders the content of a tab. It uses React's forwardRef to pass
 * refs down to the TabsPrimitive.Content component. The className prop allows for
 * additional styling to be passed in.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.className - Additional class names for styling.
 * @param {Object} props.ref - Ref forwarded to the TabsPrimitive.Content component.
 * @returns {JSX.Element} The rendered TabsContent component.
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Exporting the components for use in other parts of the application
export { Tabs, TabsList, TabsTrigger, TabsContent };
