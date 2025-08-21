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
  Building2, 
  Filter, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Star,
  Award,
  Globe,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

interface PortfolioCompany {
  id: string
  name: string
  sector: string
  stage: string
  investmentDate: string
  investmentAmount: string
  currentValue: string
  ownership: number
  irr: number
  status: "active" | "exited" | "distressed" | "watch"
  team: string[]
  lastUpdate: string
  performance: "exceeding" | "meeting" | "below" | "critical"
  milestones: number
  nextMilestone: string
}

const mockPortfolioCompanies: PortfolioCompany[] = [
  {
    id: "PORT-001",
    name: "TechFlow Solutions",
    sector: "SaaS",
    stage: "Series B",
    investmentDate: "2023-01-15",
    investmentAmount: "$2.5M",
    currentValue: "$8.2M",
    ownership: 15.5,
    irr: 45.2,
    status: "active",
    team: ["Sarah Johnson", "Mike Chen"],
    lastUpdate: "2 days ago",
    performance: "exceeding",
    milestones: 8,
    nextMilestone: "2024-04-15"
  },
  {
    id: "PORT-002",
    name: "GreenEnergy Innovations",
    sector: "Clean Tech",
    stage: "Series A",
    investmentDate: "2023-06-20",
    investmentAmount: "$1.8M",
    currentValue: "$3.1M",
    ownership: 12.0,
    irr: 28.7,
    status: "active",
    team: ["David Smith", "Lisa Wang"],
    lastUpdate: "1 week ago",
    performance: "meeting",
    milestones: 5,
    nextMilestone: "2024-05-20"
  },
  {
    id: "PORT-003",
    name: "HealthTech Pro",
    sector: "Healthcare",
    stage: "Seed",
    investmentDate: "2023-09-10",
    investmentAmount: "$500K",
    currentValue: "$750K",
    ownership: 8.5,
    irr: 15.3,
    status: "active",
    team: ["Alex Rodriguez"],
    lastUpdate: "3 days ago",
    performance: "below",
    milestones: 3,
    nextMilestone: "2024-06-10"
  },
  {
    id: "PORT-004",
    name: "FinTech Revolution",
    sector: "FinTech",
    stage: "Series C",
    investmentDate: "2022-03-15",
    investmentAmount: "$5.0M",
    currentValue: "$18.5M",
    ownership: 22.0,
    irr: 67.8,
    status: "active",
    team: ["Emma Davis", "Tom Wilson"],
    lastUpdate: "1 day ago",
    performance: "exceeding",
    milestones: 12,
    nextMilestone: "2024-03-30"
  },
  {
    id: "PORT-005",
    name: "EduTech Platform",
    sector: "EdTech",
    stage: "Series A",
    investmentDate: "2023-04-05",
    investmentAmount: "$1.2M",
    currentValue: "$2.8M",
    ownership: 18.5,
    irr: 35.4,
    status: "exited",
    team: ["Mike Chen", "Lisa Wang"],
    lastUpdate: "2 weeks ago",
    performance: "meeting",
    milestones: 7,
    nextMilestone: "N/A"
  }
]

const sectors = [
  "SaaS",
  "FinTech",
  "HealthTech",
  "Clean Tech",
  "EdTech",
  "AI/ML",
  "E-commerce"
]

const stages = [
  "Seed",
  "Series A",
  "Series B",
  "Series C",
  "Series D+",
  "Growth"
]

