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
  TrendingUp, 
  Plus, 
  Eye, 
  Edit, 
  MoreHorizontal,
  DollarSign,
  Calendar,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Filter,
  Search,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  FileText,
  Briefcase
} from "lucide-react"

interface ExitStrategy {
  id: string
  company: string
  exitType: "ipo" | "m&a" | "secondary" | "buyout" | "liquidation" | "other"
  status: "planning" | "preparation" | "execution" | "completed" | "on_hold"
  targetDate: string
  estimatedValue: string
  currentValue: string
  multiple: number
  irr: number
  probability: number
  leadPartner: string
  lastUpdate: string
}

const mockExitStrategies: ExitStrategy[] = [
  {
    id: "EXIT-001",
    company: "TechFlow Solutions",
    exitType: "ipo",
    status: "preparation",
    targetDate: "2025-Q2",
    estimatedValue: "$500M",
    currentValue: "$300M",
    multiple: 8.5,
    irr: 45.2,
    probability: 75,
    leadPartner: "Sarah Johnson",
    lastUpdate: "2 hours ago"
  },
  {
    id: "EXIT-002",
    company: "GreenEnergy Innovations",
    exitType: "m&a",
    status: "execution",
    targetDate: "2024-Q4",
    estimatedValue: "$200M",
    currentValue: "$150M",
    multiple: 6.2,
    irr: 32.8,
    probability: 85,
    leadPartner: "Mike Chen",
    lastUpdate: "1 day ago"
  },
  {
    id: "EXIT-003",
    company: "HealthTech Pro",
    exitType: "secondary",
    status: "planning",
    targetDate: "2025-Q1",
    estimatedValue: "$80M",
    currentValue: "$60M",
    multiple: 4.8,
    irr: 28.5,
    probability: 60,
    leadPartner: "David Smith",
    lastUpdate: "3 days ago"
  },
  {
    id: "EXIT-004",
    company: "FinTech Revolution",
    exitType: "buyout",
    status: "on_hold",
    targetDate: "2025-Q3",
    estimatedValue: "$150M",
    currentValue: "$100M",
    multiple: 5.5,
    irr: 35.1,
    probability: 40,
    leadPartner: "Lisa Wang",
    lastUpdate: "1 week ago"
  }
]

const exitTypes = ["ipo", "m&a", "secondary", "buyout", "liquidation", "other"]
const statuses = ["planning", "preparation", "execution", "completed", "on_hold"]

