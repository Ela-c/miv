"use client"

import React, { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AdvancedDataTable } from "@/components/enterprise/advanced-data-table"
import { AdvancedFilters } from "@/components/enterprise/advanced-filters"
import { NotificationCenter, sampleNotifications } from "@/components/enterprise/notification-center"
import { useToast } from "@/components/ui/toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Plus,
  Upload,
  Download,
  Filter,
  RefreshCw,
  Settings,
  Building2,
  FileText,
  Users,
  DollarSign,
  Target,
  Calendar,
  MapPin,
  Globe,
  Briefcase,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Send,
  Save,
  X,
  Zap,
  Brain,
  Shield,
  Activity
} from "lucide-react"

export default function VentureIntakePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("applications")
  const [showNewApplicationDialog, setShowNewApplicationDialog] = useState(false)
  const [notifications, setNotifications] = useState(sampleNotifications)
  const [formData, setFormData] = useState({
    companyName: "",
    founder: "",
    sector: "",
    stage: "",
    description: "",
    email: "",
    phone: "",
    country: "",
    capitalNeeded: ""
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addToast } = useToast()

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.companyName.trim()) {
      errors.companyName = "Company name is required"
    }
    if (!formData.founder.trim()) {
      errors.founder = "Founder name is required"
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }
    if (!formData.sector) {
      errors.sector = "Sector is required"
    }
    if (!formData.stage) {
      errors.stage = "Funding stage is required"
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Form submission
  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Reset form and close dialog
      setFormData({
        companyName: "",
        founder: "",
        sector: "",
        stage: "",
        description: "",
        email: "",
        phone: "",
        country: "",
        capitalNeeded: ""
      })
      setFormErrors({})
      setShowNewApplicationDialog(false)

      // Show success notification
      addToast({
        type: "success",
        title: "Application Submitted",
        description: `Application for ${formData.companyName} has been submitted successfully!`
      })

    } catch (error) {
      console.error("Error submitting application:", error)
      addToast({
        type: "error",
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Sample venture applications data
  const ventureApplications = [
    {
      id: "APP-001",
      companyName: "GreenTech Solutions",
      founder: "John Doe",
      sector: "CleanTech",
      stage: "Series A",
      country: "Vietnam",
      fundingNeeded: "$500K",
      submissionDate: "2024-01-15",
      status: "Under Review",
      aiScore: 85,
      gedsiPreliminary: 78,
      priority: "High"
    },
    {
      id: "APP-002",
      companyName: "EcoFarm Vietnam",
      founder: "Sarah Chen",
      sector: "Agriculture",
      stage: "Seed",
      country: "Vietnam",
      fundingNeeded: "$250K",
      submissionDate: "2024-01-14",
      status: "Pending Documents",
      aiScore: 72,
      gedsiPreliminary: 82,
      priority: "Medium"
    },
    {
      id: "APP-003",
      companyName: "FinTech Innovations",
      founder: "Mike Johnson",
      sector: "FinTech",
      stage: "Pre-Seed",
      country: "Cambodia",
      fundingNeeded: "$100K",
      submissionDate: "2024-01-13",
      status: "Approved",
      aiScore: 91,
      gedsiPreliminary: 88,
      priority: "High"
    }
  ]

  const applicationColumns = [
    {
      key: "companyName",
      label: "Company",
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{row.founder}</p>
          </div>
        </div>
      )
    },
    {
      key: "sector",
      label: "Sector",
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {value}
        </Badge>
      )
    },
    {
      key: "stage",
      label: "Stage",
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          {value}
        </Badge>
      )
    },
    {
      key: "fundingNeeded",
      label: "Funding",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <DollarSign className="h-4 w-4 text-green-600" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: "aiScore",
      label: "AI Score",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${value >= 80 ? 'bg-green-500' : value >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{value}</span>
          <Brain className="h-4 w-4 text-blue-500" />
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      filterable: true,
      render: (value: string) => {
        const statusConfig = {
          "Under Review": { color: "bg-yellow-100 text-yellow-800", icon: Clock },
          "Pending Documents": { color: "bg-orange-100 text-orange-800", icon: AlertTriangle },
          "Approved": { color: "bg-green-100 text-green-800", icon: CheckCircle },
          "Rejected": { color: "bg-red-100 text-red-800", icon: X }
        }
        const config = statusConfig[value as keyof typeof statusConfig] || statusConfig["Under Review"]
        const Icon = config.icon
        return (
          <Badge className={`${config.color} flex items-center space-x-1`}>
            <Icon className="h-3 w-3" />
            <span>{value}</span>
          </Badge>
        )
      }
    },
    {
      key: "priority",
      label: "Priority",
      sortable: true,
      render: (value: string) => {
        const colors = {
          High: "bg-red-100 text-red-800",
          Medium: "bg-yellow-100 text-yellow-800",
          Low: "bg-gray-100 text-gray-800"
        }
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        )
      }
    }
  ]

  const filterFields = [
    {
      key: "companyName",
      label: "Company Name",
      type: "text" as const,
      placeholder: "Search companies"
    },
    {
      key: "sector",
      label: "Sector",
      type: "select" as const,
      options: [
        { value: "cleantech", label: "CleanTech" },
        { value: "agriculture", label: "Agriculture" },
        { value: "fintech", label: "FinTech" },
        { value: "healthcare", label: "Healthcare" },
        { value: "education", label: "Education" }
      ]
    },
    {
      key: "stage",
      label: "Funding Stage",
      type: "select" as const,
      options: [
        { value: "pre-seed", label: "Pre-Seed" },
        { value: "seed", label: "Seed" },
        { value: "series-a", label: "Series A" },
        { value: "series-b", label: "Series B" }
      ]
    },
    {
      key: "country",
      label: "Country",
      type: "select" as const,
      options: [
        { value: "cambodia", label: "Cambodia" },
        { value: "vietnam", label: "Vietnam" },
        { value: "thailand", label: "Thailand" },
        { value: "laos", label: "Laos" },
        { value: "myanmar", label: "Myanmar" }
      ]
    },
    {
      key: "status",
      label: "Application Status",
      type: "select" as const,
      options: [
        { value: "under-review", label: "Under Review" },
        { value: "pending-documents", label: "Pending Documents" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" }
      ]
    }
  ]

  const handleNotificationAction = (notification: any) => {
    console.log("Notification action:", notification)
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-slate-900">Venture Intake</h1>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <Activity className="h-3 w-3 mr-1" />
                {ventureApplications.length} Applications
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              {/* Actions */}
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Bulk Import
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDelete={handleDeleteNotification}
                onAction={handleNotificationAction}
              />
              
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              
              <Dialog open={showNewApplicationDialog} onOpenChange={setShowNewApplicationDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Application
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>New Venture Application</DialogTitle>
                    <DialogDescription>
                      Create a new venture application for review and assessment.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4 max-h-96 overflow-y-auto">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name *</Label>
                      <Input
                        id="company-name"
                        placeholder="Enter company name"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        className={formErrors.companyName ? "border-red-500" : ""}
                      />
                      {formErrors.companyName && (
                        <p className="text-sm text-red-500">{formErrors.companyName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="founder">Founder/CEO *</Label>
                      <Input
                        id="founder"
                        placeholder="Enter founder name"
                        value={formData.founder}
                        onChange={(e) => setFormData({...formData, founder: e.target.value})}
                        className={formErrors.founder ? "border-red-500" : ""}
                      />
                      {formErrors.founder && (
                        <p className="text-sm text-red-500">{formErrors.founder}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={formErrors.email ? "border-red-500" : ""}
                      />
                      {formErrors.email && (
                        <p className="text-sm text-red-500">{formErrors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sector">Sector *</Label>
                      <Select value={formData.sector} onValueChange={(value) => setFormData({...formData, sector: value})}>
                        <SelectTrigger className={formErrors.sector ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select sector" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cleantech">CleanTech</SelectItem>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="fintech">FinTech</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="logistics">Logistics</SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.sector && (
                        <p className="text-sm text-red-500">{formErrors.sector}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stage">Funding Stage *</Label>
                      <Select value={formData.stage} onValueChange={(value) => setFormData({...formData, stage: value})}>
                        <SelectTrigger className={formErrors.stage ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                          <SelectItem value="seed">Seed</SelectItem>
                          <SelectItem value="series-a">Series A</SelectItem>
                          <SelectItem value="series-b">Series B</SelectItem>
                          <SelectItem value="growth">Growth</SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.stage && (
                        <p className="text-sm text-red-500">{formErrors.stage}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="Enter country"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capital">Capital Needed (USD)</Label>
                      <Input
                        id="capital"
                        placeholder="e.g., 500,000"
                        value={formData.capitalNeeded}
                        onChange={(e) => setFormData({...formData, capitalNeeded: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="description">Company Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of the company, its mission, and impact goals"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className={formErrors.description ? "border-red-500" : ""}
                        rows={3}
                      />
                      {formErrors.description && (
                        <p className="text-sm text-red-500">{formErrors.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNewApplicationDialog(false)
                        setFormErrors({})
                      }}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Create Application
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="screening">AI Screening</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="applications" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Applications</p>
                        <p className="text-3xl font-bold text-gray-900">247</p>
                        <p className="text-xs text-green-600 mt-1">+12 this week</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Under Review</p>
                        <p className="text-3xl font-bold text-gray-900">47</p>
                        <p className="text-xs text-yellow-600 mt-1">Pending assessment</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Approved</p>
                        <p className="text-3xl font-bold text-gray-900">89</p>
                        <p className="text-xs text-green-600 mt-1">76% approval rate</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">AI Processed</p>
                        <p className="text-3xl font-bold text-gray-900">198</p>
                        <p className="text-xs text-blue-600 mt-1">80% automated</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Brain className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Applications Table */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
                  <AdvancedFilters
                    fields={filterFields}
                    onFiltersChange={(filters) => console.log("Filters:", filters)}
                  />
                </div>
                
                <AdvancedDataTable
                  data={ventureApplications}
                  columns={applicationColumns}
                  title=""
                  searchable={false}
                  filterable={false}
                  exportable={true}
                  selectable={true}
                  actions={true}
                  pagination={true}
                  onRowClick={(row) => console.log("View application:", row)}
                  onEdit={(row) => console.log("Edit application:", row)}
                  onDelete={(row) => console.log("Delete application:", row)}
                  onBulkAction={(action, rows) => console.log("Bulk action:", action, rows)}
                />
              </div>
            </TabsContent>

            <TabsContent value="screening" className="space-y-6">
              <div className="text-center py-12">
                <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Screening</h3>
                <p className="text-gray-600 mb-4">Automated venture assessment and scoring system</p>
                <Button>
                  <Zap className="h-4 w-4 mr-2" />
                  Configure AI Models
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Management</h3>
                <p className="text-gray-600 mb-4">Centralized document storage and processing</p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Intake Analytics</h3>
                <p className="text-gray-600 mb-4">Performance metrics and trend analysis</p>
                <Button>
                  <Target className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