export default function PortfolioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPerformance, setSelectedPerformance] = useState("all")

  const filteredCompanies = mockPortfolioCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === "all" || company.sector === selectedSector
    const matchesStage = selectedStage === "all" || company.stage === selectedStage
    const matchesStatus = selectedStatus === "all" || company.status === selectedStatus
    const matchesPerformance = selectedPerformance === "all" || company.performance === selectedPerformance
    
    return matchesSearch && matchesSector && matchesStage && matchesStatus && matchesPerformance
  })

  const getPerformanceIcon = (performance: string) => {
    switch (performance) {
      case "exceeding": return <TrendingUp className="h-4 w-4 text-green-500" />
      case "meeting": return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "below": return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical": return <TrendingDown className="h-4 w-4 text-red-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "exceeding": return <Badge variant="default" className="bg-green-100 text-green-800">Exceeding</Badge>
      case "meeting": return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Meeting</Badge>
      case "below": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Below</Badge>
      case "critical": return <Badge variant="destructive">Critical</Badge>
      default: return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
      case "exited": return <Badge variant="outline" className="bg-blue-100 text-blue-800">Exited</Badge>
      case "distressed": return <Badge variant="destructive">Distressed</Badge>
      case "watch": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Watch</Badge>
      default: return <Badge variant="secondary">Unknown</Badge>
    }
  }

  // Calculate portfolio metrics
  const totalCompanies = mockPortfolioCompanies.length
  const activeCompanies = mockPortfolioCompanies.filter(c => c.status === "active").length
  const totalInvestment = mockPortfolioCompanies.reduce((sum, company) => {
    const investment = parseFloat(company.investmentAmount.replace(/[^0-9.]/g, ''))
    return sum + investment
  }, 0)
  const totalCurrentValue = mockPortfolioCompanies.reduce((sum, company) => {
    const value = parseFloat(company.currentValue.replace(/[^0-9.]/g, ''))
    return sum + value
  }, 0)
  const averageIRR = mockPortfolioCompanies.reduce((sum, company) => sum + company.irr, 0) / totalCompanies

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground">
            Manage and track portfolio companies performance
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      {/* Portfolio Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompanies}</div>
            <p className="text-xs text-muted-foreground">
              {activeCompanies} active, {totalCompanies - activeCompanies} exited
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInvestment.toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              Average: ${(totalInvestment / totalCompanies).toFixed(1)}M per company
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCurrentValue.toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              {((totalCurrentValue / totalInvestment - 1) * 100).toFixed(1)}% total return
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average IRR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageIRR.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Portfolio weighted average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Distribution */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Performance Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["exceeding", "meeting", "below", "critical"].map((perf) => {
                const count = mockPortfolioCompanies.filter(c => c.performance === perf).length
                const percentage = ((count / totalCompanies) * 100).toFixed(1)
                return (
                  <div key={perf} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getPerformanceIcon(perf)}
                      <span className="text-sm capitalize">{perf}</span>
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
              <Globe className="h-5 w-5" />
              Sector Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectors.slice(0, 5).map((sector) => {
                const count = mockPortfolioCompanies.filter(c => c.sector === sector).length
                const percentage = ((count / totalCompanies) * 100).toFixed(1)
                return (
                  <div key={sector} className="flex items-center justify-between">
                    <span className="text-sm">{sector}</span>
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
              <Target className="h-5 w-5" />
              Stage Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stages.slice(0, 5).map((stage) => {
                const count = mockPortfolioCompanies.filter(c => c.stage === stage).length
                const percentage = ((count / totalCompanies) * 100).toFixed(1)
                return (
                  <div key={stage} className="flex items-center justify-between">
                    <span className="text-sm">{stage}</span>
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
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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
                  <label className="text-sm font-medium">Sector</label>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger>
                      <SelectValue placeholder="All sectors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All sectors</SelectItem>
                      {sectors.map(sector => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stage</label>
                  <Select value={selectedStage} onValueChange={setSelectedStage}>
                    <SelectTrigger>
                      <SelectValue placeholder="All stages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All stages</SelectItem>
                      {stages.map(stage => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="exited">Exited</SelectItem>
                      <SelectItem value="distressed">Distressed</SelectItem>
                      <SelectItem value="watch">Watch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Performance</label>
                  <Select value={selectedPerformance} onValueChange={setSelectedPerformance}>
                    <SelectTrigger>
                      <SelectValue placeholder="All performance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All performance</SelectItem>
                      <SelectItem value="exceeding">Exceeding</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="below">Below</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Companies Table */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Companies ({filteredCompanies.length})</CardTitle>
              <CardDescription>
                Overview of all portfolio companies and their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Investment</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>IRR</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{company.name}</div>
                          <div className="text-sm text-muted-foreground">{company.id}</div>
                          <div className="text-sm text-muted-foreground">{company.ownership}% ownership</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{company.sector}</Badge>
                      </TableCell>
                      <TableCell>{company.stage}</TableCell>
                      <TableCell className="font-medium">{company.investmentAmount}</TableCell>
                      <TableCell className="font-medium">{company.currentValue}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${company.irr > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {company.irr > 0 ? '+' : ''}{company.irr.toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPerformanceIcon(company.performance)}
                          {getPerformanceBadge(company.performance)}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(company.status)}</TableCell>
                      <TableCell>
                        <div className="flex -space-x-2">
                          {company.team.slice(0, 3).map((member, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-medium text-blue-600"
                            >
                              {member.split(' ').map(n => n[0]).join('')}
                            </div>
                          ))}
                          {company.team.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                              +{company.team.length - 3}
                            </div>
                          )}
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Detailed performance metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Top Performers</h4>
                  {mockPortfolioCompanies
                    .sort((a, b) => b.irr - a.irr)
                    .slice(0, 3)
                    .map((company, index) => (
                      <div key={company.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{company.name}</div>
                            <div className="text-sm text-muted-foreground">{company.sector}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">+{company.irr.toFixed(1)}%</div>
                          <div className="text-sm text-muted-foreground">{company.currentValue}</div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Performance by Sector</h4>
                  {sectors.slice(0, 5).map((sector) => {
                    const sectorCompanies = mockPortfolioCompanies.filter(c => c.sector === sector)
                    const avgIRR = sectorCompanies.reduce((sum, c) => sum + c.irr, 0) / sectorCompanies.length
                    return (
                      <div key={sector} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{sector}</span>
                        <div className="text-right">
                          <div className="font-medium">{avgIRR.toFixed(1)}%</div>
                          <div className="text-sm text-muted-foreground">{sectorCompanies.length} companies</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Milestone Tracking</CardTitle>
              <CardDescription>
                Track key milestones and upcoming events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPortfolioCompanies
                  .filter(c => c.nextMilestone !== "N/A")
                  .sort((a, b) => new Date(a.nextMilestone).getTime() - new Date(b.nextMilestone).getTime())
                  .map((company) => (
                    <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <Target className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{company.name}</div>
                          <div className="text-sm text-muted-foreground">Next milestone: {company.nextMilestone}</div>
                          <div className="text-sm text-muted-foreground">{company.milestones} milestones completed</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{company.stage}</Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          {getPerformanceBadge(company.performance)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Reports</CardTitle>
              <CardDescription>
                Generate comprehensive portfolio reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                  <BarChart3 className="h-8 w-8 mb-2" />
                  <span>Performance Report</span>
                </Button>
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                  <PieChart className="h-8 w-8 mb-2" />
                  <span>Sector Analysis</span>
                </Button>
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                  <LineChart className="h-8 w-8 mb-2" />
                  <span>IRR Analysis</span>
                </Button>
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                  <TrendingUp className="h-8 w-8 mb-2" />
                  <span>Valuation Report</span>
                </Button>
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                  <Activity className="h-8 w-8 mb-2" />
                  <span>Risk Assessment</span>
                </Button>
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                  <Award className="h-8 w-8 mb-2" />
                  <span>Impact Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 