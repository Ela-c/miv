"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Target, Award, BarChart3, Lightbulb, PlusCircle, CalendarDays } from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Line,
  ComposedChart,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface GedsiMetric {
  category: string
  current: number
  target: number
  trend: string
  color: string
  bgColor: string
  description: string
  keyAchievements: string[]
  progressHistory: { date: string; value: number }[]
}

interface VentureByGedsi {
  name: string
  value: number
  color: string
}

interface SectorGedsiData {
  sector: string
  womenLed: number
  youthLed: number
  disabilityInclusive: number
  indigenous: number
}

interface ImpactStory {
  id: string
  title: string
  venture: string
  category: string
  description: string
  avatar: string
  avatarBg: string
  impactMetrics: { label: string; value: string }[]
}

interface Goal {
  id: string
  name: string
  targetValue: number
  currentValue: number
  unit: string
  category: string
  dueDate: string
}

const gedsiMetrics: GedsiMetric[] = [
  {
    category: "Women-led Ventures",
    current: 42,
    target: 50,
    trend: "+8%",
    color: "text-gedsi-gender",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    description: "Tracking ventures with women in key leadership positions across Southeast Asia.",
    keyAchievements: [
      "Increased women-led ventures by 8% this quarter.",
      "Launched Khmer Women's Cooperative mentorship program.",
    ],
    progressHistory: [
      { date: "Jan", value: 30 },
      { date: "Feb", value: 32 },
      { date: "Mar", value: 35 },
      { date: "Apr", value: 38 },
      { date: "May", value: 42 },
    ],
  },
  {
    category: "Youth-led Ventures",
    current: 35,
    target: 40,
    trend: "+12%",
    color: "text-miv-primary",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    description: "Monitoring ventures where founders or majority leadership are under 35 years old.",
    keyAchievements: ["12% growth in youth-led ventures.", "Partnership with Mekong youth innovation hubs."],
    progressHistory: [
      { date: "Jan", value: 25 },
      { date: "Feb", value: 28 },
      { date: "Mar", value: 30 },
      { date: "Apr", value: 33 },
      { date: "May", value: 35 },
    ],
  },
  {
    category: "Disability-inclusive",
    current: 18,
    target: 25,
    trend: "+5%",
    color: "text-gedsi-disability",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    description:
      "Assessing ventures that actively employ or serve people with disabilities, or create accessible solutions.",
    keyAchievements: [
      "5% increase in disability-inclusive ventures.",
      "Developed MIV accessibility guidelines for all new projects.",
    ],
    progressHistory: [
      { date: "Jan", value: 10 },
      { date: "Feb", value: 12 },
      { date: "Mar", value: 14 },
      { date: "Apr", value: 16 },
      { date: "May", value: 18 },
    ],
  },
  {
    category: "Indigenous-led",
    current: 12,
    target: 15,
    trend: "+3%",
    color: "text-gedsi-social",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
    description: "Supporting ventures founded by indigenous communities across Southeast Asia.",
    keyAchievements: [
      "3% rise in indigenous-led ventures.",
      "Secured funding for Mekong indigenous entrepreneurship programs.",
    ],
    progressHistory: [
      { date: "Jan", value: 8 },
      { date: "Feb", value: 9 },
      { date: "Mar", value: 10 },
      { date: "Apr", value: 11 },
      { date: "May", value: 12 },
    ],
  },
]

const venturesByGedsi: VentureByGedsi[] = [
  { name: "Women-led", value: 42, color: "#ec4899" },
  { name: "Youth-led", value: 35, color: "#2563eb" },
  { name: "Disability-inclusive", value: 18, color: "#8b5cf6" },
  { name: "Indigenous-led", value: 12, color: "#06b6d4" },
  { name: "Other", value: 17, color: "#6b7280" },
]

const sectorGedsiData: SectorGedsiData[] = [
  { sector: "Agriculture", womenLed: 45, youthLed: 38, disabilityInclusive: 20, indigenous: 15 },
  { sector: "Technology", womenLed: 35, youthLed: 42, disabilityInclusive: 12, indigenous: 8 },
  { sector: "Healthcare", womenLed: 52, youthLed: 28, disabilityInclusive: 25, indigenous: 10 },
  { sector: "Education", womenLed: 48, youthLed: 40, disabilityInclusive: 22, indigenous: 18 },
  { sector: "Clean Energy", womenLed: 38, youthLed: 35, disabilityInclusive: 15, indigenous: 12 },
]

