"use client"

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import {
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Filter,
  Download,
  Eye,
  Edit,
  Sparkles,
  Users,
  Building2,
  Globe,
  Activity,
  FileText,
  Calendar,
  Award,
  Zap
} from 'lucide-react'

interface GEDSIMetric {
  id: string
  ventureId: string
  ventureName: string
  metricCode: string
  metricName: string
  category: 'Gender' | 'Disability' | 'Social Inclusion' | 'Cross-cutting'
  targetValue: number
  currentValue: number
  unit: string
  status: 'Not Started' | 'In Progress' | 'Verified' | 'Overdue'
  verificationDate?: string
  notes?: string
  lastUpdated: string
}

interface Venture {
  id: string
  name: string
  sector: string
  location: string
  gedsiScore: number
  status: string
  founderTypes: string[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d']

export function GEDSITracker() {
  const [metrics, setMetrics] = useState<GEDSIMetric[]>([])
  const [ventures, setVentures] = useState<Venture[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVenture, setSelectedVenture] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [showAddMetric, setShowAddMetric] = useState(false)
  const [aiInsights, setAiInsights] = useState<any>(null)

  useEffect(() => {
    fetchGEDSIData()
  }, [])

  const fetchGEDSIData = async () => {
    try {
      setLoading(true)
      
      // Fetch ventures
      const venturesResponse = await fetch('/api/ventures')
      if (venturesResponse.ok) {
        const venturesData = await venturesResponse.json()
        setVentures(venturesData.ventures || [])
      }

      // Fetch GEDSI metrics
      const metricsResponse = await fetch('/api/gedsi-metrics')
      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json()
        setMetrics(metricsData)
      }

      // Fetch AI insights
      const insightsResponse = await fetch('/api/ai/gedsi-insights')
      if (insightsResponse.ok) {
        const insightsData = await insightsResponse.json()
        setAiInsights(insightsData)
      }

    } catch (error) {
      console.error('Error fetching GEDSI data:', error)
      // Fallback to mock data
      setMetrics(mockMetrics)
      setVentures(mockVentures)
      setAiInsights(mockAiInsights)
    } finally {
      setLoading(false)
    }
  }

  const filteredMetrics = useMemo(() => {
    return metrics.filter(metric => {
      const ventureMatch = selectedVenture === 'all' || metric.ventureId === selectedVenture
      const categoryMatch = selectedCategory === 'all' || metric.category === selectedCategory
      const statusMatch = selectedStatus === 'all' || metric.status === selectedStatus
      return ventureMatch && categoryMatch && statusMatch
    })
  }, [metrics, selectedVenture, selectedCategory, selectedStatus])

  const overviewStats = useMemo(() => {
    const total = metrics.length
    const verified = metrics.filter(m => m.status === 'Verified').length
    const inProgress = metrics.filter(m => m.status === 'In Progress').length
    const overdue = metrics.filter(m => m.status === 'Overdue').length
    const completionRate = total > 0 ? (verified / total) * 100 : 0

    return {
      total,
      verified,
      inProgress,
      overdue,
      completionRate
    }
  }, [metrics])

  const categoryStats = useMemo(() => {
    const categories = ['Gender', 'Disability', 'Social Inclusion', 'Cross-cutting']
    return categories.map(category => {
      const categoryMetrics = metrics.filter(m => m.category === category)
      const verified = categoryMetrics.filter(m => m.status === 'Verified').length
      const total = categoryMetrics.length
      return {
        category,
        total,
        verified,
        completionRate: total > 0 ? (verified / total) * 100 : 0
      }
    })
  }, [metrics])

  const venturePerformance = useMemo(() => {
    if (!Array.isArray(ventures)) {
      return []
    }
    return ventures.map(venture => {
      const ventureMetrics = metrics.filter(m => m.ventureId === venture.id)
      const verified = ventureMetrics.filter(m => m.status === 'Verified').length
      const total = ventureMetrics.length
      return {
        ventureId: venture.id,
        ventureName: venture.name,
        totalMetrics: total,
        verifiedMetrics: verified,
        completionRate: total > 0 ? (verified / total) * 100 : 0
      }
    }).sort((a, b) => b.completionRate - a.completionRate)
  }, [ventures, metrics])

  const handleAddMetric = async (metricData: Partial<GEDSIMetric>) => {
    try {
      const response = await fetch('/api/gedsi-metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metricData),
      })

      if (response.ok) {
        const newMetric = await response.json()
        setMetrics(prev => [...prev, newMetric])
        setShowAddMetric(false)
      }
    } catch (error) {
      console.error('Error adding metric:', error)
    }
  }

