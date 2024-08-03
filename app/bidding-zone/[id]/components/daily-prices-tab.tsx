'use client';

import { PriceLineChart } from '@/components/price-line-chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAveragePrice, getHighestPrice, getLowestPrice } from '@/lib/utils';
import { BiddingZoneResponseWithZone } from '@/types/bidding-zones';

interface DailyPricesTabProps {
  biddingZoneDetails: BiddingZoneResponseWithZone;
}

/**
 * Renders the Daily Prices tab component.
 *
 * @component
 * @param {Object} biddingZoneDetails - The details of the bidding zone.
 * @param {number[]} biddingZoneDetails.price - The array of daily electricity prices.
 * @param {string} biddingZoneDetails.unit - The unit of the electricity prices.
 * @param {number[]} biddingZoneDetails.unix_seconds - The array of UNIX timestamps.
 * @returns {JSX.Element} The rendered Daily Prices tab component.
 */
export const DailyPricesTab = ({ biddingZoneDetails }: DailyPricesTabProps) => (
  <Card className="flex w-full flex-col items-center gap-4">
    <CardHeader className="items-center text-center">
      <CardTitle title="View bidding zone details">Daily Prices</CardTitle>
      <CardDescription>
        Daily electricity prices for the selected bidding zone
      </CardDescription>
    </CardHeader>
    <CardContent className="flex w-full flex-col items-center gap-3">
      <div className="flex items-center justify-center gap-6">
        <p className="text-xs font-light sm:text-sm lg:text-base">Daily Low:</p>
        <p className="text-center text-xs sm:text-sm lg:text-base">
          <span className="font-bold">
            {biddingZoneDetails.price.length > 0
              ? getLowestPrice(biddingZoneDetails.price)
              : 'N/A'}
          </span>{' '}
          {biddingZoneDetails.unit}
        </p>
      </div>
      <div className="flex items-center justify-center gap-6">
        <p className="text-xs font-light sm:text-sm lg:text-base">
          Daily High:
        </p>
        <p className="text-center text-xs sm:text-sm lg:text-base">
          <span className="font-bold">
            {biddingZoneDetails.price.length > 0
              ? getHighestPrice(biddingZoneDetails.price)
              : 'N/A'}
          </span>{' '}
          {biddingZoneDetails.unit}
        </p>
      </div>
      <div className="flex items-center justify-center gap-6">
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
      <PriceLineChart
        times={biddingZoneDetails.unix_seconds}
        values={biddingZoneDetails.price}
      />
    </CardFooter>
  </Card>
);
