import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MapPin, 
  Navigation, 
  Search, 
  Loader, 
  Check,
  Globe,
  Satellite
} from 'lucide-react';
import useLocation, { indianCities } from '@/hooks/useLocation';

interface LocationSelectorProps {
  onLocationChange?: (location: any) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationChange }) => {
  const { location, error, isLoading, getCurrentLocation, setManualLocation } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredCities = indianCities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.state.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10);

  const handleCitySelect = (city: typeof indianCities[0]) => {
    const locationData = {
      latitude: city.lat,
      longitude: city.lng,
      city: city.name,
      state: city.state,
      country: 'India'
    };
    
    setManualLocation(locationData);
    onLocationChange?.(locationData);
    setIsSearchOpen(false);
    setSearchTerm('');
  };

  const handleCurrentLocation = () => {
    getCurrentLocation();
  };

  return (
    <Card className="bg-gradient-satellite border border-primary/20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-accent/20">
              <MapPin className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Location Services</h3>
              <p className="text-xs opacity-80">For hyperlocal air quality data</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            <Satellite className="h-3 w-3 mr-1" />
            Satellite-Based
          </Badge>
        </div>

        {/* Current Location Display */}
        <div className="mb-4 p-3 rounded-lg bg-muted/20 border border-border/30">
          {location ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-accent" />
                  {location.city}, {location.state}
                </div>
                {location.accuracy && (
                  <p className="text-xs opacity-60 mt-1">
                    Accuracy: ±{Math.round(location.accuracy)}m
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
              >
                Change
              </Button>
            </div>
          ) : (
            <div className="text-center py-2">
              <p className="text-sm opacity-80 mb-2">
                {error ? 'Unable to detect location' : 'No location set'}
              </p>
              {error && (
                <p className="text-xs text-destructive mb-2">{error.message}</p>
              )}
            </div>
          )}
        </div>

        {/* Location Actions */}
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCurrentLocation}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <Loader className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Navigation className="h-4 w-4 mr-2" />
            )}
            Detect Location
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSearchOpen(true)}
            className="flex-1"
          >
            <Search className="h-4 w-4 mr-2" />
            Search City
          </Button>
        </div>

        {/* Search Interface */}
        {isSearchOpen && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
              <Input
                placeholder="Search Indian cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>

            {searchTerm && (
              <ScrollArea className="h-48 border border-border/30 rounded-lg">
                <div className="p-2">
                  {filteredCities.length > 0 ? (
                    <div className="space-y-1">
                      {filteredCities.map((city, index) => (
                        <Button
                          key={`${city.name}-${city.state}`}
                          variant="ghost"
                          className="w-full justify-start h-auto p-3"
                          onClick={() => handleCitySelect(city)}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                            <div className="text-left flex-1">
                              <div className="font-medium text-sm">{city.name}</div>
                              <div className="text-xs opacity-70">{city.state}</div>
                            </div>
                            {location?.city === city.name && location?.state === city.state && (
                              <Check className="h-4 w-4 text-accent" />
                            )}
                          </div>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 opacity-60">
                      <Globe className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">No cities found</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchTerm('');
              }}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        )}

        {/* Coverage Info */}
        <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30">
          <div className="flex items-center gap-2 mb-2">
            <Satellite className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Satellite Coverage</span>
          </div>
          <p className="text-xs opacity-90">
            Hyperlocal air quality data available for 600+ Indian cities using ISRO satellite technology. 
            Rural and remote areas covered through advanced atmospheric modeling.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default LocationSelector;