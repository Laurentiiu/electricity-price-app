'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { BiddingZonesSelect } from '@/components/bidding-zones-select';
import { TwoPriceLineChart } from '@/components/two-price-line-chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BIDDING_ZONES } from '@/constants/bidding-zones';
import { PAGES } from '@/constants/pages';
import { PRICES_BY_BIDDING_ZONE_QUERY_KEY } from '@/constants/query-keys';
import { getAveragePrice, getHighestPrice, getLowestPrice } from '@/lib/utils';
import { apiService } from '@/services/api-service';
import {
  BiddingZone,
  BiddingZoneResponseWithZone,
} from '@/types/bidding-zones';

interface CompareZonesTabProps {
  selectedBiddingZone: BiddingZone;
  biddingZoneDetails: BiddingZoneResponseWithZone;
}

/**
 * Renders a tab for comparing bidding zones.
 *
 * @component
 * @example
 * ```tsx
 * <CompareZonesTab
 *   selectedBiddingZone={selectedBiddingZone}
 *   biddingZoneDetails={biddingZoneDetails}
 * />
 * ```
 *
 * @param {Object} props - The component props.
 * @param {BiddingZone} props.selectedBiddingZone - The selected bidding zone.
 * @param {BiddingZoneDetails} props.biddingZoneDetails - The details of the selected bidding zone.
 * @returns {JSX.Element} The rendered component.
 */
export const CompareZonesTab = ({
  selectedBiddingZone,
  biddingZoneDetails,
}: CompareZonesTabProps) => {
  const router = useRouter();

  const [biddingZoneToCompare, setBiddingZoneToCompare] = useState<
    string | undefined
  >(undefined);

  const {
    isLoading,
    isError,
    data: biddingZoneToCompareDetails,
  } = useQuery({
    queryKey: [PRICES_BY_BIDDING_ZONE_QUERY_KEY, biddingZoneToCompare],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- is checked with enabled
    queryFn: () => apiService.getPricesByBiddingZone(biddingZoneToCompare!),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: Boolean(biddingZoneToCompare),
  });

  if (isError) {
    router.push(PAGES.OVERVIEW);
    return null;
  }

  return (
    <Card className="flex w-full flex-col items-center gap-4">
      <CardHeader className="items-center text-center">
        <CardTitle title="View bidding zone details">Compare Prices</CardTitle>
        <CardDescription>
          Compare electricity prices between {selectedBiddingZone.name} and
          selected bidding zone
        </CardDescription>
      </CardHeader>
      <CardContent className="flex w-full flex-col items-center gap-3">
        <div className="flex w-full items-center justify-center gap-2 border-y border-slate-200 py-5">
          <p className="w-fit text-xs font-light sm:text-sm lg:text-base">
            Select bidding zone to compare:
          </p>
          <BiddingZonesSelect
            disabled={isLoading}
            value={biddingZoneToCompare}
            onValueChange={setBiddingZoneToCompare}
          />
          {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : null}
        </div>
        {biddingZoneToCompareDetails ? (
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <div className="flex w-full flex-col items-center gap-3">
              <p className="text-sm text-green-600 lg:text-base">
                {selectedBiddingZone.name}{' '}
              </p>
              <div className="flex items-center justify-center gap-6">
                <p className="whitespace-nowrap text-xs font-light sm:text-sm lg:text-base">
                  Daily Low:
                </p>
                <p className="whitespace-nowrap text-center text-xs sm:text-sm lg:text-base">
                  <span className="font-bold">
                    {biddingZoneDetails.price.length > 0
                      ? getLowestPrice(biddingZoneDetails.price)
                      : 'N/A'}
                  </span>{' '}
                  {biddingZoneDetails.unit}
                </p>
              </div>
              <div className="flex items-center justify-center gap-6">
                <p className="whitespace-nowrap text-xs font-light sm:text-sm lg:text-base">
                  Daily High:
                </p>
                <p className="whitespace-nowrap text-center text-xs sm:text-sm lg:text-base">
                  <span className="font-bold">
                    {biddingZoneDetails.price.length > 0
                      ? getHighestPrice(biddingZoneDetails.price)
                      : 'N/A'}
                  </span>{' '}
                  {biddingZoneDetails.unit}
                </p>
              </div>
              <div className="flex items-center justify-center gap-6">
                <p className="whitespace-nowrap text-xs font-light sm:text-sm lg:text-base">
                  Average price:
                </p>
                <p className="whitespace-nowrap text-center text-xs sm:text-sm lg:text-base">
                  <span className="font-bold">
                    {biddingZoneDetails.price.length > 0
                      ? getAveragePrice(biddingZoneDetails.price)
                      : 'N/A'}
                  </span>{' '}
                  {biddingZoneDetails.unit}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col items-center gap-3">
              <p className="text-sm text-blue-600 lg:text-base">
                {
                  BIDDING_ZONES.find((x) => x.value === biddingZoneToCompare)
                    ?.name
                }
              </p>
              <div className="flex items-center justify-center gap-6">
                <p className="whitespace-nowrap text-xs font-light sm:text-sm lg:text-base">
                  Daily Low:
                </p>
                <p className="whitespace-nowrap text-center text-xs sm:text-sm lg:text-base">
                  <span className="font-bold">
                    {biddingZoneToCompareDetails.responseData.price.length > 0
                      ? getLowestPrice(
                          biddingZoneToCompareDetails.responseData.price,
                        )
                      : 'N/A'}
                  </span>{' '}
                  {biddingZoneToCompareDetails.responseData.unit}
                </p>
              </div>
              <div className="flex items-center justify-center gap-6">
                <p className="whitespace-nowrap text-xs font-light sm:text-sm lg:text-base">
                  Daily High:
                </p>
                <p className="whitespace-nowrap text-center text-xs sm:text-sm lg:text-base">
                  <span className="font-bold">
                    {biddingZoneToCompareDetails.responseData.price.length > 0
                      ? getHighestPrice(
                          biddingZoneToCompareDetails.responseData.price,
                        )
                      : 'N/A'}
                  </span>{' '}
                  {biddingZoneDetails.unit}
                </p>
              </div>
              <div className="flex items-center justify-center gap-6">
                <p className="whitespace-nowrap text-xs font-light sm:text-sm lg:text-base">
                  Average price:
                </p>
                <p className="whitespace-nowrap text-center text-xs sm:text-sm lg:text-base">
                  <span className="font-bold">
                    {biddingZoneToCompareDetails.responseData.price.length > 0
                      ? getAveragePrice(
                          biddingZoneToCompareDetails.responseData.price,
                        )
                      : 'N/A'}
                  </span>{' '}
                  {biddingZoneDetails.unit}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="block h-full w-full pt-6">
        <>
          <div className="flex w-full flex-col items-center justify-center">
            <p className="pb-2 text-sm font-semibold leading-none tracking-tight sm:text-lg lg:text-xl">
              Prices comparison chart
            </p>
            {biddingZoneToCompareDetails ? null : (
              <p className="text-xs font-normal leading-none tracking-tight sm:text-sm lg:text-base">
                Choose a bidding zone to compare prices
              </p>
            )}
          </div>
          <TwoPriceLineChart
            key={biddingZoneToCompare}
            firstBiddingZone={selectedBiddingZone.name}
            times={biddingZoneDetails.unix_seconds}
            values={biddingZoneDetails.price}
            valuesSecondary={biddingZoneToCompareDetails?.responseData.price}
            secondBiddingZone={
              BIDDING_ZONES.find((x) => x.value === biddingZoneToCompare)
                ?.name ?? 'N/A'
            }
          />
        </>
      </CardFooter>
    </Card>
  );
};
