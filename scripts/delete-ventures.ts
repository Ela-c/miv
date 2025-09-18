#!/usr/bin/env npx tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔍 Checking current ventures in database...\n');

    // Get all ventures with their related data
    const ventures = await prisma.venture.findMany({
      include: {
        gedsiMetrics: true,
        documents: true,
        activities: true,
        capitalActivities: true,
        createdBy: {
          select: { name: true, email: true }
        },
        assignedTo: {
          select: { name: true, email: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Found ${ventures.length} ventures in the database:\n`);

    if (ventures.length === 0) {
      console.log('✅ No ventures found in the database. Nothing to delete.');
      return;
    }

    // Display all ventures
    ventures.forEach((venture, index) => {
      console.log(`${index + 1}. ${venture.name}`);
      console.log(`   ID: ${venture.id}`);
      console.log(`   Sector: ${venture.sector}`);
      console.log(`   Location: ${venture.location}`);
      console.log(`   Status: ${venture.status}`);
      console.log(`   Stage: ${venture.stage}`);
      console.log(`   Created: ${venture.createdAt.toISOString()}`);
      console.log(`   Created by: ${venture.createdBy.name} (${venture.createdBy.email})`);
      console.log(`   Related data:`);
      console.log(`     - GEDSI Metrics: ${venture.gedsiMetrics.length}`);
      console.log(`     - Documents: ${venture.documents.length}`);
      console.log(`     - Activities: ${venture.activities.length}`);
      console.log(`     - Capital Activities: ${venture.capitalActivities.length}`);
      console.log('');
    });

    // Confirm deletion
    console.log('⚠️  WARNING: This will permanently delete ALL ventures and their related data!');
    console.log('This includes:');
    console.log('- All venture records');
    console.log('- All associated GEDSI metrics');
    console.log('- All associated documents');
    console.log('- All associated activities');
    console.log('- All associated capital activities');
    console.log('');
    
    // Check if running with --confirm flag
    const args = process.argv.slice(2);
    const confirmFlag = args.includes('--confirm');
    
    if (!confirmFlag) {
      console.log('To proceed with deletion, run this script with the --confirm flag:');
      console.log('npx tsx scripts/delete-ventures.ts --confirm');
      console.log('');
      console.log('Or use the interactive deletion script:');
      console.log('npx tsx scripts/delete-ventures-interactive.ts');
      return;
    }

    console.log('🗑️  Proceeding with deletion...\n');

    // Delete all ventures (cascade delete will handle related records)
    const deleteResult = await prisma.venture.deleteMany({});
    
    console.log(`✅ Successfully deleted ${deleteResult.count} ventures and all their related data.`);
    
    // Verify deletion
    const remainingVentures = await prisma.venture.count();
    console.log(`✅ Verification: ${remainingVentures} ventures remaining in database.`);

    if (remainingVentures === 0) {
      console.log('🎉 Database cleanup complete! All ventures have been removed.');
    }

  } catch (error) {
    console.error('❌ Error during venture deletion:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
