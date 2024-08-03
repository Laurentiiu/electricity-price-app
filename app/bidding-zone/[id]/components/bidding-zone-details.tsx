'use client';

/**
 * This file defines the BiddingZoneDetails component, which displays detailed information
 * about a specific bidding zone, including current prices, daily prices, and comparison with other zones.
 */

import { useQuery } from '@tanstack/react-query';
import { Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { CompareZonesTab } from '@/app/bidding-zone/[id]/components/compare-zones-tab';
import { CurrentPricesTab } from '@/app/bidding-zone/[id]/components/current-prices-tab';
import { DailyPricesTab } from '@/app/bidding-zone/[id]/components/daily-prices-tab';
import { TabLoadingContent } from '@/app/bidding-zone/[id]/components/tab-loading-content';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PAGES } from '@/constants/pages';
import { PRICES_BY_BIDDING_ZONE_QUERY_KEY } from '@/constants/query-keys';
import { apiService } from '@/services/api-service';
import { BiddingZone } from '@/types/bidding-zones';

interface BiddingZoneDetailsProps {
  biddingZone: BiddingZone;
}

/**
 * BiddingZoneD/**
 * BiddingZoneDetails component displays detailed information about a specific bidding zone.
 *
 * @param {BiddingZoneDetailsProps} props - The properties object.
 * @param {BiddingZone} props.biddingZone - The bidding zone data.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const BiddingZoneDetails = ({
  biddingZone,
}: BiddingZoneDetailsProps) => {
  const router = useRouter();

  // Fetch bidding zone details using React Query
  const {
    isLoading,
    isError,
    data: biddingZoneDetails,
  } = useQuery({
    queryKey: [PRICES_BY_BIDDING_ZONE_QUERY_KEY, biddingZone.value],
    queryFn: () => apiService.getPricesByBiddingZone(biddingZone.value),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Render loading state
  if (isLoading) {
    return (
      <section className="flex w-full flex-col items-center gap-4 xl:w-auto">
        <CardHeader className="items-center text-center">
          <CardTitle className="flex items-center gap-2">
            <Zap />
            {biddingZone.name}
          </CardTitle>
          <CardDescription>{biddingZone.value}</CardDescription>
        </CardHeader>
        <Tabs
          className="flex w-full flex-col items-center xl:w-[40vw]"
          defaultValue="current_prices"
        >
          <TabsList className="max-w-full overflow-x-auto overflow-y-hidden md:max-w-none">
            <TabsTrigger value="current_prices">Current Prices</TabsTrigger>
            <TabsTrigger disabled value="daily_prices">
              Daily Prices
            </TabsTrigger>
            <TabsTrigger disabled value="compare_zones">
              Compare Prices
            </TabsTrigger>
          </TabsList>
          <TabsContent className="w-full" value="current_prices">
            <TabLoadingContent />
          </TabsContent>
        </Tabs>
      </section>
    );
  }

  // Handle error state
  if (isError || !biddingZoneDetails) {
    router.push(PAGES.OVERVIEW);
    return null;
  }

  // Render the main content
  return (
    <section className="flex w-full flex-col items-center gap-4 lg:w-auto">
      <CardHeader className="items-center text-center">
        <CardTitle className="flex items-center gap-2">
          <Zap />
          {biddingZone.name}
        </CardTitle>
        <CardDescription>{biddingZone.value}</CardDescription>
      </CardHeader>
      <Tabs
        className="flex w-full flex-col items-center xl:w-[40vw]"
        defaultValue="current_prices"
      >
        <TabsList className="max-w-full overflow-x-auto overflow-y-hidden md:max-w-none">
          <TabsTrigger value="current_prices">Current Prices</TabsTrigger>
          <TabsTrigger value="daily_prices">Daily Prices</TabsTrigger>
          <TabsTrigger value="compare_zones">Compare Prices</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="current_prices">
          <CurrentPricesTab
            biddingZoneDetails={biddingZoneDetails.responseData}
          />
        </TabsContent>
        <TabsContent className="w-full" value="daily_prices">
          <DailyPricesTab
            biddingZoneDetails={biddingZoneDetails.responseData}
          />
        </TabsContent>
        <TabsContent className="w-full" value="compare_zones">
          <CompareZonesTab
            biddingZoneDetails={biddingZoneDetails.responseData}
            selectedBiddingZone={biddingZone}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};
