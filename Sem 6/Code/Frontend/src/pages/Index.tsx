import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  Leaf,
  CloudSun,
  BarChart3,
  Lock,
  Check,
  Users,
  MessageSquare,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 flex flex-col items-center text-center">
        <div className="animate-fadeIn max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary/10 text-primary">
            AI-Powered Farming Assistant
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-agri-green-dark bg-clip-text text-transparent">
            Smart Decisions for Better Harvests
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get personalized crop recommendations, real-time weather insights,
            and market analysis tailored to your farm's unique conditions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-base shadow-md transition-transform hover:translate-y-[-2px] hover:shadow-lg"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-base"
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Revolutionize Your Farming Decisions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Make data-driven decisions with our comprehensive suite of tools
              designed specifically for farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col bg-card rounded-xl p-6 shadow-sm card-hover animate-slideUp">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                AI Crop Recommendations
              </h3>
              <p className="text-muted-foreground flex-grow">
                Get personalized crop suggestions based on your soil type,
                location, and local weather patterns.
              </p>
              <Button
                variant="link"
                className="p-0 mt-4 justify-start text-primary"
                onClick={() => navigate("/crop-recommendation")}
              >
                Explore recommendations
              </Button>
            </div>

            <div className="flex flex-col bg-card rounded-xl p-6 shadow-sm card-hover animate-slideUp [animation-delay:200ms]">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CloudSun className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Weather Risk Analysis</h3>
              <p className="text-muted-foreground flex-grow">
                Stay ahead of weather risks with advanced forecasting and
                actionable insights for your crops.
              </p>
              <Button
                variant="link"
                className="p-0 mt-4 justify-start text-primary"
                onClick={() => navigate("/weather-analysis")}
              >
                Check weather insights
              </Button>
            </div>

            <div className="flex flex-col bg-card rounded-xl p-6 shadow-sm card-hover animate-slideUp [animation-delay:400ms]">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Market Analytics</h3>
              <p className="text-muted-foreground flex-grow">
                Make informed selling decisions with real-time market prices and
                future price trend analysis.
              </p>
              <Button
                variant="link"
                className="p-0 mt-4 justify-start text-primary"
                onClick={() => navigate("/market-insights")}
              >
                View market trends
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start making smarter farming decisions in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative flex flex-col items-center text-center p-6">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="mt-10 mb-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Sign up and provide basic information about your farm location,
                soil type, and farm size.
              </p>
            </div>

            <div className="relative flex flex-col items-center text-center p-6">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="mt-10 mb-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Recommendations</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your farm data along with weather patterns and
                market trends to suggest optimal crops.
              </p>
            </div>

            <div className="relative flex flex-col items-center text-center p-6">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="mt-10 mb-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">
                Make Informed Decisions
              </h3>
              <p className="text-muted-foreground">
                Use our insights to select the best crops, plan for weather
                changes, and maximize market opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Trusted by Farmers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how AgriVision has helped farmers improve yields and increase
              profits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-sm card-hover">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-semibold mr-4">
                  RS
                </div>
                <div>
                  <h4 className="font-bold">Rajesh Singh</h4>
                  <p className="text-sm text-muted-foreground">
                    Wheat Farmer, Punjab
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The crop recommendations saved my harvest during an unexpected
                weather change. The system warned me in advance and suggested
                preventive measures."
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm card-hover">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-semibold mr-4">
                  VP
                </div>
                <div>
                  <h4 className="font-bold">Vidya Patil</h4>
                  <p className="text-sm text-muted-foreground">
                    Rice Grower, Maharashtra
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I increased my profits by 20% by following the market insight
                recommendations. The price trend analysis helped me time my
                sales perfectly."
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm card-hover">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-semibold mr-4">
                  KR
                </div>
                <div>
                  <h4 className="font-bold">Kiran Reddy</h4>
                  <p className="text-sm text-muted-foreground">
                    Mixed Crop Farmer, Telangana
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The AI recommendations helped me diversify my crops and reduce
                risk. Even during a drought year, I managed to maintain steady
                income."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-agri-green/10 rounded-2xl p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to Transform Your Farming Approach?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using AgriVision to make
            smarter decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-base shadow-md"
              onClick={() => navigate("/signup")}
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-base"
              onClick={() =>
                window.open("https://calendly.com/yourdemo", "_blank")
              }
            >
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Why Choose AgriVision
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for farmers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-sm flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Data-Driven Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Our recommendations are based on scientific analysis of soil,
                  weather, and crop data.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Real-Time Weather Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Stay ahead of weather changes with timely alerts and impact
                  analysis.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Market Price Trends</h3>
                <p className="text-sm text-muted-foreground">
                  Track market prices and get forecasts to time your sales for
                  maximum profit.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Personalized Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get crop suggestions tailored to your specific farm conditions
                  and preferences.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Risk Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  Evaluate potential risks and get alternative crop options to
                  minimize losses.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Multilingual Support</h3>
                <p className="text-sm text-muted-foreground">
                  Access all features in multiple languages for better
                  accessibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-primary/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">AgriVision</h3>
              <p className="text-sm text-muted-foreground mb-4">
                AI-powered farming assistant helping farmers make data-driven
                decisions.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-facebook"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-instagram"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Crop Recommendations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Weather Analysis
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Market Insights
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    IoT Integration
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    AI Chatbot
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AgriVision. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Index;
