"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  FileText,
  Upload,
  Download,
  Eye,
  Trash2,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Calendar,
  User,
  Building2,
  File,
  Image,
  FileVideo,
  FileAudio,
  Archive,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  size: string
  ventureId: string
  ventureName: string
  uploadedBy: string
  uploadedAt: string
  status: string
  url: string
  description?: string
  tags: string[]
}

const documentTypes = [
  { value: "business-plan", label: "Business Plan" },
  { value: "financial-model", label: "Financial Model" },
  { value: "pitch-deck", label: "Pitch Deck" },
  { value: "legal-document", label: "Legal Document" },
  { value: "market-research", label: "Market Research" },
  { value: "technical-spec", label: "Technical Specification" },
  { value: "other", label: "Other" }
]

const ventures = [
  { value: "all", label: "All Ventures" },
  { value: "1", label: "AgriTech Solutions" },
  { value: "2", label: "CleanEnergy Innovations" },
  { value: "3", label: "HealthTech Myanmar" }
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedVenture, setSelectedVenture] = useState("all")
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockDocuments: Document[] = [
        {
          id: "1",
          name: "AgriTech_Business_Plan_2024.pdf",
          type: "business-plan",
          size: "2.4 MB",
          ventureId: "1",
          ventureName: "AgriTech Solutions",
          uploadedBy: "Alice Johnson",
          uploadedAt: "2024-01-15T10:30:00Z",
          status: "approved",
          url: "#",
          description: "Comprehensive business plan for AgriTech Solutions",
          tags: ["business-plan", "agriculture", "sustainability"]
        },
        {
          id: "2",
          name: "CleanEnergy_Financial_Model.xlsx",
          type: "financial-model",
          size: "1.8 MB",
          ventureId: "2",
          ventureName: "CleanEnergy Innovations",
          uploadedBy: "Bob Williams",
          uploadedAt: "2024-01-14T14:20:00Z",
          status: "pending",
          url: "#",
          description: "Financial projections and modeling for CleanEnergy",
          tags: ["financial", "energy", "projections"]
        },
        {
          id: "3",
          name: "HealthTech_Pitch_Deck.pptx",
          type: "pitch-deck",
          size: "5.2 MB",
          ventureId: "3",
          ventureName: "HealthTech Myanmar",
          uploadedBy: "Carol Davis",
          uploadedAt: "2024-01-13T09:15:00Z",
          status: "approved",
          url: "#",
          description: "Investment pitch deck for HealthTech Myanmar",
          tags: ["pitch-deck", "healthcare", "investment"]
        },
        {
          id: "4",
          name: "Market_Analysis_Report.pdf",
          type: "market-research",
          size: "3.1 MB",
          ventureId: "1",
          ventureName: "AgriTech Solutions",
          uploadedBy: "David Lee",
          uploadedAt: "2024-01-12T16:45:00Z",
          status: "review",
          url: "#",
          description: "Comprehensive market analysis for agricultural sector",
          tags: ["market-research", "agriculture", "analysis"]
        }
      ]
      
      setDocuments(mockDocuments)
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Add new documents to the list
      const newDocuments: Document[] = Array.from(files).map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        name: file.name,
        type: getFileType(file.name),
        size: formatFileSize(file.size),
        ventureId: "1", // Default to first venture
        ventureName: "AgriTech Solutions",
        uploadedBy: "Current User",
        uploadedAt: new Date().toISOString(),
        status: "pending",
        url: "#",
        tags: []
      }))

      setDocuments(prev => [...newDocuments, ...prev])
    } catch (error) {
      console.error('Error uploading files:', error)
    } finally {
      setUploading(false)
    }
  }

  const getFileType = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase()
    if (ext === 'pdf') return 'business-plan'
    if (ext === 'xlsx' || ext === 'xls') return 'financial-model'
    if (ext === 'pptx' || ext === 'ppt') return 'pitch-deck'
    if (ext === 'doc' || ext === 'docx') return 'legal-document'
    return 'other'
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'business-plan': <FileText className="h-4 w-4" />,
      'financial-model': <FileText className="h-4 w-4" />,
      'pitch-deck': <FileText className="h-4 w-4" />,
      'legal-document': <FileText className="h-4 w-4" />,
      'market-research': <FileText className="h-4 w-4" />,
      'technical-spec': <FileText className="h-4 w-4" />,
      'image': <Image className="h-4 w-4" />,
      'video': <FileVideo className="h-4 w-4" />,
      'audio': <FileAudio className="h-4 w-4" />,
      'other': <File className="h-4 w-4" />
    }
    return icons[type] || <File className="h-4 w-4" />
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'approved': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'review': 'bg-blue-100 text-blue-800',
      'rejected': 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'approved': <CheckCircle className="h-4 w-4" />,
      'pending': <Clock className="h-4 w-4" />,
      'review': <AlertTriangle className="h-4 w-4" />,
      'rejected': <AlertTriangle className="h-4 w-4" />
    }
    return icons[status] || <Clock className="h-4 w-4" />
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || doc.type === selectedType
    const matchesVenture = selectedVenture === 'all' || doc.ventureId === selectedVenture
    
    return matchesSearch && matchesType && matchesVenture
  })

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading documents...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600">Upload, organize, and manage venture documents</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Upload Documents
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Drag and drop files here or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {uploading ? 'Uploading...' : 'Drop files here or click to upload'}
                </p>
                <p className="text-gray-600 mb-4">
                  Support for PDF, Excel, PowerPoint, Word, and image files
                </p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  accept=".pdf,.xlsx,.xls,.pptx,.ppt,.doc,.docx,.jpg,.jpeg,.png,.gif"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Choose Files'}
                  </Button>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Document Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {documentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedVenture} onValueChange={setSelectedVenture}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Venture" />
                  </SelectTrigger>
                  <SelectContent>
                    {ventures.map(venture => (
                      <SelectItem key={venture.value} value={venture.value}>
                        {venture.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Documents Table */}
          <Card>
            <CardHeader>
              <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Venture</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            {getFileIcon(document.type)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{document.name}</p>
                            {document.description && (
                              <p className="text-sm text-gray-500">{document.description}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{document.ventureName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {documentTypes.find(t => t.value === document.type)?.label || document.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {document.size}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(document.status)}
                          <Badge className={getStatusColor(document.status)}>
                            {document.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{document.uploadedBy}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{formatDate(document.uploadedAt)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>Documents uploaded in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Recent documents will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review</CardTitle>
              <CardDescription>Documents awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Pending documents will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Approved Documents</CardTitle>
              <CardDescription>Documents that have been approved</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Approved documents will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 