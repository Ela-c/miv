"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Users,
  Mail,
  Phone,
  Search,
  Upload,
  MessageSquare,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

interface CapitalRequest {
  id: string
  venture: string
  amount: number
  status: "Under Review" | "Approved" | "Pending" | "Rejected"
  stage: string
  progress: number
  submittedDate: string
  expectedDecision: string
  investor: string
  timeline: { date: string; event: string }[]
  documents: { name: string; url: string; type: string }[]
}

interface InvestorPartner {
  name: string
  focus: string
  totalInvested: number
  activeDeals: number
  avgTicketSize: string
  contactPerson: string
  email: string
}

const capitalRequests: CapitalRequest[] = [
  {
    id: "CAP-2024-001",
    venture: "AgriTech Solutions",
    amount: 250000,
    status: "Under Review",
    stage: "Due Diligence",
    progress: 65,
    submittedDate: "2024-01-15",
    expectedDecision: "2024-02-15",
    investor: "Green Ventures Fund",
    timeline: [
      { date: "2024-01-15", event: "Application Submitted" },
      { date: "2024-01-20", event: "Initial Review Completed" },
      { date: "2024-01-25", event: "Due Diligence Started" },
    ],
    documents: [
      { name: "Business Plan.pdf", url: "/placeholder.pdf", type: "pdf" },
      { name: "Financial Projections.xlsx", url: "/placeholder.xlsx", type: "xlsx" },
    ],
  },
  {
    id: "CAP-2024-002",
    venture: "CleanEnergy Innovations",
    amount: 500000,
    status: "Approved",
    stage: "Documentation",
    progress: 90,
    submittedDate: "2024-01-10",
    expectedDecision: "2024-01-25",
    investor: "Impact Capital Partners",
    timeline: [
      { date: "2024-01-10", event: "Application Submitted" },
      { date: "2024-01-15", event: "Due Diligence Completed" },
      { date: "2024-01-20", event: "Term Sheet Issued" },
      { date: "2024-01-22", event: "Documentation Started" },
    ],
    documents: [
      { name: "Term Sheet.pdf", url: "/placeholder.pdf", type: "pdf" },
      { name: "Legal Agreement.docx", url: "/placeholder.docx", type: "docx" },
    ],
  },
  {
    id: "CAP-2024-003",
    venture: "HealthTech Myanmar",
    amount: 150000,
    status: "Pending",
    stage: "Initial Review",
    progress: 25,
    submittedDate: "2024-01-20",
    expectedDecision: "2024-02-20",
    investor: "Healthcare Ventures",
    timeline: [{ date: "2024-01-20", event: "Application Submitted" }],
    documents: [{ name: "Pitch Deck.pdf", url: "/placeholder.pdf", type: "pdf" }],
  },
]

const investorPartners: InvestorPartner[] = [
  {
    name: "Green Ventures Fund",
    focus: "Agriculture & Sustainability",
    totalInvested: 2500000,
    activeDeals: 8,
    avgTicketSize: "200K - 500K",
    contactPerson: "Alice Johnson",
    email: "alice.j@greenventures.com",
  },
  {
    name: "Impact Capital Partners",
    focus: "Clean Energy & Technology",
    totalInvested: 5000000,
    activeDeals: 12,
    avgTicketSize: "300K - 1M",
    contactPerson: "Bob Williams",
    email: "bob.w@impactcapital.com",
  },
  {
    name: "Healthcare Ventures",
    focus: "Healthcare & MedTech",
    totalInvested: 1800000,
    activeDeals: 6,
    avgTicketSize: "100K - 400K",
    contactPerson: "Carol Davis",
    email: "carol.d@healthcareventures.com",
  },
  {
    name: "EduFund Asia",
    focus: "Education Technology",
    totalInvested: 1200000,
    activeDeals: 4,
    avgTicketSize: "150K - 300K",
    contactPerson: "David Lee",
    email: "david.l@edufund.com",
  },
]

