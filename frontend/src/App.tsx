import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContentListPage from "./pages/ContentListPage";
import Dashboard from "./components/Dashboard";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/content/:contentType" element={<ContentListPage />} />
      <Route path="/admin-dashboard" element={<Dashboard onLogout={() => navigate('/')} />} />
      <Route path="/customer-dashboard" element={<Dashboard onLogout={() => navigate('/')} />} />
      <Route path="/student-dashboard" element={<Dashboard onLogout={() => navigate('/')} />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;