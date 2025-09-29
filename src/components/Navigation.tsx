import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Map, 
  TrendingUp, 
  Heart, 
  Wheat, 
  Settings,
  Globe,
  Mic,
  Bell,
  Satellite,
  Wind
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const [notifications, setNotifications] = useState(3);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
      description: 'Overview & Live Data'
    },
    {
      id: 'map',
      label: 'Pollution Map',
      icon: <Map className="h-4 w-4" />,
      description: 'Interactive Air Quality Map'
    },
    {
      id: 'forecast',
      label: 'Analytics',
      icon: <TrendingUp className="h-4 w-4" />,
      description: 'AI Analytics & Forecasts'
    },
    {
      id: 'health',
      label: 'Health Alerts',
      icon: <Heart className="h-4 w-4" />,
      description: 'Emergency & Health Advisory'
    },
    {
      id: 'agriculture',
      label: 'Export Data',
      icon: <Wheat className="h-4 w-4" />,
      description: 'Reports & Data Export'
    }
  ];

  const quickActions = [
    {
      id: 'language',
      icon: <Globe className="h-4 w-4" />,
      label: 'हिंदी / English',
      action: () => console.log('Language toggle')
    },
    {
      id: 'voice',
      icon: <Mic className="h-4 w-4" />,
      label: 'Voice Assistant',
      action: () => console.log('Voice assistant')
    },
    {
      id: 'alerts',
      icon: <Bell className="h-4 w-4" />,
      label: 'Alerts',
      badge: notifications,
      action: () => console.log('Show alerts')
    }
  ];

  return (
    <Card className="relative overflow-hidden bg-gradient-satellite border border-primary/20">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-aurora rounded-full -translate-y-10 translate-x-10 opacity-20" />
      
      <div className="relative p-4 space-y-6">
        {/* Header with ISRO Branding */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20 animate-pulse-glow">
              <Satellite className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-lg">AirScan India</h2>
              <p className="text-xs opacity-80">ISRO Satellite-Based Air Quality Monitor</p>
            </div>
          </div>
          
          {/* Live Status Indicator */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium">Live Monitoring</span>
            </div>
            <Badge variant="outline" className="text-xs">
              <Wind className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold opacity-80">Navigation</h3>
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-3 ${
                activeTab === item.id ? 'shadow-glow' : 'hover:bg-muted/50'
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={`p-1 rounded ${activeTab === item.id ? 'bg-primary-foreground/20' : ''}`}>
                  {item.icon}
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold opacity-80">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="w-full justify-start h-auto p-3 hover:bg-muted/50 relative"
                onClick={action.action}
              >
                <div className="flex items-center gap-3 w-full">
                  {action.icon}
                  <span className="text-sm font-medium">{action.label}</span>
                  {action.badge && (
                    <Badge variant="destructive" className="ml-auto text-xs">
                      {action.badge}
                    </Badge>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Emergency Alert Section */}
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="h-4 w-4 text-destructive animate-pulse" />
            <span className="text-sm font-medium text-destructive">Emergency Alerts</span>
          </div>
          <p className="text-xs text-destructive opacity-90">
            Get instant SMS alerts for air quality emergencies and environmental disasters.
          </p>
        </div>

        {/* Footer Info */}
        <div className="pt-4 border-t border-border/50 space-y-2">
          <div className="flex items-center justify-between text-xs opacity-80">
            <span>Data Source:</span>
            <span className="font-medium">ISRO Satellites</span>
          </div>
          <div className="flex items-center justify-between text-xs opacity-80">
            <span>Last Updated:</span>
            <span className="font-medium">2 min ago</span>
          </div>
          <div className="flex items-center justify-between text-xs opacity-80">
            <span>Coverage:</span>
            <span className="font-medium text-accent">All India</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Navigation;