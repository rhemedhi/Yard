import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppRoutes from "./routes/AppRoutes";
import UseToast from "./hooks/UseToast";
import UseIsMobile from "./hooks/UseIsMobile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 0,
    },
  },
});

function AppContainer() {
  const isMobile = UseIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && !isMobile && <ReactQueryDevtools initialIsOpen={false} />}
      <AppRoutes />
      <UseToast />
    </QueryClientProvider>
  )
}

export default AppContainer;

