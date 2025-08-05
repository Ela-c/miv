"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Target, 
  Heart, 
  Globe, 
  Users,
  Award,
  TrendingUp,
  Building2,
  MapPin,
  Calendar,
  CheckCircle
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-blue-900 dark:to-teal-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-miv-primary to-miv-teal rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">🏛️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">MIV</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Pipeline System</p>
              </div>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="bg-white/50 backdrop-blur-sm border-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <div className="flex justify-center space-x-3 mb-8">
              <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-miv-primary/20 text-miv-primary">
                <Globe className="h-3 w-3 mr-1" />
                Impact Studio
              </Badge>
              <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-gedsi-gender/20 text-gedsi-gender">
                <Heart className="h-3 w-3 mr-1" />
                GEDSI Integrated
              </Badge>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-miv-primary via-miv-teal to-gedsi-gender bg-clip-text text-transparent">
                About MIV
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Mekong Inclusive Ventures is a pioneering impact studio dedicated to fostering inclusive economic growth 
              across Southeast Asia through comprehensive venture support and GEDSI integration.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-miv-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-miv-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  To create sustainable impact by supporting inclusive ventures that address critical challenges 
                  in Southeast Asia while promoting gender equality, disability inclusion, and social equity.
                </p>
                <ul className="space-y-3">
                  {[
                    "Support 100+ inclusive ventures by 2030",
                    "Achieve 95% GEDSI compliance across portfolio",
                    "Facilitate $50M+ in impact capital",
                    "Create 10,000+ sustainable jobs"
                  ].map((goal, index) => (
                    <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gedsi-gender/10 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-gedsi-gender" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Vision</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  A Southeast Asia where inclusive ventures thrive, creating equitable opportunities for all, 
                  especially marginalized communities, while driving sustainable economic development.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-miv-primary/5 to-miv-teal/5 rounded-xl">
                    <div className="text-2xl font-bold text-miv-primary mb-1">2019</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Founded</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-gedsi-gender/5 to-gedsi-social/5 rounded-xl">
                    <div className="text-2xl font-bold text-gedsi-gender mb-1">5</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-status-facilitation/5 to-status-completed/5 rounded-xl">
                    <div className="text-2xl font-bold text-status-facilitation mb-1">47+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Ventures</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-miv-teal/5 to-miv-primary/5 rounded-xl">
                    <div className="text-2xl font-bold text-miv-teal mb-1">89%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">GEDSI Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Approach
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We follow a comprehensive, three-stage approach to venture development, 
              with GEDSI integration at every step.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                stage: "01",
                title: "Diagnostics & Assessment",
                description: "Comprehensive evaluation of venture potential, market fit, and GEDSI integration opportunities.",
                icon: Target,
                color: "miv-primary",
                features: [
                  "Market analysis & validation",
                  "GEDSI impact assessment",
                  "Financial viability review",
                  "Scalability evaluation"
                ]
              },
              {
                stage: "02",
                title: "Investment Readiness",
                description: "Structured support to prepare ventures for investment and scale-up opportunities.",
                icon: TrendingUp,
                color: "status-assessment",
                features: [
                  "Business model refinement",
                  "Financial planning & modeling",
                  "Impact measurement framework",
                  "Investor pitch preparation"
                ]
              },
              {
                stage: "03",
                title: "Capital Facilitation",
                description: "Connecting ventures with appropriate funding sources and ongoing support for sustainable growth.",
                icon: Building2,
                color: "status-facilitation",
                features: [
                  "Investor matching & introductions",
                  "Due diligence support",
                  "Post-investment monitoring",
                  "Continuous impact tracking"
                ]
              }
            ].map((stage, index) => (
              <Card key={stage.title} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-300 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${stage.color} to-${stage.color}/60`} />
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 bg-${stage.color}/10 rounded-2xl flex items-center justify-center`}>
                      <stage.icon className={`h-8 w-8 text-${stage.color}`} />
                    </div>
                    <div className={`text-4xl font-bold text-${stage.color}/20`}>
                      {stage.stage}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {stage.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {stage.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {stage.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A diverse team of impact investing professionals, GEDSI experts, and regional specialists 
              committed to driving inclusive economic growth across Southeast Asia.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {[
              { role: "Impact Investing", count: "8", icon: TrendingUp, color: "miv-primary" },
              { role: "GEDSI Specialists", count: "5", icon: Heart, color: "gedsi-gender" },
              { role: "Regional Experts", count: "12", icon: Globe, color: "miv-teal" },
              { role: "Venture Advisors", count: "15", icon: Users, color: "status-facilitation" }
            ].map((team, index) => (
              <Card key={team.role} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 text-center hover:bg-white/80 transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-${team.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <team.icon className={`h-8 w-8 text-${team.color}`} />
                  </div>
                  <div className={`text-3xl font-bold text-${team.color} mb-2`}>
                    {team.count}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {team.role}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Join Our Mission?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Whether you're an inclusive venture seeking support or an investor looking for impact opportunities, 
            we'd love to connect with you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/venture-intake">
              <Button size="lg" className="bg-gradient-to-r from-miv-primary to-miv-teal hover:from-miv-primary/90 hover:to-miv-teal/90 text-white text-lg px-8 py-4">
                Submit Your Venture
                <Building2 className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/80 text-lg px-8 py-4">
                Explore Our Platform
                <Award className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
