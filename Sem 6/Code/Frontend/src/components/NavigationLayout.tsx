import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { cn } from "@/lib/utils";
import {
  Home,
  Sprout,
  Cloud,
  BarChart,
  User,
  Thermometer,
  Droplet,
  // Moisture,
  ChevronLeft,
  Rat,
} from "lucide-react";

interface NavigationLayoutProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const NavigationLayout: React.FC<NavigationLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const path = location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Determine if the current page is a protected/dashboard page
  const isProtectedPage = [
    "/dashboard",
    "/crop-recommendation",
    "/weather-analysis",
    "/market-insights",
    "/profile",
    "/iot",
    "/disease-detection",
  ].some((route) => path.startsWith(route));

  // Determine if the current page is a public page that should show home navigation
  const isPublicPage = ["/", "/about", "/features", "/contact"].some(
    (route) => path === route
  );

  // Set isLoggedIn based on localStorage
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  // Check authentication for protected pages
  useEffect(() => {
    if (isProtectedPage && !isAuthenticated) {
      navigate("/login");
    }
  }, [isProtectedPage, isAuthenticated, navigate]);

  // Dashboard navigation items
  const dashboardNavItems = [
    {
      label: t("Dashboard"),
      icon: Home,
      path: "/dashboard",
      active: path === "/dashboard",
    },
    {
      label: t("Crop-Recommendation"),
      icon: Sprout,
      path: "/crop-recommendation",
      active: path === "/crop-recommendation",
    },
    {
      label: t("Irrigation-Calculator"),
      icon: Droplet,
      path: "/weather-analysis",
      active: path === "/weather-analysis",
    },
    {
      label: t("Disease Detection"),
      icon: Rat,
      path: "/disease-detection",
      active: path === "/disease-detection",
    },
    // {
    //   label: t('marketInsights'),
    //   icon: BarChart,
    //   path: '/market-insights',
    //   active: path === '/market-insights',
    // },
    {
      label: t("IOT-Data"),
      icon: Thermometer,
      path: "/iot",
      active: path.includes("tab=iot"),
    },
  ];

  // IOT-specific navigation items
  // const iotNavItems = [
  //   {
  //     label: t('temperature'),
  //     icon: Thermometer,
  //     path: '/iot&sensor=temperature',
  //     active: path.includes('temperature'),
  //   },
  //   {
  //     label: t('humidity'),
  //     icon: Droplet,
  //     path: '/iot&sensor=humidity',
  //     active: path.includes('humidity'),
  //   },
  // {
  //   label: t('soilMoisture'),
  //   icon: Moisture,
  //   path: '/dashboard?tab=iot&sensor=soilMoisture',
  //   active: path.includes('soilMoisture'),
  // },
  // ];

  // Only render sidebar for dashboard/protected pages
  const renderSidebar = isProtectedPage && isAuthenticated;

  return (
    <div className="flex min-h-screen w-full">
      {renderSidebar && (
        <AnimatePresence mode="wait">
          <motion.aside
            initial={{ width: sidebarOpen ? 240 : 64, x: 0 }}
            animate={{ width: sidebarOpen ? 240 : 64, x: 0 }}
            exit={{ width: 0, x: -64 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-border bg-card pt-20",
              sidebarOpen ? "w-60" : "w-16"
            )}
          >
            <div className="absolute right-[-12px] top-24">
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 rounded-full border-border bg-background p-0"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <ChevronLeft
                  className={cn(
                    "h-3 w-3 transition-transform",
                    !sidebarOpen && "rotate-180"
                  )}
                />
              </Button>
            </div>

            <div className="flex flex-col gap-2 px-2 py-4">
              <p
                className={cn(
                  "px-2 text-xs font-medium text-muted-foreground",
                  !sidebarOpen && "sr-only"
                )}
              >
                {t("navigation")}
              </p>

              {dashboardNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex h-9 items-center rounded-md px-2 text-sm font-medium transition-colors",
                    item.active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                    !sidebarOpen && "justify-center px-0"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", sidebarOpen && "mr-2")} />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              ))}
            </div>

            {/* <div className="mt-4 flex flex-col gap-2 px-2 py-2">
              <p className={cn(
                "px-2 text-xs font-medium text-muted-foreground",
                !sidebarOpen && "sr-only"
              )}>
                {t('iotData')}
              </p>
               */}
            {/* {iotNavItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex h-9 items-center rounded-md px-2 text-sm font-medium transition-colors",
                    item.active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                    !sidebarOpen && "justify-center px-0"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", sidebarOpen && "mr-2")} />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              ))} */}
            {/* </div> */}

            <div className="mt-auto flex flex-col gap-2 px-2 py-4">
              <Link
                to="/profile"
                className={cn(
                  "flex h-9 items-center rounded-md px-2 text-sm font-medium transition-colors",
                  path === "/profile"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                  !sidebarOpen && "justify-center px-0"
                )}
              >
                <User className={cn("h-4 w-4", sidebarOpen && "mr-2")} />
                {sidebarOpen && <span>{t("profile")}</span>}
              </Link>
            </div>
          </motion.aside>
        </AnimatePresence>
      )}

      <Header
        isLoggedIn={isProtectedPage ? true : isAuthenticated}
        showHomeNav={isPublicPage}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className={cn(
            "flex-1 transition-all duration-300",
            renderSidebar && (sidebarOpen ? "ml-60" : "ml-16")
          )}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NavigationLayout;
