"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { AnalyticsDashboard } from "@/components/enterprise/analytics-dashboard"
import { AdvancedDataTable } from "@/components/enterprise/advanced-data-table"
import { AdvancedFilters } from "@/components/enterprise/advanced-filters"
import { NotificationCenter, sampleNotifications } from "@/components/enterprise/notification-center"
import { useTheme } from "@/components/theme-provider"
import { useToast } from "@/components/ui/toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  Sun
} from "lucide-react"

export default function EnterpriseDashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")
  const [activeView, setActiveView] = useState("overview")
  const [notifications, setNotifications] = useState(sampleNotifications)
  const { theme, setTheme, isDark } = useTheme()
  const { addToast } = useToast()

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

  // Sample data for analytics dashboard
  const analyticsMetrics = [
    {
      title: "Total Ventures",
      value: "247",
      change: 12.5,
      changeType: "increase" as const,
      icon: <Building2 className="h-6 w-6 text-white" />,
      color: "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg",
      subtitle: "Active in pipeline"
    },
    {
      title: "Capital Facilitated",
      value: "$2.8M",
      change: 24.1,
      changeType: "increase" as const,
      icon: <DollarSign className="h-6 w-6 text-white" />,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg",
      subtitle: "This quarter"
    },
    {
      title: "GEDSI Compliance",
      value: "89%",
      change: 3.2,
      changeType: "increase" as const,
      icon: <UserCheck className="h-6 w-6 text-white" />,
      color: "bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg",
      subtitle: "Average score"
    },
    {
      title: "Success Rate",
      value: "76%",
      change: -2.1,
      changeType: "decrease" as const,
      icon: <Target className="h-6 w-6 text-white" />,
      color: "bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg",
      subtitle: "Deal completion"
    }
  ]

  const analyticsCharts = [
    {
      id: "pipeline-flow",
      title: "Pipeline Flow Analysis",
      type: "bar" as const,
      data: [
        { stage: "Intake", ventures: 40 },
        { stage: "Screening", ventures: 32 },
        { stage: "Due Diligence", ventures: 18 },
        { stage: "Negotiation", ventures: 10 },
        { stage: "Closed", ventures: 6 }
      ],
      span: 2
    },
    {
      id: "regional-distribution",
      title: "Regional Distribution",
      type: "pie" as const,
      data: [
        { region: "Vietnam", value: 45 },
        { region: "Cambodia", value: 25 },
        { region: "Thailand", value: 18 },
        { region: "Laos", value: 12 }
      ]
    },
    {
      id: "performance-trends",
      title: "Performance Trends",
      type: "line" as const,
      data: [
        { month: "Jan", score: 70 },
        { month: "Feb", score: 74 },
        { month: "Mar", score: 78 },
        { month: "Apr", score: 81 },
        { month: "May", score: 79 },
        { month: "Jun", score: 85 }
      ],
      span: 2
    },
    {
      id: "gedsi-metrics",
      title: "GEDSI Metrics",
      type: "area" as const,
      data: [
        { week: "W1", compliance: 80 },
        { week: "W2", compliance: 82 },
        { week: "W3", compliance: 85 },
        { week: "W4", compliance: 89 }
      ]
    }
  ]

  // Sample data for ventures table
  const venturesData = [
    {
      id: "1",
      name: "GreenTech Solutions",
      sector: "CleanTech",
      stage: "Series A",
      country: "Vietnam",
      gedsiScore: 92,
      capitalNeeded: "$500K",
      status: "Active",
      lastUpdate: "2024-01-15"
    },
    {
      id: "2",
      name: "EcoFarm Vietnam",
      sector: "Agriculture",
      stage: "Seed",
      country: "Vietnam",
      gedsiScore: 88,
      capitalNeeded: "$250K",
      status: "Assessment",
      lastUpdate: "2024-01-14"
    },
    {
      id: "3",
      name: "TechStart Inc",
      sector: "FinTech",
      stage: "Pre-Seed",
      country: "Cambodia",
      gedsiScore: 76,
      capitalNeeded: "$100K",
      status: "Review",
      lastUpdate: "2024-01-13"
    }
  ]

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
            <AnalyticsDashboard
              title="Pipeline Overview"
              metrics={analyticsMetrics}
              charts={analyticsCharts}
              timeRange={selectedTimeframe}
              onTimeRangeChange={setSelectedTimeframe}
            />
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
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Venture
                </Button>
              </div>
            </div>
            
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
                // Handle edit
              }}
              onDelete={(row: Record<string, any>) => {
                // Handle delete
              }}
              onBulkAction={(action: string, rows: Record<string, any>[]) => {
                // Handle bulk action
              }}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">Comprehensive analytics and business intelligence tools</p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create Custom Report
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Reporting</h3>
              <p className="text-gray-600">Generate comprehensive reports and compliance documentation</p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <div className="text-center py-12">
              <Workflow className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Automated Workflows</h3>
              <p className="text-gray-600">Configure automated processes and business rules</p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}
