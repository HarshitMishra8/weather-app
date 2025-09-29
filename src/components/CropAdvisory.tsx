import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wheat, 
  Droplets, 
  Sun, 
  Wind, 
  AlertTriangle,
  Sprout,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface CropAdvisoryProps {
  aqi: number;
  temperature: number;
  humidity: number;
  season: string;
}

const getCropAdvice = (aqi: number, temperature: number, humidity: number, season: string) => {
  const advice = {
    irrigation: '',
    fertilization: '',
    pestControl: '',
    harvesting: '',
    planting: '',
    airQualityImpact: '',
    recommendations: [] as string[],
    alerts: [] as string[]
  };

  // Air Quality Impact on Crops
  if (aqi <= 50) {
    advice.airQualityImpact = 'Excellent conditions for photosynthesis and crop growth';
    advice.recommendations.push('Optimal time for field operations');
    advice.recommendations.push('Safe for outdoor farm work');
  } else if (aqi <= 100) {
    advice.airQualityImpact = 'Good conditions with minor air quality concerns';
    advice.recommendations.push('Consider timing field work during cleaner air periods');
  } else if (aqi <= 150) {
    advice.airQualityImpact = 'Moderate pollution may affect sensitive crops';
    advice.recommendations.push('Avoid spraying operations during high pollution');
    advice.alerts.push('Monitor crop stress indicators');
  } else {
    advice.airQualityImpact = 'Poor air quality may significantly impact crop health';
    advice.alerts.push('High pollution levels detected - crops may show stress');
    advice.alerts.push('Consider protective measures for sensitive varieties');
  }

  // Temperature-based advice
  if (temperature > 35) {
    advice.irrigation = 'Increase watering frequency due to high temperatures';
    advice.recommendations.push('Schedule watering during early morning or evening');
    advice.alerts.push('Heat stress risk - provide shade protection if possible');
  } else if (temperature < 10) {
    advice.irrigation = 'Reduce watering frequency in cool conditions';
    advice.recommendations.push('Protect crops from frost damage');
    advice.alerts.push('Cold weather - monitor for frost formation');
  } else {
    advice.irrigation = 'Maintain regular watering schedule';
    advice.recommendations.push('Optimal temperature range for most crops');
  }

  // Humidity-based advice
  if (humidity > 70) {
    advice.pestControl = 'High humidity increases fungal disease risk';
    advice.recommendations.push('Ensure proper ventilation in greenhouses');
    advice.recommendations.push('Monitor for early signs of fungal infections');
  } else if (humidity < 30) {
    advice.pestControl = 'Low humidity - increase watering and consider mulching';
    advice.recommendations.push('Protect crops from excessive water loss');
  } else {
    advice.pestControl = 'Humidity levels are optimal for crop health';
  }

  // Season-specific advice
  switch (season.toLowerCase()) {
    case 'winter':
      advice.planting = 'Ideal time for wheat, mustard, and winter vegetables';
      advice.fertilization = 'Apply organic compost and nitrogen fertilizers';
      break;
    case 'spring':
      advice.planting = 'Prepare for summer crops - cotton, rice, sugarcane';
      advice.fertilization = 'Focus on phosphorus and potassium for root development';
      break;
    case 'summer':
      advice.harvesting = 'Harvest early morning to avoid heat stress';
      advice.fertilization = 'Light fertilization with focus on stress tolerance';
      break;
    case 'monsoon':
      advice.planting = 'Perfect time for rice and other kharif crops';
      advice.fertilization = 'Balanced NPK fertilizers with good drainage';
      break;
  }

  return advice;
};

const CropAdvisory: React.FC<CropAdvisoryProps> = ({ aqi, temperature, humidity, season }) => {
  const advice = getCropAdvice(aqi, temperature, humidity, season);
  
  return (
    <Card className="relative overflow-hidden bg-gradient-satellite border border-accent/30">
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-aurora rounded-full translate-y-20 -translate-x-20 opacity-10" />
      
      <div className="relative p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <Wheat className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Agricultural Advisory</h3>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Calendar className="h-4 w-4" />
              <span>{season} Season Guidance</span>
            </div>
          </div>
        </div>

        {/* Air Quality Impact */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Wind className="h-4 w-4" />
            Air Quality Impact on Crops
          </h4>
          <p className="text-sm opacity-90">{advice.airQualityImpact}</p>
        </div>

        {/* Environmental Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg bg-muted/20">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-yellow-400" />
            <div className="text-sm">
              <div className="opacity-80">Temperature</div>
              <div className="font-medium">{temperature}°C</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-400" />
            <div className="text-sm">
              <div className="opacity-80">Humidity</div>
              <div className="font-medium">{humidity}%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-accent" />
            <div className="text-sm">
              <div className="opacity-80">AQI</div>
              <div className="font-medium">{aqi}</div>
            </div>
          </div>
        </div>

        {/* Specific Recommendations */}
        <div className="space-y-4">
          {advice.irrigation && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-400" />
                Irrigation
              </h4>
              <p className="text-sm opacity-90">{advice.irrigation}</p>
            </div>
          )}

          {advice.fertilization && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Sprout className="h-4 w-4 text-green-400" />
                Fertilization
              </h4>
              <p className="text-sm opacity-90">{advice.fertilization}</p>
            </div>
          )}

          {advice.pestControl && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                Pest & Disease Control
              </h4>
              <p className="text-sm opacity-90">{advice.pestControl}</p>
            </div>
          )}
        </div>

        {/* Recommendations */}
        {advice.recommendations.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Recommendations
            </h4>
            <div className="space-y-2">
              {advice.recommendations.map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="opacity-90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alerts */}
        {advice.alerts.length > 0 && (
          <div className="space-y-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <h4 className="font-medium flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Important Alerts
            </h4>
            <div className="space-y-2">
              {advice.alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-destructive">
                  <AlertTriangle className="h-3 w-3 mt-1 flex-shrink-0" />
                  <span>{alert}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Action Badges */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
          <Badge variant="outline" className="text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            {season} Crops
          </Badge>
          <Badge variant="outline" className="text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            Growth Optimized
          </Badge>
          {aqi <= 50 && (
            <Badge variant="outline" className="text-xs aqi-good">
              <Sun className="h-3 w-3 mr-1" />
              Ideal Conditions
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CropAdvisory;