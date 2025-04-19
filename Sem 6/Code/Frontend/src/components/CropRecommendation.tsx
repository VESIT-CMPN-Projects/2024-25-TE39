import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUp, Droplet, CloudRain, Sun, Wind, AlertTriangle, FileDown, ArrowUpDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from 'jspdf';

const CropRecommendation: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("primary");
  const [formData, setFormData] = useState({
    State: '',
    District: '',
    Market: '',
    latitude: '',
    longitude: '',
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
    irrigationAccess: true,
  });
  const [predictedCommodity, setPredictedCommodity] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict_crop', formData);
      if (response.data && response.data.predicted_commodity) {
        setPredictedCommodity(response.data.predicted_commodity);
        setShowResults(true);
        toast({
          title: "Analysis complete",
          description: "We've analyzed your farm data and generated crop recommendations",
        });
      } else {
        toast({
          title: "Error",
          description: "The predicted commodity was not found in the response. Please try again.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error analyzing your farm data. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.text("Crop Recommendation Report", 10, 10);
    doc.text(`Recommended Crop: ${predictedCommodity}`, 10, 20);
    doc.text("Additional details can be added here.", 10, 30);
    doc.save('receipt.pdf');
    toast({
      title: "Report downloaded",
      description: "Your crop recommendation report has been downloaded",
    });
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
        },
        (error) => {
          toast({
            title: "Location access denied",
            description: "Please enable location access to auto-fill coordinates.",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation.",
      });
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Crop Recommendation</h1>
        <p className="text-muted-foreground">Get AI-powered crop suggestions based on your farm data</p>
      </div>

      {!showResults ? (
        <Card className="shadow-md transition-shadow duration-300 animate-fadeIn">
          <CardHeader>
            <CardTitle>Enter Your Farm Details</CardTitle>
            <CardDescription>
              Provide information about your farm to get personalized crop recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <div className="border p-4 rounded-md shadow-sm space-y-4">
                    <h3 className="text-lg font-semibold">Location Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">State</label>
                        <Input
                          type="text"
                          name="State"
                          placeholder="e.g., Maharashtra"
                          value={formData.State}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">District</label>
                        <Input
                          type="text"
                          name="District"
                          placeholder="e.g., Nashik"
                          value={formData.District}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Market</label>
                        <Input
                          type="text"
                          name="Market"
                          placeholder="e.g., Nashik Market"
                          value={formData.Market}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="border p-4 rounded-md shadow-sm space-y-4">
                    <h3 className="text-lg font-semibold">Coordinates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Latitude</label>
                        <Input
                          type="number"
                          name="latitude"
                          placeholder="e.g., 19.9975"
                          value={formData.latitude}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Longitude</label>
                        <Input
                          type="number"
                          name="longitude"
                          placeholder="e.g., 73.7898"
                          value={formData.longitude}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="border p-4 rounded-md shadow-sm space-y-4">
                    <h3 className="text-lg font-semibold">Soil Nutrients (NPK)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nitrogen (N)</label>
                        <Input
                          type="number"
                          name="N"
                          placeholder="e.g., 25"
                          value={formData.N}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phosphorus (P)</label>
                        <Input
                          type="number"
                          name="P"
                          placeholder="e.g., 15"
                          value={formData.P}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Potassium (K)</label>
                        <Input
                          type="number"
                          name="K"
                          placeholder="e.g., 20"
                          value={formData.K}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="border p-4 rounded-md shadow-sm space-y-4">
                    <h3 className="text-lg font-semibold">Environmental Conditions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Temperature (°C)</label>
                        <Input
                          type="number"
                          name="temperature"
                          placeholder="e.g., 28.5"
                          value={formData.temperature}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Humidity (%)</label>
                        <Input
                          type="number"
                          name="humidity"
                          placeholder="e.g., 65.0"
                          value={formData.humidity}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">pH Level</label>
                        <Input
                          type="number"
                          name="ph"
                          placeholder="e.g., 6.8"
                          min="0"
                          max="14"
                          step="0.1"
                          value={formData.ph}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Rainfall (mm)</label>
                        <Input
                          type="number"
                          name="rainfall"
                          placeholder="e.g., 120.0"
                          value={formData.rainfall}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="irrigationAccess"
                    name="irrigationAccess"
                    checked={formData.irrigationAccess}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="irrigationAccess" className="text-sm">
                    I have access to irrigation
                  </label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Analyzing your farm data..." : "Get Recommendations"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="primary" className="flex items-center">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Primary Recommendations
                  </TabsTrigger>
                  <TabsTrigger value="alternative" className="flex items-center">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Alternative Options
                  </TabsTrigger>
                </TabsList>

                <Button variant="outline" onClick={handleDownloadReport} className="flex items-center">
                  <FileDown className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </div>

              <TabsContent value="primary" className="mt-0">
                <div className="space-y-6">
                  <Card className="card-hover overflow-hidden">
                    <CardHeader className="pb-2 relative">
                      <div className="absolute top-4 right-4 bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center">
                        <span className="text-sm font-medium">
                          100% Match
                        </span>
                      </div>
                      <CardTitle className="text-2xl">{predictedCommodity}</CardTitle>
                      <CardDescription>
                        Best suited for your farm conditions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Droplet className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">Water Need</p>
                            <p className="font-medium">Medium</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Sun className="h-5 w-5 text-yellow-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">Growing Period</p>
                            <p className="font-medium">110-130 days</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CloudRain className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">Market Price</p>
                            <p className="font-medium">₹2,200/quintal</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Wind className="h-5 w-5 text-purple-500" />
                          <div>
                            <p className="text-sm text-muted-foreground">Profit Potential</p>
                            <p className="font-medium">High</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="font-medium flex items-center mb-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                          Risk Factors
                        </p>
                        <ul className="space-y-1 ml-6 text-sm text-muted-foreground list-disc">
                          <li>Susceptible to rust disease</li>
                          <li>Requires moderate irrigation</li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">View detailed analysis</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="alternative" className="mt-0">
                <div className="space-y-6">
                  {/* Alternative recommendations can be displayed here */}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <Button variant="outline" onClick={() => setShowResults(false)} className="w-full">
            Start a new recommendation
          </Button>
        </div>
      )}
    </div>
  );
};

export default CropRecommendation;
