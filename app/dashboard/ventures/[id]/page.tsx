"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building2,
  Users,
  Target,
  DollarSign,
  Calendar,
  MapPin,
  Globe,
  Phone,
  Mail,
  FileText,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowLeft,
  Edit,
  Download,
  Share2,
  MoreHorizontal,
  UserCheck,
  Award,
  Lightbulb,
  Heart
} from "lucide-react"
import Link from "next/link"

interface Venture {
  id: string
  name: string
  description: string
  sector: string
  location: string
  stage: string
  status: string
  fundingAmount: number
  fundingStage: string
  teamSize: number
  foundedYear: number
  website: string
  contactEmail: string
  contactPhone: string
  gedsiScore: number
  gedsiMetrics: Array<{
    id: string
    metricCode: string
    metricName: string
    category: string
    targetValue: number
    currentValue: number
    unit: string
    status: string
    verificationDate: string
    notes: string
  }>
  activities: Array<{
    id: string
    type: string
    description: string
    date: string
    userId: string
    user: {
      name: string
      email: string
    }
  }>
  documents: Array<{
    id: string
    name: string
    type: string
    url: string
    uploadedAt: string
    size: string
  }>
  createdBy: {
    name: string
    email: string
  }
  assignedTo: {
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

export default function VentureDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [venture, setVenture] = useState<Venture | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVentureData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/ventures/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch venture data')
      }
      const data = await response.json()
      setVenture(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    if (params.id) {
      fetchVentureData()
    }
  }, [params.id, fetchVentureData])

  const getStageColor = (stage: string) => {
    const colors: { [key: string]: string } = {
      'IDEA': 'bg-blue-100 text-blue-800',
      'VALIDATION': 'bg-yellow-100 text-yellow-800',
      'EARLY_GROWTH': 'bg-green-100 text-green-800',
      'SCALE_UP': 'bg-purple-100 text-purple-800',
      'MATURE': 'bg-gray-100 text-gray-800'
    }
    return colors[stage] || 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'ACTIVE': 'bg-green-100 text-green-800',
      'INACTIVE': 'bg-gray-100 text-gray-800',
      'SUSPENDED': 'bg-red-100 text-red-800',
      'ARCHIVED': 'bg-gray-100 text-gray-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getGEDSICategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'GENDER': 'bg-pink-100 text-pink-800',
      'EQUITY': 'bg-blue-100 text-blue-800',
      'DISABILITY': 'bg-purple-100 text-purple-800',
      'SOCIAL_INCLUSION': 'bg-green-100 text-green-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const getActivityIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'ASSESSMENT': <Target className="h-4 w-4" />,
      'FUNDING': <DollarSign className="h-4 w-4" />,
      'MENTORSHIP': <Users className="h-4 w-4" />,
      'DOCUMENT': <FileText className="h-4 w-4" />,
      'MILESTONE': <Award className="h-4 w-4" />
    }
    return icons[type] || <Activity className="h-4 w-4" />
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading venture details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Venture</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  if (!venture) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Venture Not Found</h2>
          <p className="text-gray-600 mb-4">The venture you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{venture.name}</h1>
            <p className="text-gray-600">{venture.sector} • {venture.location}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Status and Stage */}
      <div className="flex items-center space-x-4">
        <Badge className={getStatusColor(venture.status)}>
          {venture.status}
        </Badge>
        <Badge className={getStageColor(venture.stage)}>
          {venture.stage.replace('_', ' ')}
        </Badge>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-600">Active in pipeline</span>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gedsi">GEDSI Metrics</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Key Metrics */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-600">Funding</p>
                        <p className="text-lg font-semibold">{formatCurrency(venture.fundingAmount)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">Team Size</p>
                        <p className="text-lg font-semibold">{venture.teamSize}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-600">GEDSI Score</p>
                        <p className="text-lg font-semibold">{venture.gedsiScore}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-600">Founded</p>
                        <p className="text-lg font-semibold">{venture.foundedYear}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{venture.description}</p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{venture.contactEmail}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{venture.contactPhone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <a href={venture.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        {venture.website}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{venture.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* GEDSI Progress */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>GEDSI Progress</CardTitle>
                  <CardDescription>Overall compliance score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Overall Score</span>
                        <span className="text-sm text-gray-600">{venture.gedsiScore}%</span>
                      </div>
                      <Progress value={venture.gedsiScore} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      {venture.gedsiMetrics.slice(0, 3).map((metric) => (
                        <div key={metric.id} className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">{metric.metricName}</span>
                          <span className="text-xs font-medium">{metric.currentValue}/{metric.targetValue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {venture.activities.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          <p className="text-xs text-gray-500">{formatDate(activity.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gedsi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GEDSI Metrics</CardTitle>
              <CardDescription>Detailed metrics and compliance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {venture.gedsiMetrics.map((metric) => (
                  <div key={metric.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{metric.metricName}</h3>
                        <p className="text-sm text-gray-600">{metric.metricCode}</p>
                      </div>
                      <Badge className={getGEDSICategoryColor(metric.category)}>
                        {metric.category.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium">
                          {metric.currentValue} / {metric.targetValue} {metric.unit}
                        </span>
                      </div>
                      <Progress 
                        value={(metric.currentValue / metric.targetValue) * 100} 
                        className="h-2" 
                      />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Status: {metric.status}</span>
                        <span>Verified: {formatDate(metric.verificationDate)}</span>
                      </div>
                      {metric.notes && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {metric.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>All activities and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {venture.activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        by {activity.user.name} • {activity.type.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>All venture-related documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {venture.documents.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{document.name}</p>
                        <p className="text-xs text-gray-500">
                          {document.type} • {document.size} • {formatDate(document.uploadedAt)}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Created By</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{venture.createdBy.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{venture.createdBy.name}</p>
                    <p className="text-sm text-gray-600">{venture.createdBy.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assigned To</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{venture.assignedTo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{venture.assignedTo.name}</p>
                    <p className="text-sm text-gray-600">{venture.assignedTo.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Venture Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Created:</span>
                  <p className="font-medium">{formatDate(venture.createdAt)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Last Updated:</span>
                  <p className="font-medium">{formatDate(venture.updatedAt)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Funding Stage:</span>
                  <p className="font-medium">{venture.fundingStage}</p>
                </div>
                <div>
                  <span className="text-gray-600">Team Size:</span>
                  <p className="font-medium">{venture.teamSize} people</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 