// tests/api/auth.test.ts
// POST /api/auth/[...all] + GET /api/auth/[...all]

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { POST, GET } from '@/app/api/auth/[...all]/route'
import { arcjetAuth, handleArcjetDecision } from '@/lib/arcjet-config'

// ===== MOCK: better-auth/next-js =====

const mockHandlerPost = vi.fn()
const mockHandlerGet = vi.fn()

vi.mock('better-auth/next-js', () => ({
  toNextJsHandler: vi.fn(() => ({
    POST: mockHandlerPost,
    GET: mockHandlerGet,
  })),
}))

// ===== HELPERS =====

const fakeRequest = (pathname: string, body?: object) =>
  new Request(`http://localhost${pathname}`, {
    method: body !== undefined ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  }) as never

// ===== POST /api/auth/[...all] =====

describe('POST /api/auth/[...all]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default: Arcjet allows request
    vi.mocked(arcjetAuth.protect ?? vi.fn()).mockResolvedValue({
      isDenied: () => false,
      reason: {},
      results: [],
    } as never)
    vi.mocked(handleArcjetDecision).mockReturnValue(null)
    // Default handler returns 200
    mockHandlerPost.mockResolvedValue(
      new Response(JSON.stringify({ token: 'abc123' }), { status: 200 })
    )
  })

  it('passes through non sign-in/sign-up endpoints without Arcjet', async () => {
    const req = fakeRequest('/api/auth/session')
    await POST(req)
    // arcjetAuth.protect should NOT be called for non sign-in/sign-up paths
    expect(arcjetAuth.protect).not.toHaveBeenCalled()
    expect(mockHandlerPost).toHaveBeenCalled()
  })

  it('applies Arcjet protection on /sign-in endpoint', async () => {
    const req = fakeRequest('/api/auth/sign-in/email', { email: 'user@test.com', password: 'pass' })
    await POST(req)
    expect(arcjetAuth.protect).toHaveBeenCalled()
  })

  it('applies Arcjet protection on /sign-up endpoint', async () => {
    const req = fakeRequest('/api/auth/sign-up/email', { email: 'user@test.com', password: 'pass' })
    await POST(req)
    expect(arcjetAuth.protect).toHaveBeenCalled()
  })

  it('returns 429 on rate limit for sign-in', async () => {
    vi.mocked(arcjetAuth.protect ?? vi.fn()).mockResolvedValue({
      isDenied: () => true,
      reason: { isRateLimit: () => true, isBot: () => false },
      results: [],
    } as never)
    vi.mocked(handleArcjetDecision).mockReturnValue({
      error: 'Too many requests. Please try again later.',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: 60,
    })

    const req = fakeRequest('/api/auth/sign-in/email', { email: 'user@test.com', password: 'pass' })
    const res = await POST(req)
    expect(res.status).toBe(429)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.code).toBe('RATE_LIMIT_EXCEEDED')
  })

  it('returns 403 on bot detection for sign-up', async () => {
    vi.mocked(arcjetAuth.protect ?? vi.fn()).mockResolvedValue({
      isDenied: () => true,
      reason: { isRateLimit: () => false, isBot: () => true },
      results: [],
    } as never)
    vi.mocked(handleArcjetDecision).mockReturnValue({
      error: 'Automated requests are not allowed',
      code: 'BOT_DETECTED',
    })

    const req = fakeRequest('/api/auth/sign-up/email', { email: 'bot@test.com', password: 'pass' })
    const res = await POST(req)
    expect(res.status).toBe(403)
    const body = await res.json()
    expect(body.code).toBe('BOT_DETECTED')
  })

  it('passes request to handler when Arcjet allows sign-in', async () => {
    const req = fakeRequest('/api/auth/sign-in/email', { email: 'user@test.com', password: 'correct' })
    const res = await POST(req)
    expect(mockHandlerPost).toHaveBeenCalled()
    expect(res.status).toBe(200)
  })

  it('returns Retry-After header on rate limit', async () => {
    vi.mocked(arcjetAuth.protect ?? vi.fn()).mockResolvedValue({
      isDenied: () => true,
      reason: { isRateLimit: () => true, isBot: () => false },
      results: [],
    } as never)
    vi.mocked(handleArcjetDecision).mockReturnValue({
      error: 'Too many requests',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: 90,
    })

    const req = fakeRequest('/api/auth/sign-in/email', {})
    const res = await POST(req)
    expect(res.headers.get('Retry-After')).toBe('90')
  })
})

// ===== GET /api/auth/[...all] =====

describe('GET /api/auth/[...all]', () => {
  beforeEach(() => vi.clearAllMocks())

  it('delegates directly to Better Auth GET handler', async () => {
    // GET is exported directly as handlers.GET — just verify it's the mock
    expect(GET).toBe(mockHandlerGet)
  })
})