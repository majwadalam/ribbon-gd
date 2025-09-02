import { V0Button } from "@/components/v0-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  MapPin,
  Clock,
  Star
} from "lucide-react"

export default function DashboardAlt() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Alternative</h1>
          <p className="text-muted-foreground mt-1">
            Alternative dashboard layout with enhanced visualizations and insights.
          </p>
        </div>
        <V0Button prompt="Create an alternative dashboard layout with different card arrangements, progress bars, and enhanced metrics" />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Top Stats Row */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-green-400 to-green-600" />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    <p className="text-3xl font-bold">$54,239</p>
                    <div className="flex items-center text-sm text-green-600">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>+12.5% vs last month</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-blue-400 to-blue-600" />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <p className="text-3xl font-bold">3,247</p>
                    <div className="flex items-center text-sm text-blue-600">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>+8.1% vs last week</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-purple-400 to-purple-600" />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-3xl font-bold">12.8%</p>
                    <div className="flex items-center text-sm text-red-600">
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                      <span>-2.1% vs last month</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-orange-400 to-orange-600" />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                    <p className="text-3xl font-bold">$127</p>
                    <div className="flex items-center text-sm text-orange-600">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>+5.4% vs last month</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-orange-600" />
                  </div>
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
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Invite Team Member
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Process Refund
                </Button>
                <Button className="w-full justify-start" variant="outline">
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
                <div className="h-[400px] flex items-center justify-center text-muted-foreground bg-muted/10 rounded-lg">
                  Advanced Revenue Chart Placeholder (Recharts)
                </div>
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
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Performance Chart Placeholder
                </div>
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GET /api/users</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-20 h-2" />
                      <span className="text-sm font-mono">234ms</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">POST /api/orders</span>
                    <div className="flex items-center gap-2">
                      <Progress value={65} className="w-20 h-2" />
                      <span className="text-sm font-mono">456ms</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GET /api/products</span>
                    <div className="flex items-center gap-2">
                      <Progress value={92} className="w-20 h-2" />
                      <span className="text-sm font-mono">123ms</span>
                    </div>
                  </div>
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
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  World Map Placeholder
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">United States</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="w-20 h-2" />
                      <span className="text-sm font-medium">1,234</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">United Kingdom</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20 h-2" />
                      <span className="text-sm font-medium">567</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Germany</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={32} className="w-20 h-2" />
                      <span className="text-sm font-medium">345</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}