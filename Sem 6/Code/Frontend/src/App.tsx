import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CropRecommendation from "./pages/CropRecommendation";
import WeatherAnalysis from "./pages/WeatherAnalysis";
import MarketInsights from "./pages/MarketInsights";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Chatbot from "./components/Chatbot";
import IOTMonitoringPage from "./pages/IOTMonitoring";
import CropDiseaseDetection from "./pages/CropDiseaseDetection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PageLayout from "./components/PageLayout";
import VerifyEmail from "./components/VerifyEmail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            {/* Header */}
            {/* Uncomment if you want the header to be always visible */}
            {/* <Header /> */}

            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/crop-recommendation"
                  element={<CropRecommendation />}
                />
                <Route path="/weather-analysis" element={<WeatherAnalysis />} />
                <Route path="/market-insights" element={<MarketInsights />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/iot" element={<IOTMonitoringPage />} />
                <Route
                  path="/disease-detection"
                  element={<CropDiseaseDetection />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>

            {/* Chatbot */}
            <Chatbot />

            {/* Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
