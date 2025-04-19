
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Users,
  Info,
  Sun,
  Cloud,
  CloudRain,
  Wind,
  AlertTriangle,
  Tractor,
  Droplets,
  Thermometer,
  Calendar,
  Map,
  Crop,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "next-themes";
import WeatherCard from "./WeatherCard";

const marketData = [
  {
    crop: "Wheat",
    currentPrice: "₹ 2,400/quintal",
    trend: "rising",
    prediction: "Sell in 2 weeks",
    nearbyMarket: "Nashik Mandi (8 km)",
  },
  {
    crop: "Soybean",
    currentPrice: "₹ 4,850/quintal",
    trend: "stable",
    prediction: "Hold for now",
    nearbyMarket: "Pune Market (45 km)",
  },
  {
    crop: "Onion",
    currentPrice: "₹ 1,950/quintal",
    trend: "falling",
    prediction: "Sell immediately",
    nearbyMarket: "Nashik Mandi (8 km)",
  },
];

const governmentSchemes = [
  {
    title: "PM Kisan Samman Nidhi",
    description: "Provides income support to all landholding farmer families.",
    advantages: [
      "Rs. 6,000 per year",
      "Direct benefit transfer",
      "Supports small and marginal farmers",
    ],
    link: "https://pmkisan.gov.in/",
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana",
    description:
      "Provides insurance coverage and financial support to farmers in case of crop failure.",
    advantages: [
      "Comprehensive risk coverage",
      "Affordable premiums",
      "Prompt claim settlement",
    ],
    link: "https://pmfby.gov.in/",
  },
  {
    title: "Soil Health Card Scheme",
    description:
      "Provides soil health information to farmers to improve productivity.",
    advantages: [
      "Customized soil health report",
      "Recommendations for soil improvement",
      "Supports sustainable farming",
    ],
    link: "https://soilhealth.dac.gov.in/",
  },
];

const cropRecommendationData = {
  soilType: {
    title: "Soil Type Based Recommendations",
    icon: <Crop className="h-6 w-6" />,
    data: {
      "Sandy Soil": ["Carrot", "Radish", "Watermelon", "Bajra"],
      "Clayey Soil": ["Paddy (Rice)", "Wheat", "Sunflower", "Jute"],
      "Loamy Soil": ["Tomato", "Potato", "Maize", "Cotton"],
      "Black Soil": ["Cotton", "Sugarcane", "Wheat", "Millets"],
      "Red Soil": ["Groundnut", "Sorghum", "Ragi", "Pulses"],
      "Alluvial Soil": ["Rice", "Wheat", "Sugarcane", "Maize"],
    },
  },
  rainfall: {
    title: "Rainfall Based Recommendations",
    icon: <Droplets className="h-6 w-6" />,
    data: {
      "0-300 mm (Low)": ["Jowar", "Bajra", "Gram", "Mustard"],
      "300-600 mm (Moderate)": ["Wheat", "Barley", "Cotton", "Groundnut"],
      "600-1000 mm (High)": ["Rice", "Sugarcane", "Jute", "Tea"],
      "1000+ mm (Very High)": ["Rubber", "Coffee", "Cardamom"],
    },
  },
  temperature: {
    title: "Temperature Based Recommendations",
    icon: <Thermometer className="h-6 w-6" />,
    data: {
      "<10°C (Cold Climate)": ["Apple", "Barley", "Mustard"],
      "10-20°C (Moderate Climate)": ["Wheat", "Potato", "Peas", "Chickpeas"],
      "20-30°C (Warm Climate)": ["Maize", "Cotton", "Sugarcane", "Pulses"],
      "30+°C (Hot Climate)": ["Millets", "Jowar", "Bajra", "Groundnut"],
    },
  },
  pH: {
    title: "Soil pH Based Recommendations",
    icon: <Wind className="h-6 w-6" />,
    data: {
      "4.5 - 5.5 (Highly Acidic)": ["Tea", "Pineapple", "Sweet Potato"],
      "5.5 - 6.5 (Moderately Acidic)": ["Rice", "Corn", "Tomato", "Banana"],
      "6.5 - 7.5 (Neutral)": ["Wheat", "Barley", "Oats", "Most Vegetables"],
      "7.5 - 8.5 (Moderately Alkaline)": ["Cotton", "Sunflower", "Maize"],
      "8.5+ (Highly Alkaline)": ["Date Palm", "Barley"],
    },
  },
  season: {
    title: "Season Based Recommendations",
    icon: <Calendar className="h-6 w-6" />,
    data: {
      "Kharif (June - October)": [
        "Rice",
        "Maize",
        "Cotton",
        "Millets",
        "Soybean",
      ],
      "Rabi (November - April)": ["Wheat", "Mustard", "Barley", "Chickpeas"],
      "Zaid (March - June)": [
        "Watermelon",
        "Muskmelon",
        "Cucumber",
        "Vegetables",
      ],
    },
  },
  region: {
    title: "Region Based Recommendations",
    icon: <Map className="h-6 w-6" />,
    data: {
      "North India": ["Wheat", "Rice", "Sugarcane", "Mustard"],
      "South India": ["Millets", "Groundnut", "Coconut", "Coffee"],
      "East India": ["Rice", "Jute", "Tea", "Potato"],
      "West India": ["Bajra", "Cotton", "Oilseeds", "Pulses"],
      "Himalayan Region": ["Apple", "Walnuts", "Saffron", "Barley"],
    },
  },
};

