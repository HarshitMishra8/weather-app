import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AQIDisplay from '@/components/AQIDisplay';
import WeatherWidget from '@/components/WeatherWidget';
import HealthAdvisory from '@/components/HealthAdvisory';
import CropAdvisory from '@/components/CropAdvisory';
import PollutionMap from '@/components/PollutionMap';
import Navigation from '@/components/Navigation';
import ForecastWidget from '@/components/ForecastWidget';
import AIChatbot from '@/components/AIChatbot';
import EmergencyAlerts from '@/components/EmergencyAlerts';
import LocationSelector from '@/components/LocationSelector';
import DataExport from '@/components/DataExport';
import AdvancedVisualizations from '@/components/AdvancedVisualizations';
import { 
  Satellite, 
  Globe, 
  Zap, 
  Bell, 
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Wifi
} from 'lucide-react';
import heroImage from '@/assets/hero-space.jpg';

// Mock data
const mockAQIData = {
  value: 89,
  category: 'Moderate',
  pollutants: {
    pm25: 35.2,
    pm10: 58.1,
    no2: 42.3,
    so2: 12.8,
    co: 1.2,
    o3: 88.5
  }
};

const mockWeatherData = {
  temperature: 24,
  condition: 'sunny',
  humidity: 65,
  windSpeed: 12,
  windDirection: 'NW',
  pressure: 1013,
  visibility: 8,
  uvIndex: 6
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isConnected, setIsConnected] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Delhi, India');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return (
          <div className="space-y-6">
            <PollutionMap />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WeatherWidget data={mockWeatherData} location="Your Location" />
              <AQIDisplay data={mockAQIData} />
            </div>
          </div>
        );
      case 'forecast':
        return (
          <div className="space-y-6">
            <ForecastWidget />
            <AdvancedVisualizations />
          </div>
        );
      case 'health':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <HealthAdvisory 
                aqi={mockAQIData.value} 
                temperature={mockWeatherData.temperature} 
                humidity={mockWeatherData.humidity} 
              />
              <div className="space-y-6">
                <WeatherWidget data={mockWeatherData} location="Your Location" />
                <AQIDisplay data={mockAQIData} />
              </div>
            </div>
            <EmergencyAlerts />
          </div>
        );
      case 'agriculture':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <CropAdvisory 
                aqi={mockAQIData.value} 
                temperature={mockWeatherData.temperature} 
                humidity={mockWeatherData.humidity}
                season="Winter"
              />
              <div className="space-y-6">
                <WeatherWidget data={mockWeatherData} location="Your Location" />
                <AQIDisplay data={mockAQIData} />
              </div>
            </div>
            <DataExport currentData={mockAQIData} />
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Hero Section */}
            <Card className="relative overflow-hidden bg-gradient-cosmic border-0 shadow-cosmic">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
              <div className="relative p-8 md:p-12 text-center space-y-6">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-primary/20 animate-pulse-glow">
                    <Satellite className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-left">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
                      AirScan India
                    </h1>
                    <p className="text-lg opacity-90">ISRO Satellite-Based Air Quality Monitor</p>
                  </div>
                </div>
                
                <p className="text-xl max-w-3xl mx-auto opacity-90">
                  Real-time air quality monitoring for rural and underserved areas using advanced satellite technology. 
                  Get health advisories, crop recommendations, and environmental alerts.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Badge variant="outline" className="px-4 py-2">
                    <Globe className="h-4 w-4 mr-2" />
                    All India Coverage
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    <Zap className="h-4 w-4 mr-2" />
                    Real-time Updates
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    <Bell className="h-4 w-4 mr-2" />
                    SMS Alerts Available
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Status Bar */}
            <Card className="bg-gradient-satellite border border-primary/20">
              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-accent animate-pulse' : 'bg-destructive'}`} />
                    <span className="text-sm font-medium">
                      {isConnected ? 'Connected' : 'Offline'}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{currentTime.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Delhi, India</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Satellite className="h-4 w-4" />
                    <span className="text-sm">Live Monitoring</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Location Selector */}
            <LocationSelector onLocationChange={(loc) => setCurrentLocation(loc.city + ', ' + loc.state)} />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="xl:col-span-1 space-y-6">
                <AQIDisplay data={mockAQIData} />
                <WeatherWidget data={mockWeatherData} location={currentLocation} />
              </div>

              {/* Middle Column */}
              <div className="xl:col-span-1 space-y-6">
                <HealthAdvisory 
                  aqi={mockAQIData.value} 
                  temperature={mockWeatherData.temperature} 
                  humidity={mockWeatherData.humidity} 
                />
              </div>

              {/* Right Column */}
              <div className="xl:col-span-1 space-y-6">
                <CropAdvisory 
                  aqi={mockAQIData.value} 
                  temperature={mockWeatherData.temperature} 
                  humidity={mockWeatherData.humidity}
                  season="Winter"
                />
              </div>
            </div>

            {/* Advanced Analytics */}
            <AdvancedVisualizations />

            {/* Full-width Map */}
            <PollutionMap />

            {/* Emergency Alerts */}
            <EmergencyAlerts />

            {/* Accessibility Features */}
            <Card className="bg-gradient-nebula border border-accent/30">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Accessibility Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                    <Phone className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">SMS Alerts</div>
                      <div className="text-xs opacity-80">Daily air quality updates via SMS</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                    <MessageSquare className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">Voice Assistant</div>
                      <div className="text-xs opacity-80">Ask questions in your language</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                    <Globe className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">Multi-language</div>
                      <div className="text-xs opacity-80">Available in 12 Indian languages</div>
                    </div>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
      />
    </div>
  );
};

export default Index;