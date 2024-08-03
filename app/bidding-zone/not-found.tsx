'use client';

import { AlertCircle, Undo2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { PAGES } from '@/constants/pages';

const NotFound = () => {
  const pathname = usePathname();

  const biddingZone = pathname.substring('/bidding-zone/'.length);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 pt-[50vh]">
      <Alert className="w-fit" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Unknown Bidding zone</AlertTitle>
        <AlertDescription>
          The bidding zone <strong>{biddingZone}</strong> does not exist.
        </AlertDescription>
      </Alert>
      <Link
        className="flex w-full items-center justify-center"
        href={PAGES.OVERVIEW}
      >
        <Button className="flex items-center gap-2" variant="link">
          <Undo2 /> Go back
        </Button>
      </Link>
    </main>
  );
};

export default NotFound;
