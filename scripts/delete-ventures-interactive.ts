#!/usr/bin/env npx tsx

import { PrismaClient } from '@prisma/client';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

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
      rl.close();
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

    // Interactive options
    console.log('What would you like to do?');
    console.log('1. Delete ALL ventures and related data');
    console.log('2. Delete specific ventures by ID');
    console.log('3. Delete ventures by criteria (older than date, specific status, etc.)');
    console.log('4. Cancel and exit');
    console.log('');

    const choice = await askQuestion('Enter your choice (1-4): ');

    switch (choice) {
      case '1':
        await deleteAllVentures(ventures.length);
        break;
      case '2':
        await deleteSpecificVentures(ventures);
        break;
      case '3':
        await deleteVenturesByCriteria(ventures);
        break;
      case '4':
        console.log('Operation cancelled.');
        break;
      default:
        console.log('Invalid choice. Operation cancelled.');
        break;
    }

  } catch (error) {
    console.error('❌ Error during venture deletion:', error);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

async function deleteAllVentures(count: number) {
  console.log(`\n⚠️  WARNING: You are about to delete ALL ${count} ventures and their related data!`);
  console.log('This action cannot be undone.');
  
  const confirm = await askQuestion('Type "DELETE ALL" to confirm: ');
  
  if (confirm !== 'DELETE ALL') {
    console.log('Operation cancelled.');
    return;
  }

  console.log('🗑️  Deleting all ventures...');
  const deleteResult = await prisma.venture.deleteMany({});
  console.log(`✅ Successfully deleted ${deleteResult.count} ventures.`);
}

async function deleteSpecificVentures(ventures: any[]) {
  console.log('\nEnter the venture IDs you want to delete (comma-separated):');
  const input = await askQuestion('Venture IDs: ');
  
  const ids = input.split(',').map(id => id.trim()).filter(id => id.length > 0);
  
  if (ids.length === 0) {
    console.log('No valid IDs provided. Operation cancelled.');
    return;
  }

  // Validate IDs
  const validVentures = ventures.filter(v => ids.includes(v.id));
  const invalidIds = ids.filter(id => !ventures.some(v => v.id === id));
  
  if (invalidIds.length > 0) {
    console.log(`⚠️  Invalid IDs: ${invalidIds.join(', ')}`);
  }
  
  if (validVentures.length === 0) {
    console.log('No valid ventures to delete.');
    return;
  }

  console.log(`\nVentures to be deleted:`);
  validVentures.forEach(v => {
    console.log(`- ${v.name} (${v.id})`);
  });

  const confirm = await askQuestion(`\nConfirm deletion of ${validVentures.length} ventures? (yes/no): `);
  
  if (confirm.toLowerCase() !== 'yes') {
    console.log('Operation cancelled.');
    return;
  }

  console.log('🗑️  Deleting selected ventures...');
  const deleteResult = await prisma.venture.deleteMany({
    where: {
      id: { in: validVentures.map(v => v.id) }
    }
  });
  
  console.log(`✅ Successfully deleted ${deleteResult.count} ventures.`);
}

async function deleteVenturesByCriteria(ventures: any[]) {
  console.log('\nDelete ventures by criteria:');
  console.log('1. Delete ventures older than a specific date');
  console.log('2. Delete ventures with specific status');
  console.log('3. Delete ventures with specific stage');
  console.log('4. Delete ventures from specific sector');
  
  const criteriaChoice = await askQuestion('Choose criteria (1-4): ');
  
  let whereClause: any = {};
  let description = '';
  
  switch (criteriaChoice) {
    case '1':
      const dateInput = await askQuestion('Delete ventures created before (YYYY-MM-DD): ');
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) {
        console.log('Invalid date format. Operation cancelled.');
        return;
      }
      whereClause = { createdAt: { lt: date } };
      description = `ventures created before ${dateInput}`;
      break;
      
    case '2':
      console.log('Available statuses: ACTIVE, INACTIVE, ARCHIVED');
      const status = await askQuestion('Status to delete: ');
      whereClause = { status: status.toUpperCase() };
      description = `ventures with status ${status.toUpperCase()}`;
      break;
      
    case '3':
      console.log('Available stages: INTAKE, SCREENING, DUE_DILIGENCE, INVESTMENT_READY, FUNDED, EXITED, SEED, SERIES_A, SERIES_B, SERIES_C');
      const stage = await askQuestion('Stage to delete: ');
      whereClause = { stage: stage.toUpperCase() };
      description = `ventures with stage ${stage.toUpperCase()}`;
      break;
      
    case '4':
      const sector = await askQuestion('Sector to delete: ');
      whereClause = { sector: { contains: sector, mode: 'insensitive' } };
      description = `ventures in sector containing "${sector}"`;
      break;
      
    default:
      console.log('Invalid choice. Operation cancelled.');
      return;
  }

  // Find matching ventures
  const matchingVentures = await prisma.venture.findMany({ where: whereClause });
  
  if (matchingVentures.length === 0) {
    console.log(`No ventures found matching criteria: ${description}`);
    return;
  }

  console.log(`\nFound ${matchingVentures.length} ventures matching criteria: ${description}`);
  matchingVentures.forEach(v => {
    console.log(`- ${v.name} (${v.sector}, ${v.status}, ${v.createdAt.toISOString().split('T')[0]})`);
  });

  const confirm = await askQuestion(`\nConfirm deletion of ${matchingVentures.length} ventures? (yes/no): `);
  
  if (confirm.toLowerCase() !== 'yes') {
    console.log('Operation cancelled.');
    return;
  }

  console.log('🗑️  Deleting matching ventures...');
  const deleteResult = await prisma.venture.deleteMany({ where: whereClause });
  console.log(`✅ Successfully deleted ${deleteResult.count} ventures.`);
}

main().catch((error) => {
  console.error('❌ Unexpected error:', error);
  rl.close();
  process.exit(1);
});
