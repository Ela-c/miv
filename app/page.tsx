"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight,
  Target, 
  Heart, 
  Globe, 
  Users,
  Award,
  TrendingUp,
  Building2,
  MapPin,
  Calendar,
  CheckCircle,
  Sparkles,
  BarChart3,
  FileText,
  DollarSign,
  Shield,
  Zap,
  Star,
  ArrowUpRight,
  Play,
  ChevronDown,
  MousePointer,
  Layers,
  Cpu,
  Database,
  Network,
  Rocket,
  Eye,
  Code,
  Palette,
  Smartphone,
  Lightbulb,
  BarChart,
  PieChart,
  Activity,
  UserPlus
} from "lucide-react"
import { Logo } from "@/components/logo"
import { SuccessStoriesSlider } from "@/components/success-stories-slider"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleVisibilityChange = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('load', handleVisibilityChange)

    setTimeout(() => setIsVisible(true), 100)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('load', handleVisibilityChange)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0">
        {/* Background Image */}
        <img 
          src="/bg1.jpeg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-white/10" />

        {/* Minimal Mouse Follow Glow */}
        <div 
          className="absolute w-96 h-96 bg-gray-200/10 rounded-none blur-3xl pointer-events-none transition-transform duration-500 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
      </div>

      {/* Header Navigation */}
      <header className="relative z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Logo size="md" className="shadow-lg" />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  MIV Platform
                </h1>
                <p className="text-sm text-gray-500">Enterprise Impact Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <span className="group-hover:scale-105 transition-transform duration-300">Get Started</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center py-20">
        
        {/* Grid Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-8 w-32 h-32 border-l border-t border-gray-300 opacity-30"></div>
          <div className="absolute top-8 right-8 w-32 h-32 border-r border-t border-gray-300 opacity-30"></div>
          <div className="absolute bottom-8 left-8 w-32 h-32 border-l border-b border-gray-300 opacity-30"></div>
          <div className="absolute bottom-8 right-8 w-32 h-32 border-r border-b border-gray-300 opacity-30"></div>
        </div>

        <div className="w-full h-full relative">
          {/* Grid Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 right-1/4 w-px bg-gray-200"></div>
          </div>



          {/* Main Content Grid */}
          <div className="max-w-7xl mx-auto px-6 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full items-center">
              
              {/* Left Content Area */}
              <div className="lg:col-span-3 space-y-8 relative z-10">
                {/* Main Headline */}
                <div className="space-y-4">
                  <h1 className="text-8xl lg:text-9xl font-extrabold leading-none text-black tracking-tight">
                    MIV
                  </h1>
                  <div className="relative inline-block">
                    <h2 className="text-6xl lg:text-7xl font-extrabold leading-none text-black tracking-tight relative z-10">
                      PLATFORM
                    </h2>
                    <div className="absolute inset-0 bg-lime-400 transform -rotate-1 -translate-y-1 z-0"></div>
                  </div>
                </div>

                {/* Descriptive Text */}
                <p className="text-xl text-gray-800 max-w-2xl leading-relaxed font-normal">
                  We are a diverse group of thinkers and tinkerers, strategists, creatives and technology experts dedicated to empowering inclusive ventures across Southeast Asia.
                </p>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-black text-white hover:bg-gray-900 text-lg px-8 py-4 rounded-none border-0 transition-all duration-300 group font-medium">
                      <span>Discover</span>
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>

                {/* Keywords/Footer */}
                <div className="pt-8">
                  <div className="flex items-center space-x-4 text-sm text-gray-800 font-normal tracking-wide">
                    <span>Discover</span>
                    <span>•</span>
                    <span>Build</span>
                    <span>•</span>
                    <span>Scale</span>
                    <span>•</span>
                    <span>Impact</span>
                  </div>
                </div>
              </div>

              {/* Bottom Right Michi Foriio Image */}
              <div className="lg:col-span-1 flex justify-end items-end">
                <div className="relative w-96 h-96">
                  {/* Michi Foriio Image */}
                  <div className="hidden lg:block absolute bottom-0 right-0 w-96 h-96">
                    <div className="w-full h-full relative flex items-end justify-end">
                      <div className="w-full h-full relative" style={{ transform: 'translateX(-50px)', width: '150%' }}>
                        <img 
                          src="/michi-foriio.png" 
                          alt="Michi Foriio" 
                          className="object-contain w-full h-full"
                          style={{ objectPosition: 'bottom center' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 text-yellow-500">
            <span className="text-sm font-light">Scroll to explore</span>
            <ChevronDown className="h-6 w-6" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-extrabold text-black mb-6 tracking-tight">
              IMPACT
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-normal">
              Transforming venture management across Southeast Asia with measurable results.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "150+", label: "Ventures", icon: Building2, color: "from-blue-500 to-blue-600" },
              { value: "$25M+", label: "Facilitated", icon: DollarSign, color: "from-emerald-500 to-emerald-600" },
              { value: "95%", label: "GEDSI Compliance", icon: Target, color: "from-purple-500 to-purple-600" },
              { value: "6", label: "Countries", icon: Globe, color: "from-orange-500 to-orange-600" }
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-5xl font-extrabold text-black mb-3 tracking-tight">{stat.value}</div>
                  <div className="text-gray-600 font-normal text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-extrabold text-black mb-6 tracking-tight">
              BUILT FOR
            </h2>
            <div className="relative inline-block">
              <h3 className="text-5xl font-extrabold text-black tracking-tight relative z-10">
                MODERN ENTERPRISES
              </h3>
              <div className="absolute inset-0 bg-lime-400 transform -rotate-1 -translate-y-1 z-0"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 font-normal">
              Experience enterprise-grade venture management with cutting-edge technology 
              and intuitive design that scales with your organization.
            </p>
          </div>

          {/* Core Platform Section */}
          <div className="mb-20">
            <div className="mb-16">
              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <h3 className="text-5xl font-black text-black tracking-tighter uppercase">Core</h3>
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              </div>
              <div className="text-center">
                <h4 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 tracking-tighter uppercase mb-4">Platform</h4>
                <p className="text-base text-gray-600 max-w-2xl mx-auto font-medium">
                  The foundation of your venture management success
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {[
                {
                  icon: Cpu,
                  title: "AI-Powered Intelligence",
                  description: "Advanced machine learning algorithms provide predictive insights and automated decision support",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Database,
                  title: "Real-time Analytics",
                  description: "Live dashboards and comprehensive reporting with instant data synchronization",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: Network,
                  title: "Seamless Integration",
                  description: "Connect with existing systems and third-party tools through our robust API ecosystem",
                  color: "from-emerald-500 to-teal-500"
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-grade security with SOC 2 compliance and end-to-end encryption",
                  color: "from-orange-500 to-red-500"
                }
              ].map((feature, index) => (
                <div key={index} className="group flex items-start space-x-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-black mb-3 tracking-tight">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories Section */}
          <div>
            <div className="mb-16">
              <div className="text-center mb-6">
                <h3 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 tracking-tighter uppercase mb-4">Success</h3>
                <h4 className="text-5xl font-black text-black tracking-tighter uppercase">Stories</h4>
              </div>
              <div className="flex items-center justify-center space-x-6">
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                <p className="text-base text-gray-600 font-medium">
                  Real impact from real ventures
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
              </div>
            </div>
            <SuccessStoriesSlider />
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="relative z-10 py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Powerful
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ml-3">
                Analytics
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get real-time insights into your venture portfolio with advanced analytics and reporting tools.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart,
                title: "Performance Metrics",
                description: "Track key performance indicators and growth metrics across your portfolio",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: PieChart,
                title: "Impact Analysis",
                description: "Measure social impact and GEDSI compliance with detailed analytics",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Activity,
                title: "Real-time Monitoring",
                description: "Monitor venture progress and performance in real-time with live dashboards",
                color: "from-emerald-500 to-teal-500"
              }
            ].map((item, index) => (
              <Card key={index} className="bg-white border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl group">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-16">
              <h2 className="text-5xl font-bold text-white mb-6">
                Ready to Transform
                <span className="bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent ml-3">
                  Your Impact?
                </span>
              </h2>
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                Join hundreds of organizations already using MIV to scale their inclusive venture programs 
                and drive measurable social impact across Southeast Asia.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/auth/login">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-12 py-6 shadow-2xl group">
                    <Zap className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Launch Platform</span>
                    <ArrowUpRight className="ml-3 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-xl px-12 py-6 backdrop-blur-sm group">
                    <UserPlus className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    <span>Get Started</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <Logo size="md" />
                <div>
                  <h3 className="text-xl font-bold text-white">MIV Platform</h3>
                  <p className="text-sm text-gray-400">Enterprise Impact Platform</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering inclusive ventures across Southeast Asia through innovative technology, 
                AI-powered insights, and comprehensive impact measurement.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6">Platform</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/dashboard/venture-intake" className="hover:text-white transition-colors">Venture Intake</Link></li>
                <li><Link href="/dashboard/gedsi-tracker" className="hover:text-white transition-colors">GEDSI Tracker</Link></li>
                <li><Link href="/dashboard/capital-facilitation" className="hover:text-white transition-colors">Capital Facilitation</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6">Features</h4>
              <ul className="space-y-4 text-gray-400">
                <li>AI-Powered Analysis</li>
                <li>IRIS+ Metrics</li>
                <li>Impact Reporting</li>
                <li>Team Collaboration</li>
                <li>Mobile App</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6">Support</h4>
              <ul className="space-y-4 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Training Resources</li>
                <li>Contact Support</li>
                <li>Community Forum</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Mekong Inclusive Ventures. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}