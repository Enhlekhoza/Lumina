import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContentListPage from "./pages/ContentListPage";
import ContentPage from "./pages/ContentPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./components/Dashboard";
import ArticlePage from "./components/ArticlePage"; // ✅ Already added

// ✅ NEW PAGES
import AiChatPage from "./pages/AiChatPage";
import LearningPathsPage from "./pages/LearningPathsPage";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Index />} />
      <Route path="/content/:contentType" element={<ContentListPage />} />
      <Route path="/content/story/:slug" element={<ContentPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* Dashboards */}
      <Route path="/admin-dashboard" element={<Dashboard onLogout={() => navigate("/")} />} />
      <Route path="/customer-dashboard" element={<Dashboard onLogout={() => navigate("/")} />} />
      <Route path="/student-dashboard" element={<Dashboard onLogout={() => navigate("/")} />} />

      {/* Articles */}
      <Route path="/articles/:slug" element={<ArticlePage />} />

      {/* ✅ New Pages */}
      <Route path="/ai-chat" element={<AiChatPage />} />
      <Route path="/learning-paths" element={<LearningPathsPage />} />

      {/* Catch-all */}
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