const dealPipelineStages = [
  { name: "Initial Review", deals: 8, capital: 1200000, color: "bg-gray-50 dark:bg-gray-800" },
  { name: "Due Diligence", deals: 5, capital: 850000, color: "bg-blue-50 dark:bg-blue-900/20" },
  { name: "Term Sheet", deals: 3, capital: 600000, color: "bg-yellow-50 dark:bg-yellow-900/20" },
  { name: "Documentation", deals: 2, capital: 400000, color: "bg-green-50 dark:bg-green-900/20" },
  { name: "Closed", deals: 1, capital: 250000, color: "bg-teal-50 dark:bg-teal-900/20" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "Under Review":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Approved":
      return <CheckCircle className="h-4 w-4" />
    case "Under Review":
      return <Clock className="h-4 w-4" />
    case "Pending":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

export default function CapitalFacilitation() {
  const [selectedRequest, setSelectedRequest] = useState<CapitalRequest>(capitalRequests[0])
  const [investorSearchQuery, setInvestorSearchQuery] = useState("")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const filteredInvestors = investorPartners.filter(
    (investor) =>
      investor.name.toLowerCase().includes(investorSearchQuery.toLowerCase()) ||
      investor.focus.toLowerCase().includes(investorSearchQuery.toLowerCase()) ||
      investor.contactPerson.toLowerCase().includes(investorSearchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Capital Facilitation</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage funding requests and investor relationships</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <DollarSign className="h-4 w-4 mr-2" />
            New Funding Request
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-teal-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">$3.2M</p>
                  <p className="text-sm text-gray-600">Total Facilitated</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                  <p className="text-sm text-gray-600">Active Deals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">42</p>
                  <p className="text-sm text-gray-600">Avg Days to Close</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                  <p className="text-sm text-gray-600">Investor Partners</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active-requests" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="active-requests">Active Requests</TabsTrigger>
            <TabsTrigger value="investor-network">Investor Network</TabsTrigger>
            <TabsTrigger value="deal-pipeline">Deal Pipeline</TabsTrigger>
          </TabsList>

          <TabsContent value="active-requests" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Capital Requests</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current funding requests in progress</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {capitalRequests.map((request) => (
                        <div
                          key={request.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedRequest.id === request.id
                              ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                          onClick={() => setSelectedRequest(request)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center text-sm font-semibold">
                                {request.venture.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">{request.venture}</h3>
                                <p className="text-sm text-gray-500">ID: {request.id}</p>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={`${getStatusColor(request.status)} font-medium flex items-center space-x-1`}
                            >
                              {getStatusIcon(request.status)}
                              <span>{request.status}</span>
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Amount</p>
                              <p className="font-bold text-teal-600">{formatCurrency(request.amount)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Stage</p>
                              <p className="font-medium">{request.stage}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Progress</p>
                              <div className="flex items-center space-x-2">
                                <Progress value={request.progress} className="flex-1 h-2" />
                                <span className="text-xs font-medium">{request.progress}%</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-500">Expected Decision</p>
                              <p className="font-medium">{request.expectedDecision}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Request Details</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedRequest.venture}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-teal-600">{formatCurrency(selectedRequest.amount)}</div>
                        <p className="text-sm text-gray-600">Requested Amount</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Current Stage</span>
                          <span className="font-medium">{selectedRequest.stage}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{selectedRequest.progress}%</span>
                        </div>
                        <Progress value={selectedRequest.progress} className="h-2" />
                      </div>

                      <div className="pt-4 border-t space-y-2">
                        <h4 className="font-medium mb-2">Timeline</h4>
                        <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-2">
                          {selectedRequest.timeline.map((item, index) => (
                            <li key={index} className="mb-4 ml-4">
                              <div className="absolute w-3 h-3 bg-teal-500 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-800 dark:bg-teal-600" />
                              <time className="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
                                {item.date}
                              </time>
                              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{item.event}</h3>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="pt-4 border-t space-y-2">
                        <h4 className="font-medium mb-2">Documents</h4>
                        {selectedRequest.documents.length > 0 ? (
                          <div className="space-y-2">
                            {selectedRequest.documents.map((doc, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  <FileText className="h-4 w-4 text-gray-500" />
                                  <span>{doc.name}</span>
                                </div>
                                <Button variant="ghost" size="sm" asChild>
                                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                    View
                                  </a>
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No documents attached.</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload New Document
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Log Interaction
                      </Button>
                      <Button className="w-full justify-start bg-teal-600 hover:bg-teal-700 text-white">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Update Status
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="investor-network" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investor Partners</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our network of investment partners and their focus areas
                </p>
                <div className="relative group mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  <Input
                    placeholder="Search investors by name, focus, or contact..."
                    value={investorSearchQuery}
                    onChange={(e) => setInvestorSearchQuery(e.target.value)}
                    className="pl-10 w-full bg-gray-50 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredInvestors.length > 0 ? (
                    filteredInvestors.map((investor, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg">{investor.name}</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{investor.focus}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>Total Invested</span>
                              <span className="font-bold text-teal-600">{formatCurrency(investor.totalInvested)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Active Deals</span>
                              <span className="font-medium">{investor.activeDeals}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Ticket Size</span>
                              <span className="font-medium">{investor.avgTicketSize}</span>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">Contact Investor</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Contact {investor.name}</DialogTitle>
                                  <DialogDescription>
                                    Reach out to {investor.contactPerson} from {investor.name}.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="flex items-center space-x-3">
                                    <Users className="h-5 w-5 text-gray-500" />
                                    <span className="font-medium">{investor.contactPerson}</span>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                    <a href={`mailto:${investor.email}`} className="text-blue-600 hover:underline">
                                      {investor.email}
                                    </a>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <Phone className="h-5 w-5 text-gray-500" />
                                    <span className="text-gray-700">N/A (Placeholder)</span>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button onClick={() => alert(`Simulating email to ${investor.email}`)}>
                                    Send Email
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-full text-center">No investors found matching your search.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deal-pipeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deal Pipeline Overview</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track deals through different stages of the funding process
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {dealPipelineStages.map((stage, index) => (
                    <Card key={index} className={`text-center p-4 ${stage.color}`}>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{stage.deals}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stage.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{formatCurrency(stage.capital)}</p>
                      <Button variant="link" size="sm" className="mt-2 text-teal-600 dark:text-teal-400">
                        View Deals
                      </Button>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
