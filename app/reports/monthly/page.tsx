"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Download,
  FileText,
  Target,
  Trophy,
  BarChart3,
  RefreshCw
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { useState } from "react"

// TypeScript interfaces
interface Metric {
  value: string;
  change: string;
  trend: "up" | "down";
  target: string;
  progress: number;
}

interface QuarterlyData {
  quarter: string;
  revenue: number;
  orders: number;
  customers: number;
  satisfaction: number;
}

interface Product {
  name: string;
  sales: number;
  revenue: number;
  growthRate: number;
  color: string;
}

interface Goal {
  goal: string;
  achieved: number;
  target: number;
  status: "exceeded" | "achieved" | "partial" | "missed";
  progress: number;
  unit?: string;
}

interface AnnualData {
  year: string;
  metrics: {
    revenue: Metric;
    orders: Metric;
    customers: Metric;
    avgOrderValue: Metric;
  };
  quarterlyBreakdown: QuarterlyData[];
  topProducts: Product[];
  goals: Goal[];
}

type AnnualDataCollection = {
  [key: string]: AnnualData;
}

const annualData: AnnualDataCollection = {
  "2023": {
    year: "2023",
    metrics: {
      revenue: { value: "$485,240", change: "+28.5%", trend: "up", target: "$450,000", progress: 108 },
      orders: { value: "12,847", change: "+15.2%", trend: "up", target: "12,000", progress: 107 },
      customers: { value: "8,932", change: "+22.1%", trend: "up", target: "8,500", progress: 105 },
      avgOrderValue: { value: "$37.78", change: "+11.5%", trend: "up", target: "$35.00", progress: 108 }
    },
    quarterlyBreakdown: [
      { quarter: "Q1", revenue: 98450, orders: 2856, customers: 1923, satisfaction: 4.2 },
      { quarter: "Q2", revenue: 112680, orders: 3124, customers: 2145, satisfaction: 4.4 },
      { quarter: "Q3", revenue: 125890, orders: 3445, customers: 2398, satisfaction: 4.6 },
      { quarter: "Q4", revenue: 148220, orders: 3422, customers: 2466, satisfaction: 4.7 }
    ],
    topProducts: [
      { name: "Premium Subscription", sales: 3456, revenue: 103680, growthRate: 34, color: "#0088FE" },
      { name: "Enterprise", sales: 892, revenue: 89200, growthRate: 45, color: "#00C49F" },
      { name: "Basic Plan", sales: 5234, revenue: 52340, growthRate: 12, color: "#FFBB28" },
      { name: "Professional", sales: 1245, revenue: 62250, growthRate: 28, color: "#FF8042" },
      { name: "Starter", sales: 2156, revenue: 21560, growthRate: 8, color: "#8884D8" }
    ],
    goals: [
      { goal: "Revenue Target", achieved: 485240, target: 450000, status: "exceeded", progress: 108 },
      { goal: "Customer Acquisition", achieved: 8932, target: 8500, status: "exceeded", progress: 105 },
      { goal: "Market Expansion", achieved: 12, target: 10, status: "exceeded", progress: 120, unit: "regions" },
      { goal: "Customer Satisfaction", achieved: 4.7, target: 4.5, status: "exceeded", progress: 104, unit: "stars" }
    ]
  },
  "2024": {
    year: "2024", 
    metrics: {
      revenue: { value: "$634,820", change: "+30.8%", trend: "up", target: "$600,000", progress: 106 },
      orders: { value: "16,234", change: "+26.4%", trend: "up", target: "15,000", progress: 108 },
      customers: { value: "11,456", change: "+28.3%", trend: "up", target: "11,000", progress: 104 },
      avgOrderValue: { value: "$39.12", change: "+3.5%", trend: "up", target: "$38.00", progress: 103 }
    },
    quarterlyBreakdown: [
      { quarter: "Q1", revenue: 145230, orders: 3789, customers: 2567, satisfaction: 4.6 },
      { quarter: "Q2", revenue: 158690, orders: 4156, customers: 2834, satisfaction: 4.7 },
      { quarter: "Q3", revenue: 167450, orders: 4298, customers: 3012, satisfaction: 4.8 },
      { quarter: "Q4", revenue: 163450, orders: 3991, customers: 3043, satisfaction: 4.8 }
    ],
    topProducts: [
      { name: "Premium Subscription", sales: 4123, revenue: 123690, growthRate: 19, color: "#0088FE" },
      { name: "Enterprise", sales: 1234, revenue: 123400, growthRate: 38, color: "#00C49F" },
      { name: "Professional", sales: 1678, revenue: 83900, growthRate: 35, color: "#FF8042" },
      { name: "Basic Plan", sales: 5892, revenue: 58920, growthRate: 13, color: "#FFBB28" },
      { name: "Advanced", sales: 892, revenue: 71360, growthRate: 52, color: "#8884D8" }
    ],
    goals: [
      { goal: "Revenue Target", achieved: 634820, target: 600000, status: "exceeded", progress: 106 },
      { goal: "Customer Acquisition", achieved: 11456, target: 11000, status: "exceeded", progress: 104 },
      { goal: "Market Expansion", achieved: 18, target: 15, status: "exceeded", progress: 120, unit: "regions" },
      { goal: "Customer Satisfaction", achieved: 4.8, target: 4.6, status: "exceeded", progress: 104, unit: "stars" }
    ]
  }
}

