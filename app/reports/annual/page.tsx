"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
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
  BarChart3
} from "lucide-react"
import { useState } from "react"

// Type definitions
interface Metric {
  value: string;
  change: string;
  trend: "up" | "down";
  target: string;
  progress: number;
}

interface QuarterlyData {
  quarter: string;
  revenue: string;
  orders: string;
  customers: string;
}

interface TopProduct {
  name: string;
  sales: number;
  revenue: string;
  growthRate: string;
}

interface Goal {
  goal: string;
  achieved: string;
  target: string;
  status: "exceeded" | "achieved" | "partial" | "missed";
  unit?: string;
}

interface YearData {
  year: string;
  metrics: {
    revenue: Metric;
    orders: Metric;
    customers: Metric;
    avgOrderValue: Metric;
  };
  quarterlyBreakdown: QuarterlyData[];
  topProducts: TopProduct[];
  goals: Goal[];
}

type AnnualData = {
  [key: string]: YearData;
}

const annualData: AnnualData = {
  "2023": {
    year: "2023",
    metrics: {
      revenue: { value: "$485,240", change: "+28.5%", trend: "up", target: "$450,000", progress: 108 },
      orders: { value: "12,847", change: "+15.2%", trend: "up", target: "12,000", progress: 107 },
      customers: { value: "8,932", change: "+22.1%", trend: "up", target: "8,500", progress: 105 },
      avgOrderValue: { value: "$37.78", change: "+11.5%", trend: "up", target: "$35.00", progress: 108 }
    },
    quarterlyBreakdown: [
      { quarter: "Q1 2023", revenue: "$98,450", orders: "2,856", customers: "1,923" },
      { quarter: "Q2 2023", revenue: "$112,680", orders: "3,124", customers: "2,145" },
      { quarter: "Q3 2023", revenue: "$125,890", orders: "3,445", customers: "2,398" },
      { quarter: "Q4 2023", revenue: "$148,220", orders: "3,422", customers: "2,466" }
    ],
    topProducts: [
      { name: "Premium Subscription", sales: 3456, revenue: "$103,680", growthRate: "+34%" },
      { name: "Enterprise", sales: 892, revenue: "$89,200", growthRate: "+45%" },
      { name: "Basic Plan", sales: 5234, revenue: "$52,340", growthRate: "+12%" },
      { name: "Professional", sales: 1245, revenue: "$62,250", growthRate: "+28%" },
      { name: "Starter", sales: 2156, revenue: "$21,560", growthRate: "+8%" }
    ],
    goals: [
      { goal: "Revenue Target", achieved: "$485,240", target: "$450,000", status: "exceeded" },
      { goal: "Customer Acquisition", achieved: "8,932", target: "8,500", status: "exceeded" },
      { goal: "Market Expansion", achieved: "12", target: "10", status: "exceeded", unit: "regions" },
      { goal: "Customer Satisfaction", achieved: "4.7", target: "4.5", status: "exceeded", unit: "stars" }
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
      { quarter: "Q1 2024", revenue: "$145,230", orders: "3,789", customers: "2,567" },
      { quarter: "Q2 2024", revenue: "$158,690", orders: "4,156", customers: "2,834" },
      { quarter: "Q3 2024", revenue: "$167,450", orders: "4,298", customers: "3,012" },
      { quarter: "Q4 2024", revenue: "$163,450", orders: "3,991", customers: "3,043" }
    ],
    topProducts: [
      { name: "Premium Subscription", sales: 4123, revenue: "$123,690", growthRate: "+19%" },
      { name: "Enterprise", sales: 1234, revenue: "$123,400", growthRate: "+38%" },
      { name: "Professional", sales: 1678, revenue: "$83,900", growthRate: "+35%" },
      { name: "Basic Plan", sales: 5892, revenue: "$58,920", growthRate: "+13%" },
      { name: "Advanced", sales: 892, revenue: "$71,360", growthRate: "+52%" }
    ],
    goals: [
      { goal: "Revenue Target", achieved: "$634,820", target: "$600,000", status: "exceeded" },
      { goal: "Customer Acquisition", achieved: "11,456", target: "11,000", status: "exceeded" },
      { goal: "Market Expansion", achieved: "18", target: "15", status: "exceeded", unit: "regions" },
      { goal: "Customer Satisfaction", achieved: "4.8", target: "4.6", status: "exceeded", unit: "stars" }
    ]
  }
}

