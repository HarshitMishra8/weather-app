import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Shield, 
  Wind, 
  Cloud, 
  Thermometer, 
  Eye, 
  X,
  Bell,
  MessageSquare,
  Phone,
  MapPin
} from 'lucide-react';

interface EmergencyAlert {
  id: string;
  type: 'air_quality' | 'weather' | 'health' | 'disaster';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  location: string;
  timestamp: Date;
  actions: string[];
  isActive: boolean;
}

interface EmergencyAlertsProps {
  onAlertClick?: (alert: EmergencyAlert) => void;
}

const EmergencyAlerts: React.FC<EmergencyAlertsProps> = ({ onAlertClick }) => {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([
    {
      id: '1',
      type: 'air_quality',
      severity: 'high',
      title: 'Air Quality Alert',
      message: 'AQI levels expected to reach 200+ (Very Unhealthy) due to stubble burning in neighboring states.',
      location: 'Delhi NCR',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      actions: ['Avoid outdoor activities', 'Use N95 masks', 'Keep windows closed'],
      isActive: true
    },
    {
      id: '2',
      type: 'weather',
      severity: 'medium',
      title: 'Dust Storm Warning',
      message: 'Strong winds (40+ km/h) may cause dust storms reducing visibility to less than 500m.',
      location: 'Rajasthan, Western UP',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      actions: ['Secure loose objects', 'Avoid travel if possible', 'Stay hydrated'],
      isActive: true
    },
    {
      id: '3',
      type: 'health',
      severity: 'critical',
      title: 'Heat Wave Advisory',
      message: 'Temperatures above 45°C combined with poor air quality pose serious health risks.',
      location: 'Central India',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      actions: ['Stay indoors 10 AM - 6 PM', 'Increase fluid intake', 'Check on elderly'],
      isActive: true
    }
  ]);

  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
    }
  };

  const getAlertIcon = (type: string, severity: string) => {
    const iconClass = `h-5 w-5 ${severity === 'critical' ? 'animate-pulse' : ''}`;
    
    switch (type) {
      case 'air_quality': return <Wind className={iconClass} />;
      case 'weather': return <Cloud className={iconClass} />;
      case 'health': return <Shield className={iconClass} />;
      case 'disaster': return <AlertTriangle className={iconClass} />;
      default: return <Bell className={iconClass} />;
    }
  };

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  const activeAlerts = alerts.filter(alert => 
    alert.isActive && !dismissedAlerts.includes(alert.id)
  );

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new alert (10% chance every 30 seconds)
      if (Math.random() < 0.1) {
        const newAlert: EmergencyAlert = {
          id: Date.now().toString(),
          type: 'air_quality',
          severity: 'medium',
          title: 'Air Quality Update',
          message: 'PM2.5 levels increasing due to vehicular traffic. Consider postponing outdoor exercise.',
          location: 'Current Location',
          timestamp: new Date(),
          actions: ['Limit outdoor exposure', 'Use public transport'],
          isActive: true
        };
        setAlerts(prev => [newAlert, ...prev]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-cosmic border border-primary/30 shadow-cosmic">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-500/20 animate-pulse">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Emergency Alerts</h2>
              <p className="text-sm opacity-80">Real-time safety notifications</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={smsEnabled ? "default" : "outline"} className="text-xs">
              <Phone className="h-3 w-3 mr-1" />
              SMS {smsEnabled ? 'ON' : 'OFF'}
            </Badge>
            <Badge variant={notificationsEnabled ? "default" : "outline"} className="text-xs">
              <Bell className="h-3 w-3 mr-1" />
              Push {notificationsEnabled ? 'ON' : 'OFF'}
            </Badge>
          </div>
        </div>

        {activeAlerts.length === 0 ? (
          <div className="text-center py-8 opacity-60">
            <Shield className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <p className="text-lg font-medium text-green-500">All Clear</p>
            <p className="text-sm">No active emergency alerts in your area</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeAlerts.map(alert => (
              <Alert 
                key={alert.id} 
                className={`${getSeverityColor(alert.severity)} cursor-pointer hover:shadow-lg transition-all`}
                onClick={() => onAlertClick?.(alert)}
              >
                <div className="flex items-start gap-4 w-full">
                  <div className="flex-shrink-0 mt-1">
                    {getAlertIcon(alert.type, alert.severity)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base">{alert.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getSeverityColor(alert.severity)} border-current`}
                        >
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissAlert(alert.id);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <AlertDescription className="text-sm mb-3">
                      {alert.message}
                    </AlertDescription>
                    
                    <div className="flex items-center gap-4 text-xs opacity-80 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {alert.location}
                      </div>
                      <div>
                        {alert.timestamp.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium">Recommended Actions:</p>
                      <div className="flex flex-wrap gap-1">
                        {alert.actions.map((action, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        )}

        {/* Alert Settings */}
        <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border/30">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Alert Preferences
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={smsEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setSmsEnabled(!smsEnabled)}
              className="justify-start"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              SMS Alerts
            </Button>
            <Button
              variant={notificationsEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className="justify-start"
            >
              <Bell className="h-4 w-4 mr-2" />
              Push Notifications
            </Button>
          </div>
          
          <div className="mt-3 p-3 rounded bg-blue-500/10 border border-blue-500/30">
            <div className="flex items-center gap-2 text-blue-400 text-sm">
              <Eye className="h-4 w-4" />
              <span className="font-medium">Coverage: Pan India</span>
            </div>
            <p className="text-xs mt-1 opacity-80">
              Alerts powered by ISRO satellite data and meteorological departments
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EmergencyAlerts;