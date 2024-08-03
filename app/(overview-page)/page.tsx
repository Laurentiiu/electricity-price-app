import Image from 'next/image';
import { Suspense } from 'react';

import { FiltersContainer } from '@/app/(overview-page)/components/filters-container';
import { PricesContainer } from '@/app/(overview-page)/components/prices-container';

/**
 * Renders the overview page component.
 *
 * This component displays the main content of the overview page, including filters and prices.
 *
 * @returns The rendered overview page component.
 */
const OverviewPage = () => (
  <main className="flex min-h-screen flex-col items-center gap-8 p-4 sm:p-16 lg:p-24">
    <Suspense
      fallback={
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            alt="logo"
            className="animate-spin"
            height={48}
            src="/logo.png"
            width={48}
          />
        </div>
      }
    >
      <FiltersContainer />
      <PricesContainer />
    </Suspense>
  </main>
);

export default OverviewPage;
