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
  Heart, 
  Plus, 
  Eye, 
  Edit, 
  MoreHorizontal,
  Users,
  Target,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Filter,
  Search,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  GraduationCap,
  Briefcase,
  Leaf
} from "lucide-react"

interface SocialImpactMetric {
  id: string
  company: string
  metric: string
  category: string
  value: number
  unit: string
  target: number
  status: "on_track" | "behind" | "ahead" | "critical"
  trend: "up" | "down" | "stable"
  lastUpdate: string
}

const mockSocialImpactMetrics: SocialImpactMetric[] = [
  {
    id: "SOCIAL-001",
    company: "TechFlow Solutions",
    metric: "Gender Diversity",
    category: "Workforce",
    value: 45,
    unit: "%",
    target: 50,
    status: "behind",
    trend: "up",
    lastUpdate: "2 hours ago"
  },
  {
    id: "SOCIAL-002",
    company: "GreenEnergy Innovations",
    metric: "Local Employment",
    category: "Community",
    value: 85,
    unit: "%",
    target: 80,
    status: "ahead",
    trend: "up",
    lastUpdate: "1 day ago"
  },
  {
    id: "SOCIAL-003",
    company: "HealthTech Pro",
    metric: "Access to Healthcare",
    category: "Health",
    value: 12000,
    unit: "people",
    target: 10000,
    status: "ahead",
    trend: "up",
    lastUpdate: "3 days ago"
  },
  {
    id: "SOCIAL-004",
    company: "FinTech Revolution",
    metric: "Financial Inclusion",
    category: "Financial",
    value: 25000,
    unit: "accounts",
    target: 30000,
    status: "behind",
    trend: "stable",
    lastUpdate: "1 week ago"
  },
  {
    id: "SOCIAL-005",
    company: "EduTech Platform",
    metric: "Student Success Rate",
    category: "Education",
    value: 92,
    unit: "%",
    target: 90,
    status: "ahead",
    trend: "up",
    lastUpdate: "2 weeks ago"
  }
]

const categories = [
  "Workforce",
  "Community", 
  "Health",
  "Education",
  "Financial",
  "Environment"
]

export default function SocialImpactPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredMetrics = mockSocialImpactMetrics.filter(metric => {
    const matchesSearch = metric.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         metric.metric.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || metric.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || metric.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on_track": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "ahead": return <ArrowUpRight className="h-4 w-4 text-blue-500" />
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
      case "Workforce": return <Users className="h-4 w-4" />
      case "Community": return <Globe className="h-4 w-4" />
      case "Health": return <Heart className="h-4 w-4" />
      case "Education": return <GraduationCap className="h-4 w-4" />
      case "Financial": return <Briefcase className="h-4 w-4" />
      case "Environment": return <Leaf className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  // Calculate metrics
  const totalMetrics = mockSocialImpactMetrics.length
  const onTrackMetrics = mockSocialImpactMetrics.filter(m => m.status === "on_track" || m.status === "ahead").length
  const totalBeneficiaries = mockSocialImpactMetrics.reduce((sum, metric) => {
    if (metric.category === "Health" || metric.category === "Education") {
      return sum + metric.value
    }
    return sum
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Social Impact</h1>
          <p className="text-muted-foreground">
            Track social impact metrics and GEDSI initiatives
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Impact Metric
        </Button>
      </div>

      {/* Social Impact Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Metrics</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics}</div>
            <p className="text-xs text-muted-foreground">
              Across all portfolio companies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Track</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onTrackMetrics}</div>
            <p className="text-xs text-muted-foreground">
              {((onTrackMetrics / totalMetrics) * 100).toFixed(1)}% of metrics
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Beneficiaries</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBeneficiaries.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              People impacted by programs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Community engagement programs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Impact Metrics</TabsTrigger>
          <TabsTrigger value="gedsi">GEDSI Initiatives</TabsTrigger>
          <TabsTrigger value="community">Community Programs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
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

          {/* Social Impact Metrics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Social Impact Metrics ({filteredMetrics.length})</CardTitle>
              <CardDescription>
                Track social impact performance across portfolio companies
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
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(metric.category)}
                            <Badge variant="outline">{metric.category}</Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {metric.value.toLocaleString()} {metric.unit}
                        </TableCell>
                        <TableCell className="font-medium">
                          {metric.target.toLocaleString()} {metric.unit}
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

        <TabsContent value="gedsi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>GEDSI Initiatives</CardTitle>
              <CardDescription>
                Gender Equality, Diversity, Social Inclusion initiatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-pink-100 text-pink-800">Gender</Badge>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <h3 className="font-medium mb-1">Women in Tech Leadership</h3>
                    <p className="text-sm text-muted-foreground mb-3">Program to increase women in leadership positions</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Progress: 83%</span>
                      <span className="text-sm font-medium">TechFlow Solutions</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">Diversity</Badge>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <h3 className="font-medium mb-1">Indigenous Partnership Program</h3>
                    <p className="text-sm text-muted-foreground mb-3">Partnership with indigenous communities</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Progress: 60%</span>
                      <span className="text-sm font-medium">GreenEnergy Innovations</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">Inclusion</Badge>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <h3 className="font-medium mb-1">Accessible Healthcare Technology</h3>
                    <p className="text-sm text-muted-foreground mb-3">Healthcare solutions for people with disabilities</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Progress: 85%</span>
                      <span className="text-sm font-medium">HealthTech Pro</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Community Engagement Programs</CardTitle>
              <CardDescription>
                Track community programs and their impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">Education</Badge>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <h3 className="font-medium mb-1">Coding Bootcamp for Youth</h3>
                    <p className="text-sm text-muted-foreground mb-3">500 beneficiaries • $200K investment</p>
                    <div className="text-sm text-muted-foreground">
                      Impact: 85% employment rate for graduates
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800">Environment</Badge>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <h3 className="font-medium mb-1">Community Solar Initiative</h3>
                    <p className="text-sm text-muted-foreground mb-3">1,000 beneficiaries • $500K investment</p>
                    <div className="text-sm text-muted-foreground">
                      Impact: 30% reduction in energy costs
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-red-100 text-red-800">Healthcare</Badge>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <h3 className="font-medium mb-1">Rural Healthcare Access</h3>
                    <p className="text-sm text-muted-foreground mb-3">2,500 beneficiaries • $750K investment</p>
                    <div className="text-sm text-muted-foreground">
                      Impact: Improved healthcare for 3 rural communities
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Impact Analytics</CardTitle>
              <CardDescription>
                Detailed analytics and insights on social impact performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Top Performing Companies</h4>
                  {mockSocialImpactMetrics
                    .sort((a, b) => (b.value / b.target) - (a.value / a.target))
                    .slice(0, 3)
                    .map((metric, index) => (
                      <div key={metric.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{metric.company}</div>
                            <div className="text-sm text-muted-foreground">{metric.metric}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">
                            {((metric.value / metric.target) * 100).toFixed(0)}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {metric.value.toLocaleString()} / {metric.target.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Category Performance</h4>
                  {categories.map((category) => {
                    const metrics = mockSocialImpactMetrics.filter(m => m.category === category)
                    if (metrics.length === 0) return null
                    
                    const avgProgress = metrics.reduce((sum, m) => sum + (m.value / m.target) * 100, 0) / metrics.length
                    
                    return (
                      <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(category)}
                          <span className="font-medium">{category}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{avgProgress.toFixed(0)}%</div>
                          <div className="text-sm text-muted-foreground">{metrics.length} metrics</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 