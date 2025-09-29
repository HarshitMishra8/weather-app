import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
  uvIndex: number;
}

interface WeatherWidgetProps {
  data: WeatherData;
  location: string;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return <Sun className="h-12 w-12 text-yellow-400" />;
    case 'cloudy':
    case 'overcast':
      return <Cloud className="h-12 w-12 text-gray-400" />;
    case 'rainy':
    case 'rain':
      return <CloudRain className="h-12 w-12 text-blue-400" />;
    default:
      return <Sun className="h-12 w-12 text-primary" />;
  }
};

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data, location }) => {
  return (
    <Card className="relative overflow-hidden bg-gradient-satellite border border-primary/20">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-aurora rounded-full -translate-y-16 translate-x-16 opacity-20" />
      
      <div className="relative p-6 space-y-4">
        {/* Location and Main Weather */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-primary">{location}</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getWeatherIcon(data.condition)}
              <div>
                <div className="text-3xl font-bold">{data.temperature}°C</div>
                <div className="text-sm opacity-80 capitalize">{data.condition}</div>
              </div>
            </div>
            
            <Badge variant="secondary" className="animate-float">
              UV: {data.uvIndex}
            </Badge>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-400" />
            <div className="text-sm">
              <div className="opacity-80">Humidity</div>
              <div className="font-medium">{data.humidity}%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-accent" />
            <div className="text-sm">
              <div className="opacity-80">Wind</div>
              <div className="font-medium">{data.windSpeed} km/h {data.windDirection}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-red-400" />
            <div className="text-sm">
              <div className="opacity-80">Pressure</div>
              <div className="font-medium">{data.pressure} hPa</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-yellow-400" />
            <div className="text-sm">
              <div className="opacity-80">Visibility</div>
              <div className="font-medium">{data.visibility} km</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidget;