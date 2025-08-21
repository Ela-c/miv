"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Globe, 
  Plus, 
  Eye, 
  Edit, 
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Leaf,
  Zap,
  Droplets,
  Recycle,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Filter,
  Search,
  Download,
  Share2,
  Star,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Thermometer,
  Wind,
  Sun,
  Users
} from "lucide-react"

interface SustainabilityMetric {
  id: string
  company: string
  metric: string
  category: string
  value: number
  unit: string
  target: number
  period: string
  status: "on_track" | "behind" | "ahead" | "critical"
  trend: "up" | "down" | "stable"
  lastUpdate: string
  verified: boolean
}

interface CarbonFootprint {
  id: string
  company: string
  scope: "scope1" | "scope2" | "scope3"
  emissions: number
  unit: string
  year: string
  reduction: number
  target: number
  status: "on_track" | "behind" | "ahead"
  lastUpdate: string
}

const mockSustainabilityMetrics: SustainabilityMetric[] = [
  {
    id: "SUST-001",
    company: "TechFlow Solutions",
    metric: "Energy Efficiency",
    category: "Energy",
    value: 85,
    unit: "%",
    target: 90,
    period: "2024",
    status: "behind",
    trend: "up",
    lastUpdate: "2 hours ago",
    verified: true
  },
  {
    id: "SUST-002",
    company: "GreenEnergy Innovations",
    metric: "Renewable Energy Usage",
    category: "Energy",
    value: 95,
    unit: "%",
    target: 100,
    period: "2024",
    status: "ahead",
    trend: "up",
    lastUpdate: "1 day ago",
    verified: true
  },
  {
    id: "SUST-003",
    company: "HealthTech Pro",
    metric: "Water Conservation",
    category: "Water",
    value: 60,
    unit: "% reduction",
    target: 50,
    period: "2024",
    status: "ahead",
    trend: "up",
    lastUpdate: "3 days ago",
    verified: false
  },
  {
    id: "SUST-004",
    company: "FinTech Revolution",
    metric: "Waste Reduction",
    category: "Waste",
    value: 75,
    unit: "%",
    target: 80,
    period: "2024",
    status: "behind",
    trend: "stable",
    lastUpdate: "1 week ago",
    verified: true
  },
  {
    id: "SUST-005",
    company: "EduTech Platform",
    metric: "Carbon Neutrality",
    category: "Carbon",
    value: 100,
    unit: "%",
    target: 100,
    period: "2024",
    status: "on_track",
    trend: "stable",
    lastUpdate: "2 weeks ago",
    verified: true
  }
]

const mockCarbonFootprint: CarbonFootprint[] = [
  {
    id: "CARBON-001",
    company: "TechFlow Solutions",
    scope: "scope1",
    emissions: 150,
    unit: "tCO2e",
    year: "2024",
    reduction: 25,
    target: 30,
    status: "behind",
    lastUpdate: "2 hours ago"
  },
  {
    id: "CARBON-002",
    company: "GreenEnergy Innovations",
    scope: "scope2",
    emissions: 50,
    unit: "tCO2e",
    year: "2024",
    reduction: 40,
    target: 35,
    status: "ahead",
    lastUpdate: "1 day ago"
  },
  {
    id: "CARBON-003",
    company: "HealthTech Pro",
    scope: "scope3",
    emissions: 300,
    unit: "tCO2e",
    year: "2024",
    reduction: 15,
    target: 20,
    status: "behind",
    lastUpdate: "3 days ago"
  },
  {
    id: "CARBON-004",
    company: "FinTech Revolution",
    scope: "scope1",
    emissions: 200,
    unit: "tCO2e",
    year: "2024",
    reduction: 30,
    target: 25,
    status: "ahead",
    lastUpdate: "1 week ago"
  },
  {
    id: "CARBON-005",
    company: "EduTech Platform",
    scope: "scope2",
    emissions: 0,
    unit: "tCO2e",
    year: "2024",
    reduction: 100,
    target: 100,
    status: "on_track",
    lastUpdate: "2 weeks ago"
  }
]

const categories = [
  "Energy",
  "Water", 
  "Waste",
  "Carbon",
  "Biodiversity",
  "Social"
]

const scopes = ["scope1", "scope2", "scope3"]

