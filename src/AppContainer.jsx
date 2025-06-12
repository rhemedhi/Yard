import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppRoutes from "./routes/AppRoutes"
import UseToast from "./hooks/UseToast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 0,
    },
  },
});

function AppContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <UseToast />
    </QueryClientProvider>
  )
}

export default AppContainer;
