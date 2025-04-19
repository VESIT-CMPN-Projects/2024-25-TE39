
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, CreditCard, AlertCircle, Calendar, ArrowRight } from 'lucide-react';

const MarketInsights: React.FC = () => {
  const [activeTab, setActiveTab] = useState("prices");
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  
  // Mock data for crops
  const crops = [
    { value: "wheat", label: "Wheat" },
    { value: "rice", label: "Rice" },
    { value: "maize", label: "Maize" },
    { value: "soybean", label: "Soybean" },
    { value: "cotton", label: "Cotton" },
    { value: "sugarcane", label: "Sugarcane" },
  ];
  
  // Mock data for current prices
  const currentPrices = [
    { crop: "Wheat", price: 2200, change: 5.2, trend: "up" },
    { crop: "Rice", price: 1950, change: 0.8, trend: "up" },
    { crop: "Maize", price: 1800, change: -2.1, trend: "down" },
    { crop: "Soybean", price: 3800, change: 3.4, trend: "up" },
    { crop: "Cotton", price: 6500, change: -1.5, trend: "down" },
    { crop: "Sugarcane", price: 2800, change: 0.3, trend: "up" },
  ];
  
  // Mock data for price history (monthly data for selected crop)
  const getPriceHistory = (crop: string) => {
    const baseData = [
      { month: 'Jan', price: 2100 },
      { month: 'Feb', price: 2050 },
      { month: 'Mar', price: 2000 },
      { month: 'Apr', price: 2100 },
      { month: 'May', price: 2150 },
      { month: 'Jun', price: 2200 },
      { month: 'Jul', price: 2180 },
      { month: 'Aug', price: 2100 },
      { month: 'Sep', price: 2150 },
      { month: 'Oct', price: 2220 },
      { month: 'Nov', price: 2200 },
      { month: 'Dec', price: 2250 },
    ];
    
    // Add some variation based on the crop
    const multiplier = {
      wheat: 1,
      rice: 0.9,
      maize: 0.8,
      soybean: 1.7,
      cotton: 3,
      sugarcane: 1.3,
    }[crop] || 1;
    
    return baseData.map(item => ({
      ...item,
      price: Math.round(item.price * multiplier)
    }));
  };
  
  // Mock data for market forecasts (next few months prediction)
  const getForecastData = (crop: string) => {
    const currentMonth = new Date().getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const startPrice = {
      wheat: 2200,
      rice: 1950,
      maize: 1800,
      soybean: 3800,
      cotton: 6500,
      sugarcane: 2800,
    }[crop] || 2000;
    
    // Generate 6 months of forecast with some variation
    return Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (currentMonth + i) % 12;
      const variation = Math.random() * 0.1 - 0.05; // -5% to +5%
      return {
        month: months[monthIndex],
        price: Math.round(startPrice * (1 + variation * (i + 1))),
        forecast: true,
      };
    });
  };
  
  // Mock data for local markets
  const localMarkets = [
    {
      name: "Central Agricultural Market",
      distance: "12 km",
      wheatPrice: 2250,
      ricePrice: 1980,
      maizePrice: 1850,
      transport: "Available",
    },
    {
      name: "Eastern District Mandi",
      distance: "28 km",
      wheatPrice: 2300,
      ricePrice: 2000,
      maizePrice: 1830,
      transport: "Limited",
    },
    {
      name: "Southern Cooperative Market",
      distance: "35 km",
      wheatPrice: 2180,
      ricePrice: 1920,
      maizePrice: 1790,
      transport: "Available",
    },
    {
      name: "Northern Regional Market",
      distance: "42 km",
      wheatPrice: 2350,
      ricePrice: 2050,
      maizePrice: 1880,
      transport: "Not Available",
    },
  ];
  
  // Mock data for market news
  const marketNews = [
    {
      title: "Government increases MSP for wheat by 2%",
      date: "Oct 12, 2023",
      summary: "The government has announced a 2% increase in the Minimum Support Price (MSP) for wheat for the upcoming season.",
      impact: "positive",
    },
    {
      title: "Rainfall deficit may affect rice production",
      date: "Oct 8, 2023",
      summary: "Several rice-growing regions are experiencing lower than expected rainfall, which could reduce yields and potentially increase prices.",
      impact: "mixed",
    },
    {
      title: "Export restrictions lifted on selected agricultural products",
      date: "Oct 5, 2023",
      summary: "The government has lifted export restrictions on several agricultural products, opening new market opportunities for farmers.",
      impact: "positive",
    },
    {
      title: "New pest affecting cotton crops in western regions",
      date: "Oct 1, 2023",
      summary: "Reports of a new pest affecting cotton crops in western regions could impact cotton supplies and prices in the coming months.",
      impact: "negative",
    },
  ];
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'text-green-600 dark:text-green-400';
      case 'negative':
        return 'text-red-600 dark:text-red-400';
      case 'mixed':
        return 'text-amber-600 dark:text-amber-400';
      default:
        return 'text-blue-600 dark:text-blue-400';
    }
  };
  
  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };
  
  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
    ) : (
      <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
    );
  };
  
  // Get price for selected crop
  const selectedCropData = currentPrices.find(item => item.crop.toLowerCase() === selectedCrop);
  const priceHistory = getPriceHistory(selectedCrop);
  const forecastData = getForecastData(selectedCrop);
  
  // Combine historical and forecast data for the chart
  const combinedChartData = [
    ...priceHistory.slice(-6), // Last 6 months of historical data
    ...forecastData
  ];
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Market Insights</h1>
        <p className="text-muted-foreground">Track crop prices, trends, and market forecasts</p>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="w-full sm:w-64">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger>
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map((crop) => (
                <SelectItem key={crop.value} value={crop.value}>
                  {crop.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="prices" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Prices</span>
            </TabsTrigger>
            <TabsTrigger value="markets" className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Markets</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center">
              <AlertCircle className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">News</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TabsContent value="prices" className="space-y-6 animate-fadeIn mt-0">
        {selectedCropData && (
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>{selectedCropData.crop} Current Price</span>
                <div className="flex items-center">
                  {getTrendIcon(selectedCropData.trend)}
                  <span className={`ml-1 ${getTrendColor(selectedCropData.trend)}`}>
                    {selectedCropData.trend === 'up' ? '+' : ''}{selectedCropData.change}%
                  </span>
                </div>
              </CardTitle>
              <CardDescription>
                Updated today at 10:00 AM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">₹{selectedCropData.price}/quintal</div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Price History (Last 12 Months)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={priceHistory}
                      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="price"
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Price Forecast (Next 6 Months)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={combinedChartData}
                      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="price"
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={(props) => {
                          const { cx, cy, payload } = props;
                          if (payload.forecast) {
                            return (
                              <svg x={cx - 5} y={cy - 5} width="10" height="10" fill="none" viewBox="0 0 10 10">
                                <circle cx="5" cy="5" r="4" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="2 2" />
                              </svg>
                            );
                          }
                          return (
                            <svg x={cx - 5} y={cy - 5} width="10" height="10" fill="hsl(var(--primary))" viewBox="0 0 10 10">
                              <circle cx="5" cy="5" r="4" />
                            </svg>
                          );
                        }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-end mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center mr-4">
                    <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
                    <span>Historical</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full border-2 border-primary border-dashed mr-1"></div>
                    <span>Forecast</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Market Insights</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Best Time to Sell</p>
                      <p className="text-sm text-muted-foreground">Based on historical trends, the best time to sell {selectedCropData.crop.toLowerCase()} is likely to be in December when prices typically peak.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Price Forecast</p>
                      <p className="text-sm text-muted-foreground">Prices for {selectedCropData.crop.toLowerCase()} are expected to {selectedCropData.trend === 'up' ? 'continue rising' : 'stabilize'} over the next 3 months due to {selectedCropData.trend === 'up' ? 'increasing demand' : 'balanced supply and demand'}.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>All Crop Prices</CardTitle>
            <CardDescription>Current market prices for major crops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={currentPrices}
                  margin={{ top: 5, right: 20, bottom: 25, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.3} />
                  <XAxis dataKey="crop" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}/quintal`, 'Price']} />
                  <Bar dataKey="price" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentPrices.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{item.crop}</p>
                    <p className="text-sm text-muted-foreground">₹{item.price}/quintal</p>
                  </div>
                  <div className="flex items-center">
                    {getTrendIcon(item.trend)}
                    <span className={`ml-1 ${getTrendColor(item.trend)}`}>
                      {item.trend === 'up' ? '+' : ''}{item.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="markets" className="space-y-6 animate-fadeIn mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Local Markets</CardTitle>
            <CardDescription>Prices and details for markets in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium">Market</th>
                    <th className="text-left py-3 font-medium">Distance</th>
                    <th className="text-left py-3 font-medium">Wheat Price</th>
                    <th className="text-left py-3 font-medium">Rice Price</th>
                    <th className="text-left py-3 font-medium">Maize Price</th>
                    <th className="text-left py-3 font-medium">Transport</th>
                  </tr>
                </thead>
                <tbody>
                  {localMarkets.map((market, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3">{market.name}</td>
                      <td className="py-3">{market.distance}</td>
                      <td className="py-3">₹{market.wheatPrice}/quintal</td>
                      <td className="py-3">₹{market.ricePrice}/quintal</td>
                      <td className="py-3">₹{market.maizePrice}/quintal</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          market.transport === 'Available' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : market.transport === 'Limited' 
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {market.transport}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Market Transport Assistance</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Need help transporting your crops to the market? We can connect you with local transport providers.
              </p>
              <div className="flex items-center text-primary text-sm">
                <span>Contact transportation partners</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Wholesale vs. Retail Prices</CardTitle>
            <CardDescription>Compare prices for selling in different market channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Wheat', wholesale: 2200, retail: 2600 },
                      { name: 'Rice', wholesale: 1950, retail: 2400 },
                      { name: 'Maize', wholesale: 1800, retail: 2100 },
                      { name: 'Soybean', wholesale: 3800, retail: 4500 },
                    ]}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}/quintal`, '']} />
                    <Bar dataKey="wholesale" name="Wholesale Price" fill="hsl(var(--primary))" />
                    <Bar dataKey="retail" name="Retail Price" fill="hsl(var(--secondary-foreground))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Direct-to-Consumer Options</h3>
                <p className="text-sm text-muted-foreground">
                  Selling directly to consumers can increase your profits by 15-25% compared to wholesale markets. 
                  Consider options like farmer's markets, online platforms, or community-supported agriculture (CSA) programs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="news" className="space-y-6 animate-fadeIn mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Market News & Updates</CardTitle>
            <CardDescription>Latest news affecting agricultural markets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {marketNews.map((news, index) => (
                <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{news.title}</h3>
                    <span className="text-sm text-muted-foreground">{news.date}</span>
                  </div>
                  <p className="text-muted-foreground mb-2">{news.summary}</p>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">Impact: </span>
                    <span className={`ml-1 text-sm ${getImpactColor(news.impact)}`}>
                      {news.impact.charAt(0).toUpperCase() + news.impact.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Government Policies & Subsidies</CardTitle>
            <CardDescription>Recent policy changes affecting farmers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Minimum Support Price (MSP) Update</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  The government has announced new MSP rates for the upcoming Rabi season:
                </p>
                <ul className="space-y-1 ml-5 list-disc text-sm text-muted-foreground">
                  <li>Wheat: ₹2,125/quintal (5% increase)</li>
                  <li>Barley: ₹1,735/quintal (4.7% increase)</li>
                  <li>Gram: ₹5,335/quintal (3.8% increase)</li>
                  <li>Rapeseed & Mustard: ₹5,450/quintal (5.1% increase)</li>
                </ul>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">PM-KISAN Scheme</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  The next installment of PM-KISAN (₹2,000) is scheduled to be distributed in November.
                  Ensure your details are updated in the PM-KISAN portal to receive the benefit.
                </p>
                <div className="flex items-center text-primary text-sm">
                  <span>Check registration status</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Agricultural Infrastructure Fund</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Applications are now open for low-interest loans under the Agricultural Infrastructure Fund
                  for building farm-gate infrastructure like storage facilities, processing units, and cold chains.
                </p>
                <div className="flex items-center text-primary text-sm">
                  <span>Learn more about eligibility</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default MarketInsights;
