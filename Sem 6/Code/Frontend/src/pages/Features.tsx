
import React from 'react';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, CloudSun, BarChart3, MessageSquare, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();
  
  return (
    <PageLayout title="Features" description="Powerful tools designed for modern agriculture">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
        <Card className="shadow-md overflow-hidden group">
          <CardHeader className="pb-0">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">AI Crop Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <Zap className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Personalized crop suggestions based on your soil type</span>
              </li>
              <li className="flex items-start">
                <Zap className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Seasonal planting guidance optimized for your region</span>
              </li>
              <li className="flex items-start">
                <Zap className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Risk assessment for different crop varieties</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="group-hover:translate-x-1 transition-transform p-0" onClick={() => navigate('/crop-recommendation')}>
              Learn more <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="shadow-md overflow-hidden group">
          <CardHeader className="pb-0">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CloudSun className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Weather Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <Zap className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Advanced 10-day weather forecasting for your farm location</span>
              </li>
              <li className="flex items-start">
                <Zap className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Extreme weather event predictions and alerts</span>
              </li>
              <li className="flex items-start">
                <Zap className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Crop-specific weather impact assessments</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="group-hover:translate-x-1 transition-transform p-0" onClick={() => navigate('/weather-analysis')}>
              Learn more <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="shadow-md overflow-hidden group">
          <CardHeader className="pb-0">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Market Analytics</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <Zap className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Real-time market prices for your crops</span>
              </li>
              <li className="flex items-start">
                <Zap className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Price trend analysis and forecasting</span>
              </li>
              <li className="flex items-start">
                <Zap className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Optimal harvest timing recommendations</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="group-hover:translate-x-1 transition-transform p-0" onClick={() => navigate('/market-insights')}>
              Learn more <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="shadow-md overflow-hidden group">
          <CardHeader className="pb-0">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">AI Farming Assistant</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <Zap className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>24/7 AI chatbot for farming questions</span>
              </li>
              <li className="flex items-start">
                <Zap className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Immediate responses to pest, disease, and cultivation queries</span>
              </li>
              <li className="flex items-start">
                <Zap className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Multilingual support for global accessibility</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="group-hover:translate-x-1 transition-transform p-0">
              Try it now <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Features;
