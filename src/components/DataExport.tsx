import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Download, 
  FileText, 
  BarChart3, 
  Mail, 
  Calendar,
  Database,
  Share2,
  Printer
} from 'lucide-react';

interface DataExportProps {
  currentData?: any;
}

const DataExport: React.FC<DataExportProps> = ({ currentData }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('week');
  const [selectedData, setSelectedData] = useState({
    airQuality: true,
    weather: true,
    health: false,
    agriculture: false,
    forecasts: true
  });
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    { value: 'pdf', label: 'PDF Report', icon: <FileText className="h-4 w-4" /> },
    { value: 'csv', label: 'CSV Data', icon: <Database className="h-4 w-4" /> },
    { value: 'excel', label: 'Excel Spreadsheet', icon: <BarChart3 className="h-4 w-4" /> },
    { value: 'json', label: 'JSON Data', icon: <Database className="h-4 w-4" /> }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'Last Year' }
  ];

  const dataTypes = [
    { key: 'airQuality', label: 'Air Quality Data', description: 'AQI, pollutant levels, trends' },
    { key: 'weather', label: 'Weather Data', description: 'Temperature, humidity, wind, pressure' },
    { key: 'health', label: 'Health Advisories', description: 'Personal recommendations and alerts' },
    { key: 'agriculture', label: 'Agricultural Data', description: 'Crop advisories and farming insights' },
    { key: 'forecasts', label: 'Forecasts', description: '7-day predictions and models' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock file based on format
    const filename = `airscan-data-${Date.now()}.${exportFormat}`;
    
    if (exportFormat === 'json') {
      const data = {
        exportDate: new Date().toISOString(),
        dateRange,
        location: 'Delhi, India',
        data: {
          airQuality: selectedData.airQuality ? {
            current: { aqi: 89, category: 'Moderate' },
            historical: Array.from({length: 7}, (_, i) => ({
              date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
              aqi: 80 + Math.random() * 40,
              pm25: 30 + Math.random() * 20
            }))
          } : null,
          weather: selectedData.weather ? {
            current: { temperature: 24, humidity: 65, windSpeed: 12 },
            historical: Array.from({length: 7}, (_, i) => ({
              date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
              temperature: 20 + Math.random() * 15,
              humidity: 50 + Math.random() * 30
            }))
          } : null,
          forecasts: selectedData.forecasts ? Array.from({length: 7}, (_, i) => ({
            date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
            aqi: 70 + Math.random() * 50,
            temperature: 22 + Math.random() * 10
          })) : null
        }
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } else if (exportFormat === 'csv') {
      let csvContent = 'Date,AQI,PM2.5,PM10,Temperature,Humidity\n';
      for (let i = 0; i < 7; i++) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        csvContent += `${date},${80 + Math.random() * 40},${30 + Math.random() * 20},${50 + Math.random() * 30},${20 + Math.random() * 15},${50 + Math.random() * 30}\n`;
      }
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
    
    setIsExporting(false);
  };

  const handleEmailReport = () => {
    const subject = encodeURIComponent('AirScan India - Air Quality Report');
    const body = encodeURIComponent(
      `Dear Team,\n\nPlease find attached the air quality report for the selected period.\n\nReport Details:\n- Date Range: ${dateRange}\n- Format: ${exportFormat}\n- Location: Delhi, India\n\nBest regards,\nAirScan India Team`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <Card className="bg-gradient-nebula border border-accent/30">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-accent/20">
              <Download className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Export Data</h2>
              <p className="text-sm opacity-80">Download air quality reports and datasets</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            <Database className="h-3 w-3 mr-1" />
            ISRO Verified
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Export Settings */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Export Format</label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {exportFormats.map(format => (
                    <SelectItem key={format.value} value={format.value}>
                      <div className="flex items-center gap-2">
                        {format.icon}
                        {format.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map(range => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">Data to Include</label>
              <div className="space-y-3">
                {dataTypes.map(type => (
                  <div key={type.key} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/30">
                    <Checkbox
                      id={type.key}
                      checked={selectedData[type.key as keyof typeof selectedData]}
                      onCheckedChange={(checked) => 
                        setSelectedData(prev => ({ ...prev, [type.key]: checked }))
                      }
                    />
                    <div className="flex-1">
                      <label htmlFor={type.key} className="font-medium text-sm cursor-pointer">
                        {type.label}
                      </label>
                      <p className="text-xs opacity-70 mt-1">{type.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview and Actions */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Export Preview
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span className="font-medium">{exportFormats.find(f => f.value === exportFormat)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span>Period:</span>
                  <span className="font-medium">{dateRanges.find(r => r.value === dateRange)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Types:</span>
                  <span className="font-medium">
                    {Object.values(selectedData).filter(Boolean).length} selected
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Size:</span>
                  <span className="font-medium">
                    {exportFormat === 'pdf' ? '2.3 MB' : exportFormat === 'excel' ? '1.8 MB' : '450 KB'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleExport}
                className="w-full"
                disabled={isExporting || !Object.values(selectedData).some(Boolean)}
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Generating Export...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </>
                )}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={handleEmailReport}>
                  <Mail className="h-3 w-3 mr-1" />
                  Email
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.print()}>
                  <Printer className="h-3 w-3 mr-1" />
                  Print
                </Button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-center gap-2 text-yellow-400 text-sm mb-1">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Automated Reports</span>
              </div>
              <p className="text-xs opacity-80">
                Subscribe to daily/weekly automated reports via SMS or email
              </p>
              <Button variant="outline" size="sm" className="mt-2 w-full">
                Setup Automation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DataExport;