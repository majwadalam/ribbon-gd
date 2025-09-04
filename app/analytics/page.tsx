"use client"

import { V0Button } from "@/components/v0-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/lib/use-toast"
import { TrendingUp, Users, CreditCard, Activity, Calendar, Download, BarChart3, PieChart, LineChart, RefreshCw } from "lucide-react"
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { useState } from "react"

// Sample data for analytics
const analyticsData = {
  overview: {
    revenue: { value: "$45,231.89", change: "+20.1%", trend: "up" },
    subscriptions: { value: "2,350", change: "+180.1%", trend: "up" },
    sales: { value: "12,234", change: "+19%", trend: "up" },
    activeNow: { value: "573", change: "+201", trend: "up" }
  },
  recentSales: [
    { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
    { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
    { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" }
  ],
  revenueData: [
    { month: "Jan", revenue: 42350, orders: 1234, customers: 856, conversion: 3.2 },
    { month: "Feb", revenue: 45680, orders: 1367, customers: 923, conversion: 3.4 },
    { month: "Mar", revenue: 48920, orders: 1456, customers: 1012, conversion: 3.6 },
    { month: "Apr", revenue: 52100, orders: 1523, customers: 1145, conversion: 3.5 },
    { month: "May", revenue: 48500, orders: 1489, customers: 1203, conversion: 3.3 },
    { month: "Jun", revenue: 51200, orders: 1598, customers: 1278, conversion: 3.7 }
  ],
  userAnalytics: {
    totalUsers: 12456,
    newUsers: 2343,
    returningUsers: 10113,
    sessionDuration: "4m 32s",
    bounceRate: "32.5%",
    conversionRate: "3.2%"
  },
  trafficSources: [
    { source: "Organic Search", users: 4567, percentage: 36.7, color: "#0088FE" },
    { source: "Direct", users: 3456, percentage: 27.8, color: "#00C49F" },
    { source: "Social Media", users: 2345, percentage: 18.8, color: "#FFBB28" },
    { source: "Email", users: 1234, percentage: 9.9, color: "#FF8042" },
    { source: "Referral", users: 854, percentage: 6.8, color: "#8884D8" }
  ],
  performanceMetrics: [
    { metric: "Page Load Time", value: 1.2, target: 2.0, score: 85, color: "#10B981" },
    { metric: "API Response", value: 245, target: 500, score: 92, color: "#3B82F6" },
    { metric: "Error Rate", value: 0.1, target: 1.0, score: 95, color: "#8B5CF6" },
    { metric: "Uptime", value: 99.9, target: 99.5, score: 100, color: "#F59E0B" },
    { metric: "Throughput", value: 1247, target: 1000, score: 88, color: "#EF4444" }
  ]
}

export default function Analytics() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
    toast({
      title: "Analytics Refreshed",
      description: "All analytics data has been updated with the latest metrics.",
    })
  }

  const exportAnalytics = (section = "all", format = "csv") => {
    let data = {}
    let filename = "analytics"

    switch (section) {
      case "overview":
        data = analyticsData.overview
        filename = "analytics-overview"
        break
      case "revenue":
        data = analyticsData.revenueData
        filename = "analytics-revenue"
        break
      case "users":
        data = analyticsData.userAnalytics
        filename = "analytics-users"
        break
      case "performance":
        data = analyticsData.performanceMetrics
        filename = "analytics-performance"
        break
      default:
        data = analyticsData
        filename = "analytics-complete"
    }

    if (format === "csv") {
      exportToCSV(data, filename)
    } else {
      exportToJSON(data, filename)
    }
  }

  const exportToCSV = (data, filename) => {
    let csvContent = ""
    
    if (Array.isArray(data)) {
      const headers = Object.keys(data[0]).join(",")
      csvContent = headers + "\n"
      data.forEach(row => {
        csvContent += Object.values(row).join(",") + "\n"
      })
    } else if (typeof data === 'object') {
      csvContent = "Metric,Value,Change,Trend\n"
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value.value) {
          csvContent += `${key},${value.value},${value.change || ''},${value.trend || ''}\n`
        } else {
          csvContent += `${key},${value},,\n`
        }
      })
    }

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', `${filename}.csv`)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    
    toast({
      title: "Export Successful",
      description: `${filename}.csv has been downloaded successfully.`,
    })
  }

  const exportToJSON = (data, filename) => {
    const dataStr = JSON.stringify(data, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', `${filename}.json`)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    
    toast({
      title: "Export Successful",
      description: `${filename}.json has been downloaded successfully.`,
    })
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">
            Detailed insights and comprehensive reporting for your business.
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
          {/* <Button 
            variant="outline" 
            size="sm"
            onClick={() => exportAnalytics("all", "csv")}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button> */}
          {/* <Button 
            variant="outline" 
            size="sm"
            onClick={() => exportAnalytics("all", "json")}
          >
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button> */}
          <V0Button prompt="Create a comprehensive analytics dashboard with charts, metrics, and reporting features" />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => exportAnalytics("overview", "csv")}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Overview
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.revenue.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">{analyticsData.overview.revenue.change}</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.subscriptions.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">{analyticsData.overview.subscriptions.change}</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.sales.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">{analyticsData.overview.sales.change}</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.activeNow.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">{analyticsData.overview.activeNow.change}</span> since last hour
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Revenue Overview</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => exportAnalytics("revenue", "csv")}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={analyticsData.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="month" 
                      className="text-muted-foreground"
                      fontSize={12}
                    />
                    <YAxis 
                      className="text-muted-foreground"
                      fontSize={12}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                      formatter={(value, name) => {
                        if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Revenue']
                        return [value.toLocaleString(), name]
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Traffic Sources</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => exportToCSV(analyticsData.trafficSources, "traffic-sources")}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </CardTitle>
                <CardDescription>
                  User acquisition by channel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {analyticsData.trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: source.color }}
                        />
                        <span className="text-sm font-medium">{source.source}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {source.users.toLocaleString()} ({source.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={analyticsData.trafficSources}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="users"
                    >
                      {analyticsData.trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value.toLocaleString(), 'Users']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => exportAnalytics("revenue", "csv")}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Revenue Data
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Revenue Analytics
              </CardTitle>
              <CardDescription>
                Detailed revenue breakdown and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsLineChart data={analyticsData.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="month" 
                    className="text-muted-foreground"
                    fontSize={12}
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    fontSize={12}
                    yAxisId="left"
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    fontSize={12}
                    yAxisId="right"
                    orientation="right"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                    formatter={(value, name) => {
                      if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Revenue']
                      if (name === 'conversion') return [`${value}%`, 'Conversion Rate']
                      return [value.toLocaleString(), name]
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    yAxisId="left"
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                    yAxisId="right"
                    dot={{ fill: 'hsl(var(--chart-2))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversion" 
                    stroke="hsl(var(--chart-3))" 
                    strokeWidth={2}
                    yAxisId="right"
                    dot={{ fill: 'hsl(var(--chart-3))' }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Monthly Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  +${((analyticsData.revenueData[analyticsData.revenueData.length - 1].revenue - analyticsData.revenueData[0].revenue) / analyticsData.revenueData.length).toFixed(0)}
                </div>
                <p className="text-xs text-muted-foreground">Average monthly growth</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Peak Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.revenueData.reduce((prev, current) => (prev.revenue > current.revenue) ? prev : current).month}
                </div>
                <p className="text-xs text-muted-foreground">
                  ${analyticsData.revenueData.reduce((prev, current) => (prev.revenue > current.revenue) ? prev : current).revenue.toLocaleString()} revenue
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Growth Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">18.5%</div>
                <p className="text-xs text-muted-foreground">Year over year</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => exportAnalytics("users", "csv")}
            >
              <Download className="h-4 w-4 mr-2" />
              Export User Data
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Analytics
              </CardTitle>
              <CardDescription>
                User engagement and growth metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="month" 
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
                    formatter={(value) => [value.toLocaleString(), 'Customers']}
                  />
                  <Bar 
                    dataKey="customers" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Metrics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.userAnalytics.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">All-time users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">New Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{analyticsData.userAnalytics.newUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Returning Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.userAnalytics.returningUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Session Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.userAnalytics.sessionDuration}</div>
                <p className="text-xs text-muted-foreground">Average session</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{analyticsData.userAnalytics.bounceRate}</div>
                <p className="text-xs text-muted-foreground">Single page visits</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{analyticsData.userAnalytics.conversionRate}</div>
                <p className="text-xs text-muted-foreground">Visitors to customers</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => exportAnalytics("performance", "csv")}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Performance Data
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>
                  System and business performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={analyticsData.performanceMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 8 }} />
                    <Radar 
                      name="Performance Score" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.3} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Breakdown</CardTitle>
                <CardDescription>
                  Detailed performance analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.performanceMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{metric.metric}</span>
                        <Badge 
                          variant="outline" 
                          className={
                            metric.score >= 90 
                              ? "bg-green-100 text-green-800 border-green-200"
                              : metric.score >= 70
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {metric.score}%
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Current: {metric.value}{metric.metric.includes('Time') || metric.metric.includes('Response') ? 's' : metric.metric.includes('Rate') || metric.metric.includes('Uptime') ? '%' : ''} 
                        • Target: {metric.target}{metric.metric.includes('Time') || metric.metric.includes('Response') ? 's' : metric.metric.includes('Rate') || metric.metric.includes('Uptime') ? '%' : ''}
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${metric.score}%`,
                            backgroundColor: metric.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>
                Overall system health and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Excellent Performance
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    System uptime and error rates are performing exceptionally well, exceeding all target thresholds consistently.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    Areas for Improvement
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    API response times and throughput can be optimized further to handle increasing user load more efficiently.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Recommendations
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Consider implementing caching strategies and load balancing to improve overall system performance metrics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}