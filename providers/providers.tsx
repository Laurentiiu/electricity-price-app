"use client";

import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { oneHourInSeconds } from "@/services/energy-charts-api-service";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: oneHourInSeconds,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

/**
 * Wraps the provided React components with a QueryClientProvider and ReactQueryDevtools.
 * This component is used to provide the query client to the child components and enable React Query Devtools.
 *
 // eslint-disable-next-line tsdoc/syntax
 * @component
 * @param {React.PropsWithChildren} props - The props object containing the child components.
 * @returns {JSX.Element} The wrapped components with the QueryClientProvider and ReactQueryDevtools.
 */
export const Providers = ({ children }: React.PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
