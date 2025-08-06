import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// GET /api/analytics - Get analytics data
export async function GET(request: NextRequest) {
  try {
    // Disable authentication for development
    // const session = await getServerSession();
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Get basic counts
    const [
      totalVentures,
      activeVentures,
      newVentures,
      totalMetrics,
      verifiedMetrics,
      totalDocuments,
      totalActivities
    ] = await Promise.all([
      prisma.venture.count(),
      prisma.venture.count({ where: { status: 'ACTIVE' } }),
      prisma.venture.count({ 
        where: { 
          createdAt: { gte: startDate } 
        } 
      }),
      prisma.gEDSIMetric.count(),
      prisma.gEDSIMetric.count({ 
        where: { 
          status: { in: ['VERIFIED', 'COMPLETED'] } 
        } 
      }),
      prisma.document.count(),
      prisma.activity.count({ 
        where: { 
          createdAt: { gte: startDate } 
        } 
      })
    ]);

    // Get ventures by stage
    const venturesByStage = await prisma.venture.groupBy({
      by: ['stage'],
      _count: { stage: true },
      where: { status: 'ACTIVE' }
    });

    // Get ventures by sector
    const venturesBySector = await prisma.venture.groupBy({
      by: ['sector'],
      _count: { sector: true },
      where: { status: 'ACTIVE' }
    });

    // Get GEDSI metrics by category
    const metricsByCategory = await prisma.gEDSIMetric.groupBy({
      by: ['category'],
      _count: { category: true },
      _avg: { currentValue: true, targetValue: true }
    });

    // Get recent activities
    const recentActivities = await prisma.activity.findMany({
      include: {
        venture: {
          select: { name: true }
        },
        user: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    // Get top performing ventures (by metrics completion)
    const topVentures = await prisma.venture.findMany({
      where: { status: 'ACTIVE' },
      include: {
        gedsiMetrics: true,
        _count: {
          select: {
            gedsiMetrics: true,
            documents: true,
            activities: true
          }
        }
      },
      orderBy: {
        gedsiMetrics: {
          _count: 'desc'
        }
      },
      take: 5
    });

    // Calculate completion rates
    const completionRates = topVentures.map(venture => {
      const totalMetrics = venture._count.gedsiMetrics;
      const completedMetrics = venture.gedsiMetrics.filter(
        metric => metric.status === 'VERIFIED' || metric.status === 'COMPLETED'
      ).length;
      
      return {
        ventureId: venture.id,
        ventureName: venture.name,
        completionRate: totalMetrics > 0 ? (completedMetrics / totalMetrics) * 100 : 0,
        totalMetrics,
        completedMetrics
      };
    });

    // Get monthly trends
    const monthlyTrends = await prisma.venture.groupBy({
      by: ['createdAt'],
      _count: { createdAt: true },
      where: {
        createdAt: { gte: startDate }
      },
      orderBy: { createdAt: 'asc' }
    });

    // Process monthly trends
    const trends = monthlyTrends.reduce((acc, item) => {
      const month = item.createdAt.toISOString().slice(0, 7); // YYYY-MM
      acc[month] = (acc[month] || 0) + item._count.createdAt;
      return acc;
    }, {} as Record<string, number>);

    // Calculate average metrics per venture
    const avgMetricsPerVenture = totalVentures > 0 ? totalMetrics / totalVentures : 0;

    // Calculate verification rate
    const verificationRate = totalMetrics > 0 ? (verifiedMetrics / totalMetrics) * 100 : 0;

    return NextResponse.json({
      overview: {
        totalVentures,
        activeVentures,
        newVentures,
        totalMetrics,
        verifiedMetrics,
        totalDocuments,
        totalActivities,
        avgMetricsPerVenture: Math.round(avgMetricsPerVenture * 100) / 100,
        verificationRate: Math.round(verificationRate * 100) / 100
      },
      distribution: {
        byStage: venturesByStage.map(item => ({
          stage: item.stage,
          count: item._count.stage
        })),
        bySector: venturesBySector.map(item => ({
          sector: item.sector,
          count: item._count.sector
        })),
        byCategory: metricsByCategory.map(item => ({
          category: item.category,
          count: item._count.category,
          avgCurrentValue: item._avg.currentValue,
          avgTargetValue: item._avg.targetValue
        }))
      },
      performance: {
        topVentures: completionRates,
        recentActivities: recentActivities.map(activity => ({
          id: activity.id,
          type: activity.type,
          title: activity.title,
          description: activity.description,
          ventureName: activity.venture?.name,
          userName: activity.user.name,
          createdAt: activity.createdAt
        }))
      },
      trends: {
        monthly: Object.entries(trends).map(([month, count]) => ({
          month,
          count
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 