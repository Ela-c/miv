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
import { Logo } from "@/components/logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useTransition } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const sections = ["MAIN", "REPORTS", "SETTINGS"]

  const navigation = [
    { name: "Pipeline Overview", icon: Home, href: "/dashboard", current: pathname === "/dashboard", section: "MAIN" },
    { name: "Venture Intake", icon: Building2, href: "/dashboard/venture-intake", current: pathname === "/dashboard/venture-intake", section: "MAIN" },
    { name: "Diagnostics Hub", icon: Target, href: "/dashboard/diagnostics", current: pathname === "/dashboard/diagnostics", section: "MAIN" },
    { name: "Capital Facilitation", icon: DollarSign, href: "/dashboard/capital-facilitation", current: pathname === "/dashboard/capital-facilitation", section: "MAIN" },
    { name: "GEDSI Integration", icon: BarChart3, href: "/dashboard/gedsi-tracker", current: pathname === "/dashboard/gedsi-tracker", section: "MAIN" },
    { name: "Impact Reports", icon: TrendingUp, href: "/dashboard/impact-reports", current: pathname === "/dashboard/impact-reports", section: "REPORTS" },
    {
      name: "Performance Analytics",
      icon: PieChart,
      href: "/dashboard/performance-analytics",
      current: pathname === "/dashboard/performance-analytics",
      section: "REPORTS",
    },
    { name: "Team Management", icon: Users, href: "/dashboard/team-management", current: pathname === "/dashboard/team-management", section: "SETTINGS" },
    {
      name: "System Settings",
      icon: Settings,
      href: "/dashboard/system-settings",
      current: pathname === "/dashboard/system-settings",
      section: "SETTINGS",
    },
    { name: "Help & Support", icon: HelpCircle, href: "/dashboard/help-support", current: pathname === "/dashboard/help-support", section: "SETTINGS" },
  ]

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900/95 backdrop-blur-md text-slate-100 shadow-2xl border-r border-slate-800 flex flex-col z-50 transition-all duration-300 hidden lg:flex">
      {/* Loading indicator */}
      {isPending && (
        <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 animate-pulse" />
      )}

      {/* Branding */}
      <Link href="/" className="p-6 border-b border-slate-800 flex items-center gap-3 hover:bg-slate-800/50 transition-colors duration-200">
        <Logo size="sm" />
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">MIV</h1>
          <p className="text-slate-400 text-xs font-medium">Enterprise Platform</p>
        </div>
      </Link>

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
                        ? "bg-blue-600/90 text-white shadow-lg border-l-4 border-blue-400"
                        : "text-slate-300 hover:bg-slate-800/80 hover:text-white hover:border-l-4 hover:border-slate-600",
                    )}
                    style={{ boxShadow: pathname === item.href ? '0 4px 24px 0 rgba(37, 99, 235, 0.15)' : undefined }}
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
    </aside>
  )
}
