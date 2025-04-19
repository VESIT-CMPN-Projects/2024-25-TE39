// export default IrrigationCalculator;
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Droplets, Thermometer, Wind, RefreshCw } from 'lucide-react';
import axios from 'axios';

const crops = [
  'Cucumber', 'Cauliflower', 'Potato', 'Carrot', 'Cabbage', 'Grapes',
  'Rice', 'Pumpkin', 'Paddy', 'Tomato', 'Spinach', 'Banana', 'Onion', 'Brinjal',
  'Wheat', 'Green Chilli', 'Bhindi', 'Raddish', 'Garlic'
];

const IrrigationCalculator = () => {
  const [soilMoisture, setSoilMoisture] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [waterRequirement, setWaterRequirement] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSensorData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/getIotData');

      // Assuming the response data is an array of objects
      const data = response.data;

      if (data.length > 0) {
        // Extract the latest data from the first object in the array
        const { temperature, humidity, soilMoisture } = data[data.length - 1];

        setSoilMoisture(soilMoisture);
        setTemperature(temperature);
        setHumidity(humidity);
      } else {
        setError('No data available.');
      }
    } catch (err) {
      setError('Failed to fetch sensor data. Please try again.');
      console.error('Error fetching sensor data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateWaterRequirement = async () => {
    if (!selectedCrop) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/predict_irrigation', {
        "Crop Type": selectedCrop,
        "Temperature (°C)": temperature,
        "Humidity (%)": humidity,
        "Soil Moisture (%)": soilMoisture
      });

      const prediction = response.data["Predicted Irrigation Water Required (mm/acre)"];
      setWaterRequirement(prediction);
    } catch (err) {
      setError('Failed to calculate water requirement. Please try again.');
      console.error('Error calculating water requirement:', err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    calculateWaterRequirement();
  }, [soilMoisture, temperature, humidity, selectedCrop]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen w-full px-4 py-8 bg-gradient-to-br from-background via-background to-muted/20"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div variants={cardVariants}>
          <Card className="overflow-hidden bg-gradient-to-br from-background to-muted/50 border border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Irrigation Calculator
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground/80">
                Calculate water requirements for your crops
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Sensor Data</h3>
                    <Button
                      onClick={fetchSensorData}
                      disabled={isLoading}
                      className="bg-primary/10 hover:bg-primary/20 text-primary"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                      Get Data
                    </Button>
                  </div>

                  {error && (
                    <div className="text-sm text-red-500 mb-4">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      Soil Moisture (%)
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={soilMoisture}
                      onChange={(e) => setSoilMoisture(Number(e.target.value))}
                      className="bg-background/50 border-primary/20 focus:border-primary/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-red-500" />
                      Temperature (°C)
                    </Label>
                    <Input
                      type="number"
                      value={temperature}
                      onChange={(e) => setTemperature(Number(e.target.value))}
                      className="bg-background/50 border-primary/20 focus:border-primary/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Wind className="w-4 h-4 text-green-500" />
                      Humidity (%)
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={humidity}
                      onChange={(e) => setHumidity(Number(e.target.value))}
                      className="bg-background/50 border-primary/20 focus:border-primary/40"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Select Crop</Label>
                    <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                      <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary/40">
                        <SelectValue placeholder="Select a crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {crops.map((crop) => (
                          <SelectItem key={crop} value={crop}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {waterRequirement !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 p-6 rounded-lg bg-primary/5 border border-primary/20"
                    >
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        Water Requirement
                      </h3>
                      <div className="text-3xl font-bold text-foreground">
                        {waterRequirement} <span className="text-lg text-muted-foreground">mm/acre</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        This is the estimated water requirement based on current conditions
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="bg-gradient-to-br from-background to-muted/30 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Tips for Efficient Irrigation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Monitor soil moisture regularly to avoid over-irrigation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Water early in the morning or late in the evening to reduce evaporation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Consider using drip irrigation for better water efficiency
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Adjust irrigation based on weather forecasts
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IrrigationCalculator;
