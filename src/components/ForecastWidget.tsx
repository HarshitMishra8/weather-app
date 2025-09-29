import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Wind, 
  Thermometer,
  Cloud,
  Sun,
  CloudRain,
  Eye,
  Droplets
} from 'lucide-react';

interface ForecastDay {
  date: string;
  dayName: string;
  aqi: number;
  temperature: { min: number; max: number };
  condition: string;
  humidity: number;
  windSpeed: number;
  trend: 'up' | 'down' | 'stable';
}

const mockForecastData: ForecastDay[] = [
  {
    date: '2024-01-15',
    dayName: 'Today',
    aqi: 89,
    temperature: { min: 18, max: 28 },
    condition: 'sunny',
    humidity: 65,
    windSpeed: 12,
    trend: 'down'
  },
  {
    date: '2024-01-16',
    dayName: 'Tomorrow',
    aqi: 67,
    temperature: { min: 16, max: 26 },
    condition: 'cloudy',
    humidity: 70,
    windSpeed: 15,
    trend: 'down'
  },
  {
    date: '2024-01-17',
    dayName: 'Wednesday',
    aqi: 78,
    temperature: { min: 19, max: 29 },
    condition: 'sunny',
    humidity: 58,
    windSpeed: 10,
    trend: 'up'
  },
  {
    date: '2024-01-18',
    dayName: 'Thursday',
    aqi: 94,
    temperature: { min: 21, max: 31 },
    condition: 'sunny',
    humidity: 55,
    windSpeed: 8,
    trend: 'up'
  },
  {
    date: '2024-01-19',
    dayName: 'Friday',
    aqi: 112,
    temperature: { min: 22, max: 33 },
    condition: 'sunny',
    humidity: 50,
    windSpeed: 6,
    trend: 'up'
  },
  {
    date: '2024-01-20',
    dayName: 'Saturday',
    aqi: 98,
    temperature: { min: 20, max: 30 },
    condition: 'cloudy',
    humidity: 68,
    windSpeed: 14,
    trend: 'down'
  },
  {
    date: '2024-01-21',
    dayName: 'Sunday',
    aqi: 71,
    temperature: { min: 17, max: 27 },
    condition: 'rainy',
    humidity: 85,
    windSpeed: 18,
    trend: 'down'
  }
];

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <Sun className="h-5 w-5 text-yellow-400" />;
    case 'cloudy':
      return <Cloud className="h-5 w-5 text-gray-400" />;
    case 'rainy':
      return <CloudRain className="h-5 w-5 text-blue-400" />;
    default:
      return <Sun className="h-5 w-5 text-primary" />;
  }
};

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return 'text-aqi-good';
  if (aqi <= 100) return 'text-aqi-moderate';
  if (aqi <= 150) return 'text-aqi-unhealthy-sensitive';
  if (aqi <= 200) return 'text-aqi-unhealthy';
  if (aqi <= 300) return 'text-aqi-very-unhealthy';
  return 'text-aqi-hazardous';
};

const getAQIBgColor = (aqi: number) => {
  if (aqi <= 50) return 'aqi-good';
  if (aqi <= 100) return 'aqi-moderate';
  if (aqi <= 150) return 'aqi-unhealthy-sensitive';
  if (aqi <= 200) return 'aqi-unhealthy';
  if (aqi <= 300) return 'aqi-very-unhealthy';
  return 'aqi-hazardous';
};

const ForecastWidget: React.FC = () => {
  return (
    <Card className="relative overflow-hidden bg-gradient-nebula border border-accent/30">
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-aurora rounded-full translate-y-16 translate-x-16 opacity-10" />
      
      <div className="relative p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/20">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">7-Day Forecast</h3>
              <p className="text-sm opacity-80">Air Quality & Weather Predictions</p>
            </div>
          </div>
          
          <Badge variant="outline" className="animate-pulse">
            <Eye className="h-3 w-3 mr-1" />
            ISRO Prediction Model
          </Badge>
        </div>

        {/* Forecast Grid */}
        <div className="space-y-3">
          {mockForecastData.map((day, index) => (
            <div
              key={day.date}
              className={`p-4 rounded-lg border transition-all hover:shadow-lg cursor-pointer ${
                index === 0 
                  ? 'bg-primary/10 border-primary/30 shadow-glow' 
                  : 'bg-muted/20 border-border/50 hover:bg-muted/30'
              }`}
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Day */}
                <div className="col-span-3 md:col-span-2">
                  <div className="font-medium text-sm">{day.dayName}</div>
                  <div className="text-xs opacity-80">{new Date(day.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</div>
                </div>

                {/* Weather Icon & Condition */}
                <div className="col-span-3 md:col-span-2 flex items-center gap-2">
                  {getWeatherIcon(day.condition)}
                  <span className="text-xs capitalize hidden md:inline">{day.condition}</span>
                </div>

                {/* Temperature */}
                <div className="col-span-2 md:col-span-2">
                  <div className="flex items-center gap-1">
                    <Thermometer className="h-3 w-3 opacity-60" />
                    <span className="text-sm font-medium">{day.temperature.max}°</span>
                  </div>
                  <div className="text-xs opacity-60">{day.temperature.min}° min</div>
                </div>

                {/* AQI */}
                <div className="col-span-2 md:col-span-2">
                  <div className={`text-sm font-bold ${getAQIColor(day.aqi)}`}>
                    {day.aqi}
                  </div>
                  <div className="text-xs opacity-60">AQI</div>
                </div>

                {/* Trend */}
                <div className="col-span-1 md:col-span-1">
                  {day.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-red-400" />
                  ) : day.trend === 'down' ? (
                    <TrendingDown className="h-4 w-4 text-green-400" />
                  ) : (
                    <div className="w-4 h-1 bg-yellow-400 rounded" />
                  )}
                </div>

                {/* Additional Info (Hidden on mobile) */}
                <div className="hidden md:flex md:col-span-3 items-center gap-4 text-xs opacity-80">
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3" />
                    <span>{day.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="h-3 w-3" />
                    <span>{day.windSpeed}km/h</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Summary */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
          <div className="text-center p-3 rounded-lg bg-muted/20">
            <div className="text-lg font-bold text-aqi-good">3</div>
            <div className="text-xs opacity-80">Good Days</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/20">
            <div className="text-lg font-bold text-aqi-moderate">3</div>
            <div className="text-xs opacity-80">Moderate Days</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/20">
            <div className="text-lg font-bold text-aqi-unhealthy-sensitive">1</div>
            <div className="text-xs opacity-80">Unhealthy Days</div>
          </div>
        </div>

        {/* Prediction Note */}
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-center">
          <p className="text-xs opacity-90">
            <Calendar className="h-3 w-3 inline mr-1" />
            Predictions based on ISRO satellite data and meteorological models. 
            Accuracy improves with real-time monitoring.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ForecastWidget;