const Dashboard = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [farmerInfo, setFarmerInfo] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("soilType");

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/profile", {
          headers: { Authorization: ` Bearer ${token} ` },
        });
        console.log("Profile Info: ", response.data);
        setFarmerInfo(response.data.farmer);
      } catch (error) {
        console.error("Error fetching farmer data:", error);
      }
    };

    fetchFarmerData();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/weather", {
          headers: { Authorization: ` Bearer ${token}` },
        });
        console.log("Weather response:", response.data);
        setWeatherData(response.data.weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const renderWeatherIcon = (condition) => {
    if (condition === "Clear") {
      return <Sun className="h-8 w-8 text-yellow-500" />;
    } else if (condition === "Cloudy") {
      return <Cloud className="h-8 w-8 text-gray-500" />;
    } else if (condition === "Rainy") {
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    } else {
      return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  const renderCropTable = (data) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="overflow-x-auto"
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary/10 dark:bg-primary/20">
              <th className="p-3 text-left font-semibold border dark:border-gray-700">
                Condition
              </th>
              <th className="p-3 text-left font-semibold border dark:border-gray-700">
                Recommended Crops
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([condition, crops], index) => (
              <motion.tr
                key={condition}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800/50"
                    : "bg-white dark:bg-gray-900"
                } hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
              >
                <td className="p-3 border dark:border-gray-700">{condition}</td>
                <td className="p-3 border dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {crops.map((crop, cropIndex) => (
                      <Badge
                        key={cropIndex}
                        variant="outline"
                        className="bg-primary/5 hover:bg-primary/10 transition-colors"
                      >
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    );
  };

  if (!farmerInfo || !weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="overview">{t("Overview")}</TabsTrigger>
          <TabsTrigger value="weather">{t("Weather")}</TabsTrigger>
          <TabsTrigger value="market">{t("Market")}</TabsTrigger>
          <TabsTrigger value="government">
            {t("Government-Schemes")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={itemVariants}
          >
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{t("Welcome Back")}</CardTitle>
                <CardDescription>{t("Jai Javan Jai Kisan")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg" alt="Farmer" />
                    <AvatarFallback>
                      {farmerInfo.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{farmerInfo.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {farmerInfo.location.region}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("lastActive")}:{" "}
                      {new Date(farmerInfo.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{t("currentWeather")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {renderWeatherIcon(weatherData.current.condition.text)}
                    <div>
                      <p className="text-lg font-medium">
                        {weatherData.current.temp_c}°C
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("humidity")}: {weatherData.current.humidity}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("wind")}: {weatherData.current.wind_kph} km/h
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setActiveTab("weather")}
                >
                  <span>{t("viewForecast")}</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">Crop Recommendations</CardTitle>
              <CardDescription>
                Select a category to view detailed recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                {Object.entries(cropRecommendationData).map(
                  ([key, { title, icon }]) => (
                    <Button
                      key={key}
                      variant={selectedCategory === key ? "default" : "outline"}
                      className={`w-full ${
                        selectedCategory === key
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary/10"
                      }`}
                      onClick={() => setSelectedCategory(key)}
                    >
                      <div className="flex items-center space-x-2">
                        {icon}
                        <span className="text-sm">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                      </div>
                    </Button>
                  )
                )}
              </div>

              <AnimatePresence mode="wait">
                <div className="rounded-lg border dark:border-gray-700 overflow-hidden">
                  <div className="bg-primary/5 dark:bg-primary/10 p-4 flex items-center space-x-2">
                    {cropRecommendationData[selectedCategory].icon}
                    <h3 className="text-lg font-semibold">
                      {cropRecommendationData[selectedCategory].title}
                    </h3>
                  </div>
                  {renderCropTable(
                    cropRecommendationData[selectedCategory].data
                  )}
                </div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weather" className="space-y-4">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t("weatherForecast")}</CardTitle>
                <CardDescription>
                  {t("weatherForecastDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <WeatherCard
                      temp={weatherData.current.temp_c}
                      condition={weatherData.current.condition.text}
                      humidity={weatherData.current.humidity}
                      windSpeed={weatherData.current.wind_kph}
                      precipitation={weatherData.current.precip_in}
                      location={farmerInfo.location.region}
                      detailed={true}
                    />
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">{t("weeklyForecast")}</h3>
                    <div className="space-y-4">
                      {weatherData.forecast.forecastday.map(
                        (forecast, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex justify-between items-center border-b pb-2 last:border-0"
                          >
                            <span>
                              {t(
                                new Date(forecast.date)
                                  .toLocaleDateString("en-US", {
                                    weekday: "long",
                                  })
                                  .toLowerCase()
                              )}
                            </span>
                            <div className="flex items-center">
                              {renderWeatherIcon(forecast.day.condition.text)}
                              <span className="ml-2 font-medium">
                                {forecast.day.avgtemp_c}°C
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {forecast.day.daily_chance_of_rain}% {t("rain")}
                            </span>
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 border rounded-md p-4">
                  <h3 className="font-medium mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                    {t("weatherAlerts")}
                  </h3>

                  {weatherData.forecast.forecastday.some(
                    (forecast) => forecast.day.daily_chance_of_rain > 50
                  ) ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                      <h4 className="font-medium text-amber-800">
                        {t("rainExpected")}
                      </h4>
                      <p className="text-sm text-amber-700 mt-1">
                        {t("rainAlert")}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-amber-600">
                          {t("inNext")}:{" "}
                          {new Date(
                            weatherData.forecast.forecastday.find(
                              (forecast) =>
                                forecast.day.daily_chance_of_rain > 50
                            ).date
                          ).toLocaleDateString()}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                        >
                          {t("prepare")}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3">
                      <h4 className="font-medium text-green-800 font-bold">
                        {t("No Alerts")}
                      </h4>
                      <p className="text-sm text-green-700 mt-1 font-semibold">
                        {t("All is Well")}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t("marketPrices")}</CardTitle>
                <CardDescription>
                  {t("marketPricesDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {marketData.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-md p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{item.crop}</h3>
                        <Badge
                          variant={
                            item.trend === "rising"
                              ? "default"
                              : item.trend === "falling"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {item.trend === "rising"
                            ? "↑"
                            : item.trend === "falling"
                            ? "↓"
                            : "→"}{" "}
                          {t(item.trend)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 mt-3">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {t("currentPrice")}
                          </p>
                          <p className="font-medium">{item.currentPrice}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {t("recommendation")}
                          </p>
                          <p className="font-medium">{item.prediction}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {t("nearbyMarket")}
                          </p>
                          <p className="font-medium">{item.nearbyMarket}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  {t("viewAllPrices")}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t("marketTrends")}</CardTitle>
                <CardDescription>
                  {t("marketTrendsDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium">{t("bestTimeToSell")}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <Tractor className="h-5 w-5 text-green-500" />
                    <p className="text-green-700">{t("marketInsight")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="government" className="space-y-4">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t("governmentSchemes")}</CardTitle>
                <CardDescription>
                  {t("governmentSchemesDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {governmentSchemes.map((scheme, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-md p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-lg">{scheme.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {scheme.description}
                      </p>
                      <ul className="list-disc list-inside mt-2">
                        {scheme.advantages.map((advantage, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted-foreground"
                          >
                            {advantage}
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full"
                        asChild
                      >
                        <a
                          href={scheme.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("applyNow")}
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Dashboard;
