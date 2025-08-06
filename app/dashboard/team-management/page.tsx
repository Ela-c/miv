"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Briefcase,
  MessageSquare,
  CalendarDays,
  Plus,
  Search,
  Mail,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  MapPin,
  FileText,
  Lightbulb,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// --- Dummy Data ---
interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  phone: string
  skills: string[]
  bio: string
  avatar: string
  projects: string[]
}

interface Project {
  id: string
  name: string
  status: "Not Started" | "In Progress" | "Completed" | "On Hold"
  progress: number
  dueDate: string
  lead: string
  tasks: { id: string; name: string; assignedTo: string; completed: boolean }[]
  members: string[] // Member IDs
}

interface Announcement {
  id: string
  title: string
  content: string
  date: string
  author: string
}

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  attendees: string[] // Member IDs
}

const initialTeamMembers: TeamMember[] = [
  {
    id: "TM001",
    name: "Alice Johnson",
    role: "Project Manager",
    email: "alice.j@example.com",
    phone: "+1234567890",
    skills: ["Project Management", "Leadership", "Communication"],
    bio: "Experienced project manager with a strong track record of leading cross-functional teams to deliver successful projects on time and within budget.",
    avatar: "/placeholder.svg?height=100&width=100",
    projects: ["PR001", "PR003"],
  },
  {
    id: "TM002",
    name: "Bob Williams",
    role: "Software Engineer",
    email: "bob.w@example.com",
    phone: "+1987654321",
    skills: ["React", "Node.js", "Database Design"],
    bio: "Full-stack software engineer passionate about building scalable and efficient web applications. Always eager to learn new technologies.",
    avatar: "/placeholder.svg?height=100&width=100",
    projects: ["PR001", "PR002"],
  },
  {
    id: "TM003",
    name: "Carol Davis",
    role: "UX Designer",
    email: "carol.d@example.com",
    phone: "+1122334455",
    skills: ["UI/UX Design", "Figma", "User Research"],
    bio: "Creative UX designer focused on crafting intuitive and delightful user experiences. Believes in user-centered design principles.",
    avatar: "/placeholder.svg?height=100&width=100",
    projects: ["PR002"],
  },
  {
    id: "TM004",
    name: "David Lee",
    role: "Data Analyst",
    email: "david.l@example.com",
    phone: "+1556677889",
    skills: ["Data Analysis", "SQL", "Python", "Tableau"],
    bio: "Detail-oriented data analyst with expertise in extracting insights from complex datasets to drive business decisions.",
    avatar: "/placeholder.svg?height=100&width=100",
    projects: ["PR003"],
  },
]

const initialProjects: Project[] = [
  {
    id: "PR001",
    name: "Dashboard Redesign",
    status: "In Progress",
    progress: 60,
    dueDate: "2024-03-31",
    lead: "Alice Johnson",
    tasks: [
      { id: "T001", name: "Gather user requirements", assignedTo: "Carol Davis", completed: true },
      { id: "T002", name: "Design wireframes", assignedTo: "Carol Davis", completed: true },
      { id: "T003", name: "Develop frontend components", assignedTo: "Bob Williams", completed: false },
      { id: "T004", name: "Integrate backend APIs", assignedTo: "Bob Williams", completed: false },
    ],
    members: ["TM001", "TM002", "TM003"],
  },
  {
    id: "PR002",
    name: "Mobile App Development",
    status: "Not Started",
    progress: 0,
    dueDate: "2024-06-30",
    lead: "Alice Johnson",
    tasks: [],
    members: ["TM001", "TM002", "TM003"],
  },
  {
    id: "PR003",
    name: "Data Analytics Platform",
    status: "Completed",
    progress: 100,
    dueDate: "2024-01-15",
    lead: "David Lee",
    tasks: [
      { id: "T005", name: "Database setup", assignedTo: "David Lee", completed: true },
      { id: "T006", name: "ETL pipeline development", assignedTo: "David Lee", completed: true },
    ],
    members: ["TM001", "TM004"],
  },
]

