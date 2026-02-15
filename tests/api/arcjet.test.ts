// tests/api/arcjet.test.ts
// GET /api/arcjet

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GET } from '@/app/api/arcjet/route'

// ===== MOCK: @arcjet/next =====

const mockProtect = vi.fn()

vi.mock('@arcjet/next', () => ({
  default: vi.fn(() => ({ protect: mockProtect })),
  detectBot: vi.fn(),
  shield: vi.fn(),
  tokenBucket: vi.fn(),
}))

// ===== MOCK: @arcjet/inspect =====

vi.mock('@arcjet/inspect', () => ({
  isSpoofedBot: vi.fn().mockReturnValue(false),
}))

// ===== HELPERS =====

const fakeRequest = () => new Request('http://localhost/api/arcjet') as never

const allowedDecision = {
  isDenied: () => false,
  reason: {
    isRateLimit: () => false,
    isBot: () => false,
  },
  ip: { isHosting: () => false },
  results: [],
}

// ===== GET /api/arcjet =====

describe('GET /api/arcjet', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 200 with hello world when request is allowed', async () => {
    mockProtect.mockResolvedValue(allowedDecision)

    const res = await GET(fakeRequest())
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.message).toBe('Hello world')
  })

  it('returns 429 when rate limit exceeded', async () => {
    mockProtect.mockResolvedValue({
      isDenied: () => true,
      reason: {
        isRateLimit: () => true,
        isBot: () => false,
      },
      ip: { isHosting: () => false },
      results: [],
    })

    const res = await GET(fakeRequest())
    expect(res.status).toBe(429)
    const body = await res.json()
    expect(body.error).toBe('Too Many Requests')
  })

  it('returns 403 when bot detected', async () => {
    mockProtect.mockResolvedValue({
      isDenied: () => true,
      reason: {
        isRateLimit: () => false,
        isBot: () => true,
      },
      ip: { isHosting: () => false },
      results: [],
    })

    const res = await GET(fakeRequest())
    expect(res.status).toBe(403)
    const body = await res.json()
    expect(body.error).toBe('No bots allowed')
  })

  it('returns 403 for other denied reasons (shield block)', async () => {
    mockProtect.mockResolvedValue({
      isDenied: () => true,
      reason: {
        isRateLimit: () => false,
        isBot: () => false,
      },
      ip: { isHosting: () => false },
      results: [],
    })

    const res = await GET(fakeRequest())
    expect(res.status).toBe(403)
    const body = await res.json()
    expect(body.error).toBe('Forbidden')
  })

  it('returns 403 when IP is a hosting provider', async () => {
    mockProtect.mockResolvedValue({
      isDenied: () => false,
      reason: {},
      ip: { isHosting: () => true },
      results: [],
    })

    const res = await GET(fakeRequest())
    expect(res.status).toBe(403)
    const body = await res.json()
    expect(body.error).toBe('Forbidden')
  })

  it('returns 403 when spoofed bot detected', async () => {
    mockProtect.mockResolvedValue({
      isDenied: () => false,
      reason: {},
      ip: { isHosting: () => false },
      results: [{ isSpoofed: true }],
    })

    const { isSpoofedBot } = await import('@arcjet/inspect')
    vi.mocked(isSpoofedBot).mockReturnValue(true)

    const res = await GET(fakeRequest())
    expect(res.status).toBe(403)
  })
})