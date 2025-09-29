import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
  accuracy?: number;
}

interface LocationError {
  code: number;
  message: string;
}

interface UseLocationReturn {
  location: LocationData | null;
  error: LocationError | null;
  isLoading: boolean;
  getCurrentLocation: () => void;
  setManualLocation: (location: Partial<LocationData>) => void;
}

// Indian cities database for location suggestions
export const indianCities = [
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
  { name: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lng: 80.3319 },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577 },
  { name: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lng: 77.4126 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185 },
  { name: 'Patna', state: 'Bihar', lat: 25.5941, lng: 85.1376 },
  { name: 'Vadodara', state: 'Gujarat', lat: 22.3072, lng: 73.1812 },
  { name: 'Ghaziabad', state: 'Uttar Pradesh', lat: 28.6692, lng: 77.4538 },
  { name: 'Ludhiana', state: 'Punjab', lat: 30.9010, lng: 75.8573 },
  { name: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lng: 78.0081 },
  { name: 'Nashik', state: 'Maharashtra', lat: 19.9975, lng: 73.7898 },
  { name: 'Faridabad', state: 'Haryana', lat: 28.4089, lng: 77.3178 },
  { name: 'Meerut', state: 'Uttar Pradesh', lat: 28.9845, lng: 77.7064 },
  { name: 'Rajkot', state: 'Gujarat', lat: 22.3039, lng: 70.8022 },
  { name: 'Kalyan-Dombivali', state: 'Maharashtra', lat: 19.2403, lng: 73.1305 },
  { name: 'Vasai-Virar', state: 'Maharashtra', lat: 19.4914, lng: 72.8054 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739 },
  { name: 'Srinagar', state: 'Jammu & Kashmir', lat: 34.0837, lng: 74.7973 },
  { name: 'Aurangabad', state: 'Maharashtra', lat: 19.8762, lng: 75.3433 },
  { name: 'Dhanbad', state: 'Jharkhand', lat: 23.7957, lng: 86.4304 },
  { name: 'Amritsar', state: 'Punjab', lat: 31.6340, lng: 74.8723 },
  { name: 'Navi Mumbai', state: 'Maharashtra', lat: 19.0330, lng: 73.0297 },
  { name: 'Allahabad', state: 'Uttar Pradesh', lat: 25.4358, lng: 81.8463 },
  { name: 'Ranchi', state: 'Jharkhand', lat: 23.3441, lng: 85.3096 },
  { name: 'Howrah', state: 'West Bengal', lat: 22.5958, lng: 88.2636 },
  { name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lng: 76.9558 },
  { name: 'Jabalpur', state: 'Madhya Pradesh', lat: 23.1815, lng: 79.9864 },
  { name: 'Gwalior', state: 'Madhya Pradesh', lat: 26.2183, lng: 78.1828 },
  { name: 'Vijayawada', state: 'Andhra Pradesh', lat: 16.5062, lng: 80.6480 },
  { name: 'Jodhpur', state: 'Rajasthan', lat: 26.2389, lng: 73.0243 },
  { name: 'Madurai', state: 'Tamil Nadu', lat: 9.9252, lng: 78.1198 }
];

const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationData | null>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('userLocation');
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState<LocationError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reverse geocoding simulation (in production, use actual geocoding service)
  const getCityFromCoordinates = async (lat: number, lng: number): Promise<{city: string, state: string}> => {
    // Find closest city from our database
    const distances = indianCities.map(city => ({
      ...city,
      distance: Math.sqrt(Math.pow(city.lat - lat, 2) + Math.pow(city.lng - lng, 2))
    }));
    
    distances.sort((a, b) => a.distance - b.distance);
    const closest = distances[0];
    
    return { city: closest.name, state: closest.state };
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation is not supported by this browser'
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;
          const { city, state } = await getCityFromCoordinates(latitude, longitude);
          
          const locationData: LocationData = {
            latitude,
            longitude,
            city,
            state,
            country: 'India',
            accuracy
          };
          
          setLocation(locationData);
          localStorage.setItem('userLocation', JSON.stringify(locationData));
          setIsLoading(false);
        } catch (err) {
          setError({
            code: -1,
            message: 'Failed to determine city from coordinates'
          });
          setIsLoading(false);
        }
      },
      (err) => {
        setError({
          code: err.code,
          message: getErrorMessage(err.code)
        });
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const setManualLocation = (locationData: Partial<LocationData>) => {
    const fullLocation: LocationData = {
      latitude: locationData.latitude || 28.6139, // Default to Delhi
      longitude: locationData.longitude || 77.2090,
      city: locationData.city || 'Delhi',
      state: locationData.state || 'Delhi',
      country: 'India'
    };
    
    setLocation(fullLocation);
    localStorage.setItem('userLocation', JSON.stringify(fullLocation));
    setError(null);
  };

  const getErrorMessage = (code: number): string => {
    switch (code) {
      case 1:
        return 'Location access denied by user';
      case 2:
        return 'Location information unavailable';
      case 3:
        return 'Location request timeout';
      default:
        return 'An unknown error occurred';
    }
  };

  // Auto-detect location on first load if not available
  useEffect(() => {
    if (!location && !error) {
      // Auto-detect after a short delay
      const timer = setTimeout(() => {
        getCurrentLocation();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return {
    location,
    error,
    isLoading,
    getCurrentLocation,
    setManualLocation
  };
};

export default useLocation;