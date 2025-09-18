"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
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
  RefreshCw,
  Filter,
  Calendar,
  Target,
  Zap,
  Activity,
  DollarSign,
  Building2,
  UserCheck,
  ArrowRight,
  Eye,
  Share,
  Settings,
  AlertCircle,
  CheckCircle,
  Globe,
  Minus,
  ArrowUp,
  ArrowDown
} from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, BarChart, Bar, Cell, Pie, PieChart as RCPieChart, LineChart as RCLineChart, Line, Tooltip, Legend } from "recharts"
import { useEffect, useMemo, useState } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface AnalyticsData {
  ventures: any[]
  gedsiMetrics: any[]
  users: any[]
  analytics: any
}

export default function PerformanceAnalytics() {
  const [data, setData] = useState<AnalyticsData>({
    ventures: [],
    gedsiMetrics: [],
    users: [],
    analytics: null
  })
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("all")
  const [realTimeEnabled, setRealTimeEnabled] = useState(false)

  const loadAnalyticsData = async () => {
    setLoading(true)
    try {
      const [venturesRes, gedsiRes, usersRes, analyticsRes] = await Promise.all([
        fetch('/api/ventures?limit=100'),
        fetch('/api/gedsi-metrics?limit=200'),
        fetch('/api/users?limit=100'),
        fetch(`/api/analytics?period=${selectedPeriod}`).catch(() => ({ ok: false }))
      ])

      const [venturesData, gedsiData, usersData, analyticsData] = await Promise.all([
        venturesRes.json(),
        gedsiRes.json(),
        usersRes.json(),
        analyticsRes.ok && 'json' in analyticsRes ? analyticsRes.json() : {}
      ])

      setData({
        ventures: venturesData.ventures || [],
        gedsiMetrics: gedsiData.metrics || [],
        users: usersData.users || [],
        analytics: analyticsData || null
      })
    } catch (error) {
      console.error('Error loading analytics data:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadAnalyticsData()
  }, [selectedPeriod])

  // Real-time data refresh
  useEffect(() => {
    if (!realTimeEnabled) return
    
    const interval = setInterval(() => {
      loadAnalyticsData()
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [realTimeEnabled, selectedPeriod])

  // Enhanced KPI Metrics
  const kpiMetrics = useMemo(() => {
    const totalVentures = data.ventures.length
    const fundedVentures = data.ventures.filter(v => ['FUNDED', 'SERIES_A', 'SERIES_B', 'SERIES_C'].includes(v.stage)).length
    const conversionRate = totalVentures > 0 ? Math.round((fundedVentures / totalVentures) * 100) : 0
    
    const totalCapital = data.ventures.reduce((sum, v) => sum + (v.fundingRaised || 0), 0)
    
    const completedGedsi = data.gedsiMetrics.filter(m => ['COMPLETED', 'VERIFIED'].includes(m.status)).length
    const gedsiCompliance = data.gedsiMetrics.length > 0 ? Math.round((completedGedsi / data.gedsiMetrics.length) * 100) : 0
    
    const activeUsers = data.users.filter(u => u.isActive !== false).length

    return [
      {
        title: "Venture Success Rate",
        value: conversionRate,
        unit: "%",
        change: 2.1,
        trend: "up",
        icon: Target,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        description: "Ventures that reached funding stage"
      },
      {
        title: "Capital Facilitated",
        value: (totalCapital / 1000000).toFixed(1),
        unit: "M",
        change: 0.8,
        trend: "up",
        icon: DollarSign,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        description: "Total funding raised by ventures"
      },
      {
        title: "GEDSI Compliance",
        value: gedsiCompliance,
        unit: "%",
        change: 5.2,
        trend: "up",
        icon: UserCheck,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        description: "Average GEDSI metric completion"
      },
      {
        title: "Active Users",
        value: activeUsers,
        unit: "",
        change: 12,
        trend: "up",
        icon: Users,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        description: "Currently active platform users"
      },
      {
        title: "Avg Time to Funding",
        value: 42,
        unit: " days",
        change: -5,
        trend: "down",
        icon: Clock,
        color: "text-teal-600",
        bgColor: "bg-teal-50",
        description: "Average time from intake to funding"
      },
      {
        title: "Platform Growth",
        value: 25,
        unit: "%",
        change: 3.4,
        trend: "up",
        icon: TrendingUp,
        color: "text-indigo-600",
        bgColor: "bg-indigo-50",
        description: "Month-over-month growth rate"
      }
    ]
  }, [data])

  // Enhanced Conversion Funnel
  const conversionFunnelData = useMemo(() => {
    if (data.ventures.length === 0) return [
      { stage: "Intake", count: 0, percentage: 0, color: "#3b82f6", dropoff: 0 },
      { stage: "Screening", count: 0, percentage: 0, color: "#8b5cf6", dropoff: 0 },
      { stage: "Due Diligence", count: 0, percentage: 0, color: "#f59e0b", dropoff: 0 },
      { stage: "Investment Ready", count: 0, percentage: 0, color: "#10b981", dropoff: 0 },
      { stage: "Funded", count: 0, percentage: 0, color: "#ef4444", dropoff: 0 }
    ]

    const stageCounts = {
      Intake: 0,
      Screening: 0,
      "Due Diligence": 0,
      "Investment Ready": 0,
      Funded: 0
    }

    data.ventures.forEach(v => {
      const stage = String(v.stage || '').toUpperCase()
      if (stage.includes('INTAKE') || stage.includes('APPLIED')) stageCounts.Intake++
      else if (stage.includes('SCREEN') || stage.includes('REVIEW')) stageCounts.Screening++
      else if (stage.includes('DUE') || stage.includes('DILIGENCE')) stageCounts["Due Diligence"]++
      else if (stage.includes('READY') || stage.includes('APPROVED')) stageCounts["Investment Ready"]++
      else if (stage.includes('FUNDED') || stage.includes('SERIES')) stageCounts.Funded++
      else stageCounts.Screening++ // Default to screening
    })

    const total = data.ventures.length
    const colors = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444"]
    const stageNames = Object.keys(stageCounts)

    return Object.entries(stageCounts).map(([stage, count], index) => {
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0
      const prevCount = index > 0 ? Object.values(stageCounts)[index - 1] : count
      const dropoff = prevCount > 0 ? Math.round(((prevCount - count) / prevCount) * 100) : 0

      return {
        stage,
        count,
        percentage,
        color: colors[index],
        dropoff: index > 0 ? dropoff : 0
      }
    })
  }, [data.ventures])

  // Performance Trends
  const performanceTrends = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map((month, index) => ({
      month,
      ventures: Math.floor(Math.random() * 20) + 10 + (index * 2),
      funding: Math.floor(Math.random() * 2000000) + 500000,
      gedsiScore: Math.floor(Math.random() * 20) + 70 + (index * 1),
      users: Math.floor(Math.random() * 100) + 600 + (index * 40),
      conversionRate: Math.floor(Math.random() * 10) + 15 + (index * 0.5)
    }))
  }, [])

  // Sector Performance Analysis
  const sectorPerformance = useMemo(() => {
    const sectorData: Record<string, { ventures: number, funded: number, capital: number }> = {}
    
    data.ventures.forEach(v => {
      const sector = v.sector || 'Other'
      if (!sectorData[sector]) {
        sectorData[sector] = { ventures: 0, funded: 0, capital: 0 }
      }
      sectorData[sector].ventures++
      if (['FUNDED', 'SERIES_A', 'SERIES_B', 'SERIES_C'].includes(v.stage)) {
        sectorData[sector].funded++
      }
      sectorData[sector].capital += v.fundingRaised || 0
    })

    return Object.entries(sectorData).map(([sector, stats]) => ({
      sector,
      ventures: stats.ventures,
      funded: stats.funded,
      successRate: stats.ventures > 0 ? Math.round((stats.funded / stats.ventures) * 100) : 0,
      capital: stats.capital,
      avgCapital: stats.funded > 0 ? Math.round(stats.capital / stats.funded) : 0
    })).sort((a, b) => b.ventures - a.ventures)
  }, [data.ventures])

  // GEDSI Performance by Category
  const gedsiCategoryPerformance = useMemo(() => {
    const categoryData: Record<string, { total: number, completed: number }> = {}
    
    data.gedsiMetrics.forEach(m => {
      const category = m.category || 'OTHER'
      if (!categoryData[category]) {
        categoryData[category] = { total: 0, completed: 0 }
      }
      categoryData[category].total++
      if (['COMPLETED', 'VERIFIED'].includes(m.status)) {
        categoryData[category].completed++
      }
    })

    return Object.entries(categoryData).map(([category, stats]) => ({
      category,
      total: stats.total,
      completed: stats.completed,
      completionRate: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0,
      color: {
        'GENDER': '#ec4899',
        'DISABILITY': '#3b82f6',
        'SOCIAL_INCLUSION': '#10b981',
        'CROSS_CUTTING': '#f59e0b'
      }[category] || '#6b7280'
    }))
  }, [data.gedsiMetrics])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading advanced analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="p-6 space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Performance Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive insights into venture performance and platform metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant={realTimeEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setRealTimeEnabled(!realTimeEnabled)}
              >
                <Activity className="h-4 w-4 mr-1" />
                {realTimeEnabled ? "Live" : "Static"}
              </Button>
              {realTimeEnabled && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600">Live</span>
                </div>
              )}
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={loadAnalyticsData} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Enhanced KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpiMetrics.map((metric, index) => (
            <Card key={index} className="group border-0 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${metric.bgColor} group-hover:scale-110 transition-transform`}>
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      metric.trend === "up"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : metric.trend === "down"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : metric.trend === "down" ? (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    ) : (
                      <Minus className="h-3 w-3 mr-1" />
                    )}
                    {metric.trend === "up" ? "+" : ""}{metric.change}
                    {metric.unit === "%" ? "%" : ""}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.unit === "M" ? "$" : ""}{metric.value}{metric.unit}
                  </p>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 dark:bg-gray-800/80 shadow rounded-lg">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="ventures" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Ventures
            </TabsTrigger>
            <TabsTrigger value="gedsi" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              GEDSI
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Performance Trends */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    Performance Trends
                  </CardTitle>
                  <CardDescription>Multi-metric performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RCLineChart data={performanceTrends}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="ventures" stroke="#3b82f6" strokeWidth={2} name="New Ventures" />
                        <Line type="monotone" dataKey="gedsiScore" stroke="#10b981" strokeWidth={2} name="GEDSI Score" />
                        <Line type="monotone" dataKey="conversionRate" stroke="#f59e0b" strokeWidth={2} name="Conversion Rate %" />
                      </RCLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Enhanced Conversion Funnel */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowRight className="h-5 w-5" />
                    Venture Pipeline Funnel
                  </CardTitle>
                  <CardDescription>Conversion rates and drop-off analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conversionFunnelData.map((stage, index) => (
                      <div key={stage.stage} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{stage.stage}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{stage.count} ventures</span>
                            <Badge variant="outline" className="text-xs">
                              {stage.percentage}%
                            </Badge>
                            {stage.dropoff > 0 && (
                              <Badge variant="outline" className="text-xs text-red-600 bg-red-50">
                                -{stage.dropoff}% dropoff
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                          <div 
                            className="h-full rounded-lg transition-all duration-500"
                            style={{ 
                              width: `${stage.percentage}%`,
                              backgroundColor: stage.color
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sector Performance */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Sector Performance Analysis
                </CardTitle>
                <CardDescription>Success rates and capital distribution by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Sector Breakdown</h4>
                    <div className="space-y-3">
                      {sectorPerformance.slice(0, 6).map((sector, index) => (
                        <div key={sector.sector} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }} />
                            <span className="text-sm font-medium">{sector.sector}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold">{sector.ventures} ventures</div>
                            <div className="text-xs text-gray-600">{sector.successRate}% success rate</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Capital Distribution</h4>
                    <ChartContainer config={{}} className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RCPieChart>
                          <Pie
                            data={sectorPerformance.slice(0, 5)}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="capital"
                            nameKey="sector"
                            label={({ sector, percent }) => `${sector} ${(percent * 100).toFixed(0)}%`}
                          >
                            {sectorPerformance.slice(0, 5).map((_, index) => (
                              <Cell key={`cell-${index}`} fill={`hsl(${index * 72}, 70%, 50%)`} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`, 'Capital']} />
                        </RCPieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ventures Tab */}
          <TabsContent value="ventures" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Venture Growth */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Venture Growth Trajectory</CardTitle>
                  <CardDescription>Monthly onboarding and funding trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceTrends}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="ventures"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                          name="New Ventures"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Geographic Heatmap */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Geographic Distribution
                  </CardTitle>
                  <CardDescription>Venture distribution across regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.ventures.reduce((acc: any[], venture) => {
                      const country = venture.location?.split(',')[1]?.trim() || 'Unknown'
                      const existing = acc.find(item => item.country === country)
                      if (existing) {
                        existing.count++
                        existing.capital += venture.fundingRaised || 0
                      } else {
                        acc.push({ country, count: 1, capital: venture.fundingRaised || 0 })
                      }
                      return acc
                    }, []).sort((a, b) => b.count - a.count).slice(0, 8).map((item, index) => (
                      <div key={item.country} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">{item.country}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold">{item.count} ventures</span>
                          <p className="text-xs text-gray-500">${(item.capital / 1000000).toFixed(1)}M capital</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* GEDSI Tab */}
          <TabsContent value="gedsi" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* GEDSI Category Performance */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>GEDSI Category Performance</CardTitle>
                  <CardDescription>Completion rates by GEDSI category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gedsiCategoryPerformance.map((category) => (
                      <div key={category.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{category.category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              {category.completed}/{category.total}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {category.completionRate}%
                            </Badge>
                          </div>
                        </div>
                        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${category.completionRate}%`,
                              backgroundColor: category.color
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* GEDSI Trends */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>GEDSI Compliance Trends</CardTitle>
                  <CardDescription>Compliance progress over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceTrends}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="gedsiScore"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.3}
                          name="GEDSI Score"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* User Growth */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Platform user adoption over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceTrends}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="users"
                          stroke="#f59e0b"
                          fill="#f59e0b"
                          fillOpacity={0.3}
                          name="Active Users"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* User Engagement Metrics */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>User activity and engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Daily Active Users</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">324</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Avg Session Duration</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">18m</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">Feature Adoption</span>
                      </div>
                      <span className="text-lg font-bold text-purple-600">87%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium">Return Rate</span>
                      </div>
                      <span className="text-lg font-bold text-orange-600">73%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Recommendations */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    AI-Powered Insights
                  </CardTitle>
                  <CardDescription>Intelligent recommendations based on your data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/60 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-900">Strong GEDSI Performance</h4>
                          <p className="text-sm text-green-700">Your GEDSI compliance rate of {kpiMetrics[2]?.value}% is above industry average. Consider showcasing this in investor reports.</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white/60 rounded-lg border-l-4 border-yellow-500">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-900">Pipeline Bottleneck</h4>
                          <p className="text-sm text-yellow-700">Due diligence stage shows slower progression. Consider streamlining the process or adding more resources.</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white/60 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Growth Opportunity</h4>
                          <p className="text-sm text-blue-700">Southeast Asian tech sector shows high success rates. Consider increasing outreach in this segment.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Predictive Analytics */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    Predictive Analytics
                  </CardTitle>
                  <CardDescription>Forecasts and predictions based on current trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/60 rounded-lg">
                      <h4 className="font-medium mb-3">Next Month Forecast</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">New Ventures</p>
                          <p className="text-2xl font-bold text-purple-600">12-15</p>
                          <p className="text-xs text-green-600">+8% vs last month</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Funding Events</p>
                          <p className="text-2xl font-bold text-purple-600">3-5</p>
                          <p className="text-xs text-green-600">+12% vs last month</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white/60 rounded-lg">
                      <h4 className="font-medium mb-3">Risk Assessment</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Pipeline Risk</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Low</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Compliance Risk</span>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Medium</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Market Risk</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Low</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white/60 rounded-lg">
                      <h4 className="font-medium mb-3">Optimization Opportunities</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="h-3 w-3 text-blue-600" />
                          <span>Focus on FinTech sector (+23% success rate)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="h-3 w-3 text-green-600" />
                          <span>Expand in Thailand market (+15% growth)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="h-3 w-3 text-purple-600" />
                          <span>Improve DD process (-12 days avg time)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Advanced Analytics Actions */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Advanced Analytics & Reporting
            </CardTitle>
            <CardDescription>
              Unlock deeper insights with custom reports, predictive models, and advanced visualizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-16 flex flex-col items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700">
                <Download className="h-5 w-5" />
                <span className="text-sm">Custom Report</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-1">
                <Lightbulb className="h-5 w-5" />
                <span className="text-sm">AI Insights</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-1">
                <Share className="h-5 w-5" />
                <span className="text-sm">Share Dashboard</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-1">
                <Settings className="h-5 w-5" />
                <span className="text-sm">Configure</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
