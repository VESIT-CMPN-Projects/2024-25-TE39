import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, MapPin, Phone, Mail, Edit2, Save, Trash2, FileText, Calendar, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: null,
    email: null,
    phone: null,
    location: {
      latitude: null,
      longitude: null,
      region: null,
    },
    farmSize: null,
    soilType: null,
    crops_cultivated: [],
    expense: null,
    income: null,
    joinedDate: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found. Please sign in first.');
          return;
        }

        const response = await axios.get('http://localhost:8080/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { farmer } = response.data;
        setUserData({
          name: farmer.name,
          email: farmer.email,
          phone: farmer.phone || '',
          location: {
            latitude: farmer.location?.latitude || null,
            longitude: farmer.location?.longitude || null,
            region: farmer.location?.region || null,
          },
          farmSize: farmer.farmSize || null,
          soilType: farmer.soilType || null,
          crops_cultivated: farmer.crops_cultivated || [],
          expense: farmer.expense || null,
          income: farmer.income || null,
          joinedDate: new Date(farmer.createdAt).toLocaleDateString(),
        });
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data || error.message);
        toast({
          title: "Error",
          description: "Failed to fetch profile data.",
          variant: "destructive",
        });
      }
    };

    fetchProfile();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSaveProfile = async () => {
    try {

      const token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found. Please sign in first.');
          return;
        }

        const response = await axios.put('http://localhost:8080/UpdateProfile', userData, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      

      console.log("response",response)
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  const handleViewRecommendation = (id: string) => {
    navigate(`/crop-recommendation/history/${id}`);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserData((prevData) => ({
            ...prevData,
            location: {
              ...prevData.location,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          }));
        },
        (error) => {
          toast({
            title: "Error",
            description: "Unable to retrieve your location.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  // Mock crop recommendations history
  const recommendationsHistory = [
    {
      id: "rec-123",
      date: "Oct 15, 2023",
      season: "Rabi",
      primaryCrop: "Wheat",
      confidence: 92,
      alternativeCrops: ["Barley", "Chickpea"],
    },
    {
      id: "rec-122",
      date: "Jun 10, 2023",
      season: "Kharif",
      primaryCrop: "Rice",
      confidence: 88,
      alternativeCrops: ["Maize", "Soybean"],
    },
    {
      id: "rec-121",
      date: "Feb 22, 2023",
      season: "Zaid",
      primaryCrop: "Mung Bean",
      confidence: 85,
      alternativeCrops: ["Cucumber", "Watermelon"],
    },
  ];

  // Notification preferences
  const [notifications, setNotifications] = useState({
    weatherAlerts: true,
    marketUpdates: true,
    cropRecommendations: true,
    priceAlerts: false,
  });

  const handleToggleNotification = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications],
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center justify-center">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center justify-center">
            <FileText className="mr-2 h-4 w-4" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center justify-center">
            <Edit2 className="mr-2 h-4 w-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6 animate-fadeIn">
          <Card className="card-hover">
            <CardHeader className="relative pb-2">
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}

              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-semibold mr-4">
                  {userData.name ? userData.name.split(' ').map(n => n[0]).join('') : 'N/A'}
                </div>
                <div>
                  <CardTitle className="text-2xl">{userData.name || 'N/A'}</CardTitle>
                  <CardDescription>Member since {userData.joinedDate || 'N/A'}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        name="name"
                        value={userData.name || ''}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={userData.email || ''}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input
                        name="phone"
                        value={userData.phone || ''}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        name="region"
                        value={userData.location.region || ''}
                        onChange={(e) => setUserData({
                          ...userData,
                          location: { ...userData.location, region: e.target.value }
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Latitude</label>
                      <Input
                        name="latitude"
                        type="number"
                        value={userData.location.latitude || ''}
                        onChange={(e) => setUserData({
                          ...userData,
                          location: { ...userData.location, latitude: parseFloat(e.target.value) }
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Longitude</label>
                      <Input
                        name="longitude"
                        type="number"
                        value={userData.location.longitude || ''}
                        onChange={(e) => setUserData({
                          ...userData,
                          location: { ...userData.location, longitude: parseFloat(e.target.value) }
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Farm Size</label>
                      <Input
                        name="farmSize"
                        value={userData.farmSize || ''}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Soil Type</label>
                      <Select
                        value={userData.soilType || ''}
                        onValueChange={(value) => handleSelectChange('soilType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Clay">Clay</SelectItem>
                          <SelectItem value="Sandy">Sandy</SelectItem>
                          <SelectItem value="Silty">Silty</SelectItem>
                          <SelectItem value="Peaty">Peaty</SelectItem>
                          <SelectItem value="Chalky">Chalky</SelectItem>
                          <SelectItem value="Loamy">Loamy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Crops Cultivated</label>
                      <Input
                        name="crops_cultivated"
                        value={userData.crops_cultivated.join(', ') || ''}
                        onChange={(e) => setUserData({
                          ...userData,
                          crops_cultivated: e.target.value.split(',').map(crop => crop.trim())
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Expense</label>
                      <Input
                        name="expense"
                        type="number"
                        value={userData.expense || ''}
                        onChange={(e) => setUserData({
                          ...userData,
                          expense: parseFloat(e.target.value)
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Income</label>
                      <Input
                        name="income"
                        type="number"
                        value={userData.income || ''}
                        onChange={(e) => setUserData({
                          ...userData,
                          income: parseFloat(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-muted-foreground mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{userData.email || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-muted-foreground mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p>{userData.phone || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p>{userData.location.region || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p>{userData.joinedDate || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h3 className="font-medium mb-3">Farm Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">Farm Size</p>
                        <p className="font-medium">{userData.farmSize || 'N/A'}</p>
                      </div>

                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">Soil Type</p>
                        <p className="font-medium">{userData.soilType || 'N/A'}</p>
                      </div>

                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">Main Crops</p>
                        <p className="font-medium">{userData.crops_cultivated.join(', ') || 'N/A'}</p>
                      </div>

                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">Expense</p>
                        <p className="font-medium">{userData.expense || 'N/A'}</p>
                      </div>

                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">Income</p>
                        <p className="font-medium">{userData.income || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {isEditing && (
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button className="flex items-center" onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>
                Permanently delete your account and all associated data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This action cannot be undone. All your data, including crop recommendations,
                farm details, and preferences will be permanently removed.
              </p>
              <Button variant="destructive" className="flex items-center" onClick={() => {
                toast({
                  title: "Account deletion",
                  description: "This feature is not implemented in the demo.",
                  variant: "destructive",
                });
              }}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6 space-y-6 animate-fadeIn">
          <Card>
            <CardHeader>
              <CardTitle>Crop Recommendation History</CardTitle>
              <CardDescription>Past crop recommendations for your farm</CardDescription>
            </CardHeader>
            <CardContent>
              {recommendationsHistory.length > 0 ? (
                <div className="space-y-4">
                  {recommendationsHistory.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => handleViewRecommendation(rec.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{rec.season} Season Recommendation</h3>
                          <p className="text-sm text-muted-foreground">{rec.date}</p>
                        </div>
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                          {rec.confidence}% Match
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Primary Recommendation</p>
                            <p className="font-semibold">{rec.primaryCrop}</p>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground">Alternative Options</p>
                            <p>{rec.alternativeCrops.join(', ')}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end mt-3 text-primary text-sm">
                        <span>View details</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-muted">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-2 text-lg font-medium">No recommendations yet</h3>
                  <p className="mt-1 text-muted-foreground">
                    You haven't received any crop recommendations yet.
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => navigate('/crop-recommendation')}
                  >
                    Get your first recommendation
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6 space-y-6 animate-fadeIn">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage what updates you receive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weather Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts about extreme weather events in your area
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notifications.weatherAlerts}
                        onChange={() => handleToggleNotification('weatherAlerts')}
                      />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Market Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly updates about crop prices and market trends
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notifications.marketUpdates}
                        onChange={() => handleToggleNotification('marketUpdates')}
                      />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Crop Recommendations</p>
                    <p className="text-sm text-muted-foreground">
                      Receive seasonal crop recommendations based on your farm data
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notifications.cropRecommendations}
                        onChange={() => handleToggleNotification('cropRecommendations')}
                      />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Price Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when crop prices reach your target values
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notifications.priceAlerts}
                        onChange={() => handleToggleNotification('priceAlerts')}
                      />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language Preferences</CardTitle>
              <CardDescription>Set your preferred language for notifications and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Language</label>
                  <Select defaultValue="english">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="gujarati">Gujarati</SelectItem>
                      <SelectItem value="marathi">Marathi</SelectItem>
                      <SelectItem value="punjabi">Punjabi</SelectItem>
                      <SelectItem value="telugu">Telugu</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" onClick={() => {
                  toast({
                    title: "Preferences saved",
                    description: "Your language preferences have been updated.",
                  });
                }}>
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