const impactStories: ImpactStory[] = [
  {
    id: "MIV-IS-001",
    title: "Khmer Women's Cooperative",
    venture: "Rural AgriTech Cambodia",
    category: "Women-led",
    description:
      "Through MIV's support, this women-led cooperative has transformed rural agriculture in Cambodia, creating sustainable livelihoods for over 200 women farmers while implementing climate-smart farming practices.",
    avatar: "KW",
    avatarBg: "bg-pink-100 text-pink-700",
    impactMetrics: [
      { label: "Women Farmers", value: "200+" },
      { label: "Income Increase", value: "+85%" },
      { label: "Capital Facilitated", value: "$180K" },
    ],
  },
  {
    id: "IS-002",
    title: "Youth Innovation Program",
    venture: "TechStart Myanmar",
    category: "Youth-led",
    description:
      "TechStart Myanmar, a youth-led venture, has developed innovative solutions that are now serving thousands of young entrepreneurs across Southeast Asia, fostering a new generation of innovators.",
    avatar: "YI",
    avatarBg: "bg-blue-100 text-blue-700",
    impactMetrics: [
      { label: "Entrepreneurs Served", value: "10,000+" },
      { label: "Youth-led Solutions", value: "3 New" },
      { label: "Capital Impact", value: "$180K" },
    ],
  },
  {
    id: "IS-003",
    title: "Disability Inclusion Project",
    venture: "AccessTech Vietnam",
    category: "Disability-inclusive",
    description:
      "AccessTech Vietnam has created accessible technology solutions that have directly improved employment opportunities and quality of life for hundreds of people with disabilities.",
    avatar: "DI",
    avatarBg: "bg-orange-100 text-orange-700",
    impactMetrics: [
      { label: "Employment Opportunities", value: "500+" },
      { label: "Accessible Solutions", value: "2 Products" },
      { label: "Capital Impact", value: "$320K" },
    ],
  },
]

const initialGoals: Goal[] = [
  {
    id: "G1",
    name: "Increase Women-led Ventures",
    targetValue: 50,
    currentValue: 42,
    unit: "%",
    category: "Women-led",
    dueDate: "2024-12-31",
  },
  {
    id: "G2",
    name: "Expand Youth-led Portfolio",
    targetValue: 40,
    currentValue: 35,
    unit: "%",
    category: "Youth-led",
    dueDate: "2024-12-31",
  },
  {
    id: "G3",
    name: "Achieve Disability Inclusion Target",
    targetValue: 25,
    currentValue: 18,
    unit: "%",
    category: "Disability-inclusive",
    dueDate: "2024-12-31",
  },
]

const chartConfig = {
  womenLed: { label: "Women-led", color: "hsl(var(--chart-5))" }, // violet
  youthLed: { label: "Youth-led", color: "hsl(var(--chart-3))" }, // blue
  disabilityInclusive: { label: "Disability-inclusive", color: "hsl(var(--chart-2))" }, // amber
  indigenous: { label: "Indigenous-led", color: "hsl(var(--chart-1))" }, // teal
  current: { label: "Current", color: "hsl(var(--chart-1))" },
  target: { label: "Target", color: "hsl(var(--chart-3))" },
}

