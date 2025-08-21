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
  Activity, 
  Filter, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  MoreHorizontal,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  DollarSign,
  Target,
  Calendar
} from "lucide-react"

interface Deal {
  id: string
  company: string
  stage: string
  sector: string
  location: string
  dealSize: string
  probability: number
  expectedClose: string
  team: string[]
  lastActivity: string
  status: "active" | "paused" | "closed" | "lost"
}

const mockDeals: Deal[] = [
  {
    id: "DEAL-001",
    company: "TechFlow Solutions",
    stage: "Due Diligence",
    sector: "SaaS",
    location: "San Francisco, CA",
    dealSize: "$2.5M",
    probability: 75,
    expectedClose: "2024-03-15",
    team: ["Sarah Johnson", "Mike Chen"],
    lastActivity: "2 hours ago",
    status: "active"
  },
  {
    id: "DEAL-002",
    company: "GreenEnergy Innovations",
    stage: "Term Sheet",
    sector: "Clean Tech",
    location: "Austin, TX",
    dealSize: "$5.0M",
    probability: 90,
    expectedClose: "2024-02-28",
    team: ["David Smith", "Lisa Wang"],
    lastActivity: "1 day ago",
    status: "active"
  },
  {
    id: "DEAL-003",
    company: "HealthTech Pro",
    stage: "Initial Screening",
    sector: "Healthcare",
    location: "Boston, MA",
    dealSize: "$1.8M",
    probability: 45,
    expectedClose: "2024-04-10",
    team: ["Alex Rodriguez"],
    lastActivity: "3 days ago",
    status: "paused"
  },
  {
    id: "DEAL-004",
    company: "FinTech Revolution",
    stage: "Investment Committee",
    sector: "FinTech",
    location: "New York, NY",
    dealSize: "$8.2M",
    probability: 60,
    expectedClose: "2024-03-20",
    team: ["Emma Davis", "Tom Wilson", "Sarah Johnson"],
    lastActivity: "5 hours ago",
    status: "active"
  },
  {
    id: "DEAL-005",
    company: "EduTech Platform",
    stage: "Closed",
    sector: "EdTech",
    location: "Seattle, WA",
    dealSize: "$3.1M",
    probability: 100,
    expectedClose: "2024-01-15",
    team: ["Mike Chen", "Lisa Wang"],
    lastActivity: "1 week ago",
    status: "closed"
  }
]

const stages = [
  "Initial Screening",
  "Due Diligence", 
  "Term Sheet",
  "Investment Committee",
  "Closed"
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

export default function DealFlowPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedSector, setSelectedSector] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredDeals = mockDeals.filter(deal => {
    const matchesSearch = deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = selectedStage === "all" || deal.stage === selectedStage
    const matchesSector = selectedSector === "all" || deal.sector === selectedSector
    const matchesStatus = selectedStatus === "all" || deal.status === selectedStatus
    
    return matchesSearch && matchesStage && matchesSector && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "paused": return <Clock className="h-4 w-4 text-yellow-500" />
      case "closed": return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "lost": return <XCircle className="h-4 w-4 text-red-500" />
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
      case "paused": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Paused</Badge>
      case "closed": return <Badge variant="outline" className="bg-blue-100 text-blue-800">Closed</Badge>
      case "lost": return <Badge variant="destructive">Lost</Badge>
      default: return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const totalDeals = mockDeals.length
  const activeDeals = mockDeals.filter(d => d.status === "active").length
  const totalValue = mockDeals.reduce((sum, deal) => {
    const value = parseFloat(deal.dealSize.replace(/[^0-9.]/g, ''))
    return sum + value
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deal Flow</h1>
          <p className="text-muted-foreground">
            Manage and track your venture pipeline
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Deal
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeals}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDeals}</div>
            <p className="text-xs text-muted-foreground">
              {((activeDeals / totalDeals) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              Average: ${(totalValue / totalDeals).toFixed(1)}M per deal
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
              <label className="text-sm font-medium">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Stages */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Stages</CardTitle>
          <CardDescription>
            Deals by stage in the pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {stages.map((stage, index) => {
              const stageDeals = mockDeals.filter(d => d.stage === stage)
              const percentage = ((stageDeals.length / totalDeals) * 100).toFixed(1)
              
              return (
                <div key={stage} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{stage}</span>
                    <span className="text-sm text-muted-foreground">{stageDeals.length}</span>
                  </div>
                  <Progress value={parseFloat(percentage)} className="h-2" />
                  <p className="text-xs text-muted-foreground">{percentage}%</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Deals ({filteredDeals.length})</CardTitle>
          <CardDescription>
            Manage your venture pipeline deals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Deal Size</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{deal.company}</div>
                      <div className="text-sm text-muted-foreground">{deal.id}</div>
                      <div className="text-sm text-muted-foreground">{deal.location}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{deal.stage}</Badge>
                  </TableCell>
                  <TableCell>{deal.sector}</TableCell>
                  <TableCell className="font-medium">{deal.dealSize}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={deal.probability} className="w-16 h-2" />
                      <span className="text-sm">{deal.probability}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {deal.team.slice(0, 3).map((member, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-medium text-blue-600"
                        >
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                      {deal.team.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                          +{deal.team.length - 3}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(deal.status)}
                      {getStatusBadge(deal.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{deal.lastActivity}</span>
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
    </div>
  )
} 