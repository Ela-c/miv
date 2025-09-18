"use client"

import React, { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, 
  Plus, 
  Eye, 
  Edit, 
  MoreHorizontal,
  Clock,
  Users,
  MapPin,
  Video,
  Phone,
  Building2,
  Target,
  AlertTriangle,
  CheckCircle,
  Filter,
  Search,
  Download,
  Share2,
  Star,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  CalendarRange,
  CalendarCheck
} from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  type: "meeting" | "call" | "board_meeting" | "due_diligence" | "presentation" | "deadline" | "other"
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  location: string
  attendees: string[]
  organizer: string
  status: "scheduled" | "in_progress" | "completed" | "cancelled"
  priority: "high" | "medium" | "low"
  company?: string
  dealId?: string
  notes?: string
  lastUpdate: string
}

const mockEvents: Event[] = [
  {
    id: "EVENT-001",
    title: "TechFlow Solutions - Due Diligence Call",
    description: "Technical due diligence call with TechFlow Solutions team",
    type: "due_diligence",
    startDate: "2024-03-15",
    endDate: "2024-03-15",
    startTime: "10:00",
    endTime: "11:30",
    location: "Zoom Meeting",
    attendees: ["Sarah Johnson", "Mike Chen", "David Smith"],
    organizer: "Sarah Johnson",
    status: "scheduled",
    priority: "high",
    company: "TechFlow Solutions",
    dealId: "DEAL-001",
    notes: "Prepare technical questions and review financials",
    lastUpdate: "2 hours ago"
  },
  {
    id: "EVENT-002",
    title: "MIV Fund I - Board Meeting",
    description: "Quarterly board meeting for MIV Fund I",
    type: "board_meeting",
    startDate: "2024-03-20",
    endDate: "2024-03-20",
    startTime: "14:00",
    endTime: "16:00",
    location: "Conference Room A",
    attendees: ["Sarah Johnson", "Mike Chen", "Lisa Wang", "Board Members"],
    organizer: "Sarah Johnson",
    status: "scheduled",
    priority: "high",
    notes: "Review portfolio performance and discuss new investments",
    lastUpdate: "1 day ago"
  },
  {
    id: "EVENT-003",
    title: "GreenEnergy Innovations - Investment Committee",
    description: "Investment committee review for GreenEnergy Innovations",
    type: "meeting",
    startDate: "2024-03-18",
    endDate: "2024-03-18",
    startTime: "13:00",
    endTime: "14:30",
    location: "Meeting Room B",
    attendees: ["Mike Chen", "Lisa Wang", "Alex Rodriguez"],
    organizer: "Mike Chen",
    status: "scheduled",
    priority: "medium",
    company: "GreenEnergy Innovations",
    dealId: "DEAL-002",
    notes: "Present investment thesis and due diligence findings",
    lastUpdate: "3 days ago"
  },
  {
    id: "EVENT-004",
    title: "HealthTech Pro - Founder Meeting",
    description: "Meeting with HealthTech Pro founders",
    type: "meeting",
    startDate: "2024-03-16",
    endDate: "2024-03-16",
    startTime: "15:00",
    endTime: "16:00",
    location: "Coffee Shop - Downtown",
    attendees: ["David Smith", "HealthTech Pro Founders"],
    organizer: "David Smith",
    status: "scheduled",
    priority: "medium",
    company: "HealthTech Pro",
    dealId: "DEAL-003",
    notes: "Discuss partnership opportunities and growth strategy",
    lastUpdate: "1 week ago"
  },
  {
    id: "EVENT-005",
    title: "FinTech Revolution - Term Sheet Deadline",
    description: "Deadline for FinTech Revolution term sheet",
    type: "deadline",
    startDate: "2024-03-25",
    endDate: "2024-03-25",
    startTime: "17:00",
    endTime: "17:00",
    location: "N/A",
    attendees: ["Emma Davis", "Tom Wilson"],
    organizer: "Emma Davis",
    status: "scheduled",
    priority: "high",
    company: "FinTech Revolution",
    dealId: "DEAL-004",
    notes: "Finalize term sheet and send to company",
    lastUpdate: "2 days ago"
  },
  {
    id: "EVENT-006",
    title: "Portfolio Company Quarterly Review",
    description: "Quarterly review with portfolio companies",
    type: "meeting",
    startDate: "2024-03-22",
    endDate: "2024-03-22",
    startTime: "09:00",
    endTime: "12:00",
    location: "Main Conference Room",
    attendees: ["Sarah Johnson", "Mike Chen", "Lisa Wang", "Portfolio CEOs"],
    organizer: "Sarah Johnson",
    status: "scheduled",
    priority: "medium",
    notes: "Review quarterly performance and strategic initiatives",
    lastUpdate: "4 days ago"
  }
]

const eventTypes = [
  "meeting",
  "call", 
  "board_meeting",
  "due_diligence",
  "presentation",
  "deadline",
  "other"
]

const priorities = ["high", "medium", "low"]
const statuses = ["scheduled", "in_progress", "completed", "cancelled"]

export default function CalendarPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedView, setSelectedView] = useState("upcoming")
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.company && event.company.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === "all" || event.type === selectedType
    const matchesPriority = selectedPriority === "all" || event.priority === selectedPriority
    const matchesStatus = selectedStatus === "all" || event.status === selectedStatus
    
    // Filter by view
    const today = new Date()
    const eventDate = new Date(event.startDate)
    const isUpcoming = eventDate >= today
    const isPast = eventDate < today
    
    const matchesView = selectedView === "all" || 
                       (selectedView === "upcoming" && isUpcoming) ||
                       (selectedView === "past" && isPast)
    
    return matchesSearch && matchesType && matchesPriority && matchesStatus && matchesView
  })

  const monthMatrix = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDayIdx = firstDay.getDay() // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const cells: { date: Date, inMonth: boolean }[] = []

    // prev month leading days
    const prevMonthDays = new Date(year, month, 0).getDate()
    for (let i = startDayIdx - 1; i >= 0; i--) {
      cells.push({ date: new Date(year, month - 1, prevMonthDays - i), inMonth: false })
    }
    // current month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(year, month, d), inMonth: true })
    }
    // next month trailing to complete 6x7 grid
    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1].date
      const next = new Date(last)
      next.setDate(last.getDate() + 1)
      cells.push({ date: next, inMonth: false })
    }
    // Ensure 6 rows (42 cells)
    while (cells.length < 42) {
      const last = cells[cells.length - 1].date
      const next = new Date(last)
      next.setDate(last.getDate() + 1)
      cells.push({ date: next, inMonth: false })
    }

    return cells
  }, [currentMonth])

  const eventsByDay = useMemo(() => {
    const map = new Map<string, Event[]>()
    for (const ev of filteredEvents) {
      const d = new Date(ev.startDate)
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(ev)
    }
    return map
  }, [filteredEvents])

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "meeting": return <Users className="h-4 w-4" />
      case "call": return <Phone className="h-4 w-4" />
      case "board_meeting": return <Building2 className="h-4 w-4" />
      case "due_diligence": return <Target className="h-4 w-4" />
      case "presentation": return <Video className="h-4 w-4" />
      case "deadline": return <AlertTriangle className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case "meeting": return <Badge variant="outline" className="bg-blue-100 text-blue-800">Meeting</Badge>
      case "call": return <Badge variant="outline" className="bg-green-100 text-green-800">Call</Badge>
      case "board_meeting": return <Badge variant="outline" className="bg-purple-100 text-purple-800">Board Meeting</Badge>
      case "due_diligence": return <Badge variant="outline" className="bg-orange-100 text-orange-800">Due Diligence</Badge>
      case "presentation": return <Badge variant="outline" className="bg-pink-100 text-pink-800">Presentation</Badge>
      case "deadline": return <Badge variant="outline" className="bg-red-100 text-red-800">Deadline</Badge>
      default: return <Badge variant="outline">Other</Badge>
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled": return <Badge variant="outline" className="bg-blue-100 text-blue-800">Scheduled</Badge>
      case "in_progress": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">In Progress</Badge>
      case "completed": return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>
      case "cancelled": return <Badge variant="destructive">Cancelled</Badge>
      default: return <Badge variant="secondary">Unknown</Badge>
    }
  }

  // Calculate metrics
  const totalEvents = mockEvents.length
  const upcomingEvents = mockEvents.filter(e => new Date(e.startDate) >= new Date()).length
  const highPriorityEvents = mockEvents.filter(e => e.priority === "high").length
  const todayEvents = mockEvents.filter(e => e.startDate === new Date().toISOString().split('T')[0]).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar & Events</h1>
          <p className="text-muted-foreground">
            Manage team schedules, meetings, and important events
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Event
        </Button>
      </div>

      {/* Calendar Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingEvents} upcoming, {totalEvents - upcomingEvents} past
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayEvents}</div>
            <p className="text-xs text-muted-foreground">
              {todayEvents > 0 ? "Events scheduled" : "No events today"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highPriorityEvents}</div>
            <p className="text-xs text-muted-foreground">
              {((highPriorityEvents / totalEvents) * 100).toFixed(1)}% of total events
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <CalendarRange className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockEvents.filter(e => {
                const eventDate = new Date(e.startDate)
                const today = new Date()
                const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
                return eventDate >= today && eventDate <= weekFromNow
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Events in next 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Event Type Distribution */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Event Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventTypes.map((type) => {
                const count = mockEvents.filter(e => e.type === type).length
                const percentage = ((count / totalEvents) * 100).toFixed(1)
                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getEventTypeIcon(type)}
                      <span className="text-sm capitalize">{type.replace('_', ' ')}</span>
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
              <AlertTriangle className="h-5 w-5" />
              Priority Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priorities.map((priority) => {
                const count = mockEvents.filter(e => e.priority === priority).length
                const percentage = ((count / totalEvents) * 100).toFixed(1)
                return (
                  <div key={priority} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{priority}</span>
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
              {statuses.map((status) => {
                const count = mockEvents.filter(e => e.status === status).length
                const percentage = ((count / totalEvents) * 100).toFixed(1)
                return (
                  <div key={status} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}</span>
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
      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
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
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      {eventTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1)}
                        </SelectItem>
                      ))}
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
                      {priorities.map(priority => (
                        <SelectItem key={priority} value={priority}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
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
                <div className="space-y-2">
                  <label className="text-sm font-medium">View</label>
                  <Select value={selectedView} onValueChange={setSelectedView}>
                    <SelectTrigger>
                      <SelectValue placeholder="All events" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All events</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="past">Past</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            {getEventTypeBadge(event.type)}
                            {getPriorityBadge(event.priority)}
                            {getStatusBadge(event.status)}
                          </div>
                          <p className="text-muted-foreground mb-3">{event.description}</p>
                          
                          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{event.startDate} {event.startTime} - {event.endTime}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{event.attendees.length} attendees</span>
                            </div>
                            {event.company && (
                              <div className="flex items-center gap-2 text-sm">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span>{event.company}</span>
                              </div>
                            )}
                          </div>
                          
                          {event.notes && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-muted-foreground">
                                <strong>Notes:</strong> {event.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Monthly calendar view of all events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>Prev</Button>
                  <Button variant="outline" onClick={() => setCurrentMonth(new Date())}>Today</Button>
                  <Button variant="outline" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>Next</Button>
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-xs font-medium text-gray-500 mb-2">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                  <div key={d} className="text-center">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {monthMatrix.map(({ date, inMonth }, idx) => {
                  const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                  const dayEvents = eventsByDay.get(key) || []
                  const isToday = (() => { const t=new Date(); return t.toDateString()===date.toDateString() })()
                  return (
                    <div key={idx} className={`border rounded p-2 min-h-24 ${inMonth ? 'bg-white' : 'bg-gray-50'} ${isToday ? 'ring-2 ring-blue-500' : ''}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${inMonth ? 'text-gray-900' : 'text-gray-400'}`}>{date.getDate()}</span>
                        {dayEvents.length > 0 && (
                          <Badge variant="secondary" className="text-[10px]">{dayEvents.length}</Badge>
                        )}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0,3).map(ev => (
                          <div key={ev.id} className="text-[11px] truncate px-1 py-0.5 rounded bg-blue-50 text-blue-700">
                            {ev.title}
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-[11px] text-gray-500">+{dayEvents.length - 3} more</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meetings</CardTitle>
              <CardDescription>
                Focus on meetings and calls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvents
                  .filter(e => ["meeting", "call", "board_meeting", "due_diligence"].includes(e.type))
                  .map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.startDate} {event.startTime} - {event.endTime}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {event.attendees.length} attendees • {event.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(event.priority)}
                        {getStatusBadge(event.status)}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deadlines</CardTitle>
              <CardDescription>
                Track important deadlines and due dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvents
                  .filter(e => e.type === "deadline")
                  .map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                          <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">
                            Due: {event.startDate} {event.startTime}
                          </div>
                          {event.company && (
                            <div className="text-sm text-muted-foreground">
                              Company: {event.company}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(event.priority)}
                        {getStatusBadge(event.status)}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 