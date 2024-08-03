import { NextRequest } from 'next/server';

import { energyChartsApiService } from '@/services/energy-charts-api-service';
import { BiddingZoneRequest } from '@/types/bidding-zones';
import { BIDDING_ZONES } from '@/constants/bidding-zones';

/**
 * Retrieves electricity prices by bidding zone.
 *
 * @param request - The NextRequest object representing the incoming request.
 * @returns A Response object containing the electricity prices for the specified bidding zone.
 * @throws If there is a missing bidding zone, an unknown error occurs, or no prices are found.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const biddingZone = searchParams.get('biddingZone');

    if (!biddingZone) {
      return new Response('Missing bidding zone', { status: 400 });
    }

    const apiRequest: BiddingZoneRequest = {
      biddingZoneValue: biddingZone,
    };
    const responseData = await energyChartsApiService.getPrices(apiRequest);

    if (responseData === null) {
      return new Response('No prices found.', { status: 404 });
    }

    const zone = BIDDING_ZONES.find((zone) => zone.value === biddingZone);
    if (zone) {
      responseData.zone = {
        name: zone.name,
        value: zone.value,
      };
    }

    return Response.json({
      responseData,
    });
  } catch (error: unknown) {
    return new Response('Unknown error', { status: 500 });
  }
}
