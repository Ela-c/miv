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
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { 
  Shield, 
  Filter, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Users,
  Calendar,
  Download,
  Upload,
  MessageSquare,
  Star,
  TrendingUp,
  Target,
  Activity
} from "lucide-react"

interface DueDiligenceItem {
  id: string
  company: string
  stage: string
  category: string
  assignedTo: string
  dueDate: string
  completion: number
  priority: "high" | "medium" | "low"
  status: "not_started" | "in_progress" | "completed" | "blocked"
  lastUpdated: string
  documents: number
  comments: number
}

interface ChecklistItem {
  id: string
  title: string
  description: string
  category: string
  completed: boolean
  assignedTo: string
  dueDate: string
  priority: "high" | "medium" | "low"
}

const mockDueDiligenceItems: DueDiligenceItem[] = [
  {
    id: "DD-001",
    company: "TechFlow Solutions",
    stage: "Financial Review",
    category: "Financial",
    assignedTo: "Sarah Johnson",
    dueDate: "2024-03-15",
    completion: 75,
    priority: "high",
    status: "in_progress",
    lastUpdated: "2 hours ago",
    documents: 12,
    comments: 8
  },
  {
    id: "DD-002",
    company: "GreenEnergy Innovations",
    stage: "Legal Review",
    category: "Legal",
    assignedTo: "Mike Chen",
    dueDate: "2024-03-10",
    completion: 90,
    priority: "high",
    status: "completed",
    lastUpdated: "1 day ago",
    documents: 18,
    comments: 15
  },
  {
    id: "DD-003",
    company: "HealthTech Pro",
    stage: "Technical Assessment",
    category: "Technical",
    assignedTo: "David Smith",
    dueDate: "2024-03-20",
    completion: 45,
    priority: "medium",
    status: "in_progress",
    lastUpdated: "3 days ago",
    documents: 8,
    comments: 3
  },
  {
    id: "DD-004",
    company: "FinTech Revolution",
    stage: "Market Analysis",
    category: "Market",
    assignedTo: "Lisa Wang",
    dueDate: "2024-03-25",
    completion: 30,
    priority: "medium",
    status: "not_started",
    lastUpdated: "1 week ago",
    documents: 5,
    comments: 2
  },
  {
    id: "DD-005",
    company: "EduTech Platform",
    stage: "Team Assessment",
    category: "Team",
    assignedTo: "Alex Rodriguez",
    dueDate: "2024-03-18",
    completion: 100,
    priority: "low",
    status: "completed",
    lastUpdated: "2 days ago",
    documents: 15,
    comments: 12
  }
]

const mockChecklistItems: ChecklistItem[] = [
  {
    id: "CL-001",
    title: "Financial Statements Review",
    description: "Review audited financial statements for the last 3 years",
    category: "Financial",
    completed: true,
    assignedTo: "Sarah Johnson",
    dueDate: "2024-03-15",
    priority: "high"
  },
  {
    id: "CL-002",
    title: "Legal Structure Analysis",
    description: "Analyze corporate structure, contracts, and legal obligations",
    category: "Legal",
    completed: true,
    assignedTo: "Mike Chen",
    dueDate: "2024-03-10",
    priority: "high"
  },
  {
    id: "CL-003",
    title: "Technology Stack Assessment",
    description: "Evaluate technology architecture and scalability",
    category: "Technical",
    completed: false,
    assignedTo: "David Smith",
    dueDate: "2024-03-20",
    priority: "medium"
  },
  {
    id: "CL-004",
    title: "Market Size Validation",
    description: "Verify TAM, SAM, and SOM calculations",
    category: "Market",
    completed: false,
    assignedTo: "Lisa Wang",
    dueDate: "2024-03-25",
    priority: "medium"
  },
  {
    id: "CL-005",
    title: "Team Background Checks",
    description: "Conduct background checks on key team members",
    category: "Team",
    completed: true,
    assignedTo: "Alex Rodriguez",
    dueDate: "2024-03-18",
    priority: "low"
  }
]

const categories = [
  "Financial",
  "Legal", 
  "Technical",
  "Market",
  "Team",
  "Operations",
  "Compliance"
]

const stages = [
  "Initial Review",
  "Financial Review",
  "Legal Review", 
  "Technical Assessment",
  "Market Analysis",
  "Team Assessment",
  "Final Report"
]

export default function DueDiligencePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")

  const filteredItems = mockDueDiligenceItems.filter(item => {
    const matchesSearch = item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesStage = selectedStage === "all" || item.stage === selectedStage
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
    const matchesPriority = selectedPriority === "all" || item.priority === selectedPriority
    
    return matchesSearch && matchesCategory && matchesStage && matchesStatus && matchesPriority
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in_progress": return <Clock className="h-4 w-4 text-blue-500" />
      case "not_started": return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "blocked": return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>
      case "in_progress": return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "not_started": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Not Started</Badge>
      case "blocked": return <Badge variant="destructive">Blocked</Badge>
      default: return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return <Badge variant="destructive">High</Badge>
      case "medium": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low": return <Badge variant="outline" className="bg-green-100 text-green-800">Low</Badge>
      default: return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const totalItems = mockDueDiligenceItems.length
  const completedItems = mockDueDiligenceItems.filter(d => d.status === "completed").length
  const inProgressItems = mockDueDiligenceItems.filter(d => d.status === "in_progress").length
  const averageCompletion = mockDueDiligenceItems.reduce((sum, item) => sum + item.completion, 0) / totalItems

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Due Diligence</h1>
          <p className="text-muted-foreground">
            Manage due diligence processes and track progress
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Due Diligence
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Across {mockDueDiligenceItems.length} companies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedItems}</div>
            <p className="text-xs text-muted-foreground">
              {((completedItems / totalItems) * 100).toFixed(1)}% completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressItems}</div>
            <p className="text-xs text-muted-foreground">
              {((inProgressItems / totalItems) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCompletion.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              Across all active items
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
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
                      placeholder="Search items..."
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
                      <SelectItem value="not_started">Not Started</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="All priorities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Due Diligence Items Table */}
          <Card>
            <CardHeader>
              <CardTitle>Due Diligence Items ({filteredItems.length})</CardTitle>
              <CardDescription>
                Track progress of due diligence activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.company}</div>
                          <div className="text-sm text-muted-foreground">{item.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.stage}</Badge>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                            {item.assignedTo.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm">{item.assignedTo}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={item.completion} className="w-16 h-2" />
                          <span className="text-sm">{item.completion}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          {getStatusBadge(item.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item.dueDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
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

        <TabsContent value="checklist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Due Diligence Checklist</CardTitle>
              <CardDescription>
                Standard checklist items for due diligence process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockChecklistItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                    <Checkbox 
                      checked={item.completed}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(item.priority)}
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Assigned to: {item.assignedTo}</span>
                        <span className="text-muted-foreground">Due: {item.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>
                Upload and manage due diligence documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Documents
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download All
                  </Button>
                </div>
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No documents uploaded yet</p>
                  <p className="text-sm">Upload documents to start the due diligence process</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Due Diligence Reports</CardTitle>
              <CardDescription>
                Generate and view due diligence reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                    <FileText className="h-8 w-8 mb-2" />
                    <span>Financial Report</span>
                  </Button>
                  <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                    <Shield className="h-8 w-8 mb-2" />
                    <span>Legal Report</span>
                  </Button>
                  <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                    <Activity className="h-8 w-8 mb-2" />
                    <span>Technical Report</span>
                  </Button>
                  <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                    <TrendingUp className="h-8 w-8 mb-2" />
                    <span>Market Report</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 