export default function SustainabilityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedScope, setSelectedScope] = useState("all")

  const filteredMetrics = mockSustainabilityMetrics.filter(metric => {
    const matchesSearch = metric.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         metric.metric.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || metric.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || metric.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const filteredCarbon = mockCarbonFootprint.filter(carbon => {
    const matchesSearch = carbon.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesScope = selectedScope === "all" || carbon.scope === selectedScope
    const matchesStatus = selectedStatus === "all" || carbon.status === selectedStatus
    
    return matchesSearch && matchesScope && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on_track": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "ahead": return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "behind": return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical": return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on_track": return <Badge variant="default" className="bg-green-100 text-green-800">On Track</Badge>
      case "ahead": return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Ahead</Badge>
      case "behind": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Behind</Badge>
      case "critical": return <Badge variant="destructive">Critical</Badge>
      default: return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case "down": return <ArrowDownRight className="h-4 w-4 text-red-500" />
      case "stable": return <Activity className="h-4 w-4 text-blue-500" />
      default: return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Energy": return <Zap className="h-4 w-4" />
      case "Water": return <Droplets className="h-4 w-4" />
      case "Waste": return <Recycle className="h-4 w-4" />
      case "Carbon": return <Thermometer className="h-4 w-4" />
      case "Biodiversity": return <Leaf className="h-4 w-4" />
      case "Social": return <Users className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
    }
  }

  // Calculate metrics
  const totalMetrics = mockSustainabilityMetrics.length
  const onTrackMetrics = mockSustainabilityMetrics.filter(m => m.status === "on_track").length
  const aheadMetrics = mockSustainabilityMetrics.filter(m => m.status === "ahead").length
  const verifiedMetrics = mockSustainabilityMetrics.filter(m => m.verified).length
  const averageProgress = mockSustainabilityMetrics.reduce((sum, metric) => {
    return sum + (metric.value / metric.target) * 100
  }, 0) / totalMetrics

  const totalEmissions = mockCarbonFootprint.reduce((sum, carbon) => sum + carbon.emissions, 0)
  const totalReduction = mockCarbonFootprint.reduce((sum, carbon) => sum + carbon.reduction, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sustainability Metrics</h1>
          <p className="text-muted-foreground">
            Track environmental impact and sustainability performance
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Metric
        </Button>
      </div>

      {/* Sustainability Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Metrics</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics}</div>
            <p className="text-xs text-muted-foreground">
              {verifiedMetrics} verified, {totalMetrics - verifiedMetrics} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Track</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onTrackMetrics + aheadMetrics}</div>
            <p className="text-xs text-muted-foreground">
              {(((onTrackMetrics + aheadMetrics) / totalMetrics) * 100).toFixed(1)}% of metrics
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageProgress.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              Towards sustainability targets
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emissions</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmissions.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">
              tCO2e across portfolio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sustainability Distribution */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Category Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => {
                const count = mockSustainabilityMetrics.filter(m => m.category === category).length
                const percentage = ((count / totalMetrics) * 100).toFixed(1)
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category)}
                      <span className="text-sm">{category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{count}</span>
                      <span className="text-xs text-muted-foreground">({percentage}%)</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["on_track", "ahead", "behind", "critical"].map((status) => {
                const count = mockSustainabilityMetrics.filter(m => m.status === status).length
                const percentage = ((count / totalMetrics) * 100).toFixed(1)
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status)}
                      <span className="text-sm capitalize">{status.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{count}</span>
                      <span className="text-xs text-muted-foreground">({percentage}%)</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Carbon Reduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Reduction</span>
                <div className="text-right">
                  <div className="font-medium">{totalReduction.toFixed(0)} tCO2e</div>
                  <div className="text-xs text-muted-foreground">
                    {((totalReduction / totalEmissions) * 100).toFixed(1)}% of total
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Scope 1</span>
                <div className="text-right">
                  <div className="font-medium">
                    {mockCarbonFootprint.filter(c => c.scope === "scope1").reduce((sum, c) => sum + c.reduction, 0).toFixed(0)} tCO2e
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Scope 2</span>
                <div className="text-right">
                  <div className="font-medium">
                    {mockCarbonFootprint.filter(c => c.scope === "scope2").reduce((sum, c) => sum + c.reduction, 0).toFixed(0)} tCO2e
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Scope 3</span>
                <div className="text-right">
                  <div className="font-medium">
                    {mockCarbonFootprint.filter(c => c.scope === "scope3").reduce((sum, c) => sum + c.reduction, 0).toFixed(0)} tCO2e
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Sustainability Metrics</TabsTrigger>
          <TabsTrigger value="carbon">Carbon Footprint</TabsTrigger>
          <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search metrics..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="on_track">On Track</SelectItem>
                      <SelectItem value="ahead">Ahead</SelectItem>
                      <SelectItem value="behind">Behind</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sustainability Metrics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Metrics ({filteredMetrics.length})</CardTitle>
              <CardDescription>
                Track sustainability performance across portfolio companies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Metric</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMetrics.map((metric) => {
                    const progress = (metric.value / metric.target) * 100
                    
                    return (
                      <TableRow key={metric.id}>
                        <TableCell>
                          <div className="font-medium">{metric.company}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{metric.metric}</div>
                          <div className="text-sm text-muted-foreground">{metric.period}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(metric.category)}
                            <Badge variant="outline">{metric.category}</Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {metric.value} {metric.unit}
                        </TableCell>
                        <TableCell className="font-medium">
                          {metric.target} {metric.unit}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={progress} className="w-16 h-2" />
                            <span className="text-sm">{progress.toFixed(0)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getTrendIcon(metric.trend)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(metric.status)}
                            {getStatusBadge(metric.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {metric.verified ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-yellow-500" />
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="carbon" className="space-y-4">
          {/* Carbon Footprint Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Carbon Footprint Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search companies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Scope</label>
                  <Select value={selectedScope} onValueChange={setSelectedScope}>
                    <SelectTrigger>
                      <SelectValue placeholder="All scopes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All scopes</SelectItem>
                      <SelectItem value="scope1">Scope 1</SelectItem>
                      <SelectItem value="scope2">Scope 2</SelectItem>
                      <SelectItem value="scope3">Scope 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="on_track">On Track</SelectItem>
                      <SelectItem value="ahead">Ahead</SelectItem>
                      <SelectItem value="behind">Behind</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carbon Footprint Table */}
          <Card>
            <CardHeader>
              <CardTitle>Carbon Footprint ({filteredCarbon.length})</CardTitle>
              <CardDescription>
                Track carbon emissions and reduction targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Scope</TableHead>
                    <TableHead>Emissions</TableHead>
                    <TableHead>Reduction</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCarbon.map((carbon) => {
                    const progress = (carbon.reduction / carbon.target) * 100
                    
                    return (
                      <TableRow key={carbon.id}>
                        <TableCell>
                          <div className="font-medium">{carbon.company}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="uppercase">{carbon.scope}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {carbon.emissions} {carbon.unit}
                        </TableCell>
                        <TableCell className="font-medium">
                          {carbon.reduction} {carbon.unit}
                        </TableCell>
                        <TableCell className="font-medium">
                          {carbon.target} {carbon.unit}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={progress} className="w-16 h-2" />
                            <span className="text-sm">{progress.toFixed(0)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(carbon.status)}
                            {getStatusBadge(carbon.status)}
                          </div>
                        </TableCell>
                        <TableCell>{carbon.year}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Goals & Targets</CardTitle>
              <CardDescription>
                Track progress towards sustainability goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Portfolio Goals</h4>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Net Zero by 2030</span>
                        <Badge variant="outline">On Track</Badge>
                      </div>
                      <Progress value={65} className="mb-2" />
                      <p className="text-sm text-muted-foreground">65% of portfolio companies committed</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">100% Renewable Energy</span>
                        <Badge variant="secondary">Ahead</Badge>
                      </div>
                      <Progress value={85} className="mb-2" />
                      <p className="text-sm text-muted-foreground">85% of companies using renewable energy</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Zero Waste</span>
                        <Badge variant="outline">Behind</Badge>
                      </div>
                      <Progress value={45} className="mb-2" />
                      <p className="text-sm text-muted-foreground">45% of companies with zero waste policies</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Fund-Level Targets</h4>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Carbon Neutral Operations</span>
                        <Badge variant="default">Achieved</Badge>
                      </div>
                      <Progress value={100} className="mb-2" />
                      <p className="text-sm text-muted-foreground">100% carbon neutral since 2022</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">ESG Integration</span>
                        <Badge variant="secondary">Ahead</Badge>
                      </div>
                      <Progress value={90} className="mb-2" />
                      <p className="text-sm text-muted-foreground">90% of investments with ESG criteria</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Impact Measurement</span>
                        <Badge variant="outline">On Track</Badge>
                      </div>
                      <Progress value={75} className="mb-2" />
                      <p className="text-sm text-muted-foreground">75% of companies with impact metrics</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Reports</CardTitle>
              <CardDescription>
                Generate and view sustainability reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                  <Globe className="h-8 w-8 mb-2" />
                  <span>ESG Report</span>
                </Button>
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                  <Thermometer className="h-8 w-8 mb-2" />
                  <span>Carbon Report</span>
                </Button>
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                  <Target className="h-8 w-8 mb-2" />
                  <span>Impact Report</span>
                </Button>
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                  <BarChart3 className="h-8 w-8 mb-2" />
                  <span>Performance Report</span>
                </Button>
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                  <Download className="h-8 w-8 mb-2" />
                  <span>Data Export</span>
                </Button>
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                  <Share2 className="h-8 w-8 mb-2" />
                  <span>Share Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 