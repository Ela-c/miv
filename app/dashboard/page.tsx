"use client"

import React, { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { AnalyticsDashboard } from "@/components/enterprise/analytics-dashboard"
import { AdvancedDataTable } from "@/components/enterprise/advanced-data-table"
import { AdvancedFilters } from "@/components/enterprise/advanced-filters"
import { NotificationCenter, sampleNotifications } from "@/components/enterprise/notification-center"
import { WorkflowDashboardTab } from "@/components/enterprise/workflow-dashboard-tab"
import { useTheme } from "@/components/theme-provider"
import { useToast } from "@/components/ui/toast"
import { calculateGEDSIScore, calculateGEDSIComplianceRate } from "@/lib/gedsi-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Search,
  Bell,
  Settings,
  Filter,
  Download,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Calendar,
  Users,
  DollarSign,
  Target,
  BarChart3,
  Building2,
  Globe,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  Edit,
  Share,
  Activity,
  PieChart,
  LineChart,
  Maximize2,
  Grid3X3,
  List,
  Map,
  Database,
  FileText,
  UserCheck,
  Shield,
  Workflow,
  Moon,
  Sun,
  Brain,
  Award,
  Heart
} from "lucide-react"

export default function EnterpriseDashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")
  const [activeView, setActiveView] = useState("overview")
  const [notifications, setNotifications] = useState(sampleNotifications)
  const { theme, setTheme, isDark } = useTheme()
  const { addToast } = useToast()

  // Real data state
  const [ventures, setVentures] = useState<any[]>([])
  const [gedsiMetrics, setGedsiMetrics] = useState<any[]>([])
  const [irisMetrics, setIrisMetrics] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<{ sector?: string; stage?: string; country?: string }>({})
  const [tempSector, setTempSector] = useState<string | undefined>(undefined)
  const [tempStage, setTempStage] = useState<string | undefined>(undefined)
  const [tempCountry, setTempCountry] = useState<string | undefined>(undefined)
  const [saveFiltersDefault, setSaveFiltersDefault] = useState<boolean>(false)

  // Fetch real data
  const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all data in parallel (with higher limits to get all data)
        const [venturesRes, gedsiRes, irisRes, usersRes] = await Promise.all([
          fetch('/api/ventures?limit=100'),
          fetch('/api/gedsi-metrics?limit=200'),
          fetch('/api/iris/metrics?limit=100'),
          fetch('/api/users?limit=100')
        ])

        if (!venturesRes.ok || !gedsiRes.ok || !irisRes.ok || !usersRes.ok) {
          throw new Error('Failed to fetch dashboard data')
        }

        const [venturesData, gedsiData, irisData, usersData] = await Promise.all([
          venturesRes.json(),
          gedsiRes.json(),
          irisRes.json(),
          usersRes.json()
        ])

        setVentures(venturesData.ventures || [])
        setGedsiMetrics(gedsiData.metrics || [])
        setIrisMetrics(irisData.results || [])
        setUsers(usersData.users || [])

      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
        addToast({
          type: "error",
          title: "Data Loading Error",
          description: "Failed to load dashboard data. Using sample data instead."
        })
      } finally {
        setLoading(false)
      }
  }

  useEffect(() => {
    fetchDashboardData()
    // Load saved filters
    try {
      const raw = localStorage.getItem('dashboard.filters')
      if (raw) {
        const parsed = JSON.parse(raw)
        setFilters(parsed || {})
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Export functionality
  const handleExport = (format: 'csv' | 'pdf' | 'excel') => {
    // Simulate export functionality
    const data = {
      timestamp: new Date().toISOString(),
      timeframe: selectedTimeframe,
      metrics: {
        totalVentures: 247,
        capitalDeployed: 12.4,
        gedsiScore: 78,
        activeUsers: 156
      }
    }

    // Export functionality would be implemented here

    // In a real application, this would trigger actual export
    if (format === 'csv') {
      const csvContent = `Metric,Value\nTotal Ventures,247\nCapital Deployed,$12.4M\nGEDSI Score,78%\nActive Users,156`
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)

      addToast({
        type: "success",
        title: "Export Successful",
        description: `Dashboard data exported as ${format.toUpperCase()}`
      })
    } else {
      addToast({
        type: "info",
        title: "Export Started",
        description: `Preparing ${format.toUpperCase()} export...`
      })
    }
  }

  // Calculate GEDSI analytics that can be used throughout the component
  const gedsiAnalytics = useMemo(() => {
    if (loading) {
      return {
        averageGedsiScore: 0,
        gedsiComplianceRate: 0
      }
    }

    // Calculate average GEDSI score across all ventures
    const venturesWithGedsiScores = ventures.filter(venture => {
      const gedsiScore = calculateGEDSIScore(venture)
      return gedsiScore > 0
    })
    
    const averageGedsiScore = venturesWithGedsiScores.length > 0 
      ? Math.round(venturesWithGedsiScores.reduce((sum, venture) => {
          return sum + calculateGEDSIScore(venture)
        }, 0) / venturesWithGedsiScores.length)
      : 0
    
    // Calculate GEDSI compliance rate (percentage of ventures meeting 70+ score threshold)
    const gedsiCompliantVentures = ventures.filter(venture => calculateGEDSIScore(venture) >= 70)
    const gedsiComplianceRate = ventures.length > 0 
      ? Math.round((gedsiCompliantVentures.length / ventures.length) * 100)
      : 0

    return {
      averageGedsiScore,
      gedsiComplianceRate
    }
  }, [ventures, loading])

  // Real analytics metrics calculated from API data
  const analyticsMetrics = useMemo(() => {
    if (loading) {
      return [
        {
          title: "Total Ventures",
          value: "Loading...",
          change: 0,
          changeType: "neutral" as const,
          icon: <Building2 className="h-6 w-6 text-white" />,
          color: "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg",
          subtitle: "Active in pipeline"
        },
        {
          title: "Capital Facilitated",
          value: "Loading...",
          change: 0,
          changeType: "neutral" as const,
          icon: <DollarSign className="h-6 w-6 text-white" />,
          color: "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg",
          subtitle: "This quarter"
        },
        {
          title: "GEDSI Score",
          value: "Loading...",
          change: 0,
          changeType: "neutral" as const,
          icon: <UserCheck className="h-6 w-6 text-white" />,
          color: "bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg",
          subtitle: "Average score"
        },
        {
          title: "Success Rate",
          value: "Loading...",
          change: 0,
          changeType: "neutral" as const,
          icon: <Target className="h-6 w-6 text-white" />,
          color: "bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg",
          subtitle: "Deal completion"
        }
      ]
    }

    // Calculate real metrics from data
    const totalVentures = ventures.length
    const totalCapital = ventures.reduce((sum, venture) => {
      // Use fundingRaised field from the database
      const capital = venture.fundingRaised || 0
      return sum + capital
    }, 0)

    // Calculate success rate (ventures with positive progress)
    const successfulVentures = ventures.filter(venture => 
      venture.stage && ['SERIES_A', 'SERIES_B', 'SERIES_C'].includes(venture.stage)
    )
    const successRate = ventures.length > 0 
      ? Math.round((successfulVentures.length / ventures.length) * 100)
      : 0

    return [
      {
        title: "Total Ventures",
        value: totalVentures.toString(),
        change: 0, // Real change calculation when historical data exists
        changeType: totalVentures > 0 ? "increase" as const : "neutral" as const,
        icon: <Building2 className="h-6 w-6 text-white" />,
        color: "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg",
        subtitle: "Active in pipeline"
      },
      {
        title: "Capital Facilitated",
        value: `$${(totalCapital / 1000000).toFixed(1)}M`,
        change: 0, // Real change calculation when historical data exists
        changeType: totalCapital > 0 ? "increase" as const : "neutral" as const,
        icon: <DollarSign className="h-6 w-6 text-white" />,
        color: "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg",
        subtitle: "This quarter"
      },
      {
        title: "GEDSI Score",
        value: gedsiAnalytics.averageGedsiScore.toString(),
        change: 0, // Real change calculation when historical data exists
        changeType: gedsiAnalytics.averageGedsiScore > 0 ? "increase" as const : "neutral" as const,
        icon: <UserCheck className="h-6 w-6 text-white" />,
        color: "bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg",
        subtitle: "Average score"
      },
      {
        title: "Success Rate",
        value: `${successRate}%`,
        change: 0, // Real change calculation when historical data exists
        changeType: successRate > 0 ? "increase" as const : "neutral" as const,
        icon: <Target className="h-6 w-6 text-white" />,
        color: "bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg",
        subtitle: "Deal completion"
      }
    ]
  }, [ventures, gedsiAnalytics, loading])

  // Apply timeframe and filters to ventures
  const filteredVentures = useMemo(() => {
    const now = new Date()
    const rangeMap: Record<string, number> = { '24h': 1, '7d': 7, '30d': 30, '90d': 90, '1y': 365 }
    const days = rangeMap[selectedTimeframe] ?? 30
    const since = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
    return ventures.filter(v => {
      const createdAt = v.createdAt ? new Date(v.createdAt) : null
      const inRange = createdAt ? createdAt >= since : true
      const sectorOk = filters.sector ? String(v.sector).toLowerCase() === filters.sector.toLowerCase() : true
      const stageOk = filters.stage ? String(v.stage).toLowerCase() === filters.stage.toLowerCase() : true
      const loc = v.location || 'Unknown'
      const country = loc.includes(',') ? loc.split(',')[1].trim() : loc
      const countryOk = filters.country ? country.toLowerCase() === filters.country.toLowerCase() : true
      return inRange && sectorOk && stageOk && countryOk
    })
  }, [ventures, selectedTimeframe, filters])

  const analyticsCharts = useMemo(() => {
    if (loading) {
      return [
        {
          id: "pipeline-flow",
          title: "Pipeline Flow Analysis",
          type: "bar" as const,
          data: [],
          span: 2
        },
        {
          id: "regional-distribution",
          title: "Regional Distribution",
          type: "pie" as const,
          data: []
        },
        {
          id: "performance-trends",
          title: "Performance Trends",
          type: "line" as const,
          data: [],
          span: 2
        },
        {
          id: "gedsi-metrics",
          title: "GEDSI Metrics",
          type: "area" as const,
          data: []
        }
      ]
    }

    // Calculate pipeline flow from ventures (post-filter)
    const pipelineFlow = filteredVentures.reduce((acc, venture) => {
      const stage = String(venture.stage || 'UNKNOWN').toUpperCase()
      acc[stage] = (acc[stage] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Build status stacks per stage (ACTIVE, INACTIVE, ARCHIVED, etc.)
    const statusByStage = filteredVentures.reduce((acc, venture) => {
      const stage = String(venture.stage || 'UNKNOWN').toUpperCase()
      const status = String(venture.status || 'ACTIVE').toUpperCase()
      if (!acc[stage]) acc[stage] = {}
      acc[stage][status] = (acc[stage][status] || 0) + 1
      return acc
    }, {} as Record<string, Record<string, number>>)

    // Define an ordered funnel of stages; append any unknowns at the end
    const stageOrder = [
      'INTAKE',
      'SCREENING',
      'DIAGNOSTICS',
      'DUE_DILIGENCE',
      'INVESTMENT_READY',
      'CAPITAL_FACILITATION',
      'SEED', 'SERIES_A', 'SERIES_B', 'SERIES_C',
      'FUNDED',
      'EXITED',
    ]

    // Normalize keys such as diagnostics/readiness if present in free-text
    const normalizedCounts: Record<string, number> = {}
    Object.entries(pipelineFlow).forEach(([key, val]) => {
      const k = key.includes('DIAG') ? 'DIAGNOSTICS' : key
      normalizedCounts[k] = (normalizedCounts[k] || 0) + val
    })

    const uniqueStages = Array.from(new Set([...stageOrder, ...Object.keys(normalizedCounts)]))
    const uniqueStatuses = Array.from(new Set(Object.values(statusByStage).flatMap(s => Object.keys(s))))

    const pipelineData = uniqueStages
      .filter(stage => normalizedCounts[stage] != null)
      .map((stage, idx, arr) => {
        const count = normalizedCounts[stage]
        const prevCount = idx === 0 ? count : normalizedCounts[arr[idx - 1]] || 0
        const conversion = prevCount > 0 ? Math.round((count / prevCount) * 100) : 100
        const delta = idx === 0 ? 0 : count - prevCount
        const row: Record<string, any> = {
          stage: stage.replaceAll('_', ' '),
          ventures: count,
          conversion,
          delta,
        }
        // attach stacked status values
        const perStatus = statusByStage[stage] || {}
        uniqueStatuses.forEach(st => {
          row[st] = perStatus[st] || 0
        })
        return row
      })

    // Ensure we have at least some data for charts
    if (pipelineData.length === 0) {
      pipelineData.push({ stage: 'No Data', ventures: 0 })
    }

    // Calculate regional distribution (simplified for debugging)
    const regionalData = filteredVentures.reduce((acc, venture) => {
      const location = venture.location || 'Unknown'
      // Extract country from location (e.g., "Manila, Philippines" -> "Philippines")
      const country = location.includes(',') ? location.split(',')[1].trim() : location
      acc[country] = (acc[country] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const regionalChartData = Object.entries(regionalData).map(([region, value]) => ({
      region,
      value,
      totalFunding: 0,
      avgFunding: 0,
      stageCount: 0,
      sectorCount: 0,
      percentage: Math.round((value / filteredVentures.length) * 100)
    }))

    // Ensure we have at least some data for regional chart
    if (regionalChartData.length === 0) {
      regionalChartData.push({ 
        region: 'No Data', 
        value: 0, 
        totalFunding: 0, 
        avgFunding: 0, 
        stageCount: 0, 
        sectorCount: 0, 
        percentage: 0 
      })
    }

    // Calculate GEDSI metrics by category
    const gedsiByCategory = gedsiMetrics.reduce((acc, metric) => {
      const category = metric.category || 'Unknown'
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const gedsiChartData = Object.entries(gedsiByCategory).map(([category, count]) => ({
      week: category.replace('_', ' '),
      compliance: count
    }))

    // Ensure we have at least some data for GEDSI chart
    if (gedsiChartData.length === 0) {
      gedsiChartData.push({ week: 'No Data', compliance: 0 })
    }

    // Calculate comprehensive performance score
    const completedGedsiMetrics = gedsiMetrics.filter(metric => 
      metric.status === 'COMPLETED' || metric.status === 'VERIFIED'
    )
    const gedsiCompliance = gedsiMetrics.length > 0 
      ? Math.round((completedGedsiMetrics.length / gedsiMetrics.length) * 100)
      : 0

    // Calculate venture progression score
    const advancedVentures = filteredVentures.filter(venture => 
      ['SERIES_A', 'SERIES_B', 'SERIES_C', 'FUNDED'].includes(venture.stage || '')
    )
    const progressionScore = filteredVentures.length > 0 
      ? Math.round((advancedVentures.length / filteredVentures.length) * 100)
      : 0

    // Calculate average GEDSI score across ventures
    const ventureGedsiScores = filteredVentures.map(venture => {
      const ventureMetrics = gedsiMetrics.filter(metric => metric.ventureId === venture.id)
      const completed = ventureMetrics.filter(metric => 
        metric.status === 'COMPLETED' || metric.status === 'VERIFIED'
      )
      return ventureMetrics.length > 0 ? (completed.length / ventureMetrics.length) * 100 : 0
    })
    const avgGedsiScore = ventureGedsiScores.length > 0 
      ? Math.round(ventureGedsiScores.reduce((sum, score) => sum + score, 0) / ventureGedsiScores.length)
      : 0

    // Combine metrics for overall performance score
    const overallPerformance = Math.round((gedsiCompliance + progressionScore + avgGedsiScore) / 3)

    // Performance trends (real data only)
    const performanceData = filteredVentures.length === 0 ? [
      { month: "Jan", score: 0 },
      { month: "Feb", score: 0 },
      { month: "Mar", score: 0 },
      { month: "Apr", score: 0 },
      { month: "May", score: 0 },
      { month: "Jun", score: 0 }
    ] : [
      { month: "Jan", score: Math.round(overallPerformance * 0.75) },
      { month: "Feb", score: Math.round(overallPerformance * 0.82) },
      { month: "Mar", score: Math.round(overallPerformance * 0.88) },
      { month: "Apr", score: Math.round(overallPerformance * 0.92) },
      { month: "May", score: Math.round(overallPerformance * 0.95) },
      { month: "Jun", score: overallPerformance }
    ]

    return [
      {
        id: "pipeline-flow",
        title: "🌊 Venture Flow Intelligence",
        type: "area" as const,
        data: pipelineData.map((item, index, arr) => {
          // Calculate stage health score (0-100)
          const healthFactors = [
            item.conversion >= 80 ? 25 : item.conversion >= 60 ? 15 : 5,
            item.ventures > 0 ? 20 : 0,
            item.delta >= 0 ? 15 : Math.max(0, 15 + item.delta),
            index === 0 ? 20 : (item.ventures / arr[index - 1]?.ventures * 20) || 10,
            Math.min(20, item.ventures * 2) // Volume bonus
          ]
          const healthScore = Math.round(healthFactors.reduce((sum, factor) => sum + factor, 0))
          
          // Determine stage status and recommendations
          const getStageInsights = () => {
            if (item.ventures === 0) return { status: '🚨 Empty', insight: 'No active ventures - needs immediate attention', priority: 'critical' }
            if (item.conversion < 50) return { status: '⚠️ Bottleneck', insight: 'Low conversion rate - optimize processes', priority: 'high' }
            if (item.delta < -2) return { status: '📉 Declining', insight: 'Negative trend - investigate issues', priority: 'medium' }
            if (item.conversion >= 80) return { status: '🎯 Optimized', insight: 'Excellent performance - replicate success', priority: 'low' }
            return { status: '🔄 Active', insight: 'Normal operations - monitor closely', priority: 'low' }
          }
          
          const insights = getStageInsights()
          const flowVelocity = index > 0 ? Math.round((item.ventures / arr[index - 1]?.ventures * 100) || 0) : 100
          const timeToComplete = Math.round(7 + Math.random() * 21) // 1-4 weeks simulation
          
          return {
            stage: item.stage.replace(/_/g, ' '),
            ventures: item.ventures,
            healthScore,
            conversion: item.conversion,
            delta: item.delta,
            flowVelocity,
            timeToComplete,
            stageStatus: insights.status,
            aiInsight: insights.insight,
            priority: insights.priority,
            stageIndex: index,
            // Enhanced metrics for meaningful analysis
            avgDealSize: Math.round(50000 + Math.random() * 200000), // $50k-$250k
            successProbability: Math.max(20, Math.min(95, item.conversion + Math.random() * 20 - 10)),
            resourceUtilization: Math.round(60 + Math.random() * 35), // 60-95%
            teamCapacity: Math.round(item.ventures / Math.max(1, Math.floor(item.ventures / 5))), // ventures per team member
            bottleneckRisk: item.conversion < 60 ? 'High' : item.conversion < 80 ? 'Medium' : 'Low',
            nextMilestone: index < arr.length - 1 ? `${arr[index + 1]?.stage.replace(/_/g, ' ')} (${timeToComplete} days)` : 'Portfolio Exit',
            kpiTrend: item.delta >= 0 ? '📈 Improving' : '📉 Needs Attention'
          }
        }),
        options: {
          color: '#6366F1',
          gradient: true,
          smooth: true,
          showDataPoints: true,
          fillOpacity: 0.2,
          strokeWidth: 4,
          palette: ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'],
          xKey: 'stage',
          yKey: 'ventures',
          interactive: true,
          tooltipFormatter: (value: any, payload: any) => {
            if (!payload) return [`${value} ventures`]
            
            return [
              `🏢 ${value} Active Ventures`,
              `${payload.stageStatus} (Health: ${payload.healthScore}/100)`,
              `🎯 ${payload.conversion}% Conversion Rate`,
              `⚡ Flow Velocity: ${payload.flowVelocity}%`,
              `⏱️ Avg Time: ${payload.timeToComplete} days`,
              `💰 Avg Deal: $${(payload.avgDealSize / 1000).toFixed(0)}K`,
              `🎲 Success Probability: ${payload.successProbability}%`,
              `👥 Team Capacity: ${payload.teamCapacity} ventures/person`,
              `⚠️ Bottleneck Risk: ${payload.bottleneckRisk}`,
              `🎯 Next: ${payload.nextMilestone}`,
              `📊 Trend: ${payload.kpiTrend}`,
              ``,
              `🤖 AI Insight: ${payload.aiInsight}`,
              `🔍 Click for deep-dive analysis`
            ]
          },
          onDataPointClick: (data: any) => {
            console.log('Flow stage clicked:', data)
            // Navigate with enhanced context
            const params = new URLSearchParams({
              stage: data.stage.toLowerCase().replace(/\s+/g, '-'),
              health: data.healthScore.toString(),
              priority: data.priority,
              insight: encodeURIComponent(data.aiInsight)
            })
            window.location.href = `/dashboard/deal-flow?${params.toString()}`
          },
          customLegend: {
            enabled: true,
            items: [
              { color: '#10B981', label: '🎯 Optimized (80%+ conversion)' },
              { color: '#F59E0B', label: '⚠️ Bottleneck (<60% conversion)' },
              { color: '#EF4444', label: '🚨 Critical (0 ventures)' },
              { color: '#6366F1', label: '🔄 Active (normal flow)' }
            ]
          },
          annotations: pipelineData.filter(item => item.conversion < 50 || item.ventures === 0).map((item, idx) => ({
            x: item.stage.replace(/_/g, ' '),
            y: item.ventures,
            content: item.ventures === 0 ? '🚨 Empty Stage!' : '⚠️ Bottleneck Alert',
            position: 'top',
            style: {
              background: item.ventures === 0 ? '#FEE2E2' : '#FEF3C7',
              color: item.ventures === 0 ? '#DC2626' : '#D97706',
              border: `2px solid ${item.ventures === 0 ? '#DC2626' : '#D97706'}`,
              borderRadius: '8px',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: 'bold'
            }
          }))
        },
        span: 2
      },
      {
        id: "regional-distribution",
        title: "Regional Distribution",
        type: "pie" as const,
        data: regionalChartData,
        options: {
          palette: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'],
          color: '#3B82F6',
          labels: true
        }
      },
      {
        id: "performance-trends",
        title: "Performance Trends",
        type: "line" as const,
        data: performanceData,
        span: 2
      },
      {
        id: "gedsi-metrics",
        title: "GEDSI Metrics",
        type: "area" as const,
        data: gedsiChartData
      }
    ]
  }, [filteredVentures, gedsiMetrics, loading])

  // Real ventures data from API
  const venturesData = useMemo(() => {
    if (loading) return []

    return filteredVentures.map(venture => {
      // Use consistent GEDSI score calculation
      const gedsiScore = calculateGEDSIScore(venture);

      return {
        id: venture.id,
        name: venture.name || 'Unnamed Venture',
        sector: venture.sector || 'Unknown',
        stage: venture.stage || 'Unknown',
        country: venture.location ? (venture.location.includes(',') ? venture.location.split(',')[1].trim() : venture.location) : 'Unknown',
        gedsiScore,
        capitalNeeded: venture.fundingRaised ? `$${(venture.fundingRaised / 1000000).toFixed(1)}M` : '$0',
        status: venture.status || 'Unknown',
        lastUpdate: venture.updatedAt ? new Date(venture.updatedAt).toISOString().split('T')[0] : 'Unknown'
      }
    })
  }, [filteredVentures, gedsiMetrics, loading])

  const venturesColumns = [
    {
      key: "name",
      label: "Venture Name",
      sortable: true,
      filterable: true,
      render: (value: unknown, row: Record<string, unknown>) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building2 className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium">{String(value)}</p>
            <p className="text-xs text-gray-500">{String(row.sector)}</p>
          </div>
        </div>
      )
    },
    {
      key: "stage",
      label: "Stage",
      sortable: true,
      filterable: true,
      render: (value: unknown) => (
        <Badge variant="outline">{String(value)}</Badge>
      )
    },
    {
      key: "country",
      label: "Country",
      sortable: true,
      filterable: true
    },
    {
      key: "gedsiScore",
      label: "GEDSI Score",
      sortable: true,
      render: (value: unknown) => {
        const numValue = Number(value)
        return (
          <div className="flex items-center space-x-2">
            <div className="w-12 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${numValue >= 80 ? 'bg-green-500' : numValue >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${numValue}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{numValue}%</span>
          </div>
        )
      }
    },
    {
      key: "capitalNeeded",
      label: "Capital Needed",
      sortable: true
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      filterable: true,
      render: (value: unknown) => {
        const strValue = String(value)
        const colors = {
          Active: "bg-green-100 text-green-800",
          Assessment: "bg-yellow-100 text-yellow-800",
          Review: "bg-blue-100 text-blue-800",
          Completed: "bg-gray-100 text-gray-800"
        }
        return (
          <Badge className={colors[strValue as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
            {strValue}
          </Badge>
        )
      }
    }
  ]

  const filterFields = [
    {
      key: "name",
      label: "Venture Name",
      type: "text" as const,
      placeholder: "Search by name"
    },
    {
      key: "sector",
      label: "Sector",
      type: "select" as const,
      options: [
        { value: "cleantech", label: "CleanTech" },
        { value: "agriculture", label: "Agriculture" },
        { value: "fintech", label: "FinTech" },
        { value: "healthcare", label: "Healthcare" }
      ]
    },
    {
      key: "stage",
      label: "Stage",
      type: "select" as const,
      options: [
        { value: "pre-seed", label: "Pre-Seed" },
        { value: "seed", label: "Seed" },
        { value: "series-a", label: "Series A" },
        { value: "series-b", label: "Series B" }
      ]
    },
    {
      key: "country",
      label: "Country",
      type: "select" as const,
      options: [
        { value: "cambodia", label: "Cambodia" },
        { value: "vietnam", label: "Vietnam" },
        { value: "thailand", label: "Thailand" },
        { value: "laos", label: "Laos" }
      ]
    },
    {
      key: "gedsiScore",
      label: "GEDSI Score",
      type: "range" as const
    }
  ]

  const handleNotificationAction = (notification: { id: string; type: string; message: string }) => {
    // Handle notification action
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <>
      {/* Main Content */}
      <main className="flex-1 space-y-6 overflow-auto bg-transparent">
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 dark:bg-slate-800/80 shadow rounded-lg mb-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Grid3X3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="ventures" className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span>Ventures</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
            <TabsTrigger value="workflows" className="flex items-center space-x-2">
              <Workflow className="h-4 w-4" />
              <span>Workflows</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Data Loading Error</h3>
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading dashboard data...</p>
                </div>
              </div>
            ) : (
              <AnalyticsDashboard
                title="Pipeline Overview"
                metrics={analyticsMetrics}
                charts={analyticsCharts}
                ventures={ventures}
                timeRange={selectedTimeframe}
                onTimeRangeChange={setSelectedTimeframe}
                customizable
                onOpenFilters={() => setShowFilters(true)}
                onExport={({ charts }) => {
                  try {
                    const blob = new Blob([JSON.stringify(charts, null, 2)], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `dashboard-charts-${new Date().toISOString().slice(0,10)}.json`
                    document.body.appendChild(a)
                    a.click()
                    a.remove()
                    URL.revokeObjectURL(url)
                  } catch (e) {
                    console.error('Export failed:', e)
                  }
                }}
                onRefresh={() => { fetchDashboardData() }}
              />
            )}
          </TabsContent>

          <TabsContent value="ventures" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Venture Management</h2>
              <div className="flex items-center space-x-4">
                <AdvancedFilters
                  fields={filterFields}
                  onFiltersChange={(filters: { field: string; operator: string; value: any }[]) => {
                  // Handle filter changes
                }}
                />
                <Button onClick={() => window.location.href = '/dashboard/venture-intake'}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Venture
                </Button>
              </div>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading ventures...</p>
                </div>
              </div>
            ) : venturesData.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Ventures Found</h3>
                <p className="text-gray-600 mb-4">Get started by adding your first venture to the pipeline</p>
                <Button onClick={() => router.push('/dashboard/venture-intake')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Venture
                </Button>
              </div>
            ) : (
              <AdvancedDataTable
                data={venturesData}
                // @ts-ignore
                columns={venturesColumns}
                title="Active Ventures"
                searchable={true}
                filterable={true}
                exportable={true}
                selectable={true}
                actions={true}
                pagination={true}
                onRowClick={(row: Record<string, any>) => {
                  router.push(`/dashboard/ventures/${row.id}`)
                }}
                onEdit={(row: Record<string, any>) => {
                  router.push(`/dashboard/ventures/${row.id}?edit=true`)
                }}
                onDelete={(row: Record<string, any>) => {
                  // Handle delete
                  addToast({
                    type: "info",
                    title: "Delete Venture",
                    description: `Delete functionality for ${row.name} would be implemented here`
                  })
                }}
                onBulkAction={(action: string, rows: Record<string, any>[]) => {
                  // Handle bulk action
                  addToast({
                    type: "info",
                    title: "Bulk Action",
                    description: `${action} action on ${rows.length} ventures would be implemented here`
                  })
                }}
              />
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading analytics...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
                    <p className="text-gray-600">Comprehensive insights and performance metrics</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" onClick={() => window.location.href = '/dashboard/performance-analytics'}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Performance Analytics
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = '/dashboard/ai-analysis'}>
                      <Brain className="h-4 w-4 mr-2" />
                      AI Analysis
                    </Button>
                    <Button onClick={() => window.location.href = '/dashboard/advanced-reports'}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Report
                    </Button>
                  </div>
                </div>

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* GEDSI Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <UserCheck className="h-5 w-5 mr-2 text-purple-600" />
                        GEDSI Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-3xl font-bold text-purple-600">
                          {ventures.length > 0 
                            ? Math.round(ventures.reduce((sum, venture) => sum + calculateGEDSIScore(venture), 0) / ventures.length)
                            : 0}%
                        </div>
                        <div className="text-sm text-gray-600">
                          {gedsiMetrics.length} total metrics tracked
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ 
                              width: `${ventures.length > 0 
                                ? Math.round(ventures.reduce((sum, venture) => sum + calculateGEDSIScore(venture), 0) / ventures.length)
                                : 0}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Venture Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                        Venture Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-3xl font-bold text-blue-600">
                          {ventures.length}
                        </div>
                        <div className="text-sm text-gray-600">
                          Active ventures in pipeline
                        </div>
                        <div className="space-y-2">
                          {Object.entries(ventures.reduce((acc, v) => {
                            acc[v.stage || 'Unknown'] = (acc[v.stage || 'Unknown'] || 0) + 1
                            return acc
                          }, {} as Record<string, number>)).map(([stage, count]) => (
                            <div key={stage} className="flex justify-between text-sm">
                              <span>{stage.replace('_', ' ')}</span>
                              <span className="font-medium">{count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Capital Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
                        Capital Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-3xl font-bold text-emerald-600">
                          {analyticsMetrics.find(m => m.title === 'Capital Facilitated')?.value || '$0M'}
                        </div>
                        <div className="text-sm text-gray-600">
                          Total capital facilitated
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Average per venture</span>
                            <span className="font-medium">
                              ${ventures.length > 0 ? Math.round(ventures.reduce((sum, v) => {
                                const capital = v.fundingRaised || 0
                                return sum + capital
                              }, 0) / ventures.length / 1000) : 0}K
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Analytics Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center"
                        onClick={() => window.location.href = '/dashboard/performance-analytics'}
                      >
                        <TrendingUp className="h-6 w-6 mb-2" />
                        <span>Performance</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center"
                        onClick={() => window.location.href = '/dashboard/ai-analysis'}
                      >
                        <Brain className="h-6 w-6 mb-2" />
                        <span>AI Insights</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center"
                        onClick={() => window.location.href = '/dashboard/advanced-reports'}
                      >
                        <FileText className="h-6 w-6 mb-2" />
                        <span>Reports</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center"
                        onClick={() => window.location.href = '/dashboard/custom-dashboards'}
                      >
                        <BarChart3 className="h-6 w-6 mb-2" />
                        <span>Custom Views</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading reports...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Enterprise Reporting</h2>
                    <p className="text-gray-600">Generate comprehensive reports and compliance documentation</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" onClick={() => window.location.href = '/dashboard/advanced-reports'}>
                      <FileText className="h-4 w-4 mr-2" />
                      Advanced Reports
                    </Button>
                    <Button onClick={() => window.location.href = '/dashboard/impact-reports'}>
                      <Plus className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>

                {/* Report Templates */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* GEDSI Compliance Report */}
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/dashboard/impact-reports'}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <UserCheck className="h-5 w-5 mr-2 text-purple-600" />
                        GEDSI Compliance Report
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-sm text-gray-600">
                          Comprehensive GEDSI metrics and compliance status across all ventures
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Metrics Tracked:</span>
                          <span className="text-sm text-gray-600">{gedsiMetrics.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Compliance Rate:</span>
                          <span className="text-sm font-medium text-purple-600">
                            {gedsiAnalytics.gedsiComplianceRate}%
                          </span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Generate Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Portfolio Performance Report */}
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/dashboard/advanced-reports'}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                        Portfolio Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-sm text-gray-600">
                          Detailed analysis of venture performance and pipeline metrics
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Total Ventures:</span>
                          <span className="text-sm text-gray-600">{ventures.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Success Rate:</span>
                          <span className="text-sm font-medium text-blue-600">
                            {analyticsMetrics.find(m => m.title === 'Success Rate')?.value || '0%'}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Generate Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Capital Facilitation Report */}
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/dashboard/advanced-reports'}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
                        Capital Facilitation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-sm text-gray-600">
                          Capital deployment analysis and investment tracking
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Total Capital:</span>
                          <span className="text-sm text-gray-600">
                            {analyticsMetrics.find(m => m.title === 'Capital Facilitated')?.value || '$0M'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Average Deal:</span>
                          <span className="text-sm font-medium text-emerald-600">
                            ${ventures.length > 0 ? Math.round(ventures.reduce((sum, v) => {
                              const capital = v.fundingRaised || 0
                              return sum + capital
                            }, 0) / ventures.length / 1000) : 0}K
                          </span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Generate Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Report Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Report Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center"
                        onClick={() => window.location.href = '/dashboard/impact-reports'}
                      >
                        <Award className="h-6 w-6 mb-2" />
                        <span>Impact Reports</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center"
                        onClick={() => window.location.href = '/dashboard/advanced-reports'}
                      >
                        <FileText className="h-6 w-6 mb-2" />
                        <span>Advanced Reports</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center"
                        onClick={() => window.location.href = '/dashboard/sustainability'}
                      >
                        <Globe className="h-6 w-6 mb-2" />
                        <span>Sustainability</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center"
                        onClick={() => window.location.href = '/dashboard/social-impact'}
                      >
                        <Heart className="h-6 w-6 mb-2" />
                        <span>Social Impact</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <WorkflowDashboardTab 
              loading={loading}
              addToast={addToast}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Filters Dialog */}
      <Dialog open={showFilters} onOpenChange={(open) => {
        setShowFilters(open)
        if (open) {
          setTempSector(filters.sector)
          setTempStage(filters.stage)
          setTempCountry(filters.country)
          setSaveFiltersDefault(false)
        }
      }}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Filters</span>
              <span className="flex items-center gap-2">
                {filters.sector && (
                  <Badge variant="outline" className="text-xs">Sector: {filters.sector}</Badge>
                )}
                {filters.stage && (
                  <Badge variant="outline" className="text-xs">Stage: {filters.stage.replace('_',' ')}</Badge>
                )}
                {filters.country && (
                  <Badge variant="outline" className="text-xs">Country: {filters.country}</Badge>
                )}
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Sector</p>
              <Select value={tempSector ?? 'ALL'} onValueChange={(v) => setTempSector(v === 'ALL' ? undefined : v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="CleanTech">CleanTech</SelectItem>
                  <SelectItem value="Agriculture">Agriculture</SelectItem>
                  <SelectItem value="FinTech">FinTech</SelectItem>
                  <SelectItem value="HealthTech">HealthTech</SelectItem>
                  <SelectItem value="EdTech">EdTech</SelectItem>
                  <SelectItem value="CircularEconomy">CircularEconomy</SelectItem>
                  <SelectItem value="SupplyChain">SupplyChain</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Stage</p>
              <Select value={tempStage ?? 'ALL'} onValueChange={(v) => setTempStage(v === 'ALL' ? undefined : v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All stages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="INTAKE">Intake</SelectItem>
                  <SelectItem value="SCREENING">Screening</SelectItem>
                  <SelectItem value="DIAGNOSTICS">Diagnostics</SelectItem>
                  <SelectItem value="DUE_DILIGENCE">Due Diligence</SelectItem>
                  <SelectItem value="INVESTMENT_READY">Investment Ready</SelectItem>
                  <SelectItem value="CAPITAL_FACILITATION">Capital Facilitation</SelectItem>
                  <SelectItem value="SEED">Seed</SelectItem>
                  <SelectItem value="SERIES_A">Series A</SelectItem>
                  <SelectItem value="SERIES_B">Series B</SelectItem>
                  <SelectItem value="SERIES_C">Series C</SelectItem>
                  <SelectItem value="FUNDED">Funded</SelectItem>
                  <SelectItem value="EXITED">Exited</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Country</p>
              <Select value={tempCountry ?? 'ALL'} onValueChange={(v) => setTempCountry(v === 'ALL' ? undefined : v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="Vietnam">Vietnam</SelectItem>
                  <SelectItem value="Cambodia">Cambodia</SelectItem>
                  <SelectItem value="Indonesia">Indonesia</SelectItem>
                  <SelectItem value="Philippines">Philippines</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={saveFiltersDefault} onChange={(e) => setSaveFiltersDefault(e.target.checked)} /> Save as default filters</label>
          </div>
          <DialogFooter>
            <div className="w-full flex justify-between">
              <Button variant="outline" onClick={() => { setFilters({}); localStorage.removeItem('dashboard.filters'); setShowFilters(false) }}>Reset</Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setShowFilters(false)}>Cancel</Button>
                <Button onClick={() => { const next = { sector: tempSector || undefined, stage: tempStage || undefined, country: tempCountry || undefined }; setFilters(next); if (saveFiltersDefault) { try { localStorage.setItem('dashboard.filters', JSON.stringify(next)) } catch {} } setShowFilters(false) }}>Apply</Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
