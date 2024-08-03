import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { Providers } from '@/providers/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Electricity Price App',
  description:
    'Overview of electricity prices for various regions and detailed price data for selected regions',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className={inter.className}>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
