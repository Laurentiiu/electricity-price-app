"use client";
// Importing necessary modules and components
import { BiddingZoneDetails } from "@/app/(overview-page)/components/bidding-zone-details";
import { BIDDING_ZONES } from "@/constants/bidding-zones";

export const PricesContainer = () => (
  <main className="flex w-full flex-col items-center gap-4">
    <div className="flex w-full flex-wrap justify-center gap-3 sm:justify-start lg:gap-4">
      {BIDDING_ZONES.map((bz) => (
        <BiddingZoneDetails key={bz.value} biddingZone={bz} />
      ))}
    </div>
  </main>
);
