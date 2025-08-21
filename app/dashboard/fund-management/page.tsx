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
  ChartPie, 
  Plus, 
  Eye, 
  Edit, 
  MoreHorizontal,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
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
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

interface Fund {
  id: string
  name: string
  vintage: string
  size: string
  committedCapital: string
  calledCapital: string
  distributedCapital: string
  netAssetValue: string
  irr: number
  tvpi: number
  dpi: number
  status: "active" | "closed" | "winding_down"
  lps: number
  investments: number
  lastUpdate: string
  fundManager: string
}

interface CapitalCall {
  id: string
  fundId: string
  fundName: string
  callNumber: string
  amount: string
  dueDate: string
  status: "pending" | "in_progress" | "completed"
  lpsResponded: number
  totalLps: number
  lastUpdate: string
}

interface Distribution {
  id: string
  fundId: string
  fundName: string
  distributionNumber: string
  amount: string
  date: string
  type: "dividend" | "exit" | "refinancing" | "other"
  status: "announced" | "paid" | "pending"
  lpsPaid: number
  totalLps: number
  lastUpdate: string
}

const mockFunds: Fund[] = [
  {
    id: "FUND-001",
    name: "MIV Fund I",
    vintage: "2020",
    size: "$50M",
    committedCapital: "$50M",
    calledCapital: "$35M",
    distributedCapital: "$12M",
    netAssetValue: "$45M",
    irr: 18.5,
    tvpi: 1.29,
    dpi: 0.24,
    status: "active",
    lps: 25,
    investments: 15,
    lastUpdate: "2 hours ago",
    fundManager: "Sarah Johnson"
  },
  {
    id: "FUND-002",
    name: "MIV Fund II",
    vintage: "2022",
    size: "$75M",
    committedCapital: "$75M",
    calledCapital: "$25M",
    distributedCapital: "$5M",
    netAssetValue: "$28M",
    irr: 12.3,
    tvpi: 1.12,
    dpi: 0.07,
    status: "active",
    lps: 35,
    investments: 8,
    lastUpdate: "1 day ago",
    fundManager: "Mike Chen"
  },
  {
    id: "FUND-003",
    name: "MIV Impact Fund",
    vintage: "2021",
    size: "$30M",
    committedCapital: "$30M",
    calledCapital: "$22M",
    distributedCapital: "$8M",
    netAssetValue: "$25M",
    irr: 15.7,
    tvpi: 1.10,
    dpi: 0.27,
    status: "active",
    lps: 18,
    investments: 12,
    lastUpdate: "3 days ago",
    fundManager: "Lisa Wang"
  },
  {
    id: "FUND-004",
    name: "MIV Seed Fund",
    vintage: "2019",
    size: "$20M",
    committedCapital: "$20M",
    calledCapital: "$20M",
    distributedCapital: "$15M",
    netAssetValue: "$8M",
    irr: 22.1,
    tvpi: 1.15,
    dpi: 0.75,
    status: "winding_down",
    lps: 15,
    investments: 20,
    lastUpdate: "1 week ago",
    fundManager: "David Smith"
  }
]

const mockCapitalCalls: CapitalCall[] = [
  {
    id: "CALL-001",
    fundId: "FUND-001",
    fundName: "MIV Fund I",
    callNumber: "Call #8",
    amount: "$2.5M",
    dueDate: "2024-03-31",
    status: "in_progress",
    lpsResponded: 18,
    totalLps: 25,
    lastUpdate: "2 hours ago"
  },
  {
    id: "CALL-002",
    fundId: "FUND-002",
    fundName: "MIV Fund II",
    callNumber: "Call #3",
    amount: "$1.8M",
    dueDate: "2024-04-15",
    status: "pending",
    lpsResponded: 0,
    totalLps: 35,
    lastUpdate: "1 day ago"
  },
  {
    id: "CALL-003",
    fundId: "FUND-003",
    fundName: "MIV Impact Fund",
    callNumber: "Call #5",
    amount: "$1.2M",
    dueDate: "2024-02-28",
    status: "completed",
    lpsResponded: 18,
    totalLps: 18,
    lastUpdate: "1 week ago"
  }
]

const mockDistributions: Distribution[] = [
  {
    id: "DIST-001",
    fundId: "FUND-001",
    fundName: "MIV Fund I",
    distributionNumber: "Dist #4",
    amount: "$3.2M",
    date: "2024-02-15",
    type: "exit",
    status: "paid",
    lpsPaid: 25,
    totalLps: 25,
    lastUpdate: "2 weeks ago"
  },
  {
    id: "DIST-002",
    fundId: "FUND-003",
    fundName: "MIV Impact Fund",
    distributionNumber: "Dist #2",
    amount: "$1.5M",
    date: "2024-03-01",
    type: "dividend",
    status: "paid",
    lpsPaid: 18,
    totalLps: 18,
    lastUpdate: "1 week ago"
  },
  {
    id: "DIST-003",
    fundId: "FUND-004",
    fundName: "MIV Seed Fund",
    distributionNumber: "Dist #8",
    amount: "$2.1M",
    date: "2024-04-01",
    type: "exit",
    status: "announced",
    lpsPaid: 0,
    totalLps: 15,
    lastUpdate: "3 days ago"
  }
]

