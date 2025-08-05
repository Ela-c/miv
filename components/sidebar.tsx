"use client"

import {
  BarChart3,
  Building2,
  DollarSign,
  Target,
  TrendingUp,
  PieChart,
  Users,
  Settings,
  HelpCircle,
  Home,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useTransition } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const sections = ["MAIN", "REPORTS", "SETTINGS"]

  const navigation = [
    { name: "Pipeline Overview", icon: Home, href: "/dashboard", current: pathname === "/dashboard", section: "MAIN" },
    { name: "Venture Intake", icon: Building2, href: "/venture-intake", current: pathname === "/venture-intake", section: "MAIN" },
    { name: "Diagnostics Hub", icon: Target, href: "/diagnostics", current: pathname === "/diagnostics", section: "MAIN" },
    { name: "Capital Facilitation", icon: DollarSign, href: "/capital-facilitation", current: pathname === "/capital-facilitation", section: "MAIN" },
    { name: "GEDSI Integration", icon: BarChart3, href: "/gedsi-tracker", current: pathname === "/gedsi-tracker", section: "MAIN" },
    { name: "Impact Reports", icon: TrendingUp, href: "/impact-reports", current: pathname === "/impact-reports", section: "REPORTS" },
    {
      name: "Performance Analytics",
      icon: PieChart,
      href: "/performance-analytics",
      current: pathname === "/performance-analytics",
      section: "REPORTS",
    },
    { name: "Team Management", icon: Users, href: "/team-management", current: pathname === "/team-management", section: "SETTINGS" },
    {
      name: "System Settings",
      icon: Settings,
      href: "/system-settings",
      current: pathname === "/system-settings",
      section: "SETTINGS",
    },
    { name: "Help & Support", icon: HelpCircle, href: "/help-support", current: pathname === "/help-support", section: "SETTINGS" },
  ]

  return (
    <div className="w-64 bg-slate-900 text-slate-100 shadow-xl border-r border-slate-800 flex flex-col h-full">
      {/* Loading indicator */}
      {isPending && (
        <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 animate-pulse" />
      )}

      <div className="p-6 border-b border-slate-800">
        <Link
          href="/"
          prefetch={true}
          className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg p-1 -m-1"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
            <span className="text-xl">🏛️</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">MIV</h1>
            <p className="text-slate-400 text-sm">Enterprise Platform</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
        {sections.map((section) => (
          <div key={section}>
            <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{section}</h3>
            <div className="space-y-1">
              {navigation
                .filter((item) => item.section === section)
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={true}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900",
                      pathname === item.href
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 border-l-4 border-blue-300"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white hover:border-l-4 hover:border-slate-600",
                    )}
                  >
                    <item.icon className={cn(
                      "mr-3 h-5 w-5 transition-colors",
                      pathname === item.href ? "text-white" : "text-slate-400 group-hover:text-slate-300"
                    )} />
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}
