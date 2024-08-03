import { notFound } from 'next/navigation';

import { BiddingZoneDetailsPageProps } from '@/app/bidding-zone/[id]/page';
import { BIDDING_ZONES } from '@/constants/bidding-zones';

type BiddingZoneDetailsLayoutProps = React.PropsWithChildren &
  BiddingZoneDetailsPageProps;

const BiddingZoneDetailsLayout = async ({
  children,
  params: { id },
}: BiddingZoneDetailsLayoutProps) => {
  if (BIDDING_ZONES.find((bz) => bz.value === id) === undefined) {
    return notFound();
  }

  return children;
};

export default BiddingZoneDetailsLayout;
