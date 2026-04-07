import { ReactNode, useEffect, useState } from "react";
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";

function NetWorkListener() {
  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      onlineManager.setOnline(
        !!state.isConnected && !!state.isInternetReachable
      );
    });
  }, []);

  return null;
}

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: (failureCount, error) => {
              if (
                error instanceof Error &&
                error.message.includes("Network request failed")
              ) {
                return false;
              }

              return failureCount < 2;
            },
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <NetWorkListener />
      {children}
    </QueryClientProvider>
  );
}
