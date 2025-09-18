"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { DatePicker } from "@/components/ui/date-picker" // TODO: Implement date picker
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator" // TODO: Create separator component if needed
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts"
import {
  FileText,
  Download,
  Share2,
  Filter,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Globe,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  AreaChart as AreaChartIcon,
  Settings,
  Eye,
  Plus,
  Trash2,
  Edit,
  Save,
  RefreshCw,
  Search,
  ChevronDown,
  ChevronUp
} from "lucide-react"

interface Report {
  id: string
  name: string
  type: string
  description: string
  lastGenerated: string
  status: 'draft' | 'published' | 'archived'
  metrics: string[]
  filters: Record<string, any>
  schedule?: string
}

interface Dashboard {
  id: string
  name: string
  description: string
  widgets: Widget[]
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

interface Widget {
  id: string
  type: 'chart' | 'metric' | 'table' | 'list'
  title: string
  data: any
  position: { x: number; y: number; w: number; h: number }
  config: Record<string, any>
}

const reportTypes = [
  { value: 'venture-performance', label: 'Venture Performance', icon: TrendingUp },
  { value: 'gedsi-impact', label: 'GEDSI Impact', icon: Users },
  { value: 'financial-analytics', label: 'Financial Analytics', icon: DollarSign },
  { value: 'geographic-distribution', label: 'Geographic Distribution', icon: Globe },
  { value: 'sector-analysis', label: 'Sector Analysis', icon: BarChart3 },
  { value: 'custom', label: 'Custom Report', icon: FileText }
]

const chartTypes = [
  { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
  { value: 'line', label: 'Line Chart', icon: LineChartIcon },
  { value: 'pie', label: 'Pie Chart', icon: PieChartIcon },
  { value: 'area', label: 'Area Chart', icon: AreaChartIcon }
]

const sampleData = {
  venturePerformance: [
    { month: 'Jan', ventures: 45, funding: 1200000, success: 78 },
    { month: 'Feb', ventures: 52, funding: 1500000, success: 82 },
    { month: 'Mar', ventures: 48, funding: 1350000, success: 75 },
    { month: 'Apr', ventures: 61, funding: 1800000, success: 85 },
    { month: 'May', ventures: 55, funding: 1650000, success: 80 },
    { month: 'Jun', ventures: 67, funding: 2100000, success: 88 }
  ],
  gedsiMetrics: [
    { category: 'Gender', target: 50, current: 45, percentage: 90 },
    { category: 'Equity', target: 40, current: 38, percentage: 95 },
    { category: 'Disability', target: 15, current: 12, percentage: 80 },
    { category: 'Social Inclusion', target: 60, current: 52, percentage: 87 }
  ],
  sectorDistribution: [
    { name: 'Clean Energy', value: 25, color: '#10B981' },
    { name: 'Agriculture', value: 20, color: '#F59E0B' },
    { name: 'Healthcare', value: 18, color: '#3B82F6' },
    { name: 'Financial Services', value: 15, color: '#8B5CF6' },
    { name: 'Education', value: 12, color: '#EF4444' },
    { name: 'Other', value: 10, color: '#6B7280' }
  ]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

export default function AdvancedReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [dashboards, setDashboards] = useState<Dashboard[]>([])
  const [selectedReportType, setSelectedReportType] = useState('')
  const [selectedChartType, setSelectedChartType] = useState('')
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(null)
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('reports')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // Simulate API call
    setTimeout(() => {
      const mockReports: Report[] = [
        {
          id: '1',
          name: 'Q1 Venture Performance Report',
          type: 'venture-performance',
          description: 'Comprehensive analysis of venture performance in Q1 2024',
          lastGenerated: '2024-01-15T10:30:00Z',
          status: 'published',
          metrics: ['Total Ventures', 'Funding Amount', 'Success Rate', 'GEDSI Compliance'],
          filters: { dateRange: 'Q1 2024', sector: 'all', stage: 'all' }
        },
        {
          id: '2',
          name: 'GEDSI Impact Assessment',
          type: 'gedsi-impact',
          description: 'Detailed GEDSI metrics and impact measurement',
          lastGenerated: '2024-01-10T14:20:00Z',
          status: 'published',
          metrics: ['Gender Distribution', 'Equity Metrics', 'Disability Inclusion', 'Social Impact'],
          filters: { dateRange: '2024', region: 'all' }
        },
        {
          id: '3',
          name: 'Financial Analytics Dashboard',
          type: 'financial-analytics',
          description: 'Financial performance and investment analytics',
          lastGenerated: '2024-01-12T09:15:00Z',
          status: 'draft',
          metrics: ['ROI', 'Investment Distribution', 'Revenue Growth', 'Cost Analysis'],
          filters: { dateRange: '2024', investmentType: 'all' }
        }
      ]

      const mockDashboards: Dashboard[] = [
        {
          id: '1',
          name: 'Executive Dashboard',
          description: 'High-level overview for executive decision making',
          isDefault: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
          widgets: [
            {
              id: '1',
              type: 'chart',
              title: 'Venture Performance Trend',
              data: sampleData.venturePerformance,
              position: { x: 0, y: 0, w: 6, h: 4 },
              config: { type: 'line', metrics: ['ventures', 'funding'] }
            },
            {
              id: '2',
              type: 'metric',
              title: 'Total Ventures',
              data: { value: 247, change: '+12%', trend: 'up' },
              position: { x: 6, y: 0, w: 3, h: 2 },
              config: { format: 'number' }
            }
          ]
        }
      ]

      setReports(mockReports)
      setDashboards(mockDashboards)
      setLoading(false)
    }, 1000)
  }

  const generateReport = async () => {
    if (!selectedReportType) return

    // Simulate report generation
    const newReport: Report = {
      id: Date.now().toString(),
      name: `${reportTypes.find(t => t.value === selectedReportType)?.label} Report`,
      type: selectedReportType,
      description: `Generated ${selectedReportType} report`,
      lastGenerated: new Date().toISOString(),
      status: 'draft',
      metrics: selectedMetrics,
      filters: {
        dateRange: dateRange,
        metrics: selectedMetrics,
        chartType: selectedChartType
      }
    }

    setReports(prev => [newReport, ...prev])
    setSelectedReportType('')
    setSelectedChartType('')
    setDateRange(null)
    setSelectedMetrics([])
  }

  const exportReport = (reportId: string, format: 'pdf' | 'excel' | 'csv') => {
    console.log(`Exporting report ${reportId} as ${format}`)
    // Simulate export
  }

  const renderChart = (data: any[], type: string, config: any) => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ventures" fill="#8884d8" />
              <Bar dataKey="funding" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ventures" stroke="#8884d8" />
              <Line type="monotone" dataKey="funding" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        )
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="ventures" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="funding" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        )
      default:
        return <div>Chart type not supported</div>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading reports...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Reports</h1>
          <p className="text-muted-foreground">
            Generate comprehensive reports and analytics for data-driven decision making
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Quick Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Quick Report Generator</span>
          </CardTitle>
          <CardDescription>
            Create a new report with custom parameters and visualizations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <type.icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Chart Type</label>
              <Select value={selectedChartType} onValueChange={setSelectedChartType}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose chart type" />
                </SelectTrigger>
                <SelectContent>
                  {chartTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <type.icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <div className="flex items-center space-x-2">
                <Input placeholder="From" type="date" />
                <Input placeholder="To" type="date" />
              </div>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={generateReport} 
                disabled={!selectedReportType}
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Reports List */}
          <div className="grid gap-4">
            {reports.map(report => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5" />
                        <span>{report.name}</span>
                        <Badge variant={report.status === 'published' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {report.description} • Last generated {formatDate(report.lastGenerated)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportReport(report.id, 'pdf')}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Metrics Included</h4>
                      <div className="flex flex-wrap gap-2">
                        {report.metrics.map(metric => (
                          <Badge key={metric} variant="outline">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Filters Applied</h4>
                      <div className="text-sm text-muted-foreground">
                        {Object.entries(report.filters).map(([key, value]) => (
                          <div key={key}>
                            <strong>{key}:</strong> {JSON.stringify(value)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dashboards" className="space-y-6">
          {/* Dashboards */}
          <div className="grid gap-6">
            {dashboards.map(dashboard => (
              <Card key={dashboard.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5" />
                        <span>{dashboard.name}</span>
                        {dashboard.isDefault && (
                          <Badge variant="default">Default</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {dashboard.description} • Updated {formatDate(dashboard.updatedAt)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {dashboard.widgets.map(widget => (
                      <Card key={widget.id} className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold">{widget.title}</h4>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                        {widget.type === 'chart' && (
                          <div className="h-64">
                            {renderChart(widget.data, widget.config.type, widget.config)}
                          </div>
                        )}
                        {widget.type === 'metric' && (
                          <div className="text-center">
                            <div className="text-3xl font-bold">{widget.data.value}</div>
                            <div className="text-sm text-muted-foreground">
                              {widget.data.change} from last period
                            </div>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>Total Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{reports.length}</div>
                <p className="text-sm text-muted-foreground">Generated this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  <span>Active Dashboards</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dashboards.length}</div>
                <p className="text-sm text-muted-foreground">Custom dashboards</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <span>Report Views</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,247</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5 text-orange-500" />
                  <span>Exports</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">89</div>
                <p className="text-sm text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>

          {/* Sample Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Venture Performance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                {renderChart(sampleData.venturePerformance, 'line', {})}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sector Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {renderChart(sampleData.sectorDistribution, 'pie', {})}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 