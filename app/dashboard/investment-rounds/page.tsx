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
  Zap
} from "lucide-react"

interface InvestmentRound {
  id: string
  company: string
  roundType: string
  stage: string
  targetAmount: string
  raisedAmount: string
  closingDate: string
  status: "open" | "closing" | "closed" | "cancelled"
  leadInvestor: string
  participants: string[]
  valuation: string
  ownership: number
  documents: number
  lastUpdate: string
}

const mockInvestmentRounds: InvestmentRound[] = [
  {
    id: "ROUND-001",
    company: "TechFlow Solutions",
    roundType: "Series B",
    stage: "Growth",
    targetAmount: "$5.0M",
    raisedAmount: "$4.2M",
    closingDate: "2024-03-31",
    status: "closing",
    leadInvestor: "Sequoia Capital",
    participants: ["MIV Fund", "Andreessen Horowitz", "Accel"],
    valuation: "$25M",
    ownership: 15.5,
    documents: 12,
    lastUpdate: "2 hours ago"
  },
  {
    id: "ROUND-002",
    company: "GreenEnergy Innovations",
    roundType: "Series A",
    stage: "Early",
    targetAmount: "$2.5M",
    raisedAmount: "$2.5M",
    closingDate: "2024-02-15",
    status: "closed",
    leadInvestor: "MIV Fund",
    participants: ["Climate Fund", "Energy Ventures"],
    valuation: "$12M",
    ownership: 20.8,
    documents: 18,
    lastUpdate: "1 week ago"
  },
  {
    id: "ROUND-003",
    company: "HealthTech Pro",
    roundType: "Seed",
    stage: "Seed",
    targetAmount: "$1.0M",
    raisedAmount: "$750K",
    closingDate: "2024-04-30",
    status: "open",
    leadInvestor: "Y Combinator",
    participants: ["MIV Fund", "Angel Investors"],
    valuation: "$5M",
    ownership: 15.0,
    documents: 8,
    lastUpdate: "3 days ago"
  },
  {
    id: "ROUND-004",
    company: "FinTech Revolution",
    roundType: "Series C",
    stage: "Growth",
    targetAmount: "$10.0M",
    raisedAmount: "$8.5M",
    closingDate: "2024-01-20",
    status: "closed",
    leadInvestor: "Tiger Global",
    participants: ["MIV Fund", "SoftBank", "Insight Partners"],
    valuation: "$85M",
    ownership: 10.0,
    documents: 25,
    lastUpdate: "2 weeks ago"
  },
  {
    id: "ROUND-005",
    company: "EduTech Platform",
    roundType: "Series A",
    stage: "Early",
    targetAmount: "$3.0M",
    raisedAmount: "$0",
    closingDate: "2024-05-15",
    status: "open",
    leadInvestor: "MIV Fund",
    participants: ["Education Fund"],
    valuation: "$15M",
    ownership: 20.0,
    documents: 5,
    lastUpdate: "1 day ago"
  }
]

const roundTypes = [
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C",
  "Series D",
  "Series E+",
  "Growth",
  "IPO"
]

const stages = [
  "Seed",
  "Early",
  "Growth",
  "Late",
  "Exit"
]

