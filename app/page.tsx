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

const DASHBOARD_CODE = `"use client"

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

export default function Dashboard() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsRefreshing(false)
    toast({
      title: "Dashboard Updated",
      description: "Latest data has been refreshed successfully.",
    })
  }

  const handleExportData = () => {
    // Simulate export
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
            prompt="Create a Stripe-inspired dashboard with analytics cards, charts, and metrics"
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
}`

export default function Dashboard() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsRefreshing(false)
    toast({
      title: "Dashboard Updated",
      description: "Latest data has been refreshed successfully.",
    })
  }

  const handleExportData = () => {
    // Simulate export
    const csvData = revenueData.map(item => `${item.month},${item.revenue},${item.orders},${item.customers}`).join('\n')
    const blob = new Blob([`Month,Revenue,Orders,Customers\n${csvData}`], { type: 'text/csv' })
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
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <V0Button 
            prompt="just render the ui as it is of this page , dont make any changes, just as it is"
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
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
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