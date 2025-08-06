"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  Menu, 
  Home, 
  Building2, 
  Target, 
  DollarSign, 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Users, 
  Settings, 
  HelpCircle,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", icon: Home, href: "/dashboard", section: "MAIN" },
    { name: "Venture Intake", icon: Building2, href: "/dashboard/venture-intake", section: "MAIN" },
    { name: "Diagnostics Hub", icon: Target, href: "/dashboard/diagnostics", section: "MAIN" },
    { name: "Capital Facilitation", icon: DollarSign, href: "/dashboard/capital-facilitation", section: "MAIN" },
    { name: "GEDSI Integration", icon: BarChart3, href: "/dashboard/gedsi-tracker", section: "MAIN" },
    { name: "Impact Reports", icon: TrendingUp, href: "/dashboard/impact-reports", section: "REPORTS" },
    { name: "Performance Analytics", icon: PieChart, href: "/dashboard/performance-analytics", section: "REPORTS" },
    { name: "Team Management", icon: Users, href: "/dashboard/team-management", section: "SETTINGS" },
    { name: "System Settings", icon: Settings, href: "/dashboard/system-settings", section: "SETTINGS" },
    { name: "Help & Support", icon: HelpCircle, href: "/dashboard/help-support", section: "SETTINGS" },
  ]

  const sections = ["MAIN", "REPORTS", "SETTINGS"]

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900/95 backdrop-blur-md border-slate-800">
          <div className="flex flex-col h-full">
            {/* Header */}
                               <div className="p-6 border-b border-slate-800">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                         <Logo size="sm" />
                         <div>
                           <h1 className="text-xl font-bold text-white tracking-wide">MIV</h1>
                           <p className="text-slate-400 text-xs font-medium">Enterprise Platform</p>
                         </div>
                       </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
              {sections.map((section) => (
                <div key={section}>
                  <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    {section}
                  </h3>
                  <div className="space-y-1">
                    {navigation
                      .filter((item) => item.section === section)
                      .map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={handleNavClick}
                          className={cn(
                            "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900",
                            pathname === item.href
                              ? "bg-blue-600/90 text-white shadow-lg border-l-4 border-blue-400"
                              : "text-slate-300 hover:bg-slate-800/80 hover:text-white hover:border-l-4 hover:border-slate-600",
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

            {/* Footer */}
            <div className="p-6 border-t border-slate-800">
              <div className="text-center">
                <p className="text-xs text-slate-400">
                  MIV Platform v1.0
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
} 