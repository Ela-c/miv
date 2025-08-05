"use client"

import React, { useState } from "react"
import { Sidebar } from "@/components/sidebar"
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
  TrendingFlat,
  UserCheck,
  Shield,
  Workflow,
  Moon,
  Sun
} from "lucide-react"

export default function EnterpriseDashboard() {
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

    console.log(`Exporting dashboard data as ${format}:`, data)

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
      color: "bg-blue-100",
      subtitle: "Active in pipeline"
    },
    {
      title: "Capital Facilitated",
      value: "$2.8M",
      change: 24.1,
      changeType: "increase" as const,
      icon: <DollarSign className="h-6 w-6 text-white" />,
      color: "bg-green-100",
      subtitle: "This quarter"
    },
    {
      title: "GEDSI Compliance",
      value: "89%",
      change: 3.2,
      changeType: "increase" as const,
      icon: <UserCheck className="h-6 w-6 text-white" />,
      color: "bg-purple-100",
      subtitle: "Average score"
    },
    {
      title: "Success Rate",
      value: "76%",
      change: -2.1,
      changeType: "decrease" as const,
      icon: <Target className="h-6 w-6 text-white" />,
      color: "bg-orange-100",
      subtitle: "Deal completion"
    }
  ]

  const analyticsCharts = [
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
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building2 className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium">{value}</p>
            <p className="text-xs text-gray-500">{row.sector}</p>
          </div>
        </div>
      )
    },
    {
      key: "stage",
      label: "Stage",
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
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
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <div className="w-12 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${value >= 80 ? 'bg-green-500' : value >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{value}%</span>
        </div>
      )
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
      render: (value: string) => {
        const colors = {
          Active: "bg-green-100 text-green-800",
          Assessment: "bg-yellow-100 text-yellow-800",
          Review: "bg-blue-100 text-blue-800",
          Completed: "bg-gray-100 text-gray-800"
        }
        return (
          <Badge className={colors[value as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
            {value}
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

  const handleNotificationAction = (notification: any) => {
    console.log("Notification action:", notification)
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
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Enterprise Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Enterprise Dashboard</h1>
              <Badge className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-700">
                <Activity className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Global Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 h-4 w-4" />
                <Input
                  placeholder="Search ventures, deals, or reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-96 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
              </div>
              
              {/* Time Range Selector */}
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Export Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport('csv')} className="cursor-pointer">
                    <FileText className="h-4 w-4 mr-2" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('excel')} className="cursor-pointer">
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    Export as Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('pdf')} className="cursor-pointer">
                    <FileText className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              
              {/* Notifications */}
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDelete={handleDeleteNotification}
                onAction={handleNotificationAction}
              />

              {/* Theme Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative transition-all duration-200 hover:scale-105"
                  >
                    {theme === "system" ? (
                      <Settings className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    ) : isDark ? (
                      <Moon className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Sun className="h-4 w-4 text-yellow-500" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings */}
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto bg-slate-50 dark:bg-slate-900">
          <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
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
                    onFiltersChange={(filters) => console.log("Filters:", filters)}
                  />
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Venture
                  </Button>
                </div>
              </div>
              
              <AdvancedDataTable
                data={venturesData}
                columns={venturesColumns}
                title="Active Ventures"
                searchable={true}
                filterable={true}
                exportable={true}
                selectable={true}
                actions={true}
                pagination={true}
                onRowClick={(row) => console.log("Row clicked:", row)}
                onEdit={(row) => console.log("Edit:", row)}
                onDelete={(row) => console.log("Delete:", row)}
                onBulkAction={(action, rows) => console.log("Bulk action:", action, rows)}
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
      </div>
    </div>
  )
}
