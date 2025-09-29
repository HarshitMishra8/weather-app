import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Wind, Droplets } from 'lucide-react';

interface AQIData {
  value: number;
  category: string;
  pollutants: {
    pm25: number;
    pm10: number;
    no2: number;
    so2: number;
    co: number;
    o3: number;
  };
}

interface AQIDisplayProps {
  data: AQIData;
}

const getAQIStatus = (value: number) => {
  if (value <= 50) return { status: 'good', label: 'Good', class: 'aqi-good' };
  if (value <= 100) return { status: 'moderate', label: 'Moderate', class: 'aqi-moderate' };
  if (value <= 150) return { status: 'unhealthy-sensitive', label: 'Unhealthy for Sensitive', class: 'aqi-unhealthy-sensitive' };
  if (value <= 200) return { status: 'unhealthy', label: 'Unhealthy', class: 'aqi-unhealthy' };
  if (value <= 300) return { status: 'very-unhealthy', label: 'Very Unhealthy', class: 'aqi-very-unhealthy' };
  return { status: 'hazardous', label: 'Hazardous', class: 'aqi-hazardous' };
};

const AQIDisplay: React.FC<AQIDisplayProps> = ({ data }) => {
  const aqiStatus = getAQIStatus(data.value);
  
  return (
    <Card className={`relative overflow-hidden border-2 ${aqiStatus.class} animate-pulse-glow`}>
      <div className="absolute inset-0 bg-gradient-cosmic opacity-30" />
      
      <div className="relative p-6 space-y-6">
        {/* Main AQI Display */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Wind className="h-6 w-6" />
            <span className="text-sm font-medium opacity-80">Air Quality Index</span>
          </div>
          
          <div className="space-y-1">
            <div className={`text-6xl font-bold ${aqiStatus.class === 'aqi-good' ? 'text-aqi-good' : 
              aqiStatus.class === 'aqi-moderate' ? 'text-aqi-moderate' : 
              aqiStatus.class === 'aqi-unhealthy-sensitive' ? 'text-aqi-unhealthy-sensitive' :
              aqiStatus.class === 'aqi-unhealthy' ? 'text-aqi-unhealthy' :
              aqiStatus.class === 'aqi-very-unhealthy' ? 'text-aqi-very-unhealthy' : 'text-aqi-hazardous'}`}>
              {data.value}
            </div>
            <Badge variant="outline" className={`${aqiStatus.class} border-2`}>
              {aqiStatus.label}
            </Badge>
          </div>
        </div>

        {/* Alert for dangerous levels */}
        {data.value > 100 && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
            <AlertTriangle className="h-5 w-5 text-destructive animate-pulse" />
            <span className="text-sm font-medium text-destructive">
              Health Alert: Take precautions outdoors
            </span>
          </div>
        )}

        {/* Pollutant Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            <h3 className="text-sm font-semibold">Pollutant Concentration</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(data.pollutants).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{key.toUpperCase()}</span>
                  <span className="opacity-80">{value} µg/m³</span>
                </div>
                <Progress 
                  value={Math.min(value / 5, 100)} 
                  className="h-2 bg-muted/30" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AQIDisplay;