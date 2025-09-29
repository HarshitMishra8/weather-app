import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  RadialBarChart, 
  RadialBar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart as PieIcon, 
  Activity,
  Calendar,
  MapPin,
  Wind,
  Thermometer,
  Droplets
} from 'lucide-react';

const AdvancedVisualizations: React.FC = () => {
  const [selectedView, setSelectedView] = useState('trends');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data for different visualizations
  const weeklyData = [
    { date: 'Mon', aqi: 85, pm25: 32, pm10: 55, temperature: 24, humidity: 65, windSpeed: 12 },
    { date: 'Tue', aqi: 92, pm25: 38, pm10: 62, temperature: 26, humidity: 70, windSpeed: 8 },
    { date: 'Wed', aqi: 78, pm25: 28, pm10: 48, temperature: 22, humidity: 60, windSpeed: 15 },
    { date: 'Thu', aqi: 105, pm25: 45, pm10: 75, temperature: 28, humidity: 75, windSpeed: 6 },
    { date: 'Fri', aqi: 89, pm25: 35, pm10: 58, temperature: 25, humidity: 68, windSpeed: 10 },
    { date: 'Sat', aqi: 72, pm25: 25, pm10: 42, temperature: 21, humidity: 55, windSpeed: 18 },
    { date: 'Sun', aqi: 95, pm25: 40, pm10: 65, temperature: 27, humidity: 72, windSpeed: 9 }
  ];

  const monthlyTrends = [
    { month: 'Jan', good: 12, moderate: 15, unhealthy: 4 },
    { month: 'Feb', good: 15, moderate: 11, unhealthy: 2 },
    { month: 'Mar', good: 8, moderate: 18, unhealthy: 5 },
    { month: 'Apr', good: 6, moderate: 20, unhealthy: 4 },
    { month: 'May', good: 4, moderate: 22, unhealthy: 5 },
    { month: 'Jun', good: 10, moderate: 16, unhealthy: 4 }
  ];

  const pollutantDistribution = [
    { name: 'PM2.5', value: 35, color: '#ef4444' },
    { name: 'PM10', value: 25, color: '#f97316' },
    { name: 'NO2', value: 20, color: '#eab308' },
    { name: 'SO2', value: 10, color: '#22c55e' },
    { name: 'CO', value: 6, color: '#3b82f6' },
    { name: 'O3', value: 4, color: '#a855f7' }
  ];

  const hourlyPattern = Array.from({ length: 24 }, (_, hour) => ({
    hour: `${hour}:00`,
    aqi: 60 + Math.sin(hour / 24 * Math.PI * 2) * 30 + Math.random() * 20,
    traffic: hour >= 7 && hour <= 10 || hour >= 17 && hour <= 20 ? 80 + Math.random() * 20 : 30 + Math.random() * 40
  }));

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#22c55e';
    if (aqi <= 100) return '#eab308';
    if (aqi <= 150) return '#f97316';
    if (aqi <= 200) return '#ef4444';
    if (aqi <= 300) return '#a855f7';
    return '#7c2d12';
  };

  const renderCustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
              {entry.dataKey === 'aqi' && ` (${entry.value <= 50 ? 'Good' : entry.value <= 100 ? 'Moderate' : 'Unhealthy'})`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gradient-cosmic border border-primary/30 shadow-cosmic">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/20 animate-pulse-glow">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Advanced Analytics</h2>
              <p className="text-sm opacity-80">AI-powered insights and trends</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              <Activity className="h-3 w-3 mr-1" />
              Live Data
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Wind className="h-3 w-3 mr-1" />
              ML Powered
            </Badge>
          </div>
        </div>

        <Tabs value={selectedView} onValueChange={setSelectedView}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trends" className="text-xs">Trends</TabsTrigger>
            <TabsTrigger value="patterns" className="text-xs">Patterns</TabsTrigger>
            <TabsTrigger value="distribution" className="text-xs">Distribution</TabsTrigger>
            <TabsTrigger value="correlations" className="text-xs">Correlations</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="mt-6">
            <div className="space-y-6">
              {/* Period Selector */}
              <div className="flex gap-2">
                {['day', 'week', 'month'].map(period => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(period)}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </Button>
                ))}
              </div>

              {/* AQI Trend */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    AQI Trends - Last 7 Days
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    Avg: 87 (Moderate)
                  </Badge>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip content={renderCustomTooltip} />
                      <Area 
                        type="monotone" 
                        dataKey="aqi" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary) / 0.3)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Multi-Pollutant Comparison */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Pollutant Levels Comparison
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip content={renderCustomTooltip} />
                      <Legend />
                      <Line type="monotone" dataKey="pm25" stroke="#ef4444" strokeWidth={2} name="PM2.5" />
                      <Line type="monotone" dataKey="pm10" stroke="#f97316" strokeWidth={2} name="PM10" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="mt-6">
            <div className="space-y-6">
              {/* Hourly Pattern */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Daily AQI Pattern (24 Hours)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyPattern}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip content={renderCustomTooltip} />
                      <Bar dataKey="aqi" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Monthly Air Quality Days */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Monthly Air Quality Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="good" stackId="a" fill="#22c55e" name="Good Days" />
                      <Bar dataKey="moderate" stackId="a" fill="#eab308" name="Moderate Days" />
                      <Bar dataKey="unhealthy" stackId="a" fill="#ef4444" name="Unhealthy Days" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pollutant Distribution */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <PieIcon className="h-4 w-4" />
                  Pollutant Contribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pollutantDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {pollutantDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* AQI Categories Radial */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  AQI Category Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={[
                      { name: 'Good', value: 20, fill: '#22c55e' },
                      { name: 'Moderate', value: 60, fill: '#eab308' },
                      { name: 'Unhealthy', value: 15, fill: '#ef4444' },
                      { name: 'Hazardous', value: 5, fill: '#7c2d12' }
                    ]}>
                      <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                      <Tooltip />
                      <Legend />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="correlations" className="mt-6">
            <div className="space-y-6">
              {/* Weather vs AQI Correlation */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  Weather Parameters vs Air Quality
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip content={renderCustomTooltip} />
                      <Legend />
                      <Line type="monotone" dataKey="aqi" stroke="hsl(var(--primary))" strokeWidth={2} name="AQI" />
                      <Line type="monotone" dataKey="windSpeed" stroke="hsl(var(--accent))" strokeWidth={2} name="Wind Speed" />
                      <Line type="monotone" dataKey="humidity" stroke="hsl(var(--secondary))" strokeWidth={2} name="Humidity" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-green-500/10 border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-green-500">Positive Correlation</span>
                  </div>
                  <p className="text-sm">Wind speed increases → AQI improves by 15%</p>
                </Card>
                
                <Card className="p-4 bg-yellow-500/10 border-yellow-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium text-yellow-500">Seasonal Pattern</span>
                  </div>
                  <p className="text-sm">Winter months show 40% higher AQI levels</p>
                </Card>
                
                <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-blue-500">Humidity Impact</span>
                  </div>
                  <p className="text-sm">High humidity reduces dust particles by 25%</p>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default AdvancedVisualizations;