"use client"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  Users,
  Briefcase,
  TrendingUp,
  TrendingDown,
  Download,
  FileText,
  Lightbulb,
  Globe,
} from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Legend, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// --- Dummy Data ---
const impactSummaryMetrics = [
  {
    title: "Total Ventures Impacted",
    value: 124,
    unit: "",
    change: 12,
    trend: "up",
    icon: Briefcase,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    title: "Total Capital Mobilized",
    value: 3.2,
    unit: "M",
    prefix: "$",
    change: 18,
    trend: "up",
    icon: DollarSign,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    title: "Jobs Created",
    value: 1500,
    unit: "",
    change: 10,
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Beneficiaries Reached",
    value: 25000,
    unit: "",
    change: 15,
    trend: "up",
    icon: Globe,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

const impactOverTimeData = [
  { month: "Jan", ventures: 90, capital: 2.0, jobs: 1000, beneficiaries: 15000 },
  { month: "Feb", ventures: 95, capital: 2.2, jobs: 1100, beneficiaries: 16500 },
  { month: "Mar", ventures: 102, capital: 2.5, jobs: 1250, beneficiaries: 18000 },
  { month: "Apr", ventures: 110, capital: 2.8, jobs: 1350, beneficiaries: 20000 },
  { month: "May", ventures: 118, capital: 3.0, jobs: 1450, beneficiaries: 22500 },
  { month: "Jun", ventures: 124, capital: 3.2, jobs: 1500, beneficiaries: 25000 },
]

const impactBySectorData = [
  { sector: "Agriculture", jobs: 450, beneficiaries: 8000 },
  { sector: "Technology", jobs: 300, beneficiaries: 5000 },
  { sector: "Clean Energy", jobs: 250, beneficiaries: 4000 },
  { sector: "Healthcare", jobs: 200, beneficiaries: 3500 },
  { sector: "Education", jobs: 300, beneficiaries: 4500 },
]

const featuredImpactStories = [
  {
    id: "FIS-001",
    title: "Empowering Rural Farmers with Sustainable Tech",
    venture: "AgriTech Cambodia",
    category: "Agriculture",
    description:
      "AgriTech Cambodia's innovative solutions have transformed farming practices, leading to increased yields and improved livelihoods for thousands of rural farmers.",
    impact: "Increased income by 30%",
    image: "/placeholder.svg?height=150&width=250",
  },
  {
    id: "FIS-002",
    title: "Bringing Clean Energy to Remote Villages",
    venture: "CleanEnergy Laos",
    category: "Clean Energy",
    description:
      "CleanEnergy Laos has successfully deployed off-grid solar solutions, providing reliable electricity to remote communities for the first time, powering homes and schools.",
    impact: "1,500 households electrified",
    image: "/placeholder.svg?height=150&width=250",
  },
  {
    id: "FIS-003",
    title: "Revolutionizing Healthcare Access in Vietnam",
    venture: "HealthTech Vietnam",
    category: "Healthcare",
    description:
      "HealthTech Vietnam's telemedicine platform has dramatically improved access to medical consultations for underserved populations, reducing travel time and costs.",
    impact: "5,000+ virtual consultations",
    image: "/placeholder.svg?height=150&width=250",
  },
]

const detailedImpactMetrics = [
  { metric: "New Ventures Onboarded", Q1: 30, Q2: 35, Q3: 40, Q4: 19 },
  { metric: "Average Readiness Score Increase", Q1: 5, Q2: 7, Q3: 6, Q4: 4 },
  { metric: "GEDSI Compliant Ventures", Q1: 20, Q2: 25, Q3: 28, Q4: 15 },
  { metric: "Training Hours Delivered", Q1: 120, Q2: 150, Q3: 130, Q4: 80 },
  { metric: "Follow-on Funding Secured (M)", Q1: 0.5, Q2: 0.8, Q3: 1.0, Q4: 0.9 },
]

const chartConfig = {
  ventures: {
    label: "Ventures",
    color: "hsl(var(--chart-1))", // teal
  },
  capital: {
    label: "Capital ($M)",
    color: "hsl(var(--chart-2))", // amber
  },
  jobs: {
    label: "Jobs Created",
    color: "hsl(var(--chart-3))", // blue
  },
  beneficiaries: {
    label: "Beneficiaries",
    color: "hsl(var(--chart-5))", // violet
  },
}

export default function ImpactReports() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Impact Reports</h1>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive overview of our impact and achievements</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Download className="h-4 w-4 mr-2" />
            Generate Full Report
          </Button>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {impactSummaryMetrics.map((metric, index) => (
            <Card key={index} className="group border-0 shadow-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${metric.bgColor} group-hover:scale-110 transition-transform`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    +{metric.change}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {metric.prefix || ""}
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
            <TabsTrigger value="detailed-metrics">Detailed Metrics</TabsTrigger>
            <TabsTrigger value="featured-stories">Featured Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Impact Over Time Chart */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Impact Over Time</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ventures impacted and capital mobilized monthly
                  </p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={impactOverTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                        />
                        <YAxis
                          yAxisId="left"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          label={{ value: "Ventures", angle: -90, position: "insideLeft", fill: "#6b7280" }}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(value) => `$${value}M`}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          label={{ value: "Capital ($M)", angle: 90, position: "insideRight", fill: "#6b7280" }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Area
                          yAxisId="left"
                          type="monotone"
                          dataKey="ventures"
                          stroke="var(--color-ventures)"
                          fill="var(--color-ventures)"
                          fillOpacity={0.3}
                          name="Ventures Impacted"
                        />
                        <Area
                          yAxisId="right"
                          type="monotone"
                          dataKey="capital"
                          stroke="var(--color-capital)"
                          fill="var(--color-capital)"
                          fillOpacity={0.3}
                          name="Capital Mobilized"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Impact by Sector Chart */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Impact by Sector</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Jobs created and beneficiaries reached per sector
                  </p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={impactBySectorData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <XAxis
                          dataKey="sector"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis
                          yAxisId="left"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          label={{ value: "Count", angle: -90, position: "insideLeft", fill: "#6b7280" }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="jobs" fill="var(--color-jobs)" name="Jobs Created" />
                        <Bar
                          yAxisId="left"
                          dataKey="beneficiaries"
                          fill="var(--color-beneficiaries)"
                          name="Beneficiaries Reached"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="detailed-metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Impact Metrics</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Quarterly breakdown of key performance indicators
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        <th className="py-3 px-4">Metric</th>
                        <th className="py-3 px-4">Q1</th>
                        <th className="py-3 px-4">Q2</th>
                        <th className="py-3 px-4">Q3</th>
                        <th className="py-3 px-4">Q4</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailedImpactMetrics.map((row, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">{row.metric}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{row.Q1}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{row.Q2}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{row.Q3}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{row.Q4}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="featured-stories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredImpactStories.map((story) => (
                <Card key={story.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      width={400}
                      height={160}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                      {story.category}
                    </Badge>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{story.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{story.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Venture: {story.venture}</span>
                      <span className="font-medium text-teal-600">{story.impact}</span>
                    </div>
                    <Button variant="outline" className="w-full mt-2 bg-transparent">
                      Read Full Story
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-teal-600" />
              <span>Generate Custom Reports</span>
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create tailored impact reports based on specific criteria and timeframes.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                <Download className="h-4 w-4 mr-2" />
                Download PDF Report
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Lightbulb className="h-4 w-4 mr-2" />
                Request Custom Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