const initialAnnouncements: Announcement[] = [
  {
    id: "AN001",
    title: "New Project: Mobile App Development Kicked Off!",
    content:
      "Exciting news! We've officially started the 'Mobile App Development' project. This will be a key initiative for Q2. Alice Johnson will be leading this project. More details to follow in the project management section.",
    date: "2024-02-28",
    author: "Management Team",
  },
  {
    id: "AN002",
    title: "Team Meeting Rescheduled",
    content:
      "Please note that the weekly team sync-up meeting for this Friday has been rescheduled to next Monday at 10:00 AM. An updated calendar invite has been sent out.",
    date: "2024-02-26",
    author: "Alice Johnson",
  },
]

const initialEvents: Event[] = [
  {
    id: "EV001",
    title: "Weekly Team Sync",
    date: "2024-03-04",
    time: "10:00 AM",
    location: "Conference Room A",
    attendees: ["TM001", "TM002", "TM003", "TM004"],
  },
  {
    id: "EV002",
    title: "Q1 Performance Review",
    date: "2024-03-15",
    time: "02:00 PM",
    location: "Virtual (Zoom)",
    attendees: ["TM001", "TM002", "TM003", "TM004"],
  },
  {
    id: "EV003",
    title: "Project Alpha Brainstorm",
    date: "2024-03-07",
    time: "11:00 AM",
    location: "Innovation Lab",
    attendees: ["TM001", "TM002", "TM003"],
  },
]

