import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Analysis from "./pages/Analysis";
import Events from "./pages/Events";
import KeyDeals from "./pages/KeyDeals";
import DealDetails from "./pages/DealDetails";
import Snapshot from "./pages/Snapshot";
import Admin from "./pages/Admin";
import Companies from "./pages/Companies";
import People from "./pages/People";
import CompanyProfile from "./pages/CompanyProfile";
import PersonProfile from "./pages/PersonProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/events" element={<Events />} />
          <Route path="/key-deals" element={<KeyDeals />} />
          <Route path="/deal/:id" element={<DealDetails />} />
          <Route path="/snapshot" element={<Snapshot />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/people" element={<People />} />
          <Route path="/company/:slug" element={<CompanyProfile />} />
          <Route path="/person/:slug" element={<PersonProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