const fundStatuses = ["active", "closed", "winding_down"]
const distributionTypes = ["dividend", "exit", "refinancing", "other"]

export default function FundManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedVintage, setSelectedVintage] = useState("all")

  const filteredFunds = mockFunds.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fund.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || fund.status === selectedStatus
    const matchesVintage = selectedVintage === "all" || fund.vintage === selectedVintage
    
    return matchesSearch && matchesStatus && matchesVintage
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "closed": return <Clock className="h-4 w-4 text-blue-500" />
      case "winding_down": return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
      case "closed": return <Badge variant="outline" className="bg-blue-100 text-blue-800">Closed</Badge>
      case "winding_down": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Winding Down</Badge>
      default: return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getCallStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>
      case "in_progress": return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "pending": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default: return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getDistributionStatusBadge = (status: string) => {
    switch (status) {
      case "paid": return <Badge variant="default" className="bg-green-100 text-green-800">Paid</Badge>
      case "announced": return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Announced</Badge>
      case "pending": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default: return <Badge variant="secondary">Unknown</Badge>
    }
  }

  // Calculate fund metrics
  const totalFunds = mockFunds.length
  const activeFunds = mockFunds.filter(f => f.status === "active").length
  const totalCommittedCapital = mockFunds.reduce((sum, fund) => {
    const amount = parseFloat(fund.committedCapital.replace(/[^0-9.]/g, ''))
    return sum + amount
  }, 0)
  const totalCalledCapital = mockFunds.reduce((sum, fund) => {
    const amount = parseFloat(fund.calledCapital.replace(/[^0-9.]/g, ''))
    return sum + amount
  }, 0)
  const totalDistributedCapital = mockFunds.reduce((sum, fund) => {
    const amount = parseFloat(fund.distributedCapital.replace(/[^0-9.]/g, ''))
    return sum + amount
  }, 0)
  const averageIRR = mockFunds.reduce((sum, fund) => sum + fund.irr, 0) / totalFunds

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fund Management</h1>
          <p className="text-muted-foreground">
            Manage fund performance, capital calls, and distributions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Fund
        </Button>
      </div>

      {/* Fund Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funds</CardTitle>
            <ChartPie className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFunds}</div>
            <p className="text-xs text-muted-foreground">
              {activeFunds} active, {totalFunds - activeFunds} closed/winding down
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Committed Capital</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCommittedCapital.toFixed(0)}M</div>
            <p className="text-xs text-muted-foreground">
              Average: ${(totalCommittedCapital / totalFunds).toFixed(0)}M per fund
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Called Capital</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCalledCapital.toFixed(0)}M</div>
            <p className="text-xs text-muted-foreground">
              {((totalCalledCapital / totalCommittedCapital) * 100).toFixed(1)}% of committed
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

      {/* Fund Performance Distribution */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Fund Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fundStatuses.map((status) => {
                const count = mockFunds.filter(f => f.status === status).length
                const percentage = ((count / totalFunds) * 100).toFixed(1)
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
              <Building2 className="h-5 w-5" />
              Vintage Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from(new Set(mockFunds.map(f => f.vintage)))
                .sort()
                .map((vintage) => {
                  const count = mockFunds.filter(f => f.vintage === vintage).length
                  const percentage = ((count / totalFunds) * 100).toFixed(1)
                  return (
                    <div key={vintage} className="flex items-center justify-between">
                      <span className="text-sm">{vintage}</span>
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
              <Activity className="h-5 w-5" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Distributed</span>
                <div className="text-right">
                  <div className="font-medium">${totalDistributedCapital.toFixed(0)}M</div>
                  <div className="text-xs text-muted-foreground">
                    {((totalDistributedCapital / totalCalledCapital) * 100).toFixed(1)}% of called
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg TVPI</span>
                <div className="text-right">
                  <div className="font-medium">
                    {(mockFunds.reduce((sum, f) => sum + f.tvpi, 0) / totalFunds).toFixed(2)}x
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg DPI</span>
                <div className="text-right">
                  <div className="font-medium">
                    {(mockFunds.reduce((sum, f) => sum + f.dpi, 0) / totalFunds).toFixed(2)}x
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="funds" className="space-y-4">
        <TabsList>
          <TabsTrigger value="funds">Funds</TabsTrigger>
          <TabsTrigger value="capital-calls">Capital Calls</TabsTrigger>
          <TabsTrigger value="distributions">Distributions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="funds" className="space-y-4">
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
                      placeholder="Search funds..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
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
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="winding_down">Winding Down</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vintage</label>
                  <Select value={selectedVintage} onValueChange={setSelectedVintage}>
                    <SelectTrigger>
                      <SelectValue placeholder="All vintages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All vintages</SelectItem>
                      {Array.from(new Set(mockFunds.map(f => f.vintage)))
                        .sort()
                        .map(vintage => (
                          <SelectItem key={vintage} value={vintage}>{vintage}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Funds Table */}
          <Card>
            <CardHeader>
              <CardTitle>Funds ({filteredFunds.length})</CardTitle>
              <CardDescription>
                Overview of all funds and their performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fund</TableHead>
                    <TableHead>Vintage</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Called</TableHead>
                    <TableHead>Distributed</TableHead>
                    <TableHead>IRR</TableHead>
                    <TableHead>TVPI</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFunds.map((fund) => {
                    const calledPercentage = (parseFloat(fund.calledCapital.replace(/[^0-9.]/g, '')) / 
                                             parseFloat(fund.committedCapital.replace(/[^0-9.]/g, ''))) * 100
                    
                    return (
                      <TableRow key={fund.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{fund.name}</div>
                            <div className="text-sm text-muted-foreground">{fund.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{fund.vintage}</TableCell>
                        <TableCell className="font-medium">{fund.size}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{fund.calledCapital}</div>
                            <div className="text-sm text-muted-foreground">{calledPercentage.toFixed(1)}%</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{fund.distributedCapital}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${fund.irr > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {fund.irr > 0 ? '+' : ''}{fund.irr.toFixed(1)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{fund.tvpi.toFixed(2)}x</span>
                            {fund.tvpi > 1 ? (
                              <ArrowUpRight className="h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(fund.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                              {fund.fundManager.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm">{fund.fundManager}</span>
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

        <TabsContent value="capital-calls" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Capital Calls</CardTitle>
              <CardDescription>
                Track capital calls and LP responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fund</TableHead>
                    <TableHead>Call Number</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>LP Response</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCapitalCalls.map((call) => {
                    const responseRate = (call.lpsResponded / call.totalLps) * 100
                    
                    return (
                      <TableRow key={call.id}>
                        <TableCell>
                          <div className="font-medium">{call.fundName}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{call.callNumber}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{call.amount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{call.dueDate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={responseRate} className="w-16 h-2" />
                            <span className="text-sm">{call.lpsResponded}/{call.totalLps}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getCallStatusBadge(call.status)}</TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{call.lastUpdate}</span>
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
                              <Download className="h-4 w-4" />
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

        <TabsContent value="distributions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distributions</CardTitle>
              <CardDescription>
                Track fund distributions and LP payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fund</TableHead>
                    <TableHead>Distribution</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>LP Payments</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDistributions.map((dist) => {
                    const paymentRate = (dist.lpsPaid / dist.totalLps) * 100
                    
                    return (
                      <TableRow key={dist.id}>
                        <TableCell>
                          <div className="font-medium">{dist.fundName}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{dist.distributionNumber}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{dist.amount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{dist.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">{dist.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={paymentRate} className="w-16 h-2" />
                            <span className="text-sm">{dist.lpsPaid}/{dist.totalLps}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getDistributionStatusBadge(dist.status)}</TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{dist.lastUpdate}</span>
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
                              <Download className="h-4 w-4" />
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

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fund Analytics</CardTitle>
              <CardDescription>
                Detailed analytics and insights on fund performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Top Performing Funds</h4>
                  {mockFunds
                    .sort((a, b) => b.irr - a.irr)
                    .slice(0, 3)
                    .map((fund, index) => (
                      <div key={fund.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{fund.name}</div>
                            <div className="text-sm text-muted-foreground">{fund.vintage}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">+{fund.irr.toFixed(1)}%</div>
                          <div className="text-sm text-muted-foreground">{fund.tvpi.toFixed(2)}x TVPI</div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Capital Efficiency</h4>
                  {mockFunds
                    .sort((a, b) => {
                      const aEfficiency = parseFloat(a.distributedCapital.replace(/[^0-9.]/g, '')) / 
                                         parseFloat(a.calledCapital.replace(/[^0-9.]/g, ''))
                      const bEfficiency = parseFloat(b.distributedCapital.replace(/[^0-9.]/g, '')) / 
                                         parseFloat(b.calledCapital.replace(/[^0-9.]/g, ''))
                      return bEfficiency - aEfficiency
                    })
                    .slice(0, 3)
                    .map((fund) => {
                      const efficiency = parseFloat(fund.distributedCapital.replace(/[^0-9.]/g, '')) / 
                                       parseFloat(fund.calledCapital.replace(/[^0-9.]/g, ''))
                      return (
                        <div key={fund.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">{fund.name}</span>
                          <div className="text-right">
                            <div className="font-medium">{(efficiency * 100).toFixed(1)}%</div>
                            <div className="text-sm text-muted-foreground">
                              {fund.distributedCapital} / {fund.calledCapital}
                            </div>
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