export default function GedsiTracker() {
  const [selectedMetric, setSelectedMetric] = useState(gedsiMetrics[0])
  const [selectedGedsiCategory, setSelectedGedsiCategory] = useState<string>("all")
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [isAddGoalDialogOpen, setIsAddGoalDialogOpen] = useState(false)
  const [newGoal, setNewGoal] = useState<Omit<Goal, "id" | "currentValue">>({
    name: "",
    targetValue: 0,
    unit: "%",
    category: "Women-led",
    dueDate: "",
  })

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.targetValue > 0 && newGoal.dueDate) {
      setGoals((prev) => [
        ...prev,
        {
          id: `G${prev.length + 1}`,
          currentValue: 0, // New goals start at 0 progress
          ...newGoal,
        },
      ])
      setNewGoal({ name: "", targetValue: 0, unit: "%", category: "Women-led", dueDate: "" })
      setIsAddGoalDialogOpen(false)
    }
  }

  const getFilteredSectorGedsiData = () => {
    if (selectedGedsiCategory === "all") {
      return sectorGedsiData
    }
    return sectorGedsiData.map((data) => ({
      sector: data.sector,
      [selectedGedsiCategory]: data[selectedGedsiCategory as keyof SectorGedsiData],
    }))
  }

  const getSectorSummary = (sector: string) => {
    const data = sectorGedsiData.find((s) => s.sector === sector)
    if (!data) return "N/A"
    const total = data.womenLed + data.youthLed + data.disabilityInclusive + data.indigenous
    return `Total GEDSI Ventures: ${total}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-blue-900 dark:to-teal-900">
      <div className="p-6 space-y-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gedsi-gender/10 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-gedsi-gender" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">GEDSI Integration</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Gender Equality, Disability & Social Inclusion Tracker
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span>🌏 Southeast Asia Impact</span>
                  <span>💝 Inclusive Ventures</span>
                  <span>📊 Real-time Monitoring</span>
                </div>
              </div>
            </div>
            <Button className="bg-gedsi-gender hover:bg-gedsi-gender/90 text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {gedsiMetrics.map((metric, index) => (
            <Card
              key={index}
              className={`hover:shadow-lg transition-shadow cursor-pointer ${
                selectedMetric.category === metric.category ? "border-2 border-teal-500" : ""
              }`}
              onClick={() => setSelectedMetric(metric)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                    <Users className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {metric.trend}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.category}</p>
                  <div className="flex items-end space-x-2">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.current}%</p>
                    <p className="text-sm text-gray-500">of {metric.target}%</p>
                  </div>
                  <Progress value={(metric.current / metric.target) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sector-analysis">Sector Analysis</TabsTrigger>
            <TabsTrigger value="impact-stories">Impact Stories</TabsTrigger>
            <TabsTrigger value="goals-tracking">Goals Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>GEDSI Distribution</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Current distribution of ventures by GEDSI categories
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col lg:flex-row items-center justify-between min-h-[300px]">
                    <div className="w-full lg:w-2/3 h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={venturesByGedsi}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            dataKey="value"
                            stroke="#ffffff"
                            strokeWidth={2}
                          >
                            {venturesByGedsi.map((entry, index) => (
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
                                      {data.value}% of ventures
                                    </p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="w-full lg:w-1/3 lg:pl-4 mt-4 lg:mt-0">
                      <div className="space-y-3">
                        {venturesByGedsi.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Selected Metric Details</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedMetric.category}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{selectedMetric.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Current Progress</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{selectedMetric.current}%</span>
                          <Badge variant="outline" className="text-xs">
                            {selectedMetric.trend}
                          </Badge>
                        </div>
                      </div>
                      <div className="relative">
                        <Progress value={(selectedMetric.current / selectedMetric.target) * 100} className="h-3" />
                        <div
                          className="absolute top-0 right-0 h-3 w-1 bg-gray-400 rounded-r"
                          style={{ right: `${100 - selectedMetric.target}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Current: {selectedMetric.current}%</span>
                        <span>Target: {selectedMetric.target}%</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2 flex items-center space-x-2">
                        <Lightbulb className="h-4 w-4 text-teal-600" />
                        <span>Key Achievements</span>
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {selectedMetric.keyAchievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Progress History</h4>
                      <ChartContainer
                        config={{
                          value: {
                            label: "Value",
                            color: selectedMetric.color.replace("text-", "hsl(var(--chart-"),
                          },
                        }}
                        className="h-[100px] w-full"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={selectedMetric.progressHistory}>
                            <XAxis
                              dataKey="date"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 10, fill: "#6b7280" }}
                            />
                            <YAxis
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 10, fill: "#6b7280" }}
                              domain={[0, 100]}
                            />
                            <ChartTooltip
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload
                                  return (
                                    <div className="bg-white dark:bg-gray-800 p-2 border rounded-lg shadow-lg text-sm">
                                      <p className="font-medium text-gray-900 dark:text-white">{data.date}</p>
                                      <p className="text-gray-600 dark:text-gray-400">Value: {data.value}%</p>
                                    </div>
                                  )
                                }
                                return null
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="var(--color-value)"
                              fill="var(--color-value)"
                              fillOpacity={0.3}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sector-analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>GEDSI by Sector</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Analyze GEDSI representation across different sectors
                </p>
                <div className="mt-4">
                  <Label htmlFor="gedsi-category-select">Highlight Category</Label>
                  <Select value={selectedGedsiCategory} onValueChange={(value) => setSelectedGedsiCategory(value)}>
                    <SelectTrigger id="gedsi-category-select" className="w-[200px]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="womenLed">Women-led</SelectItem>
                      <SelectItem value="youthLed">Youth-led</SelectItem>
                      <SelectItem value="disabilityInclusive">Disability-inclusive</SelectItem>
                      <SelectItem value="indigenous">Indigenous-led</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getFilteredSectorGedsiData()} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <XAxis
                        dataKey="sector"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      {selectedGedsiCategory === "all" ? (
                        <>
                          <Bar dataKey="womenLed" fill="var(--color-womenLed)" name="Women-led" />
                          <Bar dataKey="youthLed" fill="var(--color-youthLed)" name="Youth-led" />
                          <Bar
                            dataKey="disabilityInclusive"
                            fill="var(--color-disabilityInclusive)"
                            name="Disability-inclusive"
                          />
                          <Bar dataKey="indigenous" fill="var(--color-indigenous)" name="Indigenous-led" />
                        </>
                      ) : (
                        <Bar
                          dataKey={selectedGedsiCategory}
                          fill={`var(--color-${selectedGedsiCategory})`}
                          name={chartConfig[selectedGedsiCategory as keyof typeof chartConfig].label}
                        />
                      )}
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  {sectorGedsiData.map((data, index) => (
                    <p key={index}>
                      {data.sector}: {getSectorSummary(data.sector)}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact-stories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {impactStories.map((story) => (
                <Card key={story.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold ${story.avatarBg}`}
                      >
                        {story.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium">{story.title}</h3>
                        <p className="text-sm text-gray-600">{story.venture}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{story.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge
                        className={`bg-opacity-20 ${gedsiMetrics.find((m) => m.category === story.category)?.bgColor || "bg-gray-100"} ${gedsiMetrics.find((m) => m.category === story.category)?.color || "text-gray-800"}`}
                      >
                        {story.category}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      {story.impactMetrics.map((metric, idx) => (
                        <div key={idx}>
                          <p className="text-gray-500">{metric.label}</p>
                          <p className="font-medium text-gray-900 dark:text-white">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="goals-tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>GEDSI Goals & Milestones</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track progress towards organizational GEDSI commitments
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Dialog open={isAddGoalDialogOpen} onOpenChange={setIsAddGoalDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-teal-600 hover:bg-teal-700">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add New Goal
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New GEDSI Goal</DialogTitle>
                          <DialogDescription>Define a new target for your GEDSI initiatives.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="goal-name" className="text-right">
                              Goal Name
                            </Label>
                            <Input
                              id="goal-name"
                              value={newGoal.name}
                              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="target-value" className="text-right">
                              Target Value
                            </Label>
                            <Input
                              id="target-value"
                              type="number"
                              value={newGoal.targetValue}
                              onChange={(e) =>
                                setNewGoal({ ...newGoal, targetValue: Number.parseFloat(e.target.value) })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="unit" className="text-right">
                              Unit
                            </Label>
                            <Select
                              value={newGoal.unit}
                              onValueChange={(value) => setNewGoal({ ...newGoal, unit: value })}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="%">%</SelectItem>
                                <SelectItem value="count">Count</SelectItem>
                                <SelectItem value="dollars">$</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                              Category
                            </Label>
                            <Select
                              value={newGoal.category}
                              onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {gedsiMetrics.map((metric) => (
                                  <SelectItem key={metric.category} value={metric.category}>
                                    {metric.category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="due-date" className="text-right">
                              Due Date
                            </Label>
                            <Input
                              id="due-date"
                              type="date"
                              value={newGoal.dueDate}
                              onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddGoalDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddGoal}>Add Goal</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center space-x-2">
                        <Target className="h-5 w-5 text-teal-600" />
                        <span>Current Goals</span>
                      </h3>
                      <div className="space-y-3">
                        {goals.map((goal) => (
                          <div
                            key={goal.id}
                            className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <div>
                              <span className="text-sm font-medium">{goal.name}</span>
                              <p className="text-xs text-gray-500">{goal.category}</p>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-teal-600">
                                {goal.currentValue}
                                {goal.unit} / {goal.targetValue}
                                {goal.unit}
                              </span>
                              <p className="text-xs text-gray-500">Due: {goal.dueDate}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center space-x-2">
                        <Award className="h-5 w-5 text-teal-600" />
                        <span>Overall Goal Progress</span>
                      </h3>
                      <ChartContainer
                        config={{
                          current: { label: "Current Progress", color: "hsl(var(--chart-1))" },
                          target: { label: "Target", color: "hsl(var(--chart-3))" },
                        }}
                        className="h-[200px] w-full"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={goals}>
                            <XAxis
                              dataKey="name"
                              tick={{ fontSize: 10, fill: "#6b7280" }}
                              angle={-30}
                              textAnchor="end"
                              height={50}
                            />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#6b7280" }} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="currentValue" fill="var(--color-current)" name="Current Progress" />
                            <Line
                              type="monotone"
                              dataKey="targetValue"
                              stroke="var(--color-target)"
                              name="Target"
                              dot={false}
                              strokeWidth={2}
                            />
                            <Legend />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="font-medium mb-4 flex items-center space-x-2">
                      <CalendarDays className="h-5 w-5 text-teal-600" />
                      <span>Upcoming Milestones</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Q2 2024 Review</p>
                          <p className="text-sm text-gray-600">Comprehensive GEDSI assessment</p>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Due: June 30
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Annual GEDSI Report</p>
                          <p className="text-sm text-gray-600">Stakeholder impact report</p>
                        </div>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                          Due: Dec 31
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
