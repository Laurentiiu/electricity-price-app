import { AlertCircle, Undo2 } from 'lucide-react';
import Link from 'next/link';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { PAGES } from '@/constants/pages';

/**
 * Renders the NotFound component.
 *
 * This component displays a "Page does not exist" alert along with a button to navigate to the Overview page. *
 */
const NotFound = () => (
  <main className="flex min-h-screen flex-col items-center gap-4 pt-[50vh]">
    <Alert className="w-fit" variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Page does not exist</AlertTitle>
      <AlertDescription>
        The page you are looking for does not exist.
      </AlertDescription>
    </Alert>
    <Link
      className="flex w-full items-center justify-center"
      href={PAGES.OVERVIEW}
    >
      <Button className="flex items-center gap-2" variant="link">
        <Undo2 /> Go to Overview
      </Button>
    </Link>
  </main>
);

export default NotFound;
