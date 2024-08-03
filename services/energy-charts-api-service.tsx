import {
  BiddingZoneRequest,
  BiddingZoneResponseWithZone,
} from "@/types/bidding-zones";

// Constant representing one hour in seconds
export const oneHourInSeconds = 60 * 60;

/**
 * Service class to interact with the Energy Charts API.
 */
class EnergyChartsApiService {
  /**
   * Fetches price data from the Energy Charts API based on the provided request parameters.
   *
   * @param {BiddingZoneRequest} request - The request object containing the bidding zone value and optional start and end times.
   * @returns {Promise<BiddingZoneResponse | null>} - A promise that resolves to the response data or null if the request fails.
   */
  async getPrices(
    request: BiddingZoneRequest
  ): Promise<BiddingZoneResponseWithZone | null> {
    // Construct the API URL with the base URL and bidding zone value
    let url = `${process.env.NEXT_PUBLIC_BASE_API_URL ?? ""}/price?bzn=${request.biddingZoneValue}`;

    // Append the start time to the URL if provided
    if (request.start) {
      url += `&start=${request.start}`;
    }

    // Append the end time to the URL if provided
    if (request.end) {
      url += `&end=${request.end}`;
    }

    // Fetch data from the API with revalidation set to one hour
    const response = await fetch(url, {
      next: { revalidate: oneHourInSeconds },
    });

    // Parse and return the JSON response, or null if the response is invalid
    return (await response.json()) as BiddingZoneResponseWithZone | null;
  }
}

// Export an instance of the EnergyChartsApiService for use in other parts of the application
export const energyChartsApiService = new EnergyChartsApiService();
