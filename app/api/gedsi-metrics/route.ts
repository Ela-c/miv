import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { AIServices } from '@/lib/ai-services'
import { z } from 'zod'

const createGEDSISchema = z.object({
  ventureId: z.string(),
  metricCode: z.string(),
  metricName: z.string(),
  category: z.enum(['GENDER', 'DISABILITY', 'SOCIAL_INCLUSION', 'CROSS_CUTTING']),
  targetValue: z.number(),
  currentValue: z.number().default(0),
  unit: z.string(),
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'VERIFIED', 'COMPLETED']).default('NOT_STARTED'),
  notes: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    // Disable authentication for development
    // const session = await getServerSession()
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { searchParams } = new URL(request.url)
    const ventureId = searchParams.get('ventureId')
    const category = searchParams.get('category')
    const status = searchParams.get('status')

    const where: any = {}
    if (ventureId) where.ventureId = ventureId
    if (category) where.category = category
    if (status) where.status = status

    const metrics = await prisma.gEDSIMetric.findMany({
      where,
      include: {
        venture: {
          select: {
            name: true,
            sector: true,
            location: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform data to include venture name
    const transformedMetrics = metrics.map(metric => ({
      ...metric,
      ventureName: 'Sample Venture'
    }))

    return NextResponse.json(transformedMetrics)

  } catch (error) {
    console.error('Error fetching GEDSI metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GEDSI metrics' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Disable authentication for development
    // const session = await getServerSession()
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    const validatedData = createGEDSISchema.parse(body)

    // Check if venture exists
    const venture = await prisma.venture.findUnique({
      where: { id: validatedData.ventureId }
    })

    if (!venture) {
      return NextResponse.json({ error: 'Venture not found' }, { status: 404 })
    }

    // Create the GEDSI metric
    const metric = await prisma.gEDSIMetric.create({
      data: {
        ...validatedData,
        createdById: 'default-user-id', // Use default for development
      },
      include: {
        venture: {
          select: {
            name: true,
            sector: true,
            location: true,
          }
        }
      }
    })

    // Trigger AI analysis for metric optimization
    Promise.all([
      AIServices.analyzeGEDSIMetrics(venture).then(async (analysis) => {
        // Update venture with AI insights
        await prisma.venture.update({
          where: { id: venture.id },
          data: {
            aiAnalysis: analysis,
            updatedAt: new Date()
          }
        })
      }).catch(console.error),
      
      // Create activity log
      prisma.activity.create({
        data: {
          type: 'METRIC_ADDED',
          title: 'GEDSI Metric Added',
          description: `Added ${validatedData.metricCode} metric for ${venture.name}`,
          ventureId: venture.id,
          userId: 'default-user-id', // Use default for development
        }
      })
    ])

    return NextResponse.json({
      ...metric,
      ventureName: 'Sample Venture'
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating GEDSI metric:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create GEDSI metric' },
      { status: 500 }
    )
  }
} 