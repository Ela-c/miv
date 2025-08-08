"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  FileText, 
  Target, 
  Users, 
  Building2,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles
} from 'lucide-react'

// Form validation schema
const ventureIntakeSchema = z.object({
  // Step 1: Basic Information
  name: z.string().min(1, 'Venture name is required'),
  sector: z.string().min(1, 'Sector is required'),
  location: z.string().min(1, 'Location is required'),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().optional(),
  
  // Step 2: Team & Foundation
  founderTypes: z.array(z.string()).min(1, 'Select at least one founder type'),
  teamSize: z.string().min(1, 'Team size is required'),
  foundingYear: z.string().min(1, 'Founding year is required'),
  pitchSummary: z.string().min(10, 'Pitch summary must be at least 10 characters'),
  inclusionFocus: z.string().min(1, 'Inclusion focus is required'),
  
  // Step 3: Market & Business
  targetMarket: z.string().min(1, 'Target market is required'),
  revenueModel: z.string().min(1, 'Revenue model is required'),
  challenges: z.string().min(1, 'Challenges description is required'),
  supportNeeded: z.string().min(1, 'Support needed description is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  
  // Step 4: Readiness Assessment
  operationalReadiness: z.object({
    businessPlan: z.boolean(),
    financialProjections: z.boolean(),
    legalStructure: z.boolean(),
    teamComposition: z.boolean(),
    marketResearch: z.boolean(),
  }),
  
  capitalReadiness: z.object({
    pitchDeck: z.boolean(),
    financialStatements: z.boolean(),
    investorMaterials: z.boolean(),
    dueDiligence: z.boolean(),
    fundingHistory: z.boolean(),
  }),
  
  // Step 5: Accessibility & Disability Inclusion
  washingtonShortSet: z
    .object({
      seeing: z.enum(['no_difficulty', 'some_difficulty', 'a_lot_of_difficulty', 'cannot_do_at_all']).optional(),
      hearing: z.enum(['no_difficulty', 'some_difficulty', 'a_lot_of_difficulty', 'cannot_do_at_all']).optional(),
      walking: z.enum(['no_difficulty', 'some_difficulty', 'a_lot_of_difficulty', 'cannot_do_at_all']).optional(),
      cognition: z.enum(['no_difficulty', 'some_difficulty', 'a_lot_of_difficulty', 'cannot_do_at_all']).optional(),
      selfCare: z.enum(['no_difficulty', 'some_difficulty', 'a_lot_of_difficulty', 'cannot_do_at_all']).optional(),
      communication: z.enum(['no_difficulty', 'some_difficulty', 'a_lot_of_difficulty', 'cannot_do_at_all']).optional(),
    })
    .optional(),
  disabilityInclusion: z
    .object({
      disabilityLedLeadership: z.boolean().optional(),
      inclusiveHiringPractices: z.boolean().optional(),
      accessibleProductsOrServices: z.boolean().optional(),
      notes: z.string().optional(),
    })
    .optional(),

  // Step 5: GEDSI Goals
  gedsiGoals: z.array(z.string()).min(1, 'Select at least one GEDSI goal'),
})

type VentureIntakeFormData = z.infer<typeof ventureIntakeSchema>

const steps = [
  { id: 1, title: 'Basic Information', description: 'Venture details and contact information' },
  { id: 2, title: 'Team & Foundation', description: 'Founding team and venture foundation' },
  { id: 3, title: 'Market & Business', description: 'Target market and business model' },
  { id: 4, title: 'Readiness Assessment', description: 'Operational and capital readiness' },
  { id: 5, title: 'Accessibility & DLI', description: 'Washington Short Set + Disability Inclusion' },
  { id: 6, title: 'GEDSI Goals', description: 'Impact goals and metrics' },
]

const sectors = [
  'CleanTech', 'Agriculture', 'FinTech', 'Healthcare', 'Education', 
  'E-commerce', 'Manufacturing', 'Services', 'Technology', 'Other'
]

const founderTypes = [
  'women-led', 'youth-led', 'disability-inclusive', 'rural-focus', 
  'indigenous-led', 'refugee-led', 'veteran-led', 'other'
]

const teamSizes = ['1-2', '3-5', '6-10', '11-20', '21-50', '50+']

const revenueModels = [
  'B2B Sales', 'B2C Sales', 'Subscription', 'Marketplace', 
  'Licensing', 'Franchising', 'Advertising', 'Other'
]

const gedsiGoals = [
  'OI.1 - Women-led ventures supported',
  'OI.2 - Ventures with disability inclusion',
  'OI.3 - Rural communities served',
  'OI.4 - Youth employment created',
  'OI.5 - Indigenous communities supported',
  'OI.6 - Financial inclusion achieved',
  'OI.7 - Education access improved',
  'OI.8 - Healthcare access enhanced'
]

export function VentureIntakeForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)
  const [showAiInsights, setShowAiInsights] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<VentureIntakeFormData>({
    resolver: zodResolver(ventureIntakeSchema),
    mode: 'onChange',
  })

  const watchedValues = watch()

  const progress = (currentStep / steps.length) * 100

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: VentureIntakeFormData) => {
    setIsSubmitting(true)
    try {
      // Submit venture data
      const response = await fetch('/api/ventures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const result = await response.json()
        
        // Trigger AI analysis
        const aiResponse = await fetch('/api/ai/analyze-venture', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ventureId: result.id }),
        })

        if (aiResponse.ok) {
          const aiResult = await aiResponse.json()
          setAiAnalysis(aiResult)
          setShowAiInsights(true)
        }
      }
    } catch (error) {
      console.error('Error submitting venture:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Venture Name *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Enter venture name"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="sector">Sector *</Label>
          <Select onValueChange={(value) => setValue('sector', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.sector && (
            <p className="text-sm text-red-500">{errors.sector.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            {...register('location')}
            placeholder="City, Country"
          />
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email *</Label>
          <Input
            id="contactEmail"
            type="email"
            {...register('contactEmail')}
            placeholder="contact@venture.com"
          />
          {errors.contactEmail && (
            <p className="text-sm text-red-500">{errors.contactEmail.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            {...register('contactPhone')}
            placeholder="+1234567890"
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Founder Types *</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {founderTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                onCheckedChange={(checked) => {
                  const current = watchedValues.founderTypes || []
                  if (checked) {
                    setValue('founderTypes', [...current, type])
                  } else {
                    setValue('founderTypes', current.filter(t => t !== type))
                  }
                }}
              />
              <Label htmlFor={type} className="text-sm capitalize">
                {type.replace('-', ' ')}
              </Label>
            </div>
          ))}
        </div>
        {errors.founderTypes && (
          <p className="text-sm text-red-500">{errors.founderTypes.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="teamSize">Team Size *</Label>
          <Select onValueChange={(value) => setValue('teamSize', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select team size" />
            </SelectTrigger>
            <SelectContent>
              {teamSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.teamSize && (
            <p className="text-sm text-red-500">{errors.teamSize.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="foundingYear">Founding Year *</Label>
          <Input
            id="foundingYear"
            {...register('foundingYear')}
            placeholder="2023"
          />
          {errors.foundingYear && (
            <p className="text-sm text-red-500">{errors.foundingYear.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pitchSummary">Pitch Summary *</Label>
        <Textarea
          id="pitchSummary"
          {...register('pitchSummary')}
          placeholder="Brief description of your venture and value proposition..."
          rows={4}
        />
        {errors.pitchSummary && (
          <p className="text-sm text-red-500">{errors.pitchSummary.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="inclusionFocus">Inclusion Focus *</Label>
        <Textarea
          id="inclusionFocus"
          {...register('inclusionFocus')}
          placeholder="How does your venture promote inclusion and address social challenges?"
          rows={3}
        />
        {errors.inclusionFocus && (
          <p className="text-sm text-red-500">{errors.inclusionFocus.message}</p>
        )}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="targetMarket">Target Market *</Label>
          <Input
            id="targetMarket"
            {...register('targetMarket')}
            placeholder="e.g., Rural farmers in Vietnam"
          />
          {errors.targetMarket && (
            <p className="text-sm text-red-500">{errors.targetMarket.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="revenueModel">Revenue Model *</Label>
          <Select onValueChange={(value) => setValue('revenueModel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select revenue model" />
            </SelectTrigger>
            <SelectContent>
              {revenueModels.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.revenueModel && (
            <p className="text-sm text-red-500">{errors.revenueModel.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="challenges">Key Challenges *</Label>
        <Textarea
          id="challenges"
          {...register('challenges')}
          placeholder="What are the main challenges your venture faces?"
          rows={3}
        />
        {errors.challenges && (
          <p className="text-sm text-red-500">{errors.challenges.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="supportNeeded">Support Needed *</Label>
        <Textarea
          id="supportNeeded"
          {...register('supportNeeded')}
          placeholder="What type of support do you need from MIV?"
          rows={3}
        />
        {errors.supportNeeded && (
          <p className="text-sm text-red-500">{errors.supportNeeded.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeline">Timeline to Investment Readiness *</Label>
        <Input
          id="timeline"
          {...register('timeline')}
          placeholder="e.g., 6-12 months to Series A"
        />
        {errors.timeline && (
          <p className="text-sm text-red-500">{errors.timeline.message}</p>
        )}
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Operational Readiness</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'businessPlan', label: 'Business Plan' },
            { key: 'financialProjections', label: 'Financial Projections' },
            { key: 'legalStructure', label: 'Legal Structure' },
            { key: 'teamComposition', label: 'Team Composition' },
            { key: 'marketResearch', label: 'Market Research' },
          ].map((item) => (
            <div key={item.key} className="flex items-center space-x-2">
                             <Checkbox
                 id={item.key}
                 onCheckedChange={(checked) => {
                   setValue(`operationalReadiness.${item.key}` as any, checked as boolean)
                 }}
               />
              <Label htmlFor={item.key}>{item.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Capital Readiness</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'pitchDeck', label: 'Pitch Deck' },
            { key: 'financialStatements', label: 'Financial Statements' },
            { key: 'investorMaterials', label: 'Investor Materials' },
            { key: 'dueDiligence', label: 'Due Diligence Ready' },
            { key: 'fundingHistory', label: 'Funding History' },
          ].map((item) => (
            <div key={item.key} className="flex items-center space-x-2">
                             <Checkbox
                 id={item.key}
                 onCheckedChange={(checked) => {
                   setValue(`capitalReadiness.${item.key}` as any, checked as boolean)
                 }}
               />
              <Label htmlFor={item.key}>{item.label}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label>Washington Group Short Set</Label>
        <p className="text-sm text-gray-500">Identify functional difficulties to better design inclusive support.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'seeing', label: 'Seeing' },
            { key: 'hearing', label: 'Hearing' },
            { key: 'walking', label: 'Walking' },
            { key: 'cognition', label: 'Remembering/Concentrating' },
            { key: 'selfCare', label: 'Self-care (washing/dressing)' },
            { key: 'communication', label: 'Communication' },
          ].map((item) => (
            <div key={item.key} className="space-y-2">
              <Label className="text-sm">{item.label}</Label>
              <Select onValueChange={(value) => setValue(`washingtonShortSet.${item.key}` as any, value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no_difficulty">No difficulty</SelectItem>
                  <SelectItem value="some_difficulty">Some difficulty</SelectItem>
                  <SelectItem value="a_lot_of_difficulty">A lot of difficulty</SelectItem>
                  <SelectItem value="cannot_do_at_all">Cannot do at all</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Disability Inclusion Attributes</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'disabilityLedLeadership', label: 'Disability-led leadership' },
            { key: 'inclusiveHiringPractices', label: 'Inclusive hiring practices' },
            { key: 'accessibleProductsOrServices', label: 'Accessible products/services' },
          ].map((item) => (
            <div key={item.key} className="flex items-center space-x-2">
              <Checkbox
                id={item.key}
                onCheckedChange={(checked) => {
                  setValue(`disabilityInclusion.${item.key}` as any, checked as boolean)
                }}
              />
              <Label htmlFor={item.key}>{item.label}</Label>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="dliNotes">Notes (optional)</Label>
          <Textarea id="dliNotes" rows={3} placeholder="Any relevant context"
            {...register('disabilityInclusion.notes' as any)} />
        </div>
      </div>
    </div>
  )

  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>GEDSI Goals *</Label>
        <div className="grid grid-cols-1 gap-3">
          {gedsiGoals.map((goal) => (
            <div key={goal} className="flex items-center space-x-2">
              <Checkbox
                id={goal}
                onCheckedChange={(checked) => {
                  const current = watchedValues.gedsiGoals || []
                  if (checked) {
                    setValue('gedsiGoals', [...current, goal])
                  } else {
                    setValue('gedsiGoals', current.filter(g => g !== goal))
                  }
                }}
              />
              <Label htmlFor={goal} className="text-sm">
                {goal}
              </Label>
            </div>
          ))}
        </div>
        {errors.gedsiGoals && (
          <p className="text-sm text-red-500">{errors.gedsiGoals.message}</p>
        )}
      </div>

      <Alert>
        <Target className="h-4 w-4" />
        <AlertDescription>
          These GEDSI goals will be used to track your venture's impact and align with IRIS+ metrics. 
          Our AI system will suggest additional relevant metrics based on your venture profile.
        </AlertDescription>
      </Alert>
    </div>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      case 4:
        return renderStep4()
      case 5:
        return renderStep5()
      case 6:
        return renderStep6()
      default:
        return null
    }
  }

  if (showAiInsights && aiAnalysis) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <CardTitle>AI Analysis Complete!</CardTitle>
            </div>
            <CardDescription>
              Your venture has been analyzed and GEDSI metrics have been suggested
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800">Readiness Score</h4>
                <p className="text-2xl font-bold text-green-600">{aiAnalysis.readinessScore}%</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800">GEDSI Alignment</h4>
                <p className="text-2xl font-bold text-blue-600">{aiAnalysis.gedsiAlignment}%</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800">Suggested Metrics</h4>
                <p className="text-2xl font-bold text-purple-600">{aiAnalysis.suggestedMetrics?.length || 0}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">AI Recommendations</h4>
              <div className="space-y-2">
                {aiAnalysis.recommendations?.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Suggested GEDSI Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {aiAnalysis.suggestedMetrics?.map((metric: any, index: number) => (
                  <Badge key={index} variant="outline" className="justify-start">
                    {metric.code}: {metric.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={() => setShowAiInsights(false)} variant="outline">
                Back to Form
              </Button>
              <Button>
                View Venture Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Venture Intake Form</h2>
          <Badge variant="outline">Step {currentStep} of {steps.length}</Badge>
        </div>
        <Progress value={progress} className="w-full" />
        <div className="flex items-center space-x-2">
          <Building2 className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-gray-600">
            {steps[currentStep - 1].title} - {steps[currentStep - 1].description}
          </span>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>{steps[currentStep - 1].title}</span>
            {currentStep === steps.length && <Sparkles className="h-4 w-4 text-blue-500" />}
          </CardTitle>
          <CardDescription>
            {steps[currentStep - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isValid}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Submit & Analyze
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 