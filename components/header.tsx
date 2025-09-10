"use client"

import { Search, Bell, User, Moon, Sun, Settings, HelpCircle, Code, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"

// Define the props interface for the Header component
interface HeaderProps {
  title?: string // Optional title to display in the header
  breadcrumbs?: Array<{
    label: string // Text to display for the breadcrumb
    href?: string // Optional link for the breadcrumb
  }>
}

export function Header({ title, breadcrumbs }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  // Function to handle the "Edit in V0" button click
  // This opens V0 with the entire template code for editing
  const handleEditInV0 = () => {
    const prompt = "Edit this complete Ribbon Admin Template - a modern Next.js dashboard with authentication, analytics, team management, and comprehensive settings. Please render the UI exactly as it is without making any changes."
    
    // Comprehensive code for all pages in the template with complete implementations
    const allPagesCode = `
// ===========================================
// MAIN DASHBOARD PAGE (app/page.tsx)
// ===========================================
"use client"

import { Header } from "@/components/header"
import { V0Button } from "@/components/v0-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Users, CreditCard, Activity, DollarSign, Download, RefreshCw } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useToast } from "@/lib/use-toast"
import { useState } from "react"

const revenueData = [
  { month: "Jan", revenue: 42350, orders: 1234, customers: 856 },
  { month: "Feb", revenue: 45680, orders: 1367, customers: 923 },
  { month: "Mar", revenue: 48920, orders: 1456, customers: 1012 },
  { month: "Apr", revenue: 52100, orders: 1523, customers: 1145 },
  { month: "May", revenue: 48500, orders: 1489, customers: 1203 },
  { month: "Jun", revenue: 51200, orders: 1598, customers: 1278 }
]

const DASHBOARD_CODE = \`"use client"

import { Header } from "@/components/header"
import { V0Button } from "@/components/v0-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Users, CreditCard, Activity, DollarSign, Download, RefreshCw } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useToast } from "@/lib/use-toast"
import { useState } from "react"

export default function Dashboard() {
  // Dashboard component logic...
}\`

export default function Dashboard() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
    toast({
      title: "Dashboard Updated",
      description: "Latest data has been refreshed successfully.",
    })
  }

  const handleExportData = () => {
    const csvData = revenueData.map(item => \`\${item.month},\${item.revenue},\${item.orders},\${item.customers}\`).join('\\n')
    const blob = new Blob([\`Month,Revenue,Orders,Customers\\n\${csvData}\`], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'dashboard-data.csv'
    a.click()
    
    toast({
      title: "Export Successful",
      description: "Dashboard data has been exported to CSV.",
    })
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your business metrics.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={\`h-4 w-4 mr-2 \${isRefreshing ? 'animate-spin' : ''}\`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <V0Button 
            prompt="just render the ui as it is of this page , dont make any changes , just as it is."
            code={DASHBOARD_CODE}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+20.1%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,234</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+180.1%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+19%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-red-500" />
              <span className="text-red-500">-201</span>
              <span>since last hour</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Your revenue over the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="month" 
                  className="text-muted-foreground"
                  fontSize={12}
                />
                <YAxis 
                  className="text-muted-foreground"
                  fontSize={12}
                  tickFormatter={(value) => \`$\${(value / 1000).toFixed(0)}k\`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                  formatter={(value) => [\`$\${value.toLocaleString()}\`, 'Revenue']}
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
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest transactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">Payment received</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-md">$2,400</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">New user registered</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-md">User</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">Payout processed</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-md">$5,200</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">API key generated</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-md">API</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ===========================================
// ANALYTICS PAGE (app/analytics/page.tsx)
// ===========================================
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

const analyticsData = {
  overview: {
    revenue: { value: "$45,231.89", change: "+20.1%", trend: "up" },
    subscriptions: { value: "2,350", change: "+180.1%", trend: "up" },
    sales: { value: "12,234", change: "+19%", trend: "up" },
    activeNow: { value: "573", change: "+201", trend: "up" }
  },
  revenueData: [
    { month: "Jan", revenue: 42350, orders: 1234, customers: 856, conversion: 3.2 },
    { month: "Feb", revenue: 45680, orders: 1367, customers: 923, conversion: 3.4 },
    { month: "Mar", revenue: 48920, orders: 1456, customers: 1012, conversion: 3.6 },
    { month: "Apr", revenue: 52100, orders: 1523, customers: 1145, conversion: 3.5 },
    { month: "May", revenue: 48500, orders: 1489, customers: 1203, conversion: 3.3 },
    { month: "Jun", revenue: 51200, orders: 1598, customers: 1278, conversion: 3.7 }
  ],
  trafficSources: [
    { source: "Organic Search", users: 4567, percentage: 36.7, color: "#0088FE" },
    { source: "Direct", users: 3456, percentage: 27.8, color: "#00C49F" },
    { source: "Social Media", users: 2345, percentage: 18.8, color: "#FFBB28" },
    { source: "Email", users: 1234, percentage: 9.9, color: "#FF8042" },
    { source: "Referral", users: 854, percentage: 6.8, color: "#8884D8" }
  ]
}

const ANALYTICS_CODE = \`"use client"

import { V0Button } from "@/components/v0-button"
// ... other imports

export default function Analytics() {
  // Component logic here...
}\`

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
            <RefreshCw className={\`h-4 w-4 mr-2 \${isRefreshing ? 'animate-spin' : ''}\`} />
            Refresh
          </Button>
          <V0Button 
            prompt="just render the ui as it is of this page , dont make any changes , just as it is."
            code={ANALYTICS_CODE}
          />
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
                <CardTitle>Revenue Overview</CardTitle>
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
                      tickFormatter={(value) => \`$\${(value / 1000).toFixed(0)}k\`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
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
                <CardTitle>Traffic Sources</CardTitle>
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
                        <Cell key={\`cell-\${index}\`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
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
                    tickFormatter={(value) => \`$\${(value / 1000).toFixed(0)}k\`}
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
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
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
              <div className="text-center py-8">
                <p className="text-muted-foreground">Performance metrics dashboard coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ===========================================
// TEAM MANAGEMENT PAGE (app/team/page.tsx) 
// ===========================================
"use client"

import { V0Button } from "@/components/v0-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { useToast } from "@/lib/use-toast"
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal,
  Mail,
  Shield,
  Crown,
  User,
  Settings,
  Trash2,
  UserX,
  Download,
  RefreshCw
} from "lucide-react"
import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const initialTeamMembers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "admin",
    avatar: "/avatars/01.png",
    status: "active",
    joinedDate: "Jan 2024",
    lastActive: "2 hours ago"
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    role: "editor",
    avatar: "/avatars/02.png",
    status: "active",
    joinedDate: "Feb 2024",
    lastActive: "5 minutes ago"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    role: "viewer",
    avatar: "/avatars/03.png",
    status: "invited",
    joinedDate: "Mar 2024",
    lastActive: "Never"
  },
  {
    id: "4",
    name: "David Kim",
    email: "david@example.com",
    role: "editor",
    avatar: "/avatars/04.png",
    status: "inactive",
    joinedDate: "Jan 2024",
    lastActive: "2 weeks ago"
  },
]

const roles = [
  {
    value: "admin",
    label: "Admin",
    description: "Full access to all features",
    icon: Crown,
    color: "text-yellow-600"
  },
  {
    value: "editor",
    label: "Editor", 
    description: "Can view and edit content",
    icon: Settings,
    color: "text-blue-600"
  },
  {
    value: "viewer",
    label: "Viewer",
    description: "Can only view content",
    icon: User,
    color: "text-gray-600"
  }
]

const TEAM_CODE = \`"use client"

import { V0Button } from "@/components/v0-button"
// ... other imports

export default function Team() {
  // Component logic here...
}\`

export default function Team() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [newMember, setNewMember] = useState({
    name: "",
    email: "", 
    role: "viewer"
  })
  
  const { toast } = useToast()

  const getRoleInfo = (role: string) => {
    return roles.find(r => r.value === role) || roles[2]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200"
      case "invited": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "inactive": return "bg-gray-100 text-gray-800 border-gray-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || member.role === selectedRole
    return matchesSearch && matchesRole
  })

  const handleInviteMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    const member = {
      id: (teamMembers.length + 1).toString(),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      avatar: "",
      status: "invited",
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      lastActive: "Never"
    }

    setTeamMembers([...teamMembers, member])
    setNewMember({ name: "", email: "", role: "viewer" })
    setInviteDialogOpen(false)
    
    toast({
      title: "Invitation Sent",
      description: \`Successfully invited \${newMember.name} to join the team.\`,
    })
  }

  const handleRemoveMember = (memberId: string, memberName: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== memberId))
    toast({
      title: "Member Removed",
      description: \`\${memberName} has been removed from the team.\`,
    })
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
    toast({
      title: "Team Data Refreshed",
      description: "Team member information has been updated.",
    })
  }

  const roleDistribution = roles.map(role => ({
    name: role.label,
    value: teamMembers.filter(member => member.role === role.value).length,
    color: role.value === 'admin' ? '#EAB308' : role.value === 'editor' ? '#3B82F6' : '#6B7280'
  }))

  const statusData = [
    { name: 'Active', value: teamMembers.filter(m => m.status === 'active').length, color: '#10B981' },
    { name: 'Invited', value: teamMembers.filter(m => m.status === 'invited').length, color: '#F59E0B' },
    { name: 'Inactive', value: teamMembers.filter(m => m.status === 'inactive').length, color: '#6B7280' }
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members, roles, and permissions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={\`h-4 w-4 mr-2 \${isRefreshing ? 'animate-spin' : ''}\`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <V0Button 
            prompt="just render the ui as it is of this page , dont make any changes , just as it is."
            code={TEAM_CODE}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              +1 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter(m => m.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((teamMembers.filter(m => m.status === 'active').length / teamMembers.length) * 100)}% of total members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter(m => m.status === 'invited').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Waiting for response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter(m => m.role === 'admin').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Full access members
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Role Distribution</CardTitle>
            <CardDescription>Team members by role</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => \`\${name} \${(percent * 100).toFixed(0)}%\`}
                >
                  {roleDistribution.map((entry, index) => (
                    <Cell key={\`cell-\${index}\`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Member Status</CardTitle>
            <CardDescription>Team member activity status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-muted-foreground" fontSize={12} />
                <YAxis className="text-muted-foreground" fontSize={12} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage your team members and their permissions
              </CardDescription>
            </div>
            <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>
                    Send an invitation to join your team.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                      placeholder="colleague@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={newMember.role} onValueChange={(value) => setNewMember({...newMember, role: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            <div className="flex items-center gap-2">
                              <role.icon className={\`h-4 w-4 \${role.color}\`} />
                              <div>
                                <div className="font-medium">{role.label}</div>
                                <div className="text-xs text-muted-foreground">
                                  {role.description}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInviteMember}>Send Invitation</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search members..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredMembers.length} of {teamMembers.length} members
            </p>
          </div>

          <div className="space-y-3">
            {filteredMembers.map((member) => {
              const roleInfo = getRoleInfo(member.role)
              const RoleIcon = roleInfo.icon

              return (
                <Card key={member.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold">{member.name}</h4>
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(member.status)}
                          >
                            {member.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{member.email}</span>
                          <span>•</span>
                          <span>Joined {member.joinedDate}</span>
                          <span>•</span>
                          <span>Active {member.lastActive}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <RoleIcon className={\`h-4 w-4 \${roleInfo.color}\`} />
                        <span className="font-medium">{roleInfo.label}</span>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <UserX className="mr-2 h-4 w-4" />
                            Suspend User
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleRemoveMember(member.id, member.name)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ===========================================
// LOGIN PAGE (app/login/page.tsx)
// ===========================================
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { V0Button } from "@/components/v0-button"
import { Eye, EyeOff, Github, Mail } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const LOGIN_CODE = \`"use client"

import { Button } from "@/components/ui/button"
// ... other imports

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/20">
      {/* Login form implementation */}
    </div>
  )
}\`

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-semibold">
            R
          </div>
          <span className="text-2xl font-bold">Ribbon</span>
        </div>

        <Card className="glass-effect">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2 grid-cols-2">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full">
                Sign in
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <V0Button 
            prompt="just render the ui as it is of this page , dont make any changes , just as it is."
            code={LOGIN_CODE}
            className="text-xs"
          />
        </div>
      </div>
    </div>
  )
}

// ===========================================
// SIGNUP PAGE (app/signup/page.tsx)
// ===========================================
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { V0Button } from "@/components/v0-button"
import { Eye, EyeOff, Github, Mail, User, Building, Check } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const SIGNUP_CODE = \`"use client"

import { Button } from "@/components/ui/button"
// ... other imports

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/20">
      {/* Multi-step signup form implementation */}
    </div>
  )
}\`

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { id: 1, title: "Account", description: "Create your account" },
    { id: 2, title: "Profile", description: "Tell us about yourself" },
    { id: 3, title: "Complete", description: "You're all set!" },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-semibold">
            R
          </div>
          <span className="text-2xl font-bold">Ribbon</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={\`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium \${
                currentStep >= step.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }\`}>
                {currentStep > step.id ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={\`w-20 h-0.5 mx-4 \${
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                }\`} />
              )}
            </div>
          ))}
        </div>

        <Card className="glass-effect">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentStep === 1 && (
              <>
                <div className="grid gap-2 grid-cols-2">
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button 
                    type="button" 
                    className="w-full"
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid gap-2 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Job Title</Label>
                  <Input
                    id="role"
                    placeholder="Software Engineer"
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    className="w-full"
                    onClick={() => setCurrentStep(3)}
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Account Created!</h3>
                  <p className="text-muted-foreground text-sm">
                    We've sent a verification email to your inbox. Please check your email and verify your account.
                  </p>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/login">
                    Continue to Login
                  </Link>
                </Button>
              </div>
            )}

            {currentStep < 3 && (
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <V0Button 
            prompt="just render the ui as it is of this page , dont make any changes , just as it is."
            code={SIGNUP_CODE}
            className="text-xs"
          />
        </div>
      </div>
    </div>
  )
}

// ===========================================
// Table COMPONENT (app/table/page.tsx)
// ===========================================

"use client"

import { V0Button } from "@/components/v0-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/lib/use-toast"
import { ChevronDown, ChevronRight, Search, Download, Filter, Eye, Edit, Trash2, Plus, RefreshCw } from "lucide-react"
import { useState } from "react"

// TypeScript interfaces for type safety
interface CustomerDetails {
  address: string
  phone: string
  orders: number
  totalSpent: string
}

interface Customer {
  id: string
  customer: string
  email: string
  status: string
  amount: string
  date: string
  details: CustomerDetails
}

interface Product {
  id: string
  name: string
  category: string
  price: string
  stock: number
  status: string
  sales: number
}

interface Order {
  id: string
  customer: string
  product: string
  amount: string
  status: string
  date: string
}

interface NewCustomer {
  customer: string
  email: string
  phone: string
  address: string
  status: string
}

interface NewProduct {
  name: string
  category: string
  price: string
  stock: string
  status: string
}

interface NewOrder {
  customer: string
  product: string
  amount: string
  status: string
}

// Initial sample data for customers with detailed information
const initialCustomerData: Customer[] = [
  {
    id: "1",
    customer: "Olivia Martin",
    email: "olivia.martin@email.com",
    status: "active",
    amount: "$1,999.00",
    date: "2024-01-15",
    details: {
      address: "123 Main St, San Francisco, CA",
      phone: "+1 (555) 123-4567",
      orders: 15,
      totalSpent: "$15,420.00"
    }
  },
  {
    id: "2",
    customer: "Jackson Lee",
    email: "jackson.lee@email.com",
    status: "pending",
    amount: "$39.00",
    date: "2024-01-14",
    details: {
      address: "456 Oak Ave, New York, NY",
      phone: "+1 (555) 234-5678",
      orders: 3,
      totalSpent: "$420.00"
    }
  },
  {
    id: "3",
    customer: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    status: "active",
    amount: "$299.00",
    date: "2024-01-13",
    details: {
      address: "789 Pine Rd, Los Angeles, CA",
      phone: "+1 (555) 345-6789",
      orders: 8,
      totalSpent: "$2,350.00"
    }
  },
  {
    id: "4",
    customer: "William Kim",
    email: "will@email.com",
    status: "inactive",
    amount: "$99.00",
    date: "2024-01-12",
    details: {
      address: "321 Elm St, Chicago, IL",
      phone: "+1 (555) 456-7890",
      orders: 2,
      totalSpent: "$180.00"
    }
  },
]

// Initial sample data for products
const initialProductData: Product[] = [
  {
    id: "1",
    name: "Premium Subscription",
    category: "Subscription",
    price: "$29.99",
    stock: 999,
    status: "active",
    sales: 142
  },
  {
    id: "2",
    name: "Basic Plan",
    category: "Subscription",
    price: "$9.99",
    stock: 999,
    status: "active",
    sales: 89
  },
  {
    id: "3",
    name: "Enterprise",
    category: "Subscription",
    price: "$99.99",
    stock: 999,
    status: "active",
    sales: 23
  },
]

// Initial sample data for orders
const initialOrderData: Order[] = [
  {
    id: "ORD-001",
    customer: "Olivia Martin",
    product: "Premium Subscription",
    amount: "$29.99",
    status: "completed",
    date: "2024-01-15"
  },
  {
    id: "ORD-002",
    customer: "Jackson Lee",
    product: "Basic Plan",
    amount: "$9.99",
    status: "pending",
    date: "2024-01-14"
  },
  {
    id: "ORD-003",
    customer: "Isabella Nguyen",
    product: "Enterprise",
    amount: "$99.99",
    status: "completed",
    date: "2024-01-13"
  },
]

export default function Tables() {
  // State management for all table data and UI interactions
  const [customerData, setCustomerData] = useState<Customer[]>(initialCustomerData)
  const [productData, setProductData] = useState<Product[]>(initialProductData)
  const [orderData, setOrderData] = useState<Order[]>(initialOrderData)
  
  // UI state for expandable rows and search functionality
  const [expandedRows, setExpandedRows] = useState(new Set<string>())
  const [customerSearchTerm, setCustomerSearchTerm] = useState("")
  const [customerStatusFilter, setCustomerStatusFilter] = useState("all")
  
  const [productSearchTerm, setProductSearchTerm] = useState("")
  const [orderSearchTerm, setOrderSearchTerm] = useState("")
  
  // Modal states for adding new entries
  const [customerModalOpen, setCustomerModalOpen] = useState(false)
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  // Form states for new entries
  const [newCustomer, setNewCustomer] = useState<NewCustomer>({
    customer: "",
    email: "",
    phone: "",
    address: "",
    status: "active"
  })
  
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "active"
  })
  
  const [newOrder, setNewOrder] = useState<NewOrder>({
    customer: "",
    product: "",
    amount: "",
    status: "pending"
  })

  const { toast } = useToast()

  // Export functionality for data tables
  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).filter(key => key !== 'details').join(",")
    const csvData = data.map(row => 
      Object.entries(row)
        .filter(([key]) => key !== 'details')
        .map(([_, value]) => typeof value === 'object' ? JSON.stringify(value) : value)
        .join(",")
    ).join("\\n")
    
    const csv = \`\${headers}\\n\${csvData}\`
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', \`\${filename}.csv\`)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    
    toast({
      title: "Export Successful",
      description: \`\${filename}.csv has been downloaded successfully.\`,
    })
  }

  // Toggle expandable table rows
  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  // Filter functions for different tables
  const filteredCustomerData = customerData.filter(item => {
    const matchesSearch = item.customer.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(customerSearchTerm.toLowerCase())
    const matchesStatus = customerStatusFilter === "all" || item.status === customerStatusFilter
    return matchesSearch && matchesStatus
  })
  
  const filteredProductData = productData.filter(item =>
    item.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(productSearchTerm.toLowerCase())
  )
  
  const filteredOrderData = orderData.filter(item =>
    item.customer.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
    item.product.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(orderSearchTerm.toLowerCase())
  )

  // Helper function to get status badge colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": case "completed": return "bg-green-300 text-green-800 border-green-700"
      case "pending": return "bg-yellow-300 text-yellow-800 border-yellow-700"
      case "inactive": return "bg-red-300 text-red-800 border-red-700"
      default: return "bg-gray-300 text-gray-800 border-gray-700"
    }
  }

  // Handle adding new customer
  const handleAddCustomer = () => {
    if (!newCustomer.customer || !newCustomer.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in customer name and email.",
        variant: "destructive"
      })
      return
    }

    const customer: Customer = {
      id: (customerData.length + 1).toString(),
      customer: newCustomer.customer,
      email: newCustomer.email,
      status: newCustomer.status,
      amount: "$0.00",
      date: new Date().toISOString().split('T')[0],
      details: {
        address: newCustomer.address,
        phone: newCustomer.phone,
        orders: 0,
        totalSpent: "$0.00"
      }
    }
    setCustomerData([...customerData, customer])
    setNewCustomer({ customer: "", email: "", phone: "", address: "", status: "active" })
    setCustomerModalOpen(false)
    
    toast({
      title: "Customer Added",
      description: \`\${newCustomer.customer} has been added successfully.\`,
    })
  }

  // Handle adding new product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast({
        title: "Missing Information", 
        description: "Please fill in product name and price.",
        variant: "destructive"
      })
      return
    }

    const product: Product = {
      id: (productData.length + 1).toString(),
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price,
      stock: parseInt(newProduct.stock) || 0,
      status: newProduct.status,
      sales: 0
    }
    setProductData([...productData, product])
    setNewProduct({ name: "", category: "", price: "", stock: "", status: "active" })
    setProductModalOpen(false)
    
    toast({
      title: "Product Added",
      description: \`\${newProduct.name} has been added to the catalog.\`,
    })
  }

  // Handle adding new order
  const handleAddOrder = () => {
    if (!newOrder.customer || !newOrder.product || !newOrder.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all order details.",
        variant: "destructive"
      })
      return
    }

    const order: Order = {
      id: \`ORD-\${String(orderData.length + 1).padStart(3, '0')}\`,
      customer: newOrder.customer,
      product: newOrder.product,
      amount: newOrder.amount,
      status: newOrder.status,
      date: new Date().toISOString().split('T')[0]
    }
    setOrderData([...orderData, order])
    setNewOrder({ customer: "", product: "", amount: "", status: "pending" })
    setOrderModalOpen(false)
    
    toast({
      title: "Order Created",
      description: \`Order \${order.id} has been created successfully.\`,
    })
  }

  // Handle deleting items from any table
  const handleDeleteItem = (id: string, type: string, name: string) => {
    switch (type) {
      case 'customer':
        setCustomerData(customerData.filter(item => item.id !== id))
        break
      case 'product':
        setProductData(productData.filter(item => item.id !== id))
        break
      case 'order':
        setOrderData(orderData.filter(item => item.id !== id))
        break
    }
    
    toast({
      title: "Item Deleted",
      description: \`\${name} has been removed successfully.\`,
      variant: "destructive"
    })
  }

  // Handle refreshing all table data
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
    toast({
      title: "Tables Refreshed",
      description: "All table data has been refreshed.",
    })
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Tables</h1>
          <p className="text-muted-foreground mt-1">
            Advanced tables with collapsible rows, filtering, and sorting.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={\`h-4 w-4 mr-2 \${isRefreshing ? 'animate-spin' : ''}\`} />
            Refresh
          </Button>
          <V0Button 
            prompt="just render the ui as it is of this page , dont make any changes, just as it is"
            code={TABLES_CODE}
          />
        </div>
      </div>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customer Database</CardTitle>
              <CardDescription>
                Manage and view customer information with expandable details
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV(customerData, 'customers')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={customerModalOpen} onOpenChange={setCustomerModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                    <DialogDescription>
                      Enter the customer details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customer">Customer Name *</Label>
                        <Input
                          id="customer"
                          value={newCustomer.customer}
                          onChange={(e) => setNewCustomer({...newCustomer, customer: e.target.value})}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newCustomer.email}
                          onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={newCustomer.address}
                        onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                        placeholder="123 Main St, City, State"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={newCustomer.status} onValueChange={(value) => setNewCustomer({...newCustomer, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCustomerModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCustomer}>Add Customer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search customers..." 
                  value={customerSearchTerm}
                  onChange={(e) => setCustomerSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={customerStatusFilter} onValueChange={setCustomerStatusFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredCustomerData.length} of {customerData.length} customers
            </p>
          </div>

          {/* Customer Table with Expandable Rows */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomerData.map((item) => (
                  <Collapsible key={item.id} asChild>
                    <>
                      <TableRow className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleRow(item.id)}
                              className="p-0 h-6 w-6"
                            >
                              {expandedRows.has(item.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.customer}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.email}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(item.status)}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {item.amount}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.date}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toast({ title: "View Customer", description: \`Viewing \${item.customer}\` })}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toast({ title: "Edit Customer", description: \`Edit \${item.customer}\` })}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteItem(item.id, 'customer', item.customer)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <CollapsibleContent asChild>
                        <TableRow className="hover:bg-muted/25">
                          <TableCell></TableCell>
                          <TableCell colSpan={6}>
                            <div className="p-4 bg-muted/25 rounded-md">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                                  <p className="text-sm">{item.details.address}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                                  <p className="text-sm">{item.details.phone}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground">Total Orders</h4>
                                  <p className="text-sm font-medium">{item.details.orders}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground">Total Spent</h4>
                                  <p className="text-sm font-medium font-mono">{item.details.totalSpent}</p>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product Catalog</CardTitle>
              <CardDescription>
                Manage your products and inventory
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV(productData, 'products')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Enter the product details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          placeholder="Premium Plan"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                          placeholder="Subscription"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price *</Label>
                        <Input
                          id="price"
                          placeholder="$29.99"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                          placeholder="100"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={newProduct.status} onValueChange={(value) => setNewProduct({...newProduct, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setProductModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddProduct}>Add Product</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Product Search */}
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                value={productSearchTerm}
                onChange={(e) => setProductSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredProductData.length} of {productData.length} products
            </p>
          </div>

          {/* Products Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProductData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="font-mono">{item.price}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(item.status)}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.sales}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toast({ title: "View Product", description: \`Viewing \${item.name}\` })}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toast({ title: "Edit Product", description: \`Edit \${item.name}\` })}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteItem(item.id, 'product', item.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>
                Track and manage customer orders
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV(orderData, 'orders')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={orderModalOpen} onOpenChange={setOrderModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Order
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Order</DialogTitle>
                    <DialogDescription>
                      Enter the order details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="orderCustomer">Customer Name *</Label>
                      <Input
                        id="orderCustomer"
                        value={newOrder.customer}
                        onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orderProduct">Product *</Label>
                      <Input
                        id="orderProduct"
                        value={newOrder.product}
                        onChange={(e) => setNewOrder({...newOrder, product: e.target.value})}
                        placeholder="Premium Subscription"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orderAmount">Amount *</Label>
                      <Input
                        id="orderAmount"
                        placeholder="$29.99"
                        value={newOrder.amount}
                        onChange={(e) => setNewOrder({...newOrder, amount: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orderStatus">Status</Label>
                      <Select value={newOrder.status} onValueChange={(value) => setNewOrder({...newOrder, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOrderModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddOrder}>Add Order</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Order Search */}
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search orders..." 
                value={orderSearchTerm}
                onChange={(e) => setOrderSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredOrderData.length} of {orderData.length} orders
            </p>
          </div>

          {/* Orders Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrderData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono">{item.id}</TableCell>
                    <TableCell className="font-medium">{item.customer}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell className="font-mono">{item.amount}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(item.status)}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toast({ title: "View Order", description: \`Viewing order \${item.id}\` })}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toast({ title: "Edit Order", description: \`Edit order \${item.id}\` })}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteItem(item.id, 'order', \`Order \${item.id}\`)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
// ===========================================
// DASH ALT COMPONENT (app/dasboard-alt/page.tsx)
// ===========================================

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

// Sample data for performance metrics over time
const performanceData = [
  { name: 'Jan', performance: 85, uptime: 99.9 },
  { name: 'Feb', performance: 88, uptime: 99.8 },
  { name: 'Mar', performance: 92, uptime: 99.9 },
  { name: 'Apr', performance: 87, uptime: 99.7 },
  { name: 'May', performance: 91, uptime: 99.9 },
  { name: 'Jun', performance: 94, uptime: 99.8 }
]

// Geographic distribution data for user locations
const geographicData = [
  { name: 'United States', value: 1234, color: '#0088FE' },
  { name: 'United Kingdom', value: 567, color: '#00C49F' },
  { name: 'Germany', value: 345, color: '#FFBB28' },
  { name: 'France', value: 234, color: '#FF8042' },
  { name: 'Others', value: 456, color: '#8884D8' }
]

// API response time data for performance monitoring
const responseTimeData = [
  { endpoint: 'GET /api/users', time: 234, efficiency: 85 },
  { endpoint: 'POST /api/orders', time: 456, efficiency: 65 },
  { endpoint: 'GET /api/products', time: 123, efficiency: 92 },
  { endpoint: 'PUT /api/profile', time: 298, efficiency: 78 },
  { endpoint: 'DELETE /api/items', time: 167, efficiency: 88 }
]

export default function DashboardAlt() {
  // Custom toast notifications for user feedback
  const { toast } = useToast()
  // State for refresh functionality
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Handle refreshing dashboard data
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
    toast({
      title: "Data Refreshed",
      description: "Alternative dashboard metrics have been updated.",
    })
  }

  // Handle quick action buttons
  const handleQuickAction = (action: string) => {
    toast({
      title: \`\${action} Initiated\`,
      description: \`\${action} process has been started successfully.\`,
    })
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page Header with Title and Action Buttons */}
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
            <RefreshCw className={\`h-4 w-4 mr-2 \${isRefreshing ? 'animate-spin' : ''}\`} />
            Refresh
          </Button>
          <V0Button 
            prompt="just render the ui as it is of this page , dont make any changes, just as it is"
            code={DASHBOARD_ALT_CODE}
          />
        </div>
      </div>

      {/* Tabbed Interface for Different Dashboard Views */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          {/* Top Stats Row - Key Performance Indicators */}
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

          {/* Progress Cards for Goals and Activity */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Monthly Goals Progress */}
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

            {/* Recent Activity Feed */}
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

            {/* Quick Actions Panel */}
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

          {/* Large Chart Area for Main Visualizations */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Revenue Trends Chart */}
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

            {/* Top Performing Products */}
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

        {/* Performance Tab Content */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Performance Metrics Chart */}
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

            {/* Response Times Details */}
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

        {/* Geographic Tab Content */}
        <TabsContent value="geographic" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Geographic Distribution Pie Chart */}
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
                      label={({ name, percent }) => \`\${name} \${(percent * 100).toFixed(0)}%\`}
                    >
                      {geographicData.map((entry, index) => (
                        <Cell key={\`cell-\${index}\`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Regions List */}
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


// ===========================================
// Settings COMPONENT (app/settings/page.tsx)
// ===========================================

"use client"
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { V0Button } from '@/components/v0-button';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Key, 
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react';

// Type definitions for better code maintainability
interface ToastType {
  id: string;
  title: string;
  description?: string;
  variant: "default" | "destructive";
  open: boolean;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  bio: string;
  timezone: string;
  avatar: string;
}

interface NotificationSettings {
  marketing: boolean;
  security: boolean;
  payments: boolean;
  realTime: boolean;
  weeklyReports: boolean;
}

interface PasswordData {
  current: string;
  new: string;
  confirm: string;
}

interface ApiKey {
  id: number;
  name: string;
  key: string;
  type: 'production' | 'development';
}

interface Session {
  id: number;
  name: string;
  device: string;
  location: string;
  active: boolean;
}

interface UseToastReturn {
  toasts: ToastType[];
  toast: (options: { title: string; description?: string; variant?: "default" | "destructive" }) => { id: string; dismiss: () => void };
  dismiss: (toastId: string) => void;
}

// Custom toast hook implementation
const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const toast = ({ title, description, variant = "default" }: { 
    title: string; 
    description?: string; 
    variant?: "default" | "destructive" 
  }) => {
    const id = Date.now().toString();
    const newToast: ToastType = {
      id,
      title,
      description,
      variant,
      open: true
    };

    setToasts(prev => [...prev, newToast]);

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);

    return {
      id,
      dismiss: () => setToasts(prev => prev.filter(t => t.id !== id))
    };
  };

  const dismiss = (toastId: string) => {
    setToasts(prev => prev.filter(t => t.id !== toastId));
  };

  return { toasts, toast, dismiss };
};

// Toast Component Props
interface ToasterProps {
  toasts: ToastType[];
  dismiss: (toastId: string) => void;
}

// Toast notification component
const Toaster: React.FC<ToasterProps> = ({ toasts, dismiss }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={\`flex items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-lg transition-all animate-in slide-in-from-top-2 \${
            toast.variant === "destructive"
              ? "border-red-200 bg-red-50 text-red-900"
              : "border-green-200 bg-green-50 text-green-900"
          }\`}
        >
          <div className="flex items-center space-x-2">
            {toast.variant === "destructive" ? (
              <X className="h-4 w-4 text-red-500" />
            ) : (
              <Check className="h-4 w-4 text-green-500" />
            )}
            <div>
              {toast.title && <div className="text-sm font-semibold">{toast.title}</div>}
              {toast.description && <div className="text-sm">{toast.description}</div>}
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={() => dismiss(toast.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

const Settings: React.FC = () => {
  // Custom toast functionality
  const { toasts, toast, dismiss } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile State Management
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    company: 'Acme Inc.',
    bio: 'Software engineer passionate about building great user experiences.',
    timezone: 'utc-5',
    avatar: '/avatars/01.png'
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState<NotificationSettings>({
    marketing: false,
    security: true,
    payments: true,
    realTime: true,
    weeklyReports: false
  });

  // Security Settings State
  const [passwords, setPasswords] = useState<PasswordData>({
    current: '',
    new: '',
    confirm: ''
  });

  // API Management State
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: 1, name: 'Production API Key', key: 'rk_live_51H7vX2eZvKYlo2C...', type: 'production' },
    { id: 2, name: 'Development API Key', key: 'rk_test_4eC39HqLyjWDarjtT1zdp7dc', type: 'development' }
  ]);

  // Active Sessions State
  const [sessions, setSessions] = useState<Session[]>([
    { id: 1, name: 'Current Session', device: 'Chrome on MacOS', location: 'San Francisco, CA', active: true },
    { id: 2, name: 'iPhone', device: 'Mobile App', location: 'Last seen 2 hours ago', active: false }
  ]);

  // Handle Profile Updates
  const handleProfileUpdate = (field: keyof ProfileData, value: string): void => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const saveProfile = (): void => {
    toast({
      title: "Success",
      description: "Profile updated successfully!",
      variant: "default"
    });
  };

  // Handle Avatar Upload
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        toast({
          title: "Error",
          description: "File size must be less than 1MB",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        if (result) {
          setProfileData(prev => ({ ...prev, avatar: result }));
          toast({
            title: "Success",
            description: "Avatar uploaded successfully!",
            variant: "default"
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Notification Updates
  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean): void => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Success",
      description: "Notification preferences updated!",
      variant: "default"
    });
  };

  // Handle Password Update
  const updatePassword = (): void => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
        variant: "destructive"
      });
      return;
    }

    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive"
      });
      return;
    }

    if (passwords.new.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive"
      });
      return;
    }

    setPasswords({ current: '', new: '', confirm: '' });
    toast({
      title: "Success",
      description: "Password updated successfully!",
      variant: "default"
    });
  };

  // Handle Session Revoke
  const revokeSession = (sessionId: number): void => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    toast({
      title: "Success",
      description: "Session revoked successfully!",
      variant: "default"
    });
  };

  // Handle API Key Actions
  const generateApiKey = (): void => {
    const newKey: ApiKey = {
      id: apiKeys.length + 1,
      name: \`API Key \${apiKeys.length + 1}\`,
      key: \`rk_\${Math.random().toString(36).substring(2, 15)}\`,
      type: 'development'
    };
    setApiKeys(prev => [...prev, newKey]);
    toast({
      title: "Success",
      description: "New API key generated!",
      variant: "default"
    });
  };

  const deleteApiKey = (keyId: number): void => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId));
    toast({
      title: "Success",
      description: "API key deleted successfully!",
      variant: "default"
    });
  };

  return (
    <>
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account settings and preferences.
            </p>
          </div>
          <V0Button 
            prompt="just render the ui as it is of this page , dont make any changes, just as it is"
            code={SETTINGS_CODE}
          />
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your profile information and how others see you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Avatar Upload Section */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profileData.avatar} />
                      <AvatarFallback>
                        {profileData.firstName[0]}{profileData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, GIF or PNG. 1MB Max.
                      </p>
                    </div>
                  </div>

                  {/* Profile Form Fields */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={profileData.firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileUpdate('firstName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={profileData.lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileUpdate('lastName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileUpdate('email', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      value={profileData.company}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileUpdate('company', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={profileData.bio}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleProfileUpdate('bio', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={profileData.timezone} 
                      onValueChange={(value: string) => handleProfileUpdate('timezone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">Pacific Standard Time (UTC-8)</SelectItem>
                        <SelectItem value="utc-7">Mountain Standard Time (UTC-7)</SelectItem>
                        <SelectItem value="utc-6">Central Standard Time (UTC-6)</SelectItem>
                        <SelectItem value="utc-5">Eastern Standard Time (UTC-5)</SelectItem>
                        <SelectItem value="utc+0">Greenwich Mean Time (UTC+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={saveProfile}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Status Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Plan</span>
                    <Badge>Pro</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Member since</span>
                    <span className="text-sm text-muted-foreground">Jan 2024</span>
                  </div>
                  <Separator />
                  <Button variant="outline" className="w-full">
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive and how.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications Section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Marketing emails</div>
                        <div className="text-sm text-muted-foreground">
                          Receive emails about new products and features
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.marketing}
                        onCheckedChange={(checked: boolean) => handleNotificationChange('marketing', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Security alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified about account security events
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.security}
                        onCheckedChange={(checked: boolean) => handleNotificationChange('security', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Payment notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Alerts about billing and payments
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.payments}
                        onCheckedChange={(checked: boolean) => handleNotificationChange('payments', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Push Notifications Section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Push Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Real-time updates</div>
                        <div className="text-sm text-muted-foreground">
                          Get instant notifications for important events
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.realTime}
                        onCheckedChange={(checked: boolean) => handleNotificationChange('realTime', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Weekly reports</div>
                        <div className="text-sm text-muted-foreground">
                          Summary of your account activity
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.weeklyReports}
                        onCheckedChange={(checked: boolean) => handleNotificationChange('weeklyReports', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <div className="grid gap-4">
              {/* Password Change Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password to keep your account secure.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      value={passwords.current}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      value={passwords.new}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      value={passwords.confirm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                    />
                  </div>
                  <Button onClick={updatePassword}>Update Password</Button>
                </CardContent>
              </Card>

              {/* Two-Factor Authentication Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Authenticator App</div>
                      <div className="text-sm text-muted-foreground">
                        Use an authenticator app to generate codes
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => toast({
                        title: "2FA Setup",
                        description: "Two-factor authentication setup started!",
                        variant: "default"
                      })}
                    >
                      Setup
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Active Sessions Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>
                    Manage your active sessions across devices.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{session.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {session.device} • {session.location}
                        </div>
                      </div>
                      {session.active ? (
                        <Badge variant="secondary">Active</Badge>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => revokeSession(session.id)}
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-4">
            <div className="grid gap-4">
              {/* Current Plan Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Pro Plan</div>
                      <div className="text-sm text-muted-foreground">
                        $29/month • Next billing date: Feb 15, 2024
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => toast({
                          title: "Plan Change",
                          description: "Plan change initiated!",
                          variant: "default"
                        })}
                      >
                        Change Plan
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => toast({
                          title: "Cancellation",
                          description: "Subscription cancellation processed!",
                          variant: "destructive"
                        })}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6" />
                      <div>
                        <div className="font-medium">•••• •••• •••• 4242</div>
                        <div className="text-sm text-muted-foreground">
                          Expires 12/2025
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">Default</Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast({
                          title: "Payment Method",
                          description: "Payment method edit initiated!",
                          variant: "default"
                        })}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => toast({
                      title: "Payment Method",
                      description: "Add payment method initiated!",
                      variant: "default"
                    })}
                  >
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* API Tab */}
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Manage API keys for accessing our services programmatically.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* API Keys List */}
                <div className="space-y-3">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Key className="h-5 w-5" />
                        <div>
                          <div className="font-medium">{apiKey.name}</div>
                          <div className="text-sm text-muted-foreground font-mono">
                            {apiKey.type === 'production' && showApiKey ? apiKey.key : \`\${apiKey.key.substring(0, 12)}...\`}
                            {apiKey.type === 'development' && \`\${apiKey.key.substring(0, 12)}...\`}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {apiKey.type === 'production' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteApiKey(apiKey.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button onClick={generateApiKey}>Generate New Key</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Toast Notifications */}
      <Toaster toasts={toasts} dismiss={dismiss} />
    </>
  );
};

export default Settings;
  `
    
    const v0Url = `https://v0.dev/chat?q=${encodeURIComponent(`${prompt}\n\nHere's the complete Ribbon Admin Template code with all pages and components:\n\`\`\`tsx\n${allPagesCode}\n\`\`\``)}`
    window.open(v0Url, '_blank', 'noopener,noreferrer')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        {/* Left side - Navigation and breadcrumbs */}
        <div className="flex items-center gap-4">
          {/* Sidebar toggle button for mobile */}
          <SidebarTrigger className="h-8 w-8" />
          
          {/* Breadcrumb navigation - shows when breadcrumbs are provided */}
          {breadcrumbs && (
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center">
                    <BreadcrumbItem>
                      {crumb.href ? (
                        <BreadcrumbLink href={crumb.href}>
                          {crumb.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {/* Add separator between breadcrumb items except for the last one */}
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}
          
          {/* Page title - shows when no breadcrumbs are provided */}
          {title && !breadcrumbs && (
            <h1 className="text-lg font-semibold">{title}</h1>
          )}
        </div>

        {/* Right side - Search, actions, and user menu */}
        <div className="flex items-center gap-4">
          {/* Search input - hidden on mobile */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-10 w-64 bg-muted/50 border-0 focus:bg-background transition-colors"
            />
          </div>

          {/* Edit in V0 button - allows editing the entire template with all page codes */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEditInV0}
                  className="flex items-center gap-2"
                >
                  <Code className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit in V0</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit this entire template with all pages in V0</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Theme toggle button - switches between light and dark mode */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8"
          >
            {/* Sun icon for light mode */}
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            {/* Moon icon for dark mode */}
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8">
                <Bell className="h-4 w-4" />
                {/* Notification badge showing unread count */}
                <Badge 
                  variant="destructive" 
                  className="absolute -right-1 -top-1 h-4 w-4 p-0 text-xs flex items-center justify-center"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Sample notifications */}
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="font-medium">Payment received</div>
                <div className="text-sm text-muted-foreground">
                  $2,400 payment from Acme Corp
                </div>
                <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="font-medium">New user registered</div>
                <div className="text-sm text-muted-foreground">
                  john@example.com joined your organization
                </div>
                <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="font-medium">Server maintenance</div>
                <div className="text-sm text-muted-foreground">
                  Scheduled maintenance starting in 2 hours
                </div>
                <div className="text-xs text-muted-foreground mt-1">3 hours ago</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              {/* User info section */}
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* User menu items */}
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}