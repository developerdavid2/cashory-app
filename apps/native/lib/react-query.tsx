import { ReactNode, useEffect, useState } from "react";
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";

function NetWorkListener() {
  useEffect(() => {
    onlineManager.setOnline(true); // ← this is the critical line

    return NetInfo.addEventListener((state) => {
      const isOnline =
        state.isConnected === true &&
        (state.isInternetReachable === null ||
          state.isInternetReachable === true);
      onlineManager.setOnline(isOnline);
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
