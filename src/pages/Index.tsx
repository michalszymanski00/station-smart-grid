
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Zap, 
  Thermometer, 
  Lightbulb, 
  Snowflake, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  Settings,
  BarChart3,
  Activity,
  MapPin
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const Index = () => {
  const [selectedStation, setSelectedStation] = useState("Station A");

  // Mock data for demonstration
  const energyData = [
    { time: "00:00", consumption: 120, cost: 24 },
    { time: "04:00", consumption: 80, cost: 16 },
    { time: "08:00", consumption: 200, cost: 40 },
    { time: "12:00", consumption: 250, cost: 50 },
    { time: "16:00", consumption: 180, cost: 36 },
    { time: "20:00", consumption: 160, cost: 32 },
  ];

  const deviceData = [
    { name: "Refrigeration", consumption: 45, status: "optimal", color: "#22c55e" },
    { name: "Lighting", consumption: 25, status: "high", color: "#f59e0b" },
    { name: "HVAC", consumption: 35, status: "optimal", color: "#3b82f6" },
    { name: "Other", consumption: 15, status: "optimal", color: "#8b5cf6" },
  ];

  const alerts = [
    { id: 1, type: "warning", message: "Lighting system consumption 15% above threshold", time: "2 min ago" },
    { id: 2, type: "info", message: "HVAC system adjusted for weather conditions", time: "5 min ago" },
    { id: 3, type: "success", message: "Refrigeration efficiency optimized", time: "10 min ago" },
  ];

  const stations = ["Station A", "Station B", "Station C"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EnergyFlow</h1>
                <p className="text-sm text-gray-600">Intelligent Energy Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                value={selectedStation} 
                onChange={(e) => setSelectedStation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
              >
                {stations.map(station => (
                  <option key={station} value={station}>{station}</option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Consumption</CardTitle>
              <Activity className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">185.4 kW</div>
              <p className="text-xs text-blue-100">+12% from last hour</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Cost</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$847.32</div>
              <p className="text-xs text-green-100">-8% vs yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-orange-100">Excellent performance</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-purple-100">1 requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Real-time Consumption Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Real-time Energy Consumption
                  </CardTitle>
                  <CardDescription>Last 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={energyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="consumption" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Device Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Device Status Overview</CardTitle>
                  <CardDescription>Current system performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {deviceData.map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {device.name === "Refrigeration" && <Snowflake className="w-5 h-5 text-blue-500" />}
                        {device.name === "Lighting" && <Lightbulb className="w-5 h-5 text-yellow-500" />}
                        {device.name === "HVAC" && <Thermometer className="w-5 h-5 text-green-500" />}
                        {device.name === "Other" && <Zap className="w-5 h-5 text-purple-500" />}
                        <div>
                          <p className="font-medium">{device.name}</p>
                          <p className="text-sm text-gray-600">{device.consumption}% of total</p>
                        </div>
                      </div>
                      <Badge variant={device.status === "optimal" ? "default" : "secondary"}>
                        {device.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Energy Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Energy Distribution by System</CardTitle>
                <CardDescription>Current consumption breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="consumption"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-3">
                    {deviceData.map((device, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: device.color }}
                        />
                        <span className="flex-1">{device.name}</span>
                        <span className="font-medium">{device.consumption}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Snowflake className="w-5 h-5" />
                    Refrigeration System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Power Draw</span>
                      <span>85.2 kW</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Temperature</span>
                    <span className="text-green-600">-2°C ✓</span>
                  </div>
                  <Button size="sm" className="w-full">Control Settings</Button>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 bg-yellow-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-700">
                    <Lightbulb className="w-5 h-5" />
                    Lighting System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Power Draw</span>
                      <span>46.3 kW</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Brightness</span>
                    <span className="text-orange-600">High ⚠</span>
                  </div>
                  <Button size="sm" className="w-full">Adjust Brightness</Button>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Thermometer className="w-5 h-5" />
                    HVAC System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Power Draw</span>
                      <span>64.7 kW</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Target Temp</span>
                    <span className="text-green-600">22°C ✓</span>
                  </div>
                  <Button size="sm" className="w-full">Climate Control</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Energy costs over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cost" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forecasting Tab */}
          <TabsContent value="forecasting" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Forecast</CardTitle>
                  <CardDescription>Next 7 days prediction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-4">$5,847</div>
                  <p className="text-sm text-gray-600 mb-4">Estimated weekly cost based on current patterns</p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Potential savings with optimization</span>
                      <span className="text-green-600 font-medium">-$487 (8.3%)</span>
                    </div>
                    <Button className="w-full">View Optimization Suggestions</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tariff Recommendations</CardTitle>
                  <CardDescription>Optimal energy plans for your usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Peak-Off Plan</span>
                      <Badge variant="default">Recommended</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Save $156/month with time-based pricing</p>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Fixed Rate Plan</span>
                      <span className="text-sm text-gray-500">Current</span>
                    </div>
                    <p className="text-sm text-gray-600">Stable pricing at $0.12/kWh</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            {alerts.map((alert) => (
              <Alert key={alert.id} className={
                alert.type === "warning" ? "border-orange-200 bg-orange-50" :
                alert.type === "success" ? "border-green-200 bg-green-50" :
                "border-blue-200 bg-blue-50"
              }>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="flex justify-between">
                  {alert.type === "warning" ? "Warning" : 
                   alert.type === "success" ? "Success" : "Information"}
                  <span className="text-xs font-normal text-gray-500">{alert.time}</span>
                </AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
