import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  AlertTriangle, 
  Shield, 
  Activity, 
  Home, 
  MapPin,
  Clock
} from 'lucide-react';

interface HealthAdvisoryProps {
  aqi: number;
  temperature: number;
  humidity: number;
}

const getHealthAdvice = (aqi: number) => {
  if (aqi <= 50) {
    return {
      level: 'safe',
      title: 'Air Quality is Good',
      icon: <Shield className="h-5 w-5 text-aqi-good" />,
      advice: [
        '✓ Perfect for outdoor activities',
        '✓ Great time for jogging and exercise',
        '✓ All age groups can enjoy outdoors',
        '✓ Windows can be kept open'
      ],
      actions: ['Go for a walk', 'Outdoor exercise', 'Fresh air activities'],
      color: 'aqi-good'
    };
  } else if (aqi <= 100) {
    return {
      level: 'moderate',
      title: 'Moderate Air Quality',
      icon: <Activity className="h-5 w-5 text-aqi-moderate" />,
      advice: [
        '⚠ Sensitive individuals may experience minor symptoms',
        '✓ Generally safe for most people',
        '⚠ Consider reducing prolonged outdoor exertion',
        '✓ Moderate outdoor activities are fine'
      ],
      actions: ['Light exercise', 'Shorter outdoor duration', 'Monitor symptoms'],
      color: 'aqi-moderate'
    };
  } else if (aqi <= 150) {
    return {
      level: 'unhealthy-sensitive',
      title: 'Unhealthy for Sensitive Groups',
      icon: <AlertTriangle className="h-5 w-5 text-aqi-unhealthy-sensitive" />,
      advice: [
        '⚠ Children, elderly, and people with respiratory conditions should limit outdoor activities',
        '⚠ Reduce prolonged or heavy outdoor exertion',
        '✓ General public can still enjoy outdoor activities with moderation',
        '⚠ Keep windows closed'
      ],
      actions: ['Indoor activities', 'Wear mask outdoors', 'Use air purifier'],
      color: 'aqi-unhealthy-sensitive'
    };
  } else {
    return {
      level: 'unhealthy',
      title: 'Unhealthy Air Quality',
      icon: <Heart className="h-5 w-5 text-aqi-unhealthy" />,
      advice: [
        '🚫 Avoid outdoor jogging and exercise',
        '🚫 Stay indoors as much as possible',
        '⚠ Wear N95 mask when going outside',
        '⚠ Keep all windows and doors closed',
        '⚠ Use air purifiers indoors'
      ],
      actions: ['Stay indoors', 'Use N95 masks', 'Air purification', 'Avoid exercise'],
      color: 'aqi-unhealthy'
    };
  }
};

const HealthAdvisory: React.FC<HealthAdvisoryProps> = ({ aqi, temperature, humidity }) => {
  const advice = getHealthAdvice(aqi);
  
  return (
    <Card className={`relative overflow-hidden border-2 ${advice.color}`}>
      <div className="absolute inset-0 bg-gradient-nebula opacity-20" />
      
      <div className="relative p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          {advice.icon}
          <div>
            <h3 className="font-semibold text-lg">{advice.title}</h3>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Clock className="h-4 w-4" />
              <span>Updated 15 minutes ago</span>
            </div>
          </div>
        </div>

        {/* Health Recommendations */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Health Recommendations
          </h4>
          
          <div className="space-y-2">
            {advice.advice.map((item, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Recommended Actions
          </h4>
          
          <div className="flex flex-wrap gap-2">
            {advice.actions.map((action, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {action}
              </Badge>
            ))}
          </div>
        </div>

        {/* Environmental Context */}
        <div className="pt-4 border-t border-border/50 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-80">Temperature Impact:</span>
            <span className={temperature > 35 ? 'text-destructive' : temperature < 10 ? 'text-blue-400' : 'text-accent'}>
              {temperature > 35 ? 'High heat stress' : temperature < 10 ? 'Cold conditions' : 'Comfortable'}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-80">Humidity Level:</span>
            <span className={humidity > 70 ? 'text-blue-400' : humidity < 30 ? 'text-yellow-400' : 'text-accent'}>
              {humidity > 70 ? 'High humidity' : humidity < 30 ? 'Dry conditions' : 'Comfortable'}
            </span>
          </div>
        </div>

        {/* Emergency Button for Severe Conditions */}
        {aqi > 200 && (
          <Button variant="destructive" className="w-full shadow-alert">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Emergency Health Alert - Seek Indoor Shelter
          </Button>
        )}
      </div>
    </Card>
  );
};

export default HealthAdvisory;