export default function AnnualReports() {
  const [selectedYear, setSelectedYear] = useState<string>("2024")
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const currentData = annualData[selectedYear]
  const { toast } = useToast()

  const handleRefresh = async (): Promise<void> => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
    toast({
      title: "Annual Report Refreshed",
      description: `${currentData.year} annual report data has been updated.`,
    })
  }

  const exportReport = (): void => {
    const reportData = {
      year: currentData.year,
      metrics: currentData.metrics,
      quarterlyBreakdown: currentData.quarterlyBreakdown,
      topProducts: currentData.topProducts,
      goals: currentData.goals,
      generatedAt: new Date().toISOString()
    }
    
    const dataStr = JSON.stringify(reportData, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', `annual-report-${selectedYear}.json`)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    
    toast({
      title: "Export Successful",
      description: `Annual report for ${currentData.year} has been exported.`,
    })
  }

  const exportPDF = (): void => {
    let reportContent = `ANNUAL BUSINESS REPORT - ${currentData.year}\n`
    reportContent += "=".repeat(50) + "\n\n"
    
    reportContent += "EXECUTIVE SUMMARY\n"
    reportContent += "-".repeat(20) + "\n"
    reportContent += `Revenue: ${currentData.metrics.revenue.value} (${currentData.metrics.revenue.change})\n`
    reportContent += `Orders: ${currentData.metrics.orders.value} (${currentData.metrics.orders.change})\n`
    reportContent += `Customers: ${currentData.metrics.customers.value} (${currentData.metrics.customers.change})\n`
    reportContent += `Average Order Value: ${currentData.metrics.avgOrderValue.value} (${currentData.metrics.avgOrderValue.change})\n\n`
    
    reportContent += "QUARTERLY BREAKDOWN\n"
    reportContent += "-".repeat(20) + "\n"
    currentData.quarterlyBreakdown.forEach((quarter: QuarterlyData) => {
      reportContent += `${quarter.quarter}: Revenue $${quarter.revenue.toLocaleString()}, Orders ${quarter.orders}, Customers ${quarter.customers}\n`
    })
    
    reportContent += "\nTOP PRODUCTS\n"
    reportContent += "-".repeat(20) + "\n"
    currentData.topProducts.forEach((product: Product, index: number) => {
      reportContent += `${index + 1}. ${product.name}: ${product.sales} sales, $${product.revenue.toLocaleString()} revenue (+${product.growthRate}%)\n`
    })
    
    reportContent += "\nGOAL ACHIEVEMENT\n"
    reportContent += "-".repeat(20) + "\n"
    currentData.goals.forEach((goal: Goal) => {
      reportContent += `${goal.goal}: ${goal.achieved.toLocaleString()}${goal.unit ? ' ' + goal.unit : ''} / ${goal.target.toLocaleString()}${goal.unit ? ' ' + goal.unit : ''} (${goal.status})\n`
    })
    
    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', `annual-report-${selectedYear}.txt`)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    
    toast({
      title: "Report Export Successful",
      description: `Annual report text file for ${currentData.year} has been downloaded.`,
    })
  }

  const getTrendIcon = (trend: "up" | "down") => {
    return trend === "up" ? (
      <ArrowUpRight className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-red-500" />
    )
  }

  const getTrendColor = (trend: "up" | "down"): string => {
    return trend === "up" ? "text-green-600" : "text-red-600"
  }

  const getGoalStatusColor = (status: Goal["status"]): string => {
    switch (status) {
      case "exceeded": return "bg-green-100 text-green-800 border-green-200"
      case "achieved": return "bg-blue-100 text-blue-800 border-blue-200"
      case "partial": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default: return "bg-red-100 text-red-800 border-red-200"
    }
  }

  const formatTooltipValue = (value: any, name: string): [string, string] => {
    if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Revenue']
    if (name === 'customers') return [value.toLocaleString(), 'Customers']
    return [value, name]
  }

  const formatBarTooltipValue = (value: any): [string, string] => {
    return [`$${value.toLocaleString()}`, 'Revenue']
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Annual Reports</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive yearly business performance and strategic analysis.
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportPDF}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Report Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Annual Report {currentData.year}
              </CardTitle>
              <CardDescription>
                Complete business performance review and strategic insights
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              Annual Report
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics with Progress */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.metrics.revenue.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
              {getTrendIcon(currentData.metrics.revenue.trend)}
              <span className={getTrendColor(currentData.metrics.revenue.trend)}>
                {currentData.metrics.revenue.change}
              </span>
              <span>vs previous year</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Target Progress</span>
                <span>{currentData.metrics.revenue.progress}%</span>
              </div>
              <Progress value={currentData.metrics.revenue.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.metrics.orders.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
              {getTrendIcon(currentData.metrics.orders.trend)}
              <span className={getTrendColor(currentData.metrics.orders.trend)}>
                {currentData.metrics.orders.change}
              </span>
              <span>vs previous year</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Target Progress</span>
                <span>{currentData.metrics.orders.progress}%</span>
              </div>
              <Progress value={currentData.metrics.orders.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.metrics.customers.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
              {getTrendIcon(currentData.metrics.customers.trend)}
              <span className={getTrendColor(currentData.metrics.customers.trend)}>
                {currentData.metrics.customers.change}
              </span>
              <span>vs previous year</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Target Progress</span>
                <span>{currentData.metrics.customers.progress}%</span>
              </div>
              <Progress value={currentData.metrics.customers.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.metrics.avgOrderValue.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
              {getTrendIcon(currentData.metrics.avgOrderValue.trend)}
              <span className={getTrendColor(currentData.metrics.avgOrderValue.trend)}>
                {currentData.metrics.avgOrderValue.change}
              </span>
              <span>vs previous year</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Target Progress</span>
                <span>{currentData.metrics.avgOrderValue.progress}%</span>
              </div>
              <Progress value={currentData.metrics.avgOrderValue.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quarterly Breakdown Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Quarterly Performance
          </CardTitle>
          <CardDescription>
            Quarter-by-quarter breakdown of key metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={currentData.quarterlyBreakdown}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="quarter" 
                className="text-muted-foreground"
                fontSize={12}
              />
              <YAxis 
                className="text-muted-foreground"
                fontSize={12}
                tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={formatTooltipValue}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stackId="1"
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="customers" 
                stackId="2"
                stroke="hsl(var(--chart-2))" 
                fill="hsl(var(--chart-2))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Products and Goals */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Top Products Performance
            </CardTitle>
            <CardDescription>
              Best performing products this year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              {currentData.topProducts.map((product: Product, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sales.toLocaleString()} sales • +{product.growthRate}% growth
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${product.revenue.toLocaleString()}</p>
                    <Badge variant="secondary" className="text-xs">
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={currentData.topProducts} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-muted-foreground" fontSize={12} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  className="text-muted-foreground" 
                  fontSize={10}
                  width={80}
                />
                <Tooltip formatter={formatBarTooltipValue} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Goal Achievement
            </CardTitle>
            <CardDescription>
              Annual targets and achievement status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              {currentData.goals.map((goal: Goal, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{goal.goal}</span>
                    <Badge 
                      variant="outline" 
                      className={getGoalStatusColor(goal.status)}
                    >
                      {goal.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Achieved: {goal.achieved.toLocaleString()}{goal.unit ? ' ' + goal.unit : ''}</span>
                    <span>Target: {goal.target.toLocaleString()}{goal.unit ? ' ' + goal.unit : ''}</span>
                  </div>
                  <Progress value={Math.min(goal.progress, 100)} className="h-2" />
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <RadarChart data={currentData.goals}>
                <PolarGrid />
                <PolarAngleAxis dataKey="goal" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis domain={[0, 120]} tick={{ fontSize: 8 }} />
                <Radar 
                  name="Progress" 
                  dataKey="progress" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Insights & Recommendations</CardTitle>
          <CardDescription>
            Key takeaways and strategic recommendations for {currentData.year}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Strengths
              </h4>
              <p className="text-xs text-muted-foreground">
                Strong revenue growth of {currentData.metrics.revenue.change} exceeded targets. Premium and Enterprise products show exceptional performance with high customer satisfaction scores reaching {currentData.quarterlyBreakdown[3].satisfaction} stars.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                Opportunities
              </h4>
              <p className="text-xs text-muted-foreground">
                Market expansion into {currentData.goals[2].achieved} regions presents growth opportunities. Consider enhancing the Basic Plan to improve average order value and customer retention rates further.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4 text-orange-500" />
                Focus Areas
              </h4>
              <p className="text-xs text-muted-foreground">
                Continue investing in premium product development and customer success initiatives. Q4 performance metrics suggest implementing seasonal adjustment strategies for sustained growth.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}