export default function AnnualReports() {
  const [selectedYear, setSelectedYear] = useState<string>("2024")
  const currentData = annualData[selectedYear]

  const exportReport = () => {
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
  }

  const exportPDF = () => {
    // Create a detailed text report for PDF export
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
      reportContent += `${quarter.quarter}: Revenue ${quarter.revenue}, Orders ${quarter.orders}, Customers ${quarter.customers}\n`
    })
    
    reportContent += "\nTOP PRODUCTS\n"
    reportContent += "-".repeat(20) + "\n"
    currentData.topProducts.forEach((product: TopProduct, index: number) => {
      reportContent += `${index + 1}. ${product.name}: ${product.sales} sales, ${product.revenue} revenue (${product.growthRate})\n`
    })
    
    reportContent += "\nGOAL ACHIEVEMENT\n"
    reportContent += "-".repeat(20) + "\n"
    currentData.goals.forEach((goal: Goal) => {
      reportContent += `${goal.goal}: ${goal.achieved}${goal.unit ? ' ' + goal.unit : ''} / ${goal.target}${goal.unit ? ' ' + goal.unit : ''} (${goal.status})\n`
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
  }

  const getTrendIcon = (trend: "up" | "down") => {
    return trend === "up" ? (
      <ArrowUpRight className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-red-500" />
    )
  }

  const getTrendColor = (trend: "up" | "down") => {
    return trend === "up" ? "text-green-600" : "text-red-600"
  }

  const getGoalStatusColor = (status: Goal["status"]) => {
    switch (status) {
      case "exceeded": return "bg-green-100 text-green-800 border-green-200"
      case "achieved": return "bg-blue-100 text-blue-800 border-blue-200"
      case "partial": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default: return "bg-red-100 text-red-800 border-red-200"
    }
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
        <Card>
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

        <Card>
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

        <Card>
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

        <Card>
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

      {/* Quarterly Breakdown */}
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {currentData.quarterlyBreakdown.map((quarter: QuarterlyData, index: number) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">{quarter.quarter}</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-mono">{quarter.revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Orders</span>
                    <span>{quarter.orders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customers</span>
                    <span>{quarter.customers}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Products and Goals */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Top Products
            </CardTitle>
            <CardDescription>
              Best performing products this year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentData.topProducts.map((product: TopProduct, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sales} sales • {product.growthRate} growth
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{product.revenue}</p>
                    <Badge variant="secondary" className="text-xs">
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
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
            <div className="space-y-4">
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
                    <span>Achieved: {goal.achieved}{goal.unit ? ' ' + goal.unit : ''}</span>
                    <span>Target: {goal.target}{goal.unit ? ' ' + goal.unit : ''}</span>
                  </div>
                  <Progress 
                    value={Math.min((parseInt(goal.achieved.replace(/[$,]/g, '')) / parseInt(goal.target.replace(/[$,]/g, ''))) * 100, 100)} 
                    className="h-2" 
                  />
                </div>
              ))}
            </div>
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
                Strong revenue growth of {currentData.metrics.revenue.change} exceeded targets. Premium and Enterprise products show exceptional performance with high customer satisfaction scores.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                Opportunities
              </h4>
              <p className="text-xs text-muted-foreground">
                Market expansion into {currentData.goals[2].achieved} regions presents growth opportunities. Consider enhancing the Basic Plan to improve average order value further.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4 text-orange-500" />
                Focus Areas
              </h4>
              <p className="text-xs text-muted-foreground">
                Continue investing in premium product development and customer success initiatives. Q4 showed slight decline suggesting seasonal adjustments needed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}