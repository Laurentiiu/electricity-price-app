'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Renders the loading content for a tab.
 * This component displays a loading state for the bidding zone details tab.
 * It includes a card with a title, description, average price, and a prices chart.
 * This component is designed to be used within the bidding zone details tab.
 */
export const TabLoadingContent = () => {
  return (
    <Card className="flex w-full flex-col items-center gap-4">
      <CardHeader className="items-center text-center">
        <CardTitle title="View bidding zone details">Current Prices</CardTitle>
        <CardDescription>
          Current electricity prices for the selected bidding zone
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full items-center">
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          <p className="text-xs font-light sm:text-sm lg:text-base">
            Average price:
          </p>
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
      <CardFooter className="block h-full w-full pt-6">
        <div className="flex w-full justify-center">
          <p className="pb-2 text-sm font-semibold leading-none tracking-tight sm:text-lg lg:text-xl">
            Prices chart
          </p>
        </div>
        <Skeleton className="h-[15vh] w-full" />
      </CardFooter>
    </Card>
  );
};
