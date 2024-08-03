'use client';

import { PriceBarChartLabeled } from '@/components/price-bar-chart-labeled';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAveragePrice } from '@/lib/utils';
import { BiddingZoneResponseWithZone } from '@/types/bidding-zones';

interface CurrentPricesTabProps {
  biddingZoneDetails: BiddingZoneResponseWithZone;
}

/**
 * Renders the current prices tab component.
 *
 * @component
 * @param {CurrentPricesTabProps} props - The component props.
 * @param {BiddingZoneDetails} props.biddingZoneDetails - The details of the bidding zone.
 * @returns {JSX.Element} The rendered component.
 */
export const CurrentPricesTab = ({
  biddingZoneDetails,
}: CurrentPricesTabProps) => (
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
        <p className="text-center text-xs sm:text-sm lg:text-base">
          <span className="font-bold">
            {biddingZoneDetails.price.length > 0
              ? getAveragePrice(biddingZoneDetails.price)
              : 'N/A'}
          </span>{' '}
          {biddingZoneDetails.unit}
        </p>
      </div>
    </CardContent>
    <CardFooter className="block h-full w-full pt-6">
      <div className="flex w-full justify-center">
        <p className="pb-2 text-sm font-semibold leading-none tracking-tight sm:text-lg lg:text-xl">
          Prices chart
        </p>
      </div>
      <PriceBarChartLabeled
        times={biddingZoneDetails.unix_seconds}
        values={biddingZoneDetails.price}
      />
    </CardFooter>
  </Card>
);
