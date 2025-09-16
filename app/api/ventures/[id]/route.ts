import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for updates
const updateVentureSchema = z.object({
  name: z.string().min(1).optional(),
  sector: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  pitchSummary: z.string().optional(),
  inclusionFocus: z.string().optional(),
  founderTypes: z.array(z.string()).optional(),
  teamSize: z.string().optional(),
  foundingYear: z.string().optional(),
  targetMarket: z.string().optional(),
  revenueModel: z.string().optional(),
  operationalReadiness: z.record(z.any()).optional(),
  capitalReadiness: z.record(z.any()).optional(),
  gedsiGoals: z.array(z.string()).optional(),
  challenges: z.string().optional(),
  supportNeeded: z.string().optional(),
  timeline: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).optional(),
  stage: z.enum(['INTAKE', 'SCREENING', 'DUE_DILIGENCE', 'INVESTMENT_READY', 'FUNDED', 'EXITED']).optional(),
  // assignedToId will be handled separately
});

// GET /api/ventures/[id] - Get single venture
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Disable authentication for development
    // const session = await getServerSession();
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Fallback sample data for development
    const sampleVentures = {
      "1": {
        id: "1",
        name: "GreenTech Solutions",
        description: "Innovative clean technology solutions for sustainable agriculture in Southeast Asia. Our platform helps farmers optimize crop yields while reducing environmental impact.",
        sector: "CleanTech",
        location: "Ho Chi Minh City, Vietnam",
        stage: "EARLY_GROWTH",
        status: "ACTIVE",
        fundingAmount: 500000,
        fundingStage: "Series A",
        teamSize: 15,
        foundedYear: 2022,
        website: "https://greentech-solutions.com",
        contactEmail: "contact@greentech-solutions.com",
        contactPhone: "+84 123 456 789",
        gedsiScore: 92,
        gedsiMetrics: [
          {
            id: "gm1",
            metricCode: "GM001",
            metricName: "Women Leadership Representation",
            category: "GENDER",
            targetValue: 50,
            currentValue: 45,
            unit: "%",
            status: "ON_TRACK",
            verificationDate: "2024-01-15T00:00:00Z",
            notes: "Strong female representation in executive roles"
          },
          {
            id: "gm2",
            metricCode: "EQ002",
            metricName: "Fair Wage Policy",
            category: "EQUITY",
            targetValue: 100,
            currentValue: 90,
            unit: "%",
            status: "NEEDS_ATTENTION",
            verificationDate: "2024-01-10T00:00:00Z",
            notes: "Implementation of fair wage policy across all levels"
          }
        ],
        activities: [
          {
            id: "act1",
            type: "ASSESSMENT",
            description: "Initial GEDSI assessment completed",
            date: "2024-01-15T10:30:00Z",
            userId: "user1",
            user: {
              name: "Sarah Johnson",
              email: "sarah@miv.com"
            }
          },
          {
            id: "act2",
            type: "FUNDING",
            description: "Series A funding round initiated",
            date: "2024-01-14T14:20:00Z",
            userId: "user2",
            user: {
              name: "Michael Chen",
              email: "michael@miv.com"
            }
          }
        ],
        documents: [
          {
            id: "doc1",
            name: "Business Plan 2024.pdf",
            type: "application/pdf",
            url: "/documents/business-plan-2024.pdf",
            uploadedAt: "2024-01-15T00:00:00Z",
            size: "2.3 MB"
          },
          {
            id: "doc2",
            name: "Financial Projections.xlsx",
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            url: "/documents/financial-projections.xlsx",
            uploadedAt: "2024-01-14T00:00:00Z",
            size: "1.8 MB"
          }
        ],
        createdBy: {
          name: "Sarah Johnson",
          email: "sarah@miv.com"
        },
        assignedTo: {
          name: "Michael Chen",
          email: "michael@miv.com"
        },
        createdAt: "2024-01-10T00:00:00Z",
        updatedAt: "2024-01-15T00:00:00Z"
      },
      "2": {
        id: "2",
        name: "EcoFarm Vietnam",
        description: "Digital platform connecting farmers with sustainable farming practices and direct market access in rural Vietnam.",
        sector: "Agriculture",
        location: "Hanoi, Vietnam",
        stage: "VALIDATION",
        status: "ACTIVE",
        fundingAmount: 250000,
        fundingStage: "Seed",
        teamSize: 8,
        foundedYear: 2023,
        website: "https://ecofarm-vietnam.com",
        contactEmail: "info@ecofarm-vietnam.com",
        contactPhone: "+84 987 654 321",
        gedsiScore: 88,
        gedsiMetrics: [],
        activities: [],
        documents: [],
        createdBy: {
          name: "Sarah Johnson",
          email: "sarah@miv.com"
        },
        assignedTo: {
          name: "Alice Wong",
          email: "alice@miv.com"
        },
        createdAt: "2024-01-08T00:00:00Z",
        updatedAt: "2024-01-14T00:00:00Z"
      }
    };

    // Try to get venture from database, fallback to sample data
    let venture;
    try {
      venture = await prisma.venture.findUnique({
        where: { id: id },
        include: {
          createdBy: {
            select: { name: true, email: true }
          },
          assignedTo: {
            select: { name: true, email: true }
          },
          gedsiMetrics: {
            orderBy: { createdAt: 'desc' }
          },
          documents: {
            orderBy: { uploadedAt: 'desc' }
          },
          activities: {
            include: {
              user: {
                select: { name: true, email: true }
              }
            },
            orderBy: { createdAt: 'desc' },
            take: 20
          },
          capitalActivities: {
            orderBy: { createdAt: 'desc' }
          },
          _count: {
            select: {
              documents: true,
              activities: true,
              capitalActivities: true,
              gedsiMetrics: true,
            }
          }
        }
      });
    } catch (dbError) {
      console.log('Database connection failed, using sample data:', dbError);
      venture = null;
    }

    // If database query failed or no venture found, try sample data
    if (!venture && sampleVentures[id as keyof typeof sampleVentures]) {
      venture = sampleVentures[id as keyof typeof sampleVentures];
    }

    if (!venture) {
      return NextResponse.json({ error: 'Venture not found' }, { status: 404 });
    }

    return NextResponse.json(venture);
  } catch (error) {
    console.error('Error fetching venture:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/ventures/[id] - Update venture
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateVentureSchema.parse(body);

    // Get user ID from session
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if venture exists
    const existingVenture = await prisma.venture.findUnique({
      where: { id: id }
    });

    if (!existingVenture) {
      return NextResponse.json({ error: 'Venture not found' }, { status: 404 });
    }

    // Handle assignedToId separately if provided
    const updateData: any = { ...validatedData };
    if (body.assignedToId !== undefined) {
      updateData.assignedToId = body.assignedToId;
    }

    // Update venture
    const updatedVenture = await prisma.venture.update({
      where: { id: id },
      data: updateData,
      include: {
        createdBy: {
          select: { name: true, email: true }
        },
        assignedTo: {
          select: { name: true, email: true }
        },
        gedsiMetrics: true,
      }
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        ventureId: id,
        userId: user.id,
        type: 'VENTURE_UPDATED',
        title: 'Venture Updated',
        description: `Venture "${updatedVenture.name}" was updated`,
        metadata: { updatedFields: Object.keys(validatedData) }
      }
    });

    return NextResponse.json(updatedVenture);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error updating venture:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/ventures/[id] - Delete venture
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user ID from session
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if venture exists
    const existingVenture = await prisma.venture.findUnique({
      where: { id: id }
    });

    if (!existingVenture) {
      return NextResponse.json({ error: 'Venture not found' }, { status: 404 });
    }

    // Delete venture (this will cascade delete related records)
    await prisma.venture.delete({
      where: { id: id }
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        userId: user.id,
        type: 'VENTURE_UPDATED',
        title: 'Venture Deleted',
        description: `Venture "${existingVenture.name}" was deleted`,
        metadata: { ventureId: id }
      }
    });

    return NextResponse.json({ message: 'Venture deleted successfully' });
  } catch (error) {
    console.error('Error deleting venture:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 