  const handleUpdateMetric = async (metricId: string, updates: Partial<GEDSIMetric>) => {
    try {
      const response = await fetch(`/api/gedsi-metrics/${metricId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        const updatedMetric = await response.json()
        setMetrics(prev => prev.map(m => m.id === metricId ? updatedMetric : m))
      }
    } catch (error) {
      console.error('Error updating metric:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800 border-green-200'
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Overdue': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Verified': return <CheckCircle className="h-4 w-4" />
      case 'In Progress': return <Clock className="h-4 w-4" />
      case 'Overdue': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">GEDSI Integration</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Track Gender Equality, Disability, and Social Inclusion metrics across all ventures
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={showAddMetric} onOpenChange={setShowAddMetric}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Metric
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add GEDSI Metric</DialogTitle>
                <DialogDescription>
                  Add a new GEDSI metric for tracking venture impact
                </DialogDescription>
              </DialogHeader>
              <AddMetricForm onSubmit={handleAddMetric} ventures={ventures} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* GEDSI Overview */}
      <Card>
        <CardHeader>
          <CardTitle>GEDSI Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">85%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Gender</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">72%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Disability</div>
            </div>
            <div className="text-center p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
              <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">91%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Social</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">78%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Cross-cutting</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">83%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      {aiInsights && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-blue-900 dark:text-blue-100">AI Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white dark:bg-blue-900 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">Trend Analysis</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">{aiInsights.trendAnalysis}</p>
              </div>
              <div className="p-3 bg-white dark:bg-blue-900 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">Recommendations</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">{aiInsights.recommendations}</p>
              </div>
              <div className="p-3 bg-white dark:bg-blue-900 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">Risk Alerts</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">{aiInsights.riskAlerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Venture</Label>
              <Select value={selectedVenture} onValueChange={setSelectedVenture}>
                <SelectTrigger>
                  <SelectValue placeholder="All ventures" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ventures</SelectItem>
                  {ventures.map(venture => (
                    <SelectItem key={venture.id} value={venture.id}>
                      {venture.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="Gender">Gender</SelectItem>
                  <SelectItem value="Disability">Disability</SelectItem>
                  <SelectItem value="Social Inclusion">Social Inclusion</SelectItem>
                  <SelectItem value="Cross-cutting">Cross-cutting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Verified">Verified</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="metrics">Metrics Overview</TabsTrigger>
          <TabsTrigger value="ventures">Venture Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          {/* Metrics by Venture */}
          <Card>
            <CardHeader>
              <CardTitle>Metrics by Venture</CardTitle>
              <CardDescription>
                Detailed view of all GEDSI metrics and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Venture Name</TableHead>
                    <TableHead>Metric Code</TableHead>
                    <TableHead>Target Value</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMetrics.map((metric) => (
                    <TableRow key={metric.id}>
                      <TableCell className="font-medium">{metric.ventureName}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{metric.metricCode}</div>
                          <div className="text-sm text-slate-500">{metric.metricName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {metric.targetValue} {metric.unit}
                      </TableCell>
                      <TableCell>
                        {metric.currentValue} {metric.unit}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(metric.status)}>
                          {getStatusIcon(metric.status)}
                          <span className="ml-1">{metric.status}</span>
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ventures" className="space-y-6">
          {/* Venture Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Venture Performance</CardTitle>
              <CardDescription>
                GEDSI metric completion rates by venture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {venturePerformance.map((venture) => (
                  <div key={venture.ventureId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{venture.ventureName}</h4>
                      <p className="text-sm text-gray-500">
                        {venture.verifiedMetrics} of {venture.totalMetrics} metrics verified
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Progress value={venture.completionRate} className="w-24" />
                      <span className="text-sm font-medium">
                        {venture.completionRate.toFixed(1)}%
                      </span>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Progress Charts */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Charts</CardTitle>
              <CardDescription>
                Visual representation of GEDSI progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Performance */}
                <div>
                  <h4 className="font-semibold mb-4">Category Performance</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completionRate" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Status Distribution */}
                <div>
                  <h4 className="font-semibold mb-4">Status Distribution</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Verified', value: overviewStats.verified },
                          { name: 'In Progress', value: overviewStats.inProgress },
                          { name: 'Overdue', value: overviewStats.overdue },
                          { name: 'Not Started', value: overviewStats.total - overviewStats.verified - overviewStats.inProgress - overviewStats.overdue }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Add Metric Form Component
function AddMetricForm({ onSubmit, ventures }: { onSubmit: (data: any) => void, ventures: Venture[] }) {
  const [formData, setFormData] = useState({
    ventureId: '',
    metricCode: '',
    metricName: '',
    category: '',
    targetValue: '',
    unit: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      targetValue: parseFloat(formData.targetValue),
      currentValue: 0,
      status: 'Not Started'
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Venture</Label>
        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, ventureId: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select venture" />
          </SelectTrigger>
          <SelectContent>
            {ventures.map(venture => (
              <SelectItem key={venture.id} value={venture.id}>
                {venture.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Metric Code</Label>
          <Input
            value={formData.metricCode}
            onChange={(e) => setFormData(prev => ({ ...prev, metricCode: e.target.value }))}
            placeholder="e.g., OI.1"
          />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Gender">Gender</SelectItem>
              <SelectItem value="Disability">Disability</SelectItem>
              <SelectItem value="Social Inclusion">Social Inclusion</SelectItem>
              <SelectItem value="Cross-cutting">Cross-cutting</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Metric Name</Label>
        <Input
          value={formData.metricName}
          onChange={(e) => setFormData(prev => ({ ...prev, metricName: e.target.value }))}
          placeholder="e.g., Number of women-led ventures supported"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Target Value</Label>
          <Input
            type="number"
            value={formData.targetValue}
            onChange={(e) => setFormData(prev => ({ ...prev, targetValue: e.target.value }))}
            placeholder="100"
          />
        </div>

        <div className="space-y-2">
          <Label>Unit</Label>
          <Input
            value={formData.unit}
            onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
            placeholder="e.g., ventures, people, %"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Input
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Additional notes or context"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">Add Metric</Button>
      </div>
    </form>
  )
}

// Mock data for development
const mockMetrics: GEDSIMetric[] = [
  {
    id: '1',
    ventureId: '1',
    ventureName: 'GreenTech Solutions',
    metricCode: 'OI.1',
    metricName: 'Number of women-led ventures supported',
    category: 'Gender',
    targetValue: 100,
    currentValue: 75,
    unit: 'ventures',
    status: 'In Progress',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    ventureId: '1',
    ventureName: 'GreenTech Solutions',
    metricCode: 'OI.2',
    metricName: 'Ventures with disability inclusion',
    category: 'Disability',
    targetValue: 50,
    currentValue: 30,
    unit: 'ventures',
    status: 'In Progress',
    lastUpdated: '2024-01-15'
  },
  {
    id: '3',
    ventureId: '2',
    ventureName: 'EcoFarm Vietnam',
    metricCode: 'OI.3',
    metricName: 'Rural communities served',
    category: 'Social Inclusion',
    targetValue: 200,
    currentValue: 150,
    unit: 'communities',
    status: 'Verified',
    verificationDate: '2024-01-10',
    lastUpdated: '2024-01-10'
  }
]

const mockVentures: Venture[] = [
  {
    id: '1',
    name: 'GreenTech Solutions',
    sector: 'CleanTech',
    location: 'Vietnam',
    gedsiScore: 85,
    status: 'Active',
    founderTypes: ['women-led', 'rural-focus']
  },
  {
    id: '2',
    name: 'EcoFarm Vietnam',
    sector: 'Agriculture',
    location: 'Vietnam',
    gedsiScore: 92,
    status: 'Active',
    founderTypes: ['women-led', 'disability-inclusive']
  }
]

const mockAiInsights = {
  trendAnalysis: 'GEDSI metrics show 15% improvement in gender inclusion over the last quarter',
  recommendations: 'Focus on disability inclusion metrics and rural community engagement',
  riskAlerts: '3 metrics are overdue and require immediate attention'
} 