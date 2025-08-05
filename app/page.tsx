"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowRight,
  Play,
  CheckCircle,
  Target,
  Zap,
  Database,
  Building2,
  DollarSign,
  TrendingUp,
  Users,
  Globe,
  Shield,
  BarChart3,
  Moon,
  Sun,
  Settings
} from "lucide-react"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { theme, setTheme, isDark } = useTheme()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 relative overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏛️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">MIV</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Venture Intelligence</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <Link href="#platform" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Platform
              </Link>
              <Link href="#solutions" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Solutions
              </Link>
              <Link href="#impact" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Impact
              </Link>
              <Link href="#about" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                About
              </Link>

              {/* Theme Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative transition-all duration-200 hover:scale-105"
                  >
                    {theme === "system" ? (
                      <Settings className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    ) : isDark ? (
                      <Moon className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Sun className="h-4 w-4 text-yellow-500" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg font-semibold">
                  Access Platform <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white/90 font-medium">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Enterprise-Grade Investment Platform</span>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <span className="text-emerald-400">Live</span>
                </div>

                {/* Headline */}
                <div className="space-y-4">
                  <h1 className="text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                    <span className="block">Advanced</span>
                    <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                      Venture Intelligence
                    </span>
                    <span className="block">Platform</span>
                  </h1>
                </div>

                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                  Next-generation venture management with AI-powered analytics, automated workflows,
                  and comprehensive impact measurement for institutional investors and development organizations.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg font-semibold px-8 py-4 text-lg">
                    Launch Platform
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" className="bg-white/10 text-white hover:bg-white/20 font-semibold px-8 py-4 text-lg border border-white/30">
                  <Play className="mr-2 h-5 w-5" />
                  View Demo
                </Button>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    $50M+
                  </div>
                  <div className="text-sm text-slate-400 mt-1">Capital Facilitated</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    247
                  </div>
                  <div className="text-sm text-slate-400 mt-1">Active Ventures</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    89%
                  </div>
                  <div className="text-sm text-slate-400 mt-1">GEDSI Compliance</div>
                </div>
              </div>
            </div>
            
            {/* Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Enterprise Dashboard</h3>
                    <div className="flex items-center space-x-2 bg-emerald-100 text-emerald-800 border-emerald-200 rounded-full px-3 py-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm font-medium">Live</span>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="text-2xl font-bold text-blue-600">247</div>
                      <div className="text-sm text-slate-600">Active Ventures</div>
                      <div className="text-xs text-emerald-600 mt-1">↗ +12.5%</div>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                      <div className="text-2xl font-bold text-emerald-600">$2.8M</div>
                      <div className="text-sm text-slate-600">Capital Facilitated</div>
                      <div className="text-xs text-emerald-600 mt-1">↗ +24.1%</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <div className="text-2xl font-bold text-purple-600">89%</div>
                      <div className="text-sm text-slate-600">GEDSI Compliance</div>
                      <div className="text-xs text-emerald-600 mt-1">↗ +3.2%</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                      <div className="text-2xl font-bold text-orange-600">198</div>
                      <div className="text-sm text-slate-600">AI Processed</div>
                      <div className="text-xs text-slate-500 mt-1">80% automated</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-sm">Real-time analytics</span>
                      <Link href="/dashboard" className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                        <span>View Dashboard</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section id="platform" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Platform <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive tools designed for institutional investors and development organizations
              to manage ventures with precision and impact.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* AI-Powered Venture Screening */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">AI-Powered Venture Screening</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Advanced machine learning algorithms analyze venture proposals, market potential,
                  and risk factors to provide comprehensive screening reports.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Automated due diligence
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Risk assessment scoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Market analysis integration
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Advanced Analytics & Reporting */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Advanced Analytics & Reporting</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Real-time dashboards and comprehensive reporting tools provide deep insights
                  into portfolio performance and impact metrics.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Real-time performance tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Custom report generation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Impact measurement tools
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Comprehensive Data Management */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Comprehensive Data Management</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Centralized data repository with advanced security, compliance tracking,
                  and seamless integration capabilities.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Secure data storage
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    GEDSI compliance tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    API integrations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Trusted by Leading Organizations</h3>
            <p className="text-slate-600">
              Partnering with development banks, impact investors, and government agencies worldwide
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="text-center">
                <Building2 className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-slate-600">Development Banks</span>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="text-center">
                <Globe className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-slate-600">Global Investors</span>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="text-center">
                <Shield className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-slate-600">Government Agencies</span>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="text-center">
                <Users className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-slate-600">Impact Organizations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Investment Strategy?
            </span>
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join leading institutional investors and development organizations using MIV
            to drive measurable impact and superior returns.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-xl font-semibold px-10 py-4 text-lg">
                <Zap className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" className="bg-white/10 text-white hover:bg-white/20 font-semibold px-10 py-4 text-lg border border-white/30">
              <Users className="mr-2 h-5 w-5" />
              Schedule Demo
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 pt-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <span>API Integration</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">MIV</h3>
                  <p className="text-slate-400">Venture Intelligence Platform</p>
                </div>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Empowering institutional investors and development organizations with
                AI-powered venture management and impact measurement tools.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" className="bg-slate-800 hover:bg-slate-700 text-white">
                  <Globe className="h-4 w-4 mr-2" />
                  Global
                </Button>
                <Button size="sm" className="bg-slate-800 hover:bg-slate-700 text-white">
                  <Shield className="h-4 w-4 mr-2" />
                  Secure
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Analytics</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 MIV Platform. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
