"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  DollarSign,
  Users,
  Globe,
  Lightbulb,
  BarChart3,
  FileText,
  Send,
  RefreshCw,
  Download,
  Share2,
  Eye,
  Zap,
  Shield,
  Award
} from "lucide-react"

interface AIAnalysis {
  id: string
  ventureId: string
  ventureName: string
  analysisType: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  riskScore: number
  impactScore: number
  recommendations: string[]
  insights: string[]
  createdAt: string
  completedAt?: string
}

interface Venture {
  id: string
  name: string
  stage: string
  sector: string
  location: string
  fundingAmount: number
}

const analysisTypes = [
  { value: 'risk-assessment', label: 'Risk Assessment', icon: Shield },
  { value: 'impact-analysis', label: 'Impact Analysis', icon: Target },
  { value: 'market-analysis', label: 'Market Analysis', icon: BarChart3 },
  { value: 'financial-forecast', label: 'Financial Forecast', icon: DollarSign },
  { value: 'gedsi-assessment', label: 'GEDSI Assessment', icon: Users },
  { value: 'sustainability-analysis', label: 'Sustainability Analysis', icon: Globe }
]

const ventures: Venture[] = [
  { id: '1', name: 'EcoTech Solutions', stage: 'Due Diligence', sector: 'Clean Energy', location: 'Kenya', fundingAmount: 500000 },
  { id: '2', name: 'AgriTech Innovations', stage: 'Investment Ready', sector: 'Agriculture', location: 'Uganda', fundingAmount: 750000 },
  { id: '3', name: 'HealthTech Africa', stage: 'Active', sector: 'Healthcare', location: 'Nigeria', fundingAmount: 1200000 },
  { id: '4', name: 'FinTech Mobile', stage: 'Due Diligence', sector: 'Financial Services', location: 'Ghana', fundingAmount: 300000 }
]

