"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Building2,
  Users,
  Heart,
  Globe
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    inquiryType: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

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
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-miv-primary via-miv-teal to-gedsi-gender bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Ready to join the inclusive venture ecosystem? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-white/50 backdrop-blur-sm border-white/20"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-white/50 backdrop-blur-sm border-white/20"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      className="bg-white/50 backdrop-blur-sm border-white/20"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <Select value={formData.inquiryType} onValueChange={(value) => setFormData({...formData, inquiryType: value})}>
                      <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/20">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="venture-submission">Venture Submission</SelectItem>
                        <SelectItem value="investor-inquiry">Investor Inquiry</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="media">Media & Press</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="bg-white/50 backdrop-blur-sm border-white/20 min-h-[120px]"
                      placeholder="Tell us about your venture, investment interest, or how we can help..."
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-miv-primary to-miv-teal hover:from-miv-primary/90 hover:to-miv-teal/90 text-white"
                  >
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-miv-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-miv-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                        <p className="text-gray-600 dark:text-gray-300">info@mekongiv.org</p>
                        <p className="text-gray-600 dark:text-gray-300">ventures@mekongiv.org</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-miv-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-miv-teal" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Phone</h4>
                        <p className="text-gray-600 dark:text-gray-300">+855 (0) 23 xxx xxx</p>
                        <p className="text-gray-600 dark:text-gray-300">+84 (0) 28 xxx xxx</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gedsi-gender/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-gedsi-gender" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Address</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          123 Riverside Boulevard<br />
                          Phnom Penh, Cambodia
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-status-assessment/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-status-assessment" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Office Hours</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 9:00 AM - 1:00 PM (ICT)
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Quick Actions
                  </h3>
                  
                  <div className="space-y-4">
                    <Link href="/venture-intake">
                      <Button variant="outline" className="w-full justify-start bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/80">
                        <Building2 className="mr-3 h-5 w-5 text-miv-primary" />
                        Submit Venture Application
                      </Button>
                    </Link>
                    
                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full justify-start bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/80">
                        <Users className="mr-3 h-5 w-5 text-miv-teal" />
                        Access Dashboard
                      </Button>
                    </Link>
                    
                    <Link href="/gedsi-tracker">
                      <Button variant="outline" className="w-full justify-start bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/80">
                        <Heart className="mr-3 h-5 w-5 text-gedsi-gender" />
                        GEDSI Integration
                      </Button>
                    </Link>
                    
                    <Link href="/about">
                      <Button variant="outline" className="w-full justify-start bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/80">
                        <Globe className="mr-3 h-5 w-5 text-status-facilitation" />
                        Learn More About MIV
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Offices */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Regional Presence
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We maintain a strong presence across Southeast Asia to better serve our venture portfolio.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                country: "Cambodia",
                city: "Phnom Penh",
                role: "Headquarters",
                ventures: "18 ventures",
                contact: "+855 (0) 23 xxx xxx"
              },
              {
                country: "Vietnam",
                city: "Ho Chi Minh City",
                role: "Regional Hub",
                ventures: "15 ventures",
                contact: "+84 (0) 28 xxx xxx"
              },
              {
                country: "Thailand",
                city: "Bangkok",
                role: "Partnership Office",
                ventures: "14 ventures",
                contact: "+66 (0) 2 xxx xxx"
              }
            ].map((office, index) => (
              <Card key={office.country} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 text-center hover:bg-white/80 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-miv-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-8 w-8 text-miv-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {office.country}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {office.city} • {office.role}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>{office.ventures}</p>
                    <p>{office.contact}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
