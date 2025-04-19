
import React from 'react';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, LightbulbIcon, GlobeIcon } from "lucide-react";

const About = () => {
  return (
    <PageLayout title="About AgriVision" description="Pioneering AI-Powered Agricultural Solutions">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              AgriVision empowers farmers with AI-driven insights to optimize crop selection, 
              anticipate weather patterns, and maximize market opportunities, transforming 
              traditional farming into a data-informed practice.
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We envision a future where every farmer, regardless of scale, has access to 
              advanced agricultural technology, creating sustainable farming practices and 
              enhancing global food security.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-12 mt-16">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Our Approach</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="shadow-sm border-t-4 border-t-primary">
            <CardHeader className="space-y-1">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Data-Driven Insights</CardTitle>
              <CardDescription>Agricultural intelligence at your fingertips</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our AI algorithms analyze soil conditions, weather patterns, and market trends 
                to provide actionable recommendations tailored to your farm's unique needs.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-t-4 border-t-primary">
            <CardHeader className="space-y-1">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Farmer-Centric Design</CardTitle>
              <CardDescription>Built with farmers, for farmers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Every feature is developed in collaboration with agricultural experts and working 
                farmers to ensure our solutions address real-world farming challenges.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-t-4 border-t-primary">
            <CardHeader className="space-y-1">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <LightbulbIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Innovation Focus</CardTitle>
              <CardDescription>Constantly evolving technology</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We continuously invest in research and development to bring cutting-edge 
                agricultural technology to farmers around the world.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
