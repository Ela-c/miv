"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart, 
  Plus, 
  Settings, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  Share2,
  Copy,
  Grid3X3,
  PieChart,
  LineChart,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Activity,
  Calendar,
  Filter,
  Search,
  MoreHorizontal,
  Star,
  Clock,
  CheckCircle
} from "lucide-react"

interface Dashboard {
  id: string
  name: string
  description: string
  category: string
  widgets: number
  lastModified: string
  isPublic: boolean
  isFavorite: boolean
  createdBy: string
}

interface Widget {
  id: string
  type: string
  title: string
  size: "small" | "medium" | "large"
  position: { x: number; y: number }
  data: any
}

const mockDashboards: Dashboard[] = [
  {
    id: "DASH-001",
    name: "Pipeline Overview",
    description: "Comprehensive view of deal pipeline and performance metrics",
    category: "Pipeline",
    widgets: 8,
    lastModified: "2 hours ago",
    isPublic: true,
    isFavorite: true,
    createdBy: "Sarah Johnson"
  },
  {
    id: "DASH-002",
    name: "Portfolio Performance",
    description: "Real-time portfolio performance and IRR tracking",
    category: "Portfolio",
    widgets: 12,
    lastModified: "1 day ago",
    isPublic: false,
    isFavorite: false,
    createdBy: "Mike Chen"
  },
  {
    id: "DASH-003",
    name: "GEDSI Impact Tracker",
    description: "Gender equality, diversity, and social inclusion metrics",
    category: "Impact",
    widgets: 6,
    lastModified: "3 days ago",
    isPublic: true,
    isFavorite: true,
    createdBy: "Lisa Wang"
  },
  {
    id: "DASH-004",
    name: "Due Diligence Status",
    description: "Track due diligence progress across all active deals",
    category: "Operations",
    widgets: 10,
    lastModified: "1 week ago",
    isPublic: false,
    isFavorite: false,
    createdBy: "David Smith"
  },
  {
    id: "DASH-005",
    name: "Team Performance",
    description: "Team productivity and deal flow metrics",
    category: "Team",
    widgets: 7,
    lastModified: "2 weeks ago",
    isPublic: true,
    isFavorite: false,
    createdBy: "Alex Rodriguez"
  }
]

const widgetTypes = [
  { type: "chart", name: "Chart", icon: BarChart, description: "Line, bar, or pie charts" },
  { type: "metric", name: "Metric", icon: Target, description: "Single value with trend" },
  { type: "table", name: "Table", icon: Grid3X3, description: "Data table with sorting" },
  { type: "progress", name: "Progress", icon: Progress, description: "Progress bars and gauges" },
  { type: "list", name: "List", icon: Activity, description: "Simple list of items" },
  { type: "calendar", name: "Calendar", icon: Calendar, description: "Calendar view" }
]

const categories = [
  "Pipeline",
  "Portfolio", 
  "Impact",
  "Operations",
  "Team",
  "Financial",
  "Custom"
]

export default function CustomDashboardsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedView, setSelectedView] = useState("all")
  const [isCreating, setIsCreating] = useState(false)

  const filteredDashboards = mockDashboards.filter(dashboard => {
    const matchesSearch = dashboard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dashboard.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || dashboard.category === selectedCategory
    const matchesView = selectedView === "all" || 
                       (selectedView === "favorites" && dashboard.isFavorite) ||
                       (selectedView === "public" && dashboard.isPublic) ||
                       (selectedView === "private" && !dashboard.isPublic)
    
    return matchesSearch && matchesCategory && matchesView
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Custom Dashboards</h1>
          <p className="text-muted-foreground">
            Create and manage your personalized dashboards
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Dashboard
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dashboards</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboards.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockDashboards.filter(d => d.isPublic).length} public, {mockDashboards.filter(d => !d.isPublic).length} private
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Widgets</CardTitle>
            <Grid3X3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDashboards.reduce((sum, d) => sum + d.widgets, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Average {Math.round(mockDashboards.reduce((sum, d) => sum + d.widgets, 0) / mockDashboards.length)} per dashboard
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDashboards.filter(d => d.isFavorite).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {((mockDashboards.filter(d => d.isFavorite).length / mockDashboards.length) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recently Updated</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDashboards.filter(d => d.lastModified.includes("hour") || d.lastModified.includes("day")).length}
            </div>
            <p className="text-xs text-muted-foreground">
              In the last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="dashboards" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboards">My Dashboards</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="widgets">Widget Library</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboards" className="space-y-4">
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
                      placeholder="Search dashboards..."
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
                  <label className="text-sm font-medium">View</label>
                  <Select value={selectedView} onValueChange={setSelectedView}>
                    <SelectTrigger>
                      <SelectValue placeholder="All views" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All dashboards</SelectItem>
                      <SelectItem value="favorites">Favorites</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboards Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDashboards.map((dashboard) => (
              <Card key={dashboard.id} className="relative group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{dashboard.name}</CardTitle>
                        {dashboard.isFavorite && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                        {dashboard.isPublic && (
                          <Badge variant="outline" className="text-xs">Public</Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">
                        {dashboard.description}
                      </CardDescription>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Widgets</span>
                      <span className="font-medium">{dashboard.widgets}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Category</span>
                      <Badge variant="secondary" className="text-xs">{dashboard.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last modified</span>
                      <span className="text-muted-foreground">{dashboard.lastModified}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Created by</span>
                      <span className="text-muted-foreground">{dashboard.createdBy}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Templates</CardTitle>
              <CardDescription>
                Pre-built dashboard templates to get you started quickly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-base">Pipeline Overview</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete pipeline tracking with deal flow metrics
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">8 widgets</Badge>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-base">Portfolio Performance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">
                      Portfolio tracking with IRR and performance metrics
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">12 widgets</Badge>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <CardTitle className="text-base">GEDSI Impact</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">
                      Gender equality and social impact tracking
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">6 widgets</Badge>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-orange-600" />
                      <CardTitle className="text-base">Due Diligence</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">
                      Due diligence process tracking and management
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">10 widgets</Badge>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-base">Financial Overview</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">
                      Financial metrics and investment tracking
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">9 widgets</Badge>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-red-600" />
                      <CardTitle className="text-base">Team Performance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">
                      Team productivity and performance metrics
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">7 widgets</Badge>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="widgets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Widget Library</CardTitle>
              <CardDescription>
                Available widgets to add to your dashboards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {widgetTypes.map((widget) => (
                  <Card key={widget.type} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <widget.icon className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-base">{widget.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3">
                        {widget.description}
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        Add Widget
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 