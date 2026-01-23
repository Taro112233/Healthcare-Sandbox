// lib/prisma.ts (FINAL - RECOMMENDED)
import { PrismaClient } from '@prisma/client';
import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

// ✅ Conditional WebSocket configuration
if (typeof window === 'undefined') {
  // Server-side: Use ws package (Node.js runtime)
  const ws = require('ws');
  neonConfig.webSocketConstructor = ws;
}

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL must be set');
  }

  const adapter = new PrismaNeon({ connectionString });
  
  return new PrismaClient({ 
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}