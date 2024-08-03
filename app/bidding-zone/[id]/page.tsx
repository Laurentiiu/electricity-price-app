import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { BiddingZoneDetails } from '@/app/bidding-zone/[id]/components/bidding-zone-details';
import { Button } from '@/components/ui/button';
import { BIDDING_ZONES } from '@/constants/bidding-zones';
import { PAGES } from '@/constants/pages';
import { PRICES_BY_BIDDING_ZONE_QUERY_KEY } from '@/constants/query-keys';
import { apiService } from '@/services/api-service';

// Define the props for the BiddingZoneDetailsPage component
export interface BiddingZoneDetailsPageProps {
  params: {
    id: string; // The ID of the bidding zone
  };
}

// The main component function
const BiddingZoneDetailsPage = async ({
  params: { id },
}: BiddingZoneDetailsPageProps) => {
  // Create a new instance of QueryClient
  const queryClient = new QueryClient();

  // Prefetch the query for prices by bidding zone using the provided ID
  await queryClient.prefetchQuery({
    queryKey: [PRICES_BY_BIDDING_ZONE_QUERY_KEY, id],
    queryFn: () => apiService.getPricesByBiddingZone(id),
  });

  // Return the JSX for the component
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-4 sm:gap-6 sm:p-16 lg:gap-8 lg:p-24">
      {/* Link to navigate back to the overview page */}
      <Link
        className="flex w-full items-center justify-start"
        href={PAGES.OVERVIEW}
      >
        <Button
          className="flex items-center gap-2 text-xs sm:text-sm lg:text-base"
          variant="link"
        >
          <ArrowLeft /> Back to overview
        </Button>
      </Link>
      {/* HydrationBoundary to manage server-side rendering state */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* Render the BiddingZoneDetails component with the selected bidding zone */}
        <BiddingZoneDetails
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- is validated on the layout level
          biddingZone={BIDDING_ZONES.find((bz) => bz.value === id)!}
        />
      </HydrationBoundary>
    </main>
  );
};

// Export the component as the default export
export default BiddingZoneDetailsPage;
