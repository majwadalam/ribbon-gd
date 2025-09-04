"use client"

import { V0Button } from "@/components/v0-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/lib/use-toast"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CreditCard, 
  Activity, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  MapPin,
  Clock,
  Star,
  Download,
  RefreshCw
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { useState } from "react"

const performanceData = [
  { name: 'Jan', performance: 85, uptime: 99.9 },
  { name: 'Feb', performance: 88, uptime: 99.8 },
  { name: 'Mar', performance: 92, uptime: 99.9 },
  { name: 'Apr', performance: 87, uptime: 99.7 },
  { name: 'May', performance: 91, uptime: 99.9 },
  { name: 'Jun', performance: 94, uptime: 99.8 }
]

const geographicData = [
  { name: 'United States', value: 1234, color: '#0088FE' },
  { name: 'United Kingdom', value: 567, color: '#00C49F' },
  { name: 'Germany', value: 345, color: '#FFBB28' },
  { name: 'France', value: 234, color: '#FF8042' },
  { name: 'Others', value: 456, color: '#8884D8' }
]

const responseTimeData = [
  { endpoint: 'GET /api/users', time: 234, efficiency: 85 },
  { endpoint: 'POST /api/orders', time: 456, efficiency: 65 },
  { endpoint: 'GET /api/products', time: 123, efficiency: 92 },
  { endpoint: 'PUT /api/profile', time: 298, efficiency: 78 },
  { endpoint: 'DELETE /api/items', time: 167, efficiency: 88 }
]

export default function DashboardAlt() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
    toast({
      title: "Data Refreshed",
      description: "Alternative dashboard metrics have been updated.",
    })
  }

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} Initiated`,
      description: `${action} process has been started successfully.`,
    })
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Alternative</h1>
          <p className="text-muted-foreground mt-1">
            Alternative dashboard layout with enhanced visualizations and insights.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <V0Button prompt="Create an alternative dashboard layout with different card arrangements, progress bars, and enhanced metrics" />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Updated Top Stats Row - Similar to Main Dashboard */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$54,239</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+12.5%</span>
                  <span>vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,247</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+8.1%</span>
                  <span>vs last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.8%</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">-2.1%</span>
                  <span>vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$127</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+5.4%</span>
                  <span>vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Monthly Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Revenue Target</span>
                    <span>$45K / $60K</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>User Acquisition</span>
                    <span>2.1K / 3K</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Customer Satisfaction</span>
                    <span>4.2 / 5.0</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-green-500 rounded-full mt-2" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">New customer registered</p>
                      <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto text-xs">2m</Badge>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-2" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Payment processed</p>
                      <p className="text-xs text-muted-foreground">$1,299.00 from subscription</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto text-xs">5m</Badge>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-purple-500 rounded-full mt-2" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Feature request submitted</p>
                      <p className="text-xs text-muted-foreground">Dark mode for mobile app</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto text-xs">1h</Badge>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-orange-500 rounded-full mt-2" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Server maintenance completed</p>
                      <p className="text-xs text-muted-foreground">All systems operational</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto text-xs">2h</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction("Schedule Meeting")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction("Invite Team Member")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Invite Team Member
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction("Process Refund")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Process Refund
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction("Generate Report")}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Large Chart Area */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>
                  Revenue performance over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="name" 
                      className="text-muted-foreground"
                      fontSize={12}
                    />
                    <YAxis 
                      className="text-muted-foreground"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="performance" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Premium Subscription</p>
                      <p className="text-xs text-muted-foreground">142 sales</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">$28,400</p>
                      <div className="flex items-center text-xs text-green-600">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        <span>4.9</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Basic Plan</p>
                      <p className="text-xs text-muted-foreground">89 sales</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">$8,900</p>
                      <div className="flex items-center text-xs text-green-600">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        <span>4.7</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Enterprise</p>
                      <p className="text-xs text-muted-foreground">23 sales</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">$23,000</p>
                      <div className="flex items-center text-xs text-green-600">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        <span>5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  System and application performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="endpoint" 
                      className="text-muted-foreground"
                      fontSize={10}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      className="text-muted-foreground"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                    <Bar dataKey="time" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
                <CardDescription>
                  Average API response times by endpoint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {responseTimeData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{item.endpoint}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={item.efficiency} className="w-20 h-2" />
                        <span className="text-sm font-mono">{item.time}ms</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>
                  User distribution by location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={geographicData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {geographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geographicData.map((region, index) => {
                    const total = geographicData.reduce((sum, item) => sum + item.value, 0)
                    const percentage = Math.round((region.value / total) * 100)
                    
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{region.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={percentage} className="w-20 h-2" />
                          <span className="text-sm font-medium">{region.value.toLocaleString()}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}