export default function ExitStrategyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedExitType, setSelectedExitType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredStrategies = mockExitStrategies.filter(strategy => {
    const matchesSearch = strategy.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesExitType = selectedExitType === "all" || strategy.exitType === selectedExitType
    const matchesStatus = selectedStatus === "all" || strategy.status === selectedStatus
    
    return matchesSearch && matchesExitType && matchesStatus
  })

  const getExitTypeBadge = (type: string) => {
    switch (type) {
      case "ipo": return <Badge variant="outline" className="bg-blue-100 text-blue-800">IPO</Badge>
      case "m&a": return <Badge variant="outline" className="bg-green-100 text-green-800">M&A</Badge>
      case "secondary": return <Badge variant="outline" className="bg-purple-100 text-purple-800">Secondary</Badge>
      case "buyout": return <Badge variant="outline" className="bg-orange-100 text-orange-800">Buyout</Badge>
      case "liquidation": return <Badge variant="outline" className="bg-red-100 text-red-800">Liquidation</Badge>
      default: return <Badge variant="outline">Other</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planning": return <Badge variant="outline" className="bg-blue-100 text-blue-800">Planning</Badge>
      case "preparation": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Preparation</Badge>
      case "execution": return <Badge variant="default" className="bg-green-100 text-green-800">Execution</Badge>
      case "completed": return <Badge variant="default" className="bg-green-600 text-white">Completed</Badge>
      case "on_hold": return <Badge variant="destructive">On Hold</Badge>
      default: return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getProbabilityBadge = (probability: number) => {
    if (probability >= 80) return <Badge variant="default" className="bg-green-100 text-green-800">High</Badge>
    if (probability >= 60) return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Medium</Badge>
    return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Low</Badge>
  }

  // Calculate metrics
  const totalExits = mockExitStrategies.length
  const activeExits = mockExitStrategies.filter(e => e.status !== "completed" && e.status !== "on_hold").length
  const totalValue = mockExitStrategies.reduce((sum, exit) => {
    const value = parseFloat(exit.estimatedValue.replace(/[^0-9.]/g, ''))
    return sum + value
  }, 0)
  const averageIRR = mockExitStrategies.reduce((sum, exit) => sum + exit.irr, 0) / totalExits

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exit Strategy</h1>
          <p className="text-muted-foreground">
            Manage exit planning and execution for portfolio companies
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Exit Strategy
        </Button>
      </div>

      {/* Exit Strategy Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exits</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExits}</div>
            <p className="text-xs text-muted-foreground">
              {activeExits} active, {totalExits - activeExits} completed/on hold
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(0)}M</div>
            <p className="text-xs text-muted-foreground">
              Average: ${(totalValue / totalExits).toFixed(0)}M per exit
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg IRR</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageIRR.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Portfolio weighted average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Probability</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockExitStrategies.filter(e => e.probability >= 70).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {((mockExitStrategies.filter(e => e.probability >= 70).length / totalExits) * 100).toFixed(1)}% of exits
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="strategies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="strategies">Exit Strategies</TabsTrigger>
          <TabsTrigger value="timeline">Exit Timeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="strategies" className="space-y-4">
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
                      placeholder="Search companies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Exit Type</label>
                  <Select value={selectedExitType} onValueChange={setSelectedExitType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      {exitTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type.replace('&', ' & ').toUpperCase()}
                        </SelectItem>
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
                      {statuses.map(status => (
                        <SelectItem key={status} value={status}>
                          {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exit Strategies Table */}
          <Card>
            <CardHeader>
              <CardTitle>Exit Strategies ({filteredStrategies.length})</CardTitle>
              <CardDescription>
                Overview of exit strategies and their progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Exit Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Target Date</TableHead>
                    <TableHead>Estimated Value</TableHead>
                    <TableHead>Multiple</TableHead>
                    <TableHead>IRR</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Lead Partner</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStrategies.map((strategy) => (
                    <TableRow key={strategy.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{strategy.company}</div>
                          <div className="text-sm text-muted-foreground">{strategy.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getExitTypeBadge(strategy.exitType)}</TableCell>
                      <TableCell>{getStatusBadge(strategy.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{strategy.targetDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{strategy.estimatedValue}</div>
                          <div className="text-sm text-muted-foreground">
                            Current: {strategy.currentValue}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{strategy.multiple.toFixed(1)}x</span>
                          {strategy.multiple > 5 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${strategy.irr > 30 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {strategy.irr > 0 ? '+' : ''}{strategy.irr.toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={strategy.probability} className="w-16 h-2" />
                          <span className="text-sm">{strategy.probability}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                            {strategy.leadPartner.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm">{strategy.leadPartner}</span>
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

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exit Timeline</CardTitle>
              <CardDescription>
                Track milestones and timeline for exit strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockExitStrategies.map((strategy) => (
                  <div key={strategy.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{strategy.company}</h3>
                        <p className="text-sm text-muted-foreground">
                          {getExitTypeBadge(strategy.exitType)} • Target: {strategy.targetDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(strategy.status)}
                        <span className="text-sm text-muted-foreground">
                          {strategy.probability}% probability
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                            H
                          </div>
                          <div>
                            <div className="font-medium">Financial Audit</div>
                            <div className="text-sm text-muted-foreground">Complete annual financial audit</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-sm font-medium">Finance Team</div>
                            <div className="text-xs text-muted-foreground">2024-06-30</div>
                          </div>
                          <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                            H
                          </div>
                          <div>
                            <div className="font-medium">SEC Filing Preparation</div>
                            <div className="text-sm text-muted-foreground">Prepare S-1 filing documents</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-sm font-medium">Legal Team</div>
                            <div className="text-xs text-muted-foreground">2024-09-30</div>
                          </div>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exit Analytics</CardTitle>
              <CardDescription>
                Detailed analytics and insights on exit performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Top Performing Exits</h4>
                  {mockExitStrategies
                    .sort((a, b) => b.irr - a.irr)
                    .slice(0, 3)
                    .map((strategy, index) => (
                      <div key={strategy.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{strategy.company}</div>
                            <div className="text-sm text-muted-foreground">{strategy.exitType.toUpperCase()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">+{strategy.irr.toFixed(1)}%</div>
                          <div className="text-sm text-muted-foreground">{strategy.multiple.toFixed(1)}x multiple</div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Exit Type Performance</h4>
                  {exitTypes.map((type) => {
                    const exits = mockExitStrategies.filter(e => e.exitType === type)
                    if (exits.length === 0) return null
                    
                    const avgIRR = exits.reduce((sum, e) => sum + e.irr, 0) / exits.length
                    const avgMultiple = exits.reduce((sum, e) => sum + e.multiple, 0) / exits.length
                    
                    return (
                      <div key={type} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="font-medium capitalize">{type.replace('&', ' & ')}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">+{avgIRR.toFixed(1)}%</div>
                          <div className="text-sm text-muted-foreground">{avgMultiple.toFixed(1)}x avg</div>
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