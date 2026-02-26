import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import PujaListingPage from "./pages/PujaListingPage";
import PujaDetailPage from "./pages/PujaDetailPage";
import TemplesPage from "./pages/TemplesPage";
import TempleDetailPage from "./pages/TempleDetailPage";
import BookingPage from "./pages/BookingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pujas" element={<PujaListingPage />} />
            <Route path="/pujas/:id" element={<PujaDetailPage />} />
            <Route path="/temples" element={<TemplesPage />} />
            <Route path="/temples/:id" element={<TempleDetailPage />} />
            <Route path="/book/:pujaId" element={<BookingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
