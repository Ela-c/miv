"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Download, Wifi, MoreHorizontal, TrendingUp } from "lucide-react"

interface VentureFilters {
  stage: string
  sector: string
  country: string
  gedsiCategory: string
  staff: string
}

interface VentureTableProps {
  searchQuery: string
  filters: VentureFilters
  setFilters: (filters: VentureFilters) => void
}

const ventures = [
  {
    id: "MIV-2024-001",
    name: "Khmer Women's Cooperative",
    sector: "Agriculture & Food Security",
    country: "Cambodia",
    stage: "Capital Facilitation",
    readinessScore: 92,
    gedsiStatus: "Women-led",
    capitalStatus: "$180K Facilitated",
    lastUpdated: "2 hours ago",
    avatar: "KW",
    impactArea: "Gender Equality, Rural Development",
    trending: true,
  },
  {
    id: "MIV-2024-002",
    name: "Mekong Clean Energy Co-op",
    sector: "Renewable Energy",
    country: "Vietnam",
    stage: "Investment Ready",
    readinessScore: 88,
    gedsiStatus: "Youth-led",
    capitalStatus: "$320K Facilitated",
    lastUpdated: "1 day ago",
    avatar: "MC",
    impactArea: "Climate Action, Energy Access",
    trending: true,
  },
  {
    id: "VEN-2023-022",
    name: "HealthTech Vietnam",
    sector: "Healthcare",
    country: "Vietnam",
    stage: "Capital Facilitation",
    readinessScore: 92,
    gedsiStatus: "Disability-inclusive",
    capitalStatus: "$500K In Progress",
    lastUpdated: "Yesterday",
    avatar: "HT",
  },
  {
    id: "VEN-2023-034",
    name: "EduTech Myanmar",
    sector: "Education",
    country: "Myanmar",
    stage: "Intake",
    readinessScore: 15,
    gedsiStatus: "Indigenous",
    capitalStatus: "Not Started",
    lastUpdated: "3 days ago",
    avatar: "ED",
  },
  {
    id: "VEN-2023-041",
    name: "FinTech Thailand",
    sector: "Technology",
    country: "Thailand",
    stage: "Readiness",
    readinessScore: 72,
    gedsiStatus: "Women-led",
    capitalStatus: "$150K Facilitated",
    lastUpdated: "5 days ago",
    avatar: "FT",
  },
]

const getStageColor = (stage: string) => {
  switch (stage) {
    case "Intake":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "Diagnostics":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Readiness":
      return "bg-teal-100 text-teal-800 border-teal-200"
    case "Capital Facilitation":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Funded":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getGedsiColor = (status: string) => {
  switch (status) {
    case "Women-led":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "Youth-led":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Disability-inclusive":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "Indigenous":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function VentureTable({ searchQuery, filters, setFilters }: VentureTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredVentures = ventures.filter((venture) => {
    const matchesSearch =
      venture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venture.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venture.country.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStage = filters.stage === "All Stages" || venture.stage === filters.stage
    const matchesSector = filters.sector === "All Sectors" || venture.sector === filters.sector
    const matchesCountry = filters.country === "All Countries" || venture.country === filters.country

    return matchesSearch && matchesStage && matchesSector && matchesCountry
  })

  const totalPages = Math.ceil(filteredVentures.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVentures = filteredVentures.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="w-full">
      <Card className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-2xl">
        <CardHeader className="space-y-6 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-miv-primary to-miv-teal rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Venture Pipeline
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredVentures.length} active ventures across Southeast Asia
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2 px-3 py-2 rounded-full bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20">
                <Wifi className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-emerald-500 font-medium">Live Data</span>
              </div>

              <Button variant="outline" size="sm" className="hidden sm:flex bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:scale-105 transition-transform">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>

              <Button size="sm" className="bg-gradient-to-r from-miv-primary to-miv-teal hover:from-miv-primary/90 hover:to-miv-teal/90 text-white shadow-lg hover:scale-105 transition-transform">
                <Plus className="h-4 w-4 mr-2" />
                Add Venture
              </Button>
            </div>
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          <Select value={filters.stage} onValueChange={(value) => setFilters({ ...filters, stage: value })}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Stages">All Stages</SelectItem>
              <SelectItem value="Intake">Intake</SelectItem>
              <SelectItem value="Diagnostics">Diagnostics</SelectItem>
              <SelectItem value="Readiness">Readiness</SelectItem>
              <SelectItem value="Capital Facilitation">Capital Facilitation</SelectItem>
              <SelectItem value="Funded">Funded</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.sector} onValueChange={(value) => setFilters({ ...filters, sector: value })}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Sectors">All Sectors</SelectItem>
              <SelectItem value="Agriculture">Agriculture</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Clean Energy">Clean Energy</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.country} onValueChange={(value) => setFilters({ ...filters, country: value })}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Countries">All Countries</SelectItem>
              <SelectItem value="Cambodia">Cambodia</SelectItem>
              <SelectItem value="Laos">Laos</SelectItem>
              <SelectItem value="Vietnam">Vietnam</SelectItem>
              <SelectItem value="Myanmar">Myanmar</SelectItem>
              <SelectItem value="Thailand">Thailand</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.gedsiCategory}
            onValueChange={(value) => setFilters({ ...filters, gedsiCategory: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All GEDSI Categories">All GEDSI Categories</SelectItem>
              <SelectItem value="Women-led">Women-led</SelectItem>
              <SelectItem value="Youth-led">Youth-led</SelectItem>
              <SelectItem value="Disability-inclusive">Disability-inclusive</SelectItem>
              <SelectItem value="Indigenous">Indigenous</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.staff} onValueChange={(value) => setFilters({ ...filters, staff: value })}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Staff">All Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm whitespace-nowrap">
                  VENTURE NAME
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm whitespace-nowrap">SECTOR</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm whitespace-nowrap">COUNTRY</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm whitespace-nowrap">STAGE</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm whitespace-nowrap">
                  READINESS SCORE
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm whitespace-nowrap">
                  GEDSI STATUS
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm whitespace-nowrap">
                  CAPITAL STATUS
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm whitespace-nowrap">
                  LAST UPDATED
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVentures.map((venture, index) => (
                <tr
                  key={venture.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {venture.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">{venture.name}</div>
                        <div className="text-sm text-gray-500">ID: {venture.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap">{venture.sector}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap">{venture.country}</td>
                  <td className="py-4 px-6">
                    <Badge variant="outline" className={`${getStageColor(venture.stage)} font-medium`}>
                      {venture.stage}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3 min-w-[120px]">
                      <Progress value={venture.readinessScore} className="flex-1 h-2" />
                      <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                        {venture.readinessScore}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge
                      variant="outline"
                      className={`${getGedsiColor(venture.gedsiStatus)} font-medium whitespace-nowrap`}
                    >
                      {venture.gedsiStatus}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap">{venture.capitalStatus}</td>
                  <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">{venture.lastUpdated}</td>
                  <td className="py-4 px-6">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredVentures.length)} of{" "}
            {filteredVentures.length} results
          </p>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "bg-teal-600 hover:bg-teal-700" : ""}
                >
                  {page}
                </Button>
              )
            })}

            {totalPages > 5 && (
              <>
                <span className="text-sm text-gray-500">...</span>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </Button>
              </>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