export default function InvestmentRoundsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRoundType, setSelectedRoundType] = useState("all")
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredRounds = mockInvestmentRounds.filter(round => {
    const matchesSearch = round.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         round.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRoundType = selectedRoundType === "all" || round.roundType === selectedRoundType
    const matchesStage = selectedStage === "all" || round.stage === selectedStage
    const matchesStatus = selectedStatus === "all" || round.status === selectedStatus
    
    return matchesSearch && matchesRoundType && matchesStage && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "closed": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "closing": return <Clock className="h-4 w-4 text-blue-500" />
      case "open": return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "cancelled": return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "closed": return <Badge variant="default" className="bg-green-100 text-green-800">Closed</Badge>
      case "closing": return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Closing</Badge>
      case "open": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Open</Badge>
      case "cancelled": return <Badge variant="destructive">Cancelled</Badge>
      default: return <Badge variant="secondary">Unknown</Badge>
    }
  }

  // Calculate metrics
  const totalRounds = mockInvestmentRounds.length
  const openRounds = mockInvestmentRounds.filter(r => r.status === "open").length
  const closedRounds = mockInvestmentRounds.filter(r => r.status === "closed").length
  const totalTargetAmount = mockInvestmentRounds.reduce((sum, round) => {
    const amount = parseFloat(round.targetAmount.replace(/[^0-9.]/g, ''))
    return sum + amount
  }, 0)
  const totalRaisedAmount = mockInvestmentRounds.reduce((sum, round) => {
    const amount = parseFloat(round.raisedAmount.replace(/[^0-9.]/g, ''))
    return sum + amount
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Rounds</h1>
          <p className="text-muted-foreground">
            Track investment rounds and funding progress
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Round
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rounds</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRounds}</div>
            <p className="text-xs text-muted-foreground">
              {openRounds} open, {closedRounds} closed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalTargetAmount.toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              Average: ${(totalTargetAmount / totalRounds).toFixed(1)}M per round
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Raised Amount</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRaisedAmount.toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              {((totalRaisedAmount / totalTargetAmount) * 100).toFixed(1)}% of target
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((closedRounds / totalRounds) * 100).toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {closedRounds} successful rounds
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Round Distribution */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Round Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roundTypes.slice(0, 6).map((roundType) => {
                const count = mockInvestmentRounds.filter(r => r.roundType === roundType).length
                const percentage = ((count / totalRounds) * 100).toFixed(1)
                return (
                  <div key={roundType} className="flex items-center justify-between">
                    <span className="text-sm">{roundType}</span>
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
              Stage Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stages.map((stage) => {
                const count = mockInvestmentRounds.filter(r => r.stage === stage).length
                const percentage = ((count / totalRounds) * 100).toFixed(1)
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["open", "closing", "closed", "cancelled"].map((status) => {
                const count = mockInvestmentRounds.filter(r => r.status === status).length
                const percentage = ((count / totalRounds) * 100).toFixed(1)
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status)}
                      <span className="text-sm capitalize">{status}</span>
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
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
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
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search rounds..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Round Type</label>
                  <Select value={selectedRoundType} onValueChange={setSelectedRoundType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All round types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All round types</SelectItem>
                      {roundTypes.map(roundType => (
                        <SelectItem key={roundType} value={roundType}>{roundType}</SelectItem>
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
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closing">Closing</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Rounds Table */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Rounds ({filteredRounds.length})</CardTitle>
              <CardDescription>
                Track all investment rounds and their progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Round</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Raised</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Lead Investor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Closing Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRounds.map((round) => {
                    const targetAmount = parseFloat(round.targetAmount.replace(/[^0-9.]/g, ''))
                    const raisedAmount = parseFloat(round.raisedAmount.replace(/[^0-9.]/g, ''))
                    const progress = (raisedAmount / targetAmount) * 100
                    
                    return (
                      <TableRow key={round.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{round.company}</div>
                            <div className="text-sm text-muted-foreground">{round.id}</div>
                            <div className="text-sm text-muted-foreground">{round.stage}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{round.roundType}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{round.targetAmount}</TableCell>
                        <TableCell className="font-medium">{round.raisedAmount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={progress} className="w-16 h-2" />
                            <span className="text-sm">{progress.toFixed(0)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                              {round.leadInvestor.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm">{round.leadInvestor}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(round.status)}
                            {getStatusBadge(round.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{round.closingDate}</span>
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
                              <Download className="h-4 w-4" />
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

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment Timeline</CardTitle>
              <CardDescription>
                Timeline view of investment rounds and key milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockInvestmentRounds
                  .sort((a, b) => new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime())
                  .map((round, index) => (
                    <div key={round.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        {index < mockInvestmentRounds.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{round.company} - {round.roundType}</h4>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(round.status)}
                            <span className="text-sm text-muted-foreground">{round.closingDate}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Target: {round.targetAmount} | Raised: {round.raisedAmount} | Lead: {round.leadInvestor}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">Valuation: {round.valuation}</span>
                          <span className="text-muted-foreground">Ownership: {round.ownership}%</span>
                          <span className="text-muted-foreground">{round.participants.length} participants</span>
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
              <CardTitle>Investment Analytics</CardTitle>
              <CardDescription>
                Detailed analytics and insights on investment rounds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Top Lead Investors</h4>
                  {Array.from(new Set(mockInvestmentRounds.map(r => r.leadInvestor)))
                    .map(investor => {
                      const rounds = mockInvestmentRounds.filter(r => r.leadInvestor === investor)
                      const totalAmount = rounds.reduce((sum, r) => {
                        const amount = parseFloat(r.targetAmount.replace(/[^0-9.]/g, ''))
                        return sum + amount
                      }, 0)
                      return (
                        <div key={investor} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">{investor}</span>
                          <div className="text-right">
                            <div className="font-medium">${totalAmount.toFixed(1)}M</div>
                            <div className="text-sm text-muted-foreground">{rounds.length} rounds</div>
                          </div>
                        </div>
                      )
                    })}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Round Type Performance</h4>
                  {roundTypes.slice(0, 5).map((roundType) => {
                    const rounds = mockInvestmentRounds.filter(r => r.roundType === roundType)
                    const avgTarget = rounds.reduce((sum, r) => {
                      const amount = parseFloat(r.targetAmount.replace(/[^0-9.]/g, ''))
                      return sum + amount
                    }, 0) / rounds.length
                    return (
                      <div key={roundType} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{roundType}</span>
                        <div className="text-right">
                          <div className="font-medium">${avgTarget.toFixed(1)}M avg</div>
                          <div className="text-sm text-muted-foreground">{rounds.length} rounds</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Round Documents</CardTitle>
              <CardDescription>
                Manage documents related to investment rounds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Upload Documents
                  </Button>
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share All
                  </Button>
                </div>
                <div className="text-center py-12 text-muted-foreground">
                  <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No documents uploaded yet</p>
                  <p className="text-sm">Upload documents to track round progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 