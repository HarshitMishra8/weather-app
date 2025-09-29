import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Map, 
  Layers, 
  MapPin, 
  Satellite,
  Wind,
  Eye,
  Navigation,
  Zap
} from 'lucide-react';

interface MapData {
  region: string;
  aqi: number;
  coordinates: { lat: number; lng: number };
}

const mockMapData: MapData[] = [
  { region: 'Delhi NCR', aqi: 187, coordinates: { lat: 28.7041, lng: 77.1025 } },
  { region: 'Mumbai', aqi: 94, coordinates: { lat: 19.0760, lng: 72.8777 } },
  { region: 'Bangalore', aqi: 67, coordinates: { lat: 12.9716, lng: 77.5946 } },
  { region: 'Chennai', aqi: 78, coordinates: { lat: 13.0827, lng: 80.2707 } },
  { region: 'Kolkata', aqi: 156, coordinates: { lat: 22.5726, lng: 88.3639 } },
  { region: 'Pune', aqi: 89, coordinates: { lat: 18.5204, lng: 73.8567 } },
  { region: 'Hyderabad', aqi: 92, coordinates: { lat: 17.3850, lng: 78.4867 } },
  { region: 'Ahmedabad', aqi: 134, coordinates: { lat: 23.0225, lng: 72.5714 } }
];

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 150) return 'bg-orange-500';
  if (aqi <= 200) return 'bg-red-500';
  if (aqi <= 300) return 'bg-purple-600';
  return 'bg-red-900';
};

const getAQITextColor = (aqi: number) => {
  if (aqi <= 50) return 'text-aqi-good';
  if (aqi <= 100) return 'text-aqi-moderate';
  if (aqi <= 150) return 'text-aqi-unhealthy-sensitive';
  if (aqi <= 200) return 'text-aqi-unhealthy';
  if (aqi <= 300) return 'text-aqi-very-unhealthy';
  return 'text-aqi-hazardous';
};

const PollutionMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapData | null>(null);
  const [mapView, setMapView] = useState<'satellite' | 'pollution' | 'wind'>('pollution');

  return (
    <Card className="relative overflow-hidden bg-gradient-nebula border border-primary/20">
      <div className="absolute inset-0 bg-gradient-cosmic opacity-10" />
      
      <div className="relative p-6 space-y-4">
        {/* Header with Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Map className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Interactive Pollution Map</h3>
              <p className="text-sm opacity-80">Real-time air quality across India</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={mapView === 'pollution' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('pollution')}
            >
              <Layers className="h-4 w-4 mr-1" />
              AQI
            </Button>
            <Button
              variant={mapView === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('satellite')}
            >
              <Satellite className="h-4 w-4 mr-1" />
              Satellite
            </Button>
            <Button
              variant={mapView === 'wind' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('wind')}
            >
              <Wind className="h-4 w-4 mr-1" />
              Wind
            </Button>
          </div>
        </div>

        {/* Map Visualization Area */}
        <div className="relative h-64 md:h-80 rounded-lg bg-muted/20 border border-border/50 overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/60" />
          
          {/* India Outline Representation */}
          <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-lg" />
          
          {/* Data Points */}
          {mockMapData.map((location, index) => (
            <div
              key={location.region}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{
                left: `${20 + (index % 3) * 25}%`,
                top: `${20 + Math.floor(index / 3) * 25}%`
              }}
              onClick={() => setSelectedLocation(location)}
            >
              <div className={`w-4 h-4 rounded-full ${getAQIColor(location.aqi)} shadow-lg`} />
              <div className={`absolute -top-8 -left-8 text-xs font-medium ${getAQITextColor(location.aqi)}`}>
                {location.aqi}
              </div>
            </div>
          ))}

          {/* Current Location Indicator */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-background/90 rounded-lg border">
              <Navigation className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Your Location</span>
            </div>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 right-4 bg-background/90 p-3 rounded-lg border space-y-2">
            <div className="text-xs font-medium">AQI Scale</div>
            <div className="space-y-1">
              {[
                { range: '0-50', color: 'bg-green-500', label: 'Good' },
                { range: '51-100', color: 'bg-yellow-500', label: 'Moderate' },
                { range: '101-150', color: 'bg-orange-500', label: 'Unhealthy for Sensitive' },
                { range: '151-200', color: 'bg-red-500', label: 'Unhealthy' },
                { range: '201+', color: 'bg-purple-600', label: 'Very Unhealthy' }
              ].map((item) => (
                <div key={item.range} className="flex items-center gap-2 text-xs">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="opacity-80">{item.range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Satellite Overlay Simulation */}
          {mapView === 'satellite' && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/20">
              <div className="absolute top-8 left-8 text-xs bg-background/90 px-2 py-1 rounded">
                <Satellite className="h-3 w-3 inline mr-1" />
                ISRO Satellite Data
              </div>
            </div>
          )}

          {/* Wind Pattern Overlay */}
          {mapView === 'wind' && (
            <div className="absolute inset-0">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-data-stream"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                >
                  <Wind className="h-4 w-4 text-accent opacity-60" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Location Details */}
        {selectedLocation && (
          <div className="p-4 rounded-lg bg-muted/20 border border-border/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">{selectedLocation.region}</span>
              </div>
              <Badge className={getAQITextColor(selectedLocation.aqi)}>
                AQI: {selectedLocation.aqi}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>Coordinates: {selectedLocation.coordinates.lat.toFixed(2)}, {selectedLocation.coordinates.lng.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Real-time data</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <div className="text-lg font-bold text-aqi-unhealthy">23</div>
            <div className="text-xs opacity-80">Unhealthy Cities</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-aqi-good">156</div>
            <div className="text-xs opacity-80">Good Quality Areas</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">5min</div>
            <div className="text-xs opacity-80">Update Frequency</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PollutionMap;