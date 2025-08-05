"use client"

import { useState, useEffect } from "react"
import { Building2, Target, DollarSign, Users, Activity, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const initialMetrics = [
  {
    title: "Total Ventures",
    value: 247,
    change: 18,
    trend: "up",
    subtitle: "in pipeline",
    icon: Building2,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    target: 300,
    prefix: "",
    suffix: "",
  },
  {
    title: "Capital Deployed",
    value: 12.4,
    change: 8.2,
    trend: "up",
    subtitle: "million USD",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    target: 15.0,
    prefix: "$",
    suffix: "M",
  },
  {
    title: "GEDSI Score",
    value: 78,
    change: 5,
    trend: "up",
    subtitle: "average rating",
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    target: 85,
    prefix: "",
    suffix: "%",
  },
  {
    title: "Active Users",
    value: 156,
    change: 12,
    trend: "up",
    subtitle: "this month",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    target: 200,
    prefix: "",
    suffix: "",
  },
]

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {initialMetrics.map((metric, index) => (
        <div key={index} className="group">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl ${metric.bgColor}`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>

                <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                  <Activity className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs text-emerald-600 font-medium">Live</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  {metric.title}
                </h3>

                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {metric.prefix || ""}{metric.value}{metric.suffix || ""}
                  </span>
                  <Sparkles className="h-4 w-4 text-yellow-400 opacity-30" />
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">{metric.subtitle}</p>

                {metric.target && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Target Progress</span>
                      <span>{Math.round((metric.value / metric.target) * 100)}%</span>
                    </div>
                    <Progress
                      value={(metric.value / metric.target) * 100}
                      className="h-2"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
