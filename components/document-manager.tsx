"use client"

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Upload,
  FileText,
  Image,
  File,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Tag,
  Sparkles,
  CheckCircle,
  Clock,
  AlertCircle,
  FolderOpen,
  BarChart3,
  Calendar,
  User,
  Building2,
  Loader2
} from 'lucide-react'

interface Document {
  id: string
  ventureId: string
  ventureName: string
  name: string
  type: string
  url: string
  size: number
  mimeType: string
  uploadedAt: string
  status: 'processing' | 'completed' | 'error'
  aiTags: string[]
  aiSummary?: string
  ocrText?: string
  category: string
  uploadedBy: string
}

interface Venture {
  id: string
  name: string
  sector: string
  status: string
}

const DOCUMENT_TYPES = [
  'PITCH_DECK',
  'FINANCIAL_STATEMENTS', 
  'BUSINESS_PLAN',
  'LEGAL_DOCUMENTS',
  'MARKET_RESEARCH',
  'TEAM_PROFILE',
  'OTHER'
]

const DOCUMENT_CATEGORIES = [
  'Investment Readiness',
  'Legal & Compliance',
  'Financial',
  'Market Analysis',
  'Team & Operations',
  'Impact & GEDSI',
  'Other'
]

export function DocumentManager() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [ventures, setVentures] = useState<Venture[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedVenture, setSelectedVenture] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [aiProcessing, setAiProcessing] = useState<{[key: string]: boolean}>({})

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      
      // Fetch documents
      const documentsResponse = await fetch('/api/documents')
      if (documentsResponse.ok) {
        const documentsData = await documentsResponse.json()
        setDocuments(documentsData)
      }

      // Fetch ventures
      const venturesResponse = await fetch('/api/ventures')
      if (venturesResponse.ok) {
        const venturesData = await venturesResponse.json()
        setVentures(venturesData)
      }

    } catch (error) {
      console.error('Error fetching documents:', error)
      // Fallback to mock data
      setDocuments(mockDocuments)
      setVentures(mockVentures)
    } finally {
      setLoading(false)
    }
  }

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const ventureMatch = selectedVenture === 'all' || doc.ventureId === selectedVenture
      const typeMatch = selectedType === 'all' || doc.type === selectedType
      const categoryMatch = selectedCategory === 'all' || doc.category === selectedCategory
      const searchMatch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.ventureName.toLowerCase().includes(searchQuery.toLowerCase())
      return ventureMatch && typeMatch && categoryMatch && searchMatch
    })
  }, [documents, selectedVenture, selectedType, selectedCategory, searchQuery])

  const documentStats = useMemo(() => {
    const total = documents.length
    const processing = documents.filter(d => d.status === 'processing').length
    const completed = documents.filter(d => d.status === 'completed').length
    const error = documents.filter(d => d.status === 'error').length
    const totalSize = documents.reduce((sum, doc) => sum + doc.size, 0)

    return {
      total,
      processing,
      completed,
      error,
      totalSize: formatFileSize(totalSize)
    }
  }, [documents])

  const handleFileUpload = async (files: FileList, ventureId: string) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('ventureId', ventureId)
      
      Array.from(files).forEach(file => {
        formData.append('files', file)
      })

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const uploadedDocs = await response.json()
        setDocuments(prev => [...prev, ...uploadedDocs])
        setShowUploadDialog(false)
        
        // Trigger AI processing for uploaded documents
        uploadedDocs.forEach((doc: Document) => {
          triggerAIProcessing(doc.id)
        })
      }
    } catch (error) {
      console.error('Error uploading documents:', error)
    } finally {
      setUploading(false)
    }
  }

  const triggerAIProcessing = async (documentId: string) => {
    setAiProcessing(prev => ({ ...prev, [documentId]: true }))
    
    try {
      const response = await fetch(`/api/ai/process-document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentId }),
      })

      if (response.ok) {
        const result = await response.json()
        setDocuments(prev => prev.map(doc => 
          doc.id === documentId 
            ? { ...doc, ...result, status: 'completed' }
            : doc
        ))
      }
    } catch (error) {
      console.error('Error processing document with AI:', error)
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, status: 'error' }
          : doc
      ))
    } finally {
      setAiProcessing(prev => ({ ...prev, [documentId]: false }))
    }
  }

  const handleDeleteDocument = async (documentId: string) => {
    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setDocuments(prev => prev.filter(doc => doc.id !== documentId))
      }
    } catch (error) {
      console.error('Error deleting document:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'PITCH_DECK': return <FileText className="h-4 w-4" />
      case 'FINANCIAL_STATEMENTS': return <BarChart3 className="h-4 w-4" />
      case 'BUSINESS_PLAN': return <FileText className="h-4 w-4" />
      case 'LEGAL_DOCUMENTS': return <File className="h-4 w-4" />
      case 'MARKET_RESEARCH': return <BarChart3 className="h-4 w-4" />
      case 'TEAM_PROFILE': return <User className="h-4 w-4" />
      default: return <File className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'processing': return <Clock className="h-4 w-4" />
      case 'error': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Document Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered document management with intelligent categorization and analysis
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Documents</DialogTitle>
                <DialogDescription>
                  Upload documents for AI-powered analysis and categorization
                </DialogDescription>
              </DialogHeader>
              <UploadForm 
                ventures={ventures}
                onUpload={handleFileUpload}
                uploading={uploading}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {documentStats.totalSize} total size
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Processed</CardTitle>
            <Sparkles className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{documentStats.completed}</div>
            <p className="text-xs text-muted-foreground">
              Successfully analyzed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{documentStats.processing}</div>
            <p className="text-xs text-muted-foreground">
              Being analyzed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{documentStats.error}</div>
            <p className="text-xs text-muted-foreground">
              Failed processing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Processing Alert */}
      {documentStats.processing > 0 && (
        <Alert>
          <Sparkles className="h-4 w-4" />
          <AlertDescription>
            {documentStats.processing} document(s) are being processed with AI for intelligent categorization, 
            OCR text extraction, and automated tagging.
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
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

            <div className="space-y-2">
              <Label>Venture</Label>
              <Select value={selectedVenture} onValueChange={setSelectedVenture}>
                <SelectTrigger>
                  <SelectValue placeholder="All ventures" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ventures</SelectItem>
                  {ventures.map(venture => (
                    <SelectItem key={venture.id} value={venture.id}>
                      {venture.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {DOCUMENT_TYPES.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {DOCUMENT_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>
            All uploaded documents with AI-powered analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Venture</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>AI Tags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getDocumentIcon(doc.type)}
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span>{doc.ventureName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.type.replace('_', ' ')}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.category}</Badge>
                  </TableCell>
                  <TableCell>{formatFileSize(doc.size)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(doc.status)}>
                      {getStatusIcon(doc.status)}
                      <span className="ml-1">{doc.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {doc.aiTags?.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {doc.aiTags?.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{doc.aiTags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      {doc.status === 'processing' && aiProcessing[doc.id] && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Upload Form Component
function UploadForm({ 
  ventures, 
  onUpload, 
  uploading 
}: { 
  ventures: Venture[]
  onUpload: (files: FileList, ventureId: string) => void
  uploading: boolean
}) {
  const [selectedVenture, setSelectedVenture] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedVenture && selectedFiles) {
      onUpload(selectedFiles, selectedVenture)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Select Venture</Label>
        <Select onValueChange={setSelectedVenture}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a venture" />
          </SelectTrigger>
          <SelectContent>
            {ventures.map(venture => (
              <SelectItem key={venture.id} value={venture.id}>
                {venture.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Upload Documents</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <input
            type="file"
            multiple
            onChange={(e) => setSelectedFiles(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="text-blue-600 hover:text-blue-500">
              Choose files
            </span>
            {' '}or drag and drop
          </label>
          <p className="text-sm text-gray-500 mt-1">
            PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX up to 10MB each
          </p>
        </div>
      </div>

      {selectedFiles && (
        <div className="space-y-2">
          <Label>Selected Files</Label>
          <div className="space-y-1">
            {Array.from(selectedFiles).map((file, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <File className="h-4 w-4 text-gray-400" />
                <span>{file.name}</span>
                <span className="text-gray-500">({formatFileSize(file.size)})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={!selectedVenture || !selectedFiles || uploading}>
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

// Helper function for file size formatting
function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Mock data for development
const mockDocuments: Document[] = [
  {
    id: '1',
    ventureId: '1',
    ventureName: 'GreenTech Solutions',
    name: 'Pitch Deck - GreenTech Solutions.pdf',
    type: 'PITCH_DECK',
    url: '/documents/pitch-deck-1.pdf',
    size: 2048576,
    mimeType: 'application/pdf',
    uploadedAt: '2024-01-15T10:00:00Z',
    status: 'completed',
    aiTags: ['clean energy', 'sustainability', 'investment ready'],
    aiSummary: 'Comprehensive pitch deck covering market opportunity, team, and financial projections',
    category: 'Investment Readiness',
    uploadedBy: 'John Doe'
  },
  {
    id: '2',
    ventureId: '1',
    ventureName: 'GreenTech Solutions',
    name: 'Financial Statements 2023.xlsx',
    type: 'FINANCIAL_STATEMENTS',
    url: '/documents/financial-2023.xlsx',
    size: 1048576,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    uploadedAt: '2024-01-14T15:30:00Z',
    status: 'completed',
    aiTags: ['financial', 'revenue', 'growth'],
    category: 'Financial',
    uploadedBy: 'Jane Smith'
  },
  {
    id: '3',
    ventureId: '2',
    ventureName: 'EcoFarm Vietnam',
    name: 'Business Plan - EcoFarm.pdf',
    type: 'BUSINESS_PLAN',
    url: '/documents/business-plan-ecofarm.pdf',
    size: 3145728,
    mimeType: 'application/pdf',
    uploadedAt: '2024-01-13T09:15:00Z',
    status: 'processing',
    aiTags: [],
    category: 'Investment Readiness',
    uploadedBy: 'Mike Johnson'
  }
]

const mockVentures: Venture[] = [
  {
    id: '1',
    name: 'GreenTech Solutions',
    sector: 'CleanTech',
    status: 'Active'
  },
  {
    id: '2',
    name: 'EcoFarm Vietnam',
    sector: 'Agriculture',
    status: 'Active'
  }
] 