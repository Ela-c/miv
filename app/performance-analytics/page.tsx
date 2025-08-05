"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Download,
  Users,
  Clock,
  Percent,
  LineChart,
  BarChart3,
  PieChart,
  MapPin,
  Lightbulb,
} from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, BarChart, Bar, Cell, Pie } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// --- Dummy Data ---
const kpiMetrics = [
  {
    title: "Venture Conversion Rate",
    value: 15.2,
    unit: "%",
    change: 2.1,
    trend: "up",
    icon: Percent,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    title: "Average Time to Funding",
    value: 42,
    unit: " days",
    change: -5,
    trend: "down",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Active Users",
    value: 850,
    unit: "",
    change: 8,
    trend: "up",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Platform Growth (New Ventures)",
    value: 25,
    unit: "%",
    change: 3,
    trend: "up",
    icon: LineChart,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
]

const conversionFunnelData = [
  { stage: "Intake", count: 100 },
  { stage: "Diagnostics", count: 75 },
  { stage: "Readiness", count: 50 },
  { stage: "Capital Facilitation", count: 25 },
  { stage: "Funded", count: 15 },
]

const timeToFundingData = [
  { range: "0-30 days", count: 5 },
  { range: "31-60 days", count: 8 },
  { range: "61-90 days", count: 12 },
  { range: "91-120 days", count: 7 },
  { range: "120+ days", count: 3 },
]

const activeUsersData = [
  { month: "Jan", users: 600 },
  { month: "Feb", users: 650 },
  { month: "Mar", users: 700 },
  { month: "Apr", users: 750 },
  { month: "May", users: 800 },
  { month: "Jun", users: 850 },
]

const featureUsageData = [
  { name: "Dashboard", value: 350, color: "#14b8a6" }, // teal
  { name: "Venture Intake", value: 200, color: "#f59e0b" }, // amber
  { name: "Diagnostics", value: 150, color: "#3b82f6" }, // blue
  { name: "Capital Facilitation", value: 100, color: "#ef4444" }, // red
  { name: "GEDSI Tracker", value: 50, color: "#8b5cf6" }, // violet
]

const newVenturesOnboardedData = [
  { month: "Jan", count: 10 },
  { month: "Feb", count: 12 },
  { month: "Mar", count: 15 },
  { month: "Apr", count: 18 },
  { month: "May", count: 20 },
  { month: "Jun", count: 22 },
]

const geographicalDistributionData = [
  { country: "Cambodia", ventures: 30, percentage: 24 },
  { country: "Laos", ventures: 20, percentage: 16 },
  { country: "Vietnam", ventures: 40, percentage: 32 },
  { country: "Myanmar", ventures: 15, percentage: 12 },
  { country: "Thailand", ventures: 19, percentage: 15 },
]

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
  users: {
    label: "Active Users",
    color: "hsl(var(--chart-3))",
  },
  ventures: {
    label: "New Ventures",
    color: "hsl(var(--chart-1))",
  },
}

export default function PerformanceAnalytics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Performance Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor key performance indicators and platform growth</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {kpiMetrics.map((metric, index) => (
            <Card key={index} className="group border-0 shadow-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${metric.bgColor} group-hover:scale-110 transition-transform`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <Badge
                    variant="outline"
                    className={`${
                      metric.trend === "up"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {metric.trend === "up" ? "+" : ""}
                    {metric.change}
                    {metric.unit === "%" ? "%" : ""}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                    {metric.unit}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="user-engagement">User Engagement</TabsTrigger>
            <TabsTrigger value="platform-growth">Platform Growth</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Conversion Funnel */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Venture Conversion Funnel</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Conversion rates across different pipeline stages
                  </p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={conversionFunnelData} layout="vertical" margin={{ left: 20, right: 20 }}>
                        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: "#6b7280" }} />
                        <YAxis
                          type="category"
                          dataKey="stage"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          width={120}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Time to Funding Distribution */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Time to Funding Distribution</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    How long ventures typically take to secure funding
                  </p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeToFundingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <XAxis
                          dataKey="range"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          label={{ value: "Number of Ventures", angle: -90, position: "insideLeft", fill: "#6b7280" }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="user-engagement" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Active Users Over Time */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Active Users Over Time</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly trend of active platform users</p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={activeUsersData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          label={{ value: "Users", angle: -90, position: "insideLeft", fill: "#6b7280" }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="users"
                          stroke="var(--color-users)"
                          fill="var(--color-users)"
                          fillOpacity={0.3}
                          name="Active Users"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Feature Usage */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Feature Usage</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Distribution of feature popularity</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col lg:flex-row items-center justify-between min-h-[300px]">
                    <div className="w-full lg:w-2/3 h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={featureUsageData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            dataKey="value"
                            stroke="#ffffff"
                            strokeWidth={2}
                          >
                            {featureUsageData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload
                                return (
                                  <div className="bg-white dark:bg-gray-800 p-4 border rounded-lg shadow-lg">
                                    <p className="font-medium text-gray-900 dark:text-white">{data.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {data.value} interactions
                                    </p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-full lg:w-1/3 lg:pl-4 mt-4 lg:mt-0">
                      <div className="space-y-3">
                        {featureUsageData.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="platform-growth" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* New Ventures Onboarded */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>New Ventures Onboarded</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly trend of new venture registrations</p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={newVenturesOnboardedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          label={{ value: "Ventures", angle: -90, position: "insideLeft", fill: "#6b7280" }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="count"
                          stroke="var(--color-ventures)"
                          fill="var(--color-ventures)"
                          fillOpacity={0.3}
                          name="New Ventures"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Geographical Distribution */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Geographical Distribution</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Distribution of ventures across different countries
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {geographicalDistributionData.map((data, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{data.country}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {data.ventures} ventures
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">({data.percentage}%)</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-teal-600" />
              <span>Advanced Analytics & Reporting</span>
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dive deeper into your data with custom reports and predictive analytics.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                <Download className="h-4 w-4 mr-2" />
                Generate Custom Report
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Lightbulb className="h-4 w-4 mr-2" />
                Explore Predictive Models
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
