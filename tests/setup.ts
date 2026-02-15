// tests/setup.ts
import { vi } from 'vitest'

// 1. Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    request: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      count: vi.fn(),
    },
    comment: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}))

// 2. Mock Better Auth
vi.mock('@/lib/auth', () => ({
  auth: {
    api: { getSession: vi.fn() },
  },
}))

// 3. Mock Arcjet — pass all requests by default
vi.mock('@/lib/arcjet-config', () => ({
  arcjetAPI: {
    protect: vi.fn().mockResolvedValue({
      isDenied: () => false,
      reason: {},
      results: [],
    }),
  },
  arcjetUpload: {
    protect: vi.fn().mockResolvedValue({
      isDenied: () => false,
      reason: {},
      results: [],
    }),
  },
  handleArcjetDecision: vi.fn().mockReturnValue(null),
  getRateLimitInfo: vi.fn().mockReturnValue(null),
  getClientIP: vi.fn().mockReturnValue('127.0.0.1'),
  logSecurityEvent: vi.fn(),
}))