// Helper functions for styling
const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "In Progress":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Not Started":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "On Hold":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle className="h-4 w-4" />
    case "In Progress":
      return <Clock className="h-4 w-4" />
    case "Not Started":
      return <AlertCircle className="h-4 w-4" />
    case "On Hold":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements)
  const [events, setEvents] = useState<Event[]>(initialEvents)

  const [memberSearchQuery, setMemberSearchQuery] = useState("")
  const [projectSearchQuery, setProjectSearchQuery] = useState("")

  // Dialog states for adding new items
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [newMember, setNewMember] = useState<Omit<TeamMember, "id" | "projects">>({
    name: "",
    role: "",
    email: "",
    phone: "",
    skills: [],
    bio: "",
    avatar: "",
  })

  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState<Omit<Project, "id" | "progress" | "tasks">>({
    name: "",
    status: "Not Started",
    dueDate: "",
    lead: "",
    members: [],
  })

  const [isPostAnnouncementDialogOpen, setIsPostAnnouncementDialogOpen] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState<Omit<Announcement, "id" | "date" | "author">>({
    title: "",
    content: "",
  })

  const [isScheduleEventDialogOpen, setIsScheduleEventDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: "",
    time: "",
    location: "",
    attendees: [],
  })

  // Handlers for adding new items
  const handleAddMember = () => {
    if (newMember.name && newMember.role && newMember.email) {
      setTeamMembers((prev) => [
        ...prev,
        {
          id: `TM${String(prev.length + 1).padStart(3, "0")}`,
          ...newMember,
          skills: newMember.skills.filter(Boolean), // Ensure no empty strings
          projects: [], // New member starts with no projects
          avatar: newMember.avatar || `/placeholder.svg?height=100&width=100&query=${newMember.name}`,
        },
      ])
      setNewMember({ name: "", role: "", email: "", phone: "", skills: [], bio: "", avatar: "" })
      setIsAddMemberDialogOpen(false)
    }
  }

  const handleAddProject = () => {
    if (newProject.name && newProject.dueDate && newProject.lead) {
      setProjects((prev) => [
        ...prev,
        {
          id: `PR${String(prev.length + 1).padStart(3, "0")}`,
          progress: 0,
          tasks: [],
          ...newProject,
        },
      ])
      setNewProject({ name: "", status: "Not Started", dueDate: "", lead: "", members: [] })
      setIsAddProjectDialogOpen(false)
    }
  }

  const handlePostAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements((prev) => [
        {
          id: `AN${String(prev.length + 1).padStart(3, "0")}`,
          date: new Date().toLocaleDateString("en-US"),
          author: "Admin", // Could be dynamic based on logged-in user
          ...newAnnouncement,
        },
        ...prev, // Add to top
      ])
      setNewAnnouncement({ title: "", content: "" })
      setIsPostAnnouncementDialogOpen(false)
    }
  }

  const handleScheduleEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      setEvents((prev) => [
        ...prev,
        {
          id: `EV${String(prev.length + 1).padStart(3, "0")}`,
          ...newEvent,
        },
      ])
      setNewEvent({ title: "", date: "", time: "", location: "", attendees: [] })
      setIsScheduleEventDialogOpen(false)
    }
  }

  // Filtered data for display
  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
      member.skills.some((skill) => skill.toLowerCase().includes(memberSearchQuery.toLowerCase())),
  )

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
      project.lead.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
      project.status.toLowerCase().includes(projectSearchQuery.toLowerCase()),
  )

  const getMemberNameById = (id: string) => teamMembers.find((m) => m.id === id)?.name || "Unknown"

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your team, projects, communications, and events</p>
          </div>
          <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Team Member</DialogTitle>
                <DialogDescription>Fill in the details for the new team member.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="memberName">Name</Label>
                  <Input
                    id="memberName"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberRole">Role</Label>
                  <Input
                    id="memberRole"
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberEmail">Email</Label>
                  <Input
                    id="memberEmail"
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberPhone">Phone</Label>
                  <Input
                    id="memberPhone"
                    type="tel"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberSkills">Skills (comma-separated)</Label>
                  <Input
                    id="memberSkills"
                    value={newMember.skills.join(", ")}
                    onChange={(e) =>
                      setNewMember({ ...newMember, skills: e.target.value.split(",").map((s) => s.trim()) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberBio">Bio</Label>
                  <Textarea
                    id="memberBio"
                    value={newMember.bio}
                    onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberAvatar">Avatar URL (Optional)</Label>
                  <Input
                    id="memberAvatar"
                    value={newMember.avatar}
                    onChange={(e) => setNewMember({ ...newMember, avatar: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMember}>Add Member</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="members">
              <Users className="h-4 w-4 mr-2" />
              Members
            </TabsTrigger>
            <TabsTrigger value="projects">
              <Briefcase className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="communication">
              <MessageSquare className="h-4 w-4 mr-2" />
              Communication
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarDays className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Member Directory</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">Browse and manage your team members</p>
                <div className="relative group mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  <Input
                    placeholder="Search members by name, role, or skill..."
                    value={memberSearchQuery}
                    onChange={(e) => setMemberSearchQuery(e.target.value)}
                    className="pl-10 w-full bg-gray-50 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <Dialog key={member.id}>
                        <DialogTrigger asChild>
                          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                              <Avatar className="h-20 w-20 mb-4">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                <AvatarFallback className="bg-teal-100 text-teal-700 text-2xl font-bold">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{member.role}</p>
                              <div className="flex flex-wrap justify-center gap-2">
                                {member.skills.slice(0, 3).map((skill, idx) => (
                                  <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-700">
                                    {skill}
                                  </Badge>
                                ))}
                                {member.skills.length > 3 && (
                                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                    +{member.skills.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                              <User className="h-5 w-5" />
                              <span>{member.name}&apos;s Profile</span>
                            </DialogTitle>
                            <DialogDescription>{member.role}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-24 w-24">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                <AvatarFallback className="bg-teal-100 text-teal-700 text-3xl font-bold">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="text-xl font-semibold">{member.name}</h4>
                                <p className="text-gray-600">{member.role}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h5 className="font-medium flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>Contact Information</span>
                              </h5>
                              <p className="text-sm text-gray-700">Email: {member.email}</p>
                              <p className="text-sm text-gray-700">Phone: {member.phone}</p>
                            </div>
                            <div className="space-y-2">
                              <h5 className="font-medium flex items-center space-x-2">
                                <Award className="h-4 w-4" />
                                <span>Skills</span>
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {member.skills.map((skill, idx) => (
                                  <Badge key={idx} variant="outline">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h5 className="font-medium flex items-center space-x-2">
                                <Lightbulb className="h-4 w-4" />
                                <span>Bio</span>
                              </h5>
                              <p className="text-sm text-gray-700">{member.bio}</p>
                            </div>
                            <div className="space-y-2">
                              <h5 className="font-medium flex items-center space-x-2">
                                <Briefcase className="h-4 w-4" />
                                <span>Assigned Projects</span>
                              </h5>
                              <ul className="list-disc list-inside text-sm text-gray-700">
                                {member.projects.length > 0 ? (
                                  member.projects.map((projectId) => (
                                    <li key={projectId}>
                                      {projects.find((p) => p.id === projectId)?.name || projectId}
                                    </li>
                                  ))
                                ) : (
                                  <li>No projects assigned.</li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-full text-center">No members found matching your search.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Project Management</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Track ongoing projects, deadlines, and tasks
                    </p>
                  </div>
                  <Dialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Project</DialogTitle>
                        <DialogDescription>Enter the details for the new project.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="projectName">Project Name</Label>
                          <Input
                            id="projectName"
                            value={newProject.name}
                            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="projectStatus">Status</Label>
                          <Select
                            value={newProject.status}
                            onValueChange={(value) =>
                              setNewProject({ ...newProject, status: value as Project["status"] })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Not Started">Not Started</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                              <SelectItem value="On Hold">On Hold</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="projectDueDate">Due Date</Label>
                          <Input
                            id="projectDueDate"
                            type="date"
                            value={newProject.dueDate}
                            onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="projectLead">Project Lead</Label>
                          <Select
                            value={newProject.lead}
                            onValueChange={(value) => setNewProject({ ...newProject, lead: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select lead" />
                            </SelectTrigger>
                            <SelectContent>
                              {teamMembers.map((member) => (
                                <SelectItem key={member.id} value={member.name}>
                                  {member.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="projectMembers">Team Members</Label>
                          <Select
                            value={newProject.members.join(",")} // Store as comma-separated string for multi-select simulation
                            onValueChange={(value) =>
                              setNewProject({ ...newProject, members: value.split(",").filter(Boolean) })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select members" />
                            </SelectTrigger>
                            <SelectContent>
                              {teamMembers.map((member) => (
                                <SelectItem key={member.id} value={member.id}>
                                  {member.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500">Hold Ctrl/Cmd to select multiple (conceptual)</p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddProjectDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddProject}>Add Project</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="relative group mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  <Input
                    placeholder="Search projects by name, lead, or status..."
                    value={projectSearchQuery}
                    onChange={(e) => setProjectSearchQuery(e.target.value)}
                    className="pl-10 w-full bg-gray-50 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <Dialog key={project.id}>
                        <DialogTrigger asChild>
                          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6 space-y-4">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                                <Badge
                                  variant="outline"
                                  className={`${getStatusColor(project.status)} font-medium flex items-center space-x-1`}
                                >
                                  {getStatusIcon(project.status)}
                                  <span>{project.status}</span>
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Progress</span>
                                  <span className="font-medium">{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-2" />
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <p className="text-gray-500">Due Date</p>
                                  <p className="font-medium">{project.dueDate}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Lead</p>
                                  <p className="font-medium">{project.lead}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                  Team: {project.members.map(getMemberNameById).join(", ")}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                              <Briefcase className="h-5 w-5" />
                              <span>{project.name} Details</span>
                            </DialogTitle>
                            <DialogDescription>Project overview and task assignments.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <h4 className="font-medium">Status & Progress</h4>
                              <div className="flex items-center justify-between text-sm">
                                <span>Status:</span>
                                <Badge variant="outline" className={`${getStatusColor(project.status)}`}>
                                  {project.status}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Progress:</span>
                                <span>{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium">Key Information</h4>
                              <p className="text-sm text-gray-700">Due Date: {project.dueDate}</p>
                              <p className="text-sm text-gray-700">Project Lead: {project.lead}</p>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium">Team Members</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.members.map((memberId) => {
                                  const member = teamMembers.find((m) => m.id === memberId)
                                  return member ? (
                                    <Badge key={member.id} variant="secondary" className="flex items-center gap-1">
                                      <Avatar className="h-4 w-4">
                                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                        <AvatarFallback className="text-xs">
                                          {member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      {member.name}
                                    </Badge>
                                  ) : null
                                })}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium">Tasks</h4>
                              <ul className="space-y-2">
                                {project.tasks.length > 0 ? (
                                  project.tasks.map((task) => (
                                    <li key={task.id} className="flex items-center justify-between text-sm">
                                      <span className={task.completed ? "line-through text-gray-500" : ""}>
                                        {task.name} (Assigned to: {getMemberNameById(task.assignedTo)})
                                      </span>
                                      {task.completed ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Clock className="h-4 w-4 text-gray-400" />
                                      )}
                                    </li>
                                  ))
                                ) : (
                                  <p className="text-sm text-gray-500">No tasks defined for this project.</p>
                                )}
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-full text-center">No projects found matching your search.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Communication</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Announcements and important updates</p>
                  </div>
                  <Dialog open={isPostAnnouncementDialogOpen} onOpenChange={setIsPostAnnouncementDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Post Announcement
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Post New Announcement</DialogTitle>
                        <DialogDescription>Share important news with the team.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="announcementTitle">Title</Label>
                          <Input
                            id="announcementTitle"
                            value={newAnnouncement.title}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="announcementContent">Content</Label>
                          <Textarea
                            id="announcementContent"
                            value={newAnnouncement.content}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                            rows={5}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPostAnnouncementDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handlePostAnnouncement}>Post Announcement</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.length > 0 ? (
                    announcements.map((announcement) => (
                      <Card
                        key={announcement.id}
                        className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <CardContent className="p-0">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{announcement.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{announcement.content}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Posted by {announcement.author} on {announcement.date}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No announcements yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Calendar</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Schedule meetings and events</p>
                  </div>
                  <Dialog open={isScheduleEventDialogOpen} onOpenChange={setIsScheduleEventDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Schedule New Event</DialogTitle>
                        <DialogDescription>Add a new meeting or event to the team calendar.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="eventTitle">Event Title</Label>
                          <Input
                            id="eventTitle"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eventDate">Date</Label>
                          <Input
                            id="eventDate"
                            type="date"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eventTime">Time</Label>
                          <Input
                            id="eventTime"
                            type="time"
                            value={newEvent.time}
                            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eventLocation">Location</Label>
                          <Input
                            id="eventLocation"
                            value={newEvent.location}
                            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eventAttendees">Attendees</Label>
                          <Select
                            value={newEvent.attendees.join(",")}
                            onValueChange={(value) =>
                              setNewEvent({ ...newEvent, attendees: value.split(",").filter(Boolean) })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select attendees" />
                            </SelectTrigger>
                            <SelectContent>
                              {teamMembers.map((member) => (
                                <SelectItem key={member.id} value={member.id}>
                                  {member.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500">Hold Ctrl/Cmd to select multiple (conceptual)</p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsScheduleEventDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleScheduleEvent}>Schedule Event</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
                  <div className="space-y-3">
                    {events.length > 0 ? (
                      events
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        .map((event) => (
                          <Card
                            key={event.id}
                            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <CardContent className="p-0">
                              <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {event.date} at {event.time}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </p>
                              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                Attendees: {event.attendees.map(getMemberNameById).join(", ")}
                              </p>
                            </CardContent>
                          </Card>
                        ))
                    ) : (
                      <p className="text-gray-500 text-center">No upcoming events.</p>
                    )}
                  </div>
                  {/* Simple Calendar Grid Placeholder */}
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Monthly View (Placeholder)</h3>
                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="font-medium text-gray-700 dark:text-gray-300">
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded-md ${
                            i + 1 === new Date().getDate()
                              ? "bg-teal-100 text-teal-800 font-bold"
                              : "bg-gray-50 dark:bg-gray-700"
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
