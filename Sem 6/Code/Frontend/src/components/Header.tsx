import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
  showHomeNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn = false,
  onLogout,
  showHomeNav = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDarkMode(true);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const homeNavLinks = [
    { name: t("home"), path: "/" },
    { name: t("about"), path: "/about" },
    { name: t("features"), path: "/features" },
    { name: t("contact"), path: "/contact" },
  ];

  const dashboardNavLinks = [
    { name: t("DashBoard"), path: "/dashboard" },
    { name: t("Crop-Recommendation"), path: "/crop-recommendation" },
    { name: t("Irrigation-Calculator"), path: "/weather-analysis" },
    { name: t("Disease Detection"), path: "/disease-detection" },
    // { name: t('marketInsights'), path: "/market-insights" },
    { name: t("IOT-Data"), path: "/iot" },
  ];

  const navLinks = showHomeNav
    ? homeNavLinks
    : isLoggedIn
    ? dashboardNavLinks
    : homeNavLinks;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        isScrolled ? "glass shadow-glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.span
            className="text-2xl font-display font-bold bg-gradient-to-r from-agri-green to-agri-green-dark bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            KrishiMitra
          </motion.span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground/80"
              }`}
            >
              <motion.span
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {link.name}
              </motion.span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
            aria-label="Toggle dark mode"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 0 : 180 }}
              transition={{ duration: 0.5 }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.div>
          </Button>

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="User profile"
                >
                  <User size={18} />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="rounded-full"
                aria-label="Log out"
              >
                <LogOut size={18} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" className="rounded-full px-6">
                    {t("login")}
                  </Button>
                </motion.div>
              </Link>
              <Link to="/signup">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="default" className="rounded-full px-6">
                    {t("signup")}
                  </Button>
                </motion.div>
              </Link>
            </div>
          )}
        </div>

        <div className="flex md:hidden items-center space-x-4">
          <LanguageSwitcher />

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden glass absolute left-0 right-0 top-[72px] p-4 border-t border-border shadow-glass"
        >
          <nav className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80"
                }`}
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px w-full bg-border my-2" />
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 py-2"
                >
                  <User size={18} />
                  <span>{t("profile")}</span>
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                  className="flex items-center space-x-3 py-2 text-destructive"
                >
                  <LogOut size={18} />
                  <span>{t("logout")}</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 mt-4">
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full">
                    {t("login")}
                  </Button>
                </Link>
                <Link to="/signup" onClick={closeMobileMenu}>
                  <Button variant="default" className="w-full">
                    {t("signup")}
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