export default function AIAnalysisPage() {
  const [analyses, setAnalyses] = useState<AIAnalysis[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVenture, setSelectedVenture] = useState('')
  const [selectedAnalysisType, setSelectedAnalysisType] = useState('')
  const [customPrompt, setCustomPrompt] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    fetchAnalyses()
  }, [])

  const fetchAnalyses = async () => {
    // Simulate API call
    setTimeout(() => {
      const mockAnalyses: AIAnalysis[] = [
        {
          id: '1',
          ventureId: '1',
          ventureName: 'EcoTech Solutions',
          analysisType: 'Risk Assessment',
          status: 'completed',
          riskScore: 25,
          impactScore: 85,
          recommendations: [
            'Strengthen intellectual property protection',
            'Diversify revenue streams',
            'Enhance regulatory compliance framework'
          ],
          insights: [
            'Strong market positioning in renewable energy sector',
            'Experienced management team with proven track record',
            'Favorable regulatory environment in target markets'
          ],
          createdAt: '2024-01-15T10:30:00Z',
          completedAt: '2024-01-15T10:45:00Z'
        },
        {
          id: '2',
          ventureId: '2',
          ventureName: 'AgriTech Innovations',
          analysisType: 'Impact Analysis',
          status: 'processing',
          riskScore: 35,
          impactScore: 0,
          recommendations: [],
          insights: [],
          createdAt: '2024-01-15T11:00:00Z'
        },
        {
          id: '3',
          ventureId: '3',
          ventureName: 'HealthTech Africa',
          analysisType: 'Market Analysis',
          status: 'completed',
          riskScore: 40,
          impactScore: 75,
          recommendations: [
            'Expand to underserved rural markets',
            'Partner with local healthcare providers',
            'Develop mobile-first solutions'
          ],
          insights: [
            'High demand for telemedicine services',
            'Growing smartphone penetration in target markets',
            'Government support for digital health initiatives'
          ],
          createdAt: '2024-01-14T14:20:00Z',
          completedAt: '2024-01-14T14:35:00Z'
        }
      ]
      setAnalyses(mockAnalyses)
      setLoading(false)
    }, 1000)
  }

  const startAnalysis = async () => {
    if (!selectedVenture || !selectedAnalysisType) return

    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const newAnalysis: AIAnalysis = {
        id: Date.now().toString(),
        ventureId: selectedVenture,
        ventureName: ventures.find(v => v.id === selectedVenture)?.name || '',
        analysisType: analysisTypes.find(t => t.value === selectedAnalysisType)?.label || '',
        status: 'processing',
        riskScore: 0,
        impactScore: 0,
        recommendations: [],
        insights: [],
        createdAt: new Date().toISOString()
      }
      
      setAnalyses(prev => [newAnalysis, ...prev])
      setIsAnalyzing(false)
      setSelectedVenture('')
      setSelectedAnalysisType('')
      setCustomPrompt('')
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'processing': return <RefreshCw className="h-4 w-4 animate-spin" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'failed': return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading AI analyses...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Analysis</h1>
          <p className="text-muted-foreground">
            Leverage artificial intelligence for intelligent venture insights and risk assessment
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Brain className="h-4 w-4" />
          <span>New Analysis</span>
        </Button>
      </div>

      {/* Quick Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Quick Analysis</span>
          </CardTitle>
          <CardDescription>
            Start a new AI-powered analysis for any venture
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Venture</label>
              <Select value={selectedVenture} onValueChange={setSelectedVenture}>
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
            <div>
              <label className="text-sm font-medium mb-2 block">Analysis Type</label>
              <Select value={selectedAnalysisType} onValueChange={setSelectedAnalysisType}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose analysis type" />
                </SelectTrigger>
                <SelectContent>
                  {analysisTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <type.icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={startAnalysis} 
                disabled={!selectedVenture || !selectedAnalysisType || isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Start Analysis
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Custom Prompt (Optional)</label>
            <Textarea
              placeholder="Add specific questions or focus areas for the analysis..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Analyses</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="insights">Key Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {analyses.map(analysis => (
            <Card key={analysis.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5" />
                      <span>{analysis.ventureName}</span>
                      <Badge variant="outline">{analysis.analysisType}</Badge>
                    </CardTitle>
                    <CardDescription>
                      Started {formatDate(analysis.createdAt)}
                      {analysis.completedAt && ` • Completed ${formatDate(analysis.completedAt)}`}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(analysis.status)}>
                      {getStatusIcon(analysis.status)}
                      <span className="ml-1 capitalize">{analysis.status}</span>
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {analysis.status === 'completed' && (
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center space-x-2">
                        <Target className="h-4 w-4" />
                        <span>Risk & Impact Scores</span>
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Risk Score</span>
                            <span>{analysis.riskScore}%</span>
                          </div>
                          <Progress value={analysis.riskScore} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Impact Score</span>
                            <span>{analysis.impactScore}%</span>
                          </div>
                          <Progress value={analysis.impactScore} className="h-2" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center space-x-2">
                        <Lightbulb className="h-4 w-4" />
                        <span>Key Insights</span>
                      </h4>
                      <ul className="space-y-2">
                        {analysis.insights.slice(0, 3).map((insight, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {analyses.filter(a => a.status === 'completed').map(analysis => (
            <Card key={analysis.id}>
              <CardHeader>
                <CardTitle>{analysis.ventureName} - {analysis.analysisType}</CardTitle>
                <CardDescription>Completed {formatDate(analysis.completedAt!)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Recommendations</h4>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Key Insights</h4>
                    <ul className="space-y-2">
                      {analysis.insights.map((insight, index) => (
                        <li key={index} className="text-sm flex items-start space-x-2">
                          <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          {analyses.filter(a => a.status === 'processing').map(analysis => (
            <Card key={analysis.id}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>{analysis.ventureName} - {analysis.analysisType}</span>
                </CardTitle>
                <CardDescription>Started {formatDate(analysis.createdAt)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Progress value={65} className="flex-1" />
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  AI is analyzing venture data and generating insights...
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>Average Risk Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">33%</div>
                <p className="text-sm text-muted-foreground">Across all ventures</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  <span>Average Impact Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">80%</div>
                <p className="text-sm text-muted-foreground">High impact potential</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-purple-500" />
                  <span>Analyses Completed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Brain className="h-4 w-4" />
            <AlertDescription>
              AI analysis provides data-driven insights to support investment decisions and risk assessment. 
              All analyses are performed using advanced machine learning models trained on venture capital data.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
} 