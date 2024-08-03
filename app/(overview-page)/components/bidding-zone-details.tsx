'use client';
// Importing necessary modules and components
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PriceBarChart } from '@/components/price-bar-chart';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PRICES_BY_BIDDING_ZONE_QUERY_KEY } from '@/constants/query-keys';
import { getAveragePrice } from '@/lib/utils';
import { apiService } from '@/services/api-service';
import { BiddingZone } from '@/types/bidding-zones';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { PAGES } from '@/constants/pages';

// Define the TypeScript interface for ZoneDetails
interface BiddingZoneDetailsProps {
  biddingZone: BiddingZone;
}

/**
 * Renders a card component displaying the details of a bidding zone.
 *
 * @component
 * @param {BiddingZoneDetailsProps} props - The props for the BiddingZoneDetails component.
 * @returns {JSX.Element | null} The rendered BiddingZoneDetails component.
 */
export const BiddingZoneDetails = ({
  biddingZone,
}: BiddingZoneDetailsProps) => {
  const searchParams = useSearchParams();
  // useState hook to manage zone details state
  const [isBiddingZoneSelected, setIsBiddingZoneSelected] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);

  // useEffect hook to check if the bidding zone is selected
  useEffect(() => {
    const biddingZones = searchParams.get('biddingZones')?.split(',');
    setIsBiddingZoneSelected(biddingZones?.includes(biddingZone.value) ?? true);
  }, [biddingZone.value, searchParams]);

  // Fetching the zone details using useQuery hook
  const {
    isLoading,
    isError,
    error,
    data: biddingZoneDetails,
  } = useQuery({
    queryKey: [PRICES_BY_BIDDING_ZONE_QUERY_KEY, biddingZone.value],
    queryFn: () => apiService.getPricesByBiddingZone(biddingZone.value),
  });

  // If the bidding zone is not selected, return null
  if (!isBiddingZoneSelected) {
    return null;
  }

  // If the data is loading, return a skeleton card
  if (isLoading) {
    return (
      <Card className="flex w-full flex-col items-center gap-4 sm:w-[calc(50%-12px)] lg:w-[calc(25%-16px)]">
        <CardHeader className="animate-pulse items-center text-center">
          <CardTitle>{biddingZone.name}</CardTitle>
          <CardDescription>{biddingZone.value}</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <Skeleton className="mx-auto h-4 w-1/2" />
        </CardContent>
        <CardFooter className="block h-full w-full">
          <div className="flex h-full w-full items-center justify-center">
            <Button className="animate-pulse cursor-no-drop text-xs sm:text-sm">
              Reveal the price chart
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  // If there is an error or no data, return a card with an error message
  if (isError || !biddingZoneDetails) {
    return (
      <Card className="flex w-full flex-col items-center gap-4 sm:w-[calc(50%-12px)] lg:w-[calc(25%-16px)]">
        <CardHeader className="items-center text-center">
          <CardTitle>{biddingZone.name}</CardTitle>
          <CardDescription>{biddingZone.value}</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <p className="text-center">N/A</p>
        </CardContent>
        <CardFooter className="flex w-full flex-col gap-2 text-center">
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] sm:text-xs lg:text-sm">
              Encountered error while fetching the data:
            </p>
            {error ? (
              <p className="text-[8px] sm:text-[10px] lg:text-xs">
                {error.message}
              </p>
            ) : null}
          </div>
        </CardFooter>
      </Card>
    );
  }

  // If the data is available, return a card with the bidding zone details
  return (
    <Card className="flex w-full flex-col items-center gap-4 sm:w-[calc(50%-12px)] lg:w-[calc(25%-16px)]">
      <CardHeader className="items-center text-center">
        <CardTitle title="View bidding zone details">
          <Link
            className="flex items-center gap-2"
            href={PAGES.BIDDING_ZONE_TEMPLATE.replace(
              '[id]',
              biddingZoneDetails.responseData.zone.value,
            )}
          >
            {biddingZoneDetails.responseData.zone.name}
            <ExternalLink />
          </Link>
        </CardTitle>
        <CardDescription>
          {biddingZoneDetails.responseData.zone.value}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full items-center">
        <p className="text-center">
          <span className="font-bold">
            {biddingZoneDetails.responseData.price.length > 0
              ? getAveragePrice(biddingZoneDetails.responseData.price)
              : 'N/A'}
          </span>{' '}
          {biddingZoneDetails.responseData.unit}
        </p>
      </CardContent>
      <CardFooter className="block h-full w-full">
        {isChartVisible ? (
          <>
            <div className="flex w-full items-center justify-center">
              <Button
                className="text-xs sm:text-sm"
                onClick={() => setIsChartVisible(false)}
              >
                Hide the price chart
              </Button>
            </div>
            <PriceBarChart
              times={biddingZoneDetails.responseData.unix_seconds}
              values={biddingZoneDetails.responseData.price}
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Button
              className="text-xs sm:text-sm"
              onClick={() => setIsChartVisible(true)}
            >
              Reveal the price chart
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
