"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  DollarSign,
  Users,
  Target,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Maximize2,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react"

interface MetricCard {
  title: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: React.ReactNode
  color: string
  subtitle?: string
}

interface ChartWidget {
  id: string
  title: string
  type: 'line' | 'bar' | 'pie' | 'area'
  data: Record<string, unknown>[]
  height?: number
  span?: number
}

interface AnalyticsDashboardProps {
  title?: string
  metrics: MetricCard[]
  charts: ChartWidget[]
  timeRange?: string
  onTimeRangeChange?: (range: string) => void
  customizable?: boolean
}

export function AnalyticsDashboard({
  title = "Analytics Dashboard",
  metrics,
  charts,
  timeRange = "30d",
  onTimeRangeChange,
  customizable = true
}: AnalyticsDashboardProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange)
  const [isCustomizing, setIsCustomizing] = useState(false)

  const handleTimeRangeChange = (range: string) => {
    setSelectedTimeRange(range)
    onTimeRangeChange?.(range)
  }

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case 'decrease':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-emerald-600 font-semibold'
      case 'decrease':
        return 'text-red-600 font-semibold'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{title}</h1>
          <p className="text-slate-600 font-medium">Real-time insights and performance metrics</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={selectedTimeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          {customizable && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsCustomizing(!isCustomizing)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Customize
            </Button>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-gray-50/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{metric.value}</p>
                    {metric.change !== 0 && (
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getChangeColor(metric.changeType)} ${metric.changeType === 'increase' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                        {getChangeIcon(metric.changeType)}
                        <span className="text-sm font-medium">
                          {Math.abs(metric.change)}%
                        </span>
                      </div>
                    )}
                  </div>
                  {metric.subtitle && (
                    <p className="text-xs text-gray-500 mt-1">{metric.subtitle}</p>
                  )}
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.color} transform transition-all duration-300 hover:scale-110 hover:shadow-xl`}>
                  {metric.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {charts.map((chart) => (
          <Card 
            key={chart.id} 
            className={`border-0 shadow-sm hover:shadow-md transition-shadow ${
              chart.span === 2 ? 'lg:col-span-2' : ''
            } ${chart.span === 3 ? 'xl:col-span-3' : ''}`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {chart.title}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`${chart.height ? `h-${chart.height}` : 'h-64'} flex items-center justify-center bg-gray-50 rounded-lg`}>
                {/* Placeholder for actual chart component */}
                <div className="text-center">
                  {chart.type === 'line' && <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />}
                  {chart.type === 'bar' && <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />}
                  {chart.type === 'pie' && <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />}
                  {chart.type === 'area' && <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />}
                  <p className="text-sm text-gray-500">{chart.type.charAt(0).toUpperCase() + chart.type.slice(1)} Chart</p>
                  <p className="text-xs text-gray-400">{chart.data.length} data points</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-900">High Risk Venture Detected</p>
                  <p className="text-xs text-red-700">TechStart Inc. shows declining metrics</p>
                  <p className="text-xs text-red-600 mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-900">Review Deadline Approaching</p>
                  <p className="text-xs text-yellow-700">5 ventures require assessment by Friday</p>
                  <p className="text-xs text-yellow-600 mt-1">4 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">AI Recommendation Available</p>
                  <p className="text-xs text-blue-700">3 ventures show high growth potential</p>
                  <p className="text-xs text-blue-600 mt-1">6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Assessment Completed</p>
                  <p className="text-xs text-gray-600">GreenTech Solutions - GEDSI Score: 92%</p>
                  <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New Team Member Added</p>
                  <p className="text-xs text-gray-600">Sarah Chen joined as Senior Analyst</p>
                  <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <DollarSign className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Funding Round Closed</p>
                  <p className="text-xs text-gray-600">EcoFarm Vietnam - $500K Series A</p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <Target className="h-5 w-5 text-purple-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Milestone Achieved</p>
                  <p className="text-xs text-gray-600">Q4 GEDSI targets exceeded by 15%</p>
                  <p className="text-xs text-gray-500 mt-1">8 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customization Panel */}
      {isCustomizing && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-900">
              Dashboard Customization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Widgets</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Key Metrics</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Performance Charts</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Alerts Panel</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Layout</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="layout" defaultChecked className="rounded" />
                    <span className="text-sm">Standard Grid</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="layout" className="rounded" />
                    <span className="text-sm">Compact View</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="layout" className="rounded" />
                    <span className="text-sm">Wide Layout</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Actions</h4>
                <div className="space-y-2">
                  <Button size="sm" className="w-full">
                    Save Layout
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Reset to Default
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => setIsCustomizing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
