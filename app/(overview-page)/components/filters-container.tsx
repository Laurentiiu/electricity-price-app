"use client";
// Importing necessary modules and components
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { MultiSelect } from "@/components/ui/multi-select";
import { BIDDING_ZONES } from "@/constants/bidding-zones";
import { Button } from "@/components/ui/button";

const values = BIDDING_ZONES.map((biddingZone) => ({
  label: biddingZone.name,
  value: biddingZone.value,
}));

/**
 * Renders a container component for filters.
 * This component manages the selected bidding zones and updates the URL search parameters accordingly.
 * It provides a multi-select dropdown for selecting bidding zones.
 *
 * @returns The FiltersContainer component.
 */
export const FiltersContainer = () => {
  //Search params hook
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const router = useRouter();
  // useState hook to manage selected bidding zones
  const [selectedBiddingZones, setSelectedBiddingZones] = useState<string[]>(
    searchParams.get("biddingZones")?.split(",") ??
      BIDDING_ZONES.map((biddingZone) => biddingZone.value)
  );

  // useEffect hook to update selected bidding zones
  useEffect(() => {
    setSelectedBiddingZones(searchParams.get("biddingZones")?.split(",") ?? []);
  }, [searchParams]);

  // Function to handle bidding zones change
  const onBiddingZonesChange = (biddingZones: string[]) => {
    const params = new URLSearchParams(searchParams);

    if (biddingZones.length === 0) {
      params.delete("biddingZones");
    } else {
      params.set("biddingZones", biddingZones.join(","));
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Return the filter select container
  return (
    <section className="">
      <MultiSelect
        modalPopover
        animation={2}
        defaultValue={selectedBiddingZones}
        maxCount={5}
        options={values}
        placeholder="Select bidding zones"
        variant="inverted"
        onValueChange={onBiddingZonesChange}
      />
    </section>
  );
};
