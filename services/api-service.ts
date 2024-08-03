import { BiddingZoneResponseWithZone } from "@/types/bidding-zones";

/**
 * The ApiService class provides methods for fetching electricity prices by bidding zone.
 * It communicates with the server using the '/api' base URL.
 */
class ApiService {
  BASE_URL = "/api";

  async getPricesByBiddingZone(biddingZone: string) {
    const url = `${this.BASE_URL}/priceByBiddingZone?biddingZone=${biddingZone}`;
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return (await response.json()) as {
      responseData: BiddingZoneResponseWithZone;
    };
  }
}

export const apiService = new ApiService();
