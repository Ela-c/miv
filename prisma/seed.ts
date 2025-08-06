import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'admin@miv.org' },
    update: {},
    create: {
      email: 'admin@miv.org',
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'analyst@miv.org' },
    update: {},
    create: {
      email: 'analyst@miv.org',
      name: 'Analyst User',
      role: 'ANALYST',
    },
  })

  console.log('✅ Users created')

  // Create sample ventures
  const ventures = [
    {
      name: 'GreenTech Solutions',
      sector: 'CleanTech',
      location: 'Ho Chi Minh City, Vietnam',
      contactEmail: 'contact@greentech.vn',
      contactPhone: '+84 123 456 789',
      pitchSummary: 'Innovative solar panel technology for rural electrification',
      inclusionFocus: 'Women-led venture focusing on rural communities',
      founderTypes: JSON.stringify(['women-led', 'rural-focus']),
      teamSize: '5-10',
      foundingYear: '2022',
      targetMarket: 'Rural communities in Vietnam and Cambodia',
      revenueModel: 'B2B and B2C solar panel sales',
      operationalReadiness: {
        businessPlan: true,
        financialProjections: true,
        legalStructure: true,
        teamComposition: true,
        marketResearch: true,
      },
      capitalReadiness: {
        pitchDeck: true,
        financialStatements: true,
        investorMaterials: false,
        dueDiligence: false,
        fundingHistory: false,
      },
      gedsiGoals: JSON.stringify(['OI.1', 'OI.2', 'OI.3']),
      challenges: 'Limited access to capital and technical expertise',
      supportNeeded: 'Investment readiness support and technical mentorship',
      timeline: '6-12 months to Series A',
      stage: 'SCREENING' as const,
      createdById: user1.id,
    },
    {
      name: 'EcoFarm Vietnam',
      sector: 'Agriculture',
      location: 'Hanoi, Vietnam',
      contactEmail: 'info@ecofarm.vn',
      contactPhone: '+84 987 654 321',
      pitchSummary: 'Sustainable farming solutions for smallholder farmers',
      inclusionFocus: 'Supporting farmers with disabilities and women farmers',
      founderTypes: JSON.stringify(['disability-inclusive', 'women-led']),
      teamSize: '3-5',
      foundingYear: '2021',
      targetMarket: 'Smallholder farmers in Vietnam',
      revenueModel: 'Subscription-based farming services',
      operationalReadiness: {
        businessPlan: true,
        financialProjections: false,
        legalStructure: true,
        teamComposition: true,
        marketResearch: true,
      },
      capitalReadiness: {
        pitchDeck: true,
        financialStatements: false,
        investorMaterials: false,
        dueDiligence: false,
        fundingHistory: false,
      },
      gedsiGoals: JSON.stringify(['OI.1', 'OI.4', 'OI.5']),
      challenges: 'Limited market access and technology adoption',
      supportNeeded: 'Market access support and technology training',
      timeline: '12-18 months to seed funding',
      stage: 'INTAKE' as const,
      createdById: user2.id,
    },
    {
      name: 'TechStart Cambodia',
      sector: 'FinTech',
      location: 'Phnom Penh, Cambodia',
      contactEmail: 'hello@techstart.kh',
      contactPhone: '+855 123 456 789',
      pitchSummary: 'Digital payment solutions for underserved communities',
      inclusionFocus: 'Financial inclusion for rural and marginalized communities',
      founderTypes: JSON.stringify(['youth-led', 'rural-focus']),
      teamSize: '10-20',
      foundingYear: '2023',
      targetMarket: 'Unbanked populations in Cambodia',
      revenueModel: 'Transaction fees and subscription services',
      operationalReadiness: {
        businessPlan: true,
        financialProjections: true,
        legalStructure: true,
        teamComposition: true,
        marketResearch: true,
      },
      capitalReadiness: {
        pitchDeck: true,
        financialStatements: true,
        investorMaterials: true,
        dueDiligence: true,
        fundingHistory: true,
      },
      gedsiGoals: JSON.stringify(['OI.1', 'OI.2', 'OI.6']),
      challenges: 'Regulatory compliance and user adoption',
      supportNeeded: 'Regulatory guidance and market expansion support',
      timeline: '3-6 months to Series A',
      stage: 'DUE_DILIGENCE' as const,
      createdById: user1.id,
    },
  ]

  for (const ventureData of ventures) {
    const venture = await prisma.venture.create({
      data: ventureData,
    })

    console.log(`✅ Venture created: ${venture.name}`)

    // Create sample GEDSI metrics for each venture
    const gedsiMetrics = [
      {
        metricCode: 'OI.1',
        metricName: 'Number of women-led ventures supported',
        category: 'GENDER' as const,
        targetValue: 100,
        currentValue: 25,
        unit: 'ventures',
        status: 'IN_PROGRESS' as const,
        notes: 'On track to meet target',
        ventureId: venture.id,
        createdById: user1.id,
      },
      {
        metricCode: 'OI.2',
        metricName: 'Number of ventures with disability inclusion',
        category: 'DISABILITY' as const,
        targetValue: 50,
        currentValue: 15,
        unit: 'ventures',
        status: 'IN_PROGRESS' as const,
        notes: 'Need to increase focus on disability inclusion',
        ventureId: venture.id,
        createdById: user1.id,
      },
      {
        metricCode: 'OI.3',
        metricName: 'Number of rural communities served',
        category: 'SOCIAL_INCLUSION' as const,
        targetValue: 200,
        currentValue: 75,
        unit: 'communities',
        status: 'VERIFIED' as const,
        notes: 'Exceeding expectations in rural outreach',
        ventureId: venture.id,
        createdById: user2.id,
      },
    ]

    for (const metricData of gedsiMetrics) {
      await prisma.gEDSIMetric.create({
        data: metricData,
      })
    }

    // Create sample activities
    const activities = [
      {
        type: 'VENTURE_CREATED' as const,
        title: 'Venture Created',
        description: `New venture "${venture.name}" was added to the pipeline`,
        ventureId: venture.id,
        userId: venture.createdById,
      },
      {
        type: 'METRIC_ADDED' as const,
        title: 'GEDSI Metrics Added',
        description: 'Initial GEDSI metrics were configured for the venture',
        ventureId: venture.id,
        userId: user1.id,
      },
      {
        type: 'NOTE_ADDED' as const,
        title: 'AI Analysis Completed',
        description: 'AI-powered analysis of venture readiness and GEDSI alignment completed',
        ventureId: venture.id,
        userId: user1.id,
        metadata: {
          type: 'ai_analysis',
          category: 'readiness',
          score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        },
      },
    ]

    for (const activityData of activities) {
      await prisma.activity.create({
        data: activityData,
      })
    }

    // Create sample documents
    const documents = [
      {
        name: 'Pitch Deck',
        type: 'PITCH_DECK' as const,
        url: 'https://example.com/pitch-deck.pdf',
        size: 2048576, // 2MB
        mimeType: 'application/pdf',
        ventureId: venture.id,
      },
      {
        name: 'Business Plan',
        type: 'BUSINESS_PLAN' as const,
        url: 'https://example.com/business-plan.pdf',
        size: 1048576, // 1MB
        mimeType: 'application/pdf',
        ventureId: venture.id,
      },
    ]

    for (const documentData of documents) {
      await prisma.document.create({
        data: documentData,
      })
    }
  }

  console.log('✅ Sample data created successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 