export interface BiddingZone {
  name: string;
  value: string;
}

export interface BiddingZoneRequest {
  biddingZoneValue: string;
  start?: string; // unix_seconds format
  end?: string; // unix_seconds format
}

export interface BiddingZoneResponseWithZone {
  zone: BiddingZone;
  license_info: string;
  unix_seconds: number[];
  price: number[];
  unit: string;
  deprecated: boolean;
}
