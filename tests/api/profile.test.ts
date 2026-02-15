// tests/api/profile.test.ts
// GET /api/profile + PATCH /api/profile

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GET, PATCH } from '@/app/api/profile/route'
import { prisma } from '@/lib/prisma'
import { mockUserSession, mockAdminSession, mockNoSession } from '../helpers/mock-session'

// ===== FAKE DATA =====

const fakeRequest = (method: 'GET' | 'PATCH', body?: object) =>
  new Request('http://localhost/api/profile', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  }) as never

const mockUserRow = {
  id: 'user-123',
  email: 'user@test.com',
  name: 'สมชาย ใจดี',
  firstName: 'สมชาย',
  lastName: 'ใจดี',
  phone: '0812345678',
  image: null,
  role: 'USER',
  status: 'ACTIVE',
  isActive: true,
  emailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

// ===== GET /api/profile =====

describe('GET /api/profile', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 401 when no session', async () => {
    mockNoSession()
    const res = await GET(fakeRequest('GET'))
    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Authentication required')
  })

  it('returns 404 when user not found in DB', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null)

    const res = await GET(fakeRequest('GET'))
    expect(res.status).toBe(404)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('User not found')
  })

  it('returns 200 with user data for authenticated USER', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUserRow as never)

    const res = await GET(fakeRequest('GET'))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.id).toBe('user-123')
    expect(body.data.email).toBe('user@test.com')
    expect(body.data.firstName).toBe('สมชาย')
  })

  it('returns 200 with user data for authenticated ADMIN', async () => {
    mockAdminSession('admin-123')
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      ...mockUserRow,
      id: 'admin-123',
      role: 'ADMIN',
    } as never)

    const res = await GET(fakeRequest('GET'))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.role).toBe('ADMIN')
  })

  it('queries DB by session user id', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUserRow as never)

    await GET(fakeRequest('GET'))
    expect(prisma.user.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'user-123' },
      })
    )
  })

  it('returns 500 on prisma error', async () => {
    mockUserSession()
    vi.mocked(prisma.user.findUnique).mockRejectedValue(new Error('DB error'))

    const res = await GET(fakeRequest('GET'))
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.success).toBe(false)
  })
})

// ===== PATCH /api/profile =====

describe('PATCH /api/profile', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 401 when no session', async () => {
    mockNoSession()
    const res = await PATCH(fakeRequest('PATCH', { firstName: 'สมชาย', lastName: 'ใจดี' }))
    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Authentication required')
  })

  it('returns 400 when firstName is missing', async () => {
    mockUserSession()
    const res = await PATCH(fakeRequest('PATCH', { lastName: 'ใจดี' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Invalid input data')
    expect(body.details).toBeDefined()
  })

  it('returns 400 when lastName is missing', async () => {
    mockUserSession()
    const res = await PATCH(fakeRequest('PATCH', { firstName: 'สมชาย' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  it('returns 400 when firstName is empty string', async () => {
    mockUserSession()
    const res = await PATCH(fakeRequest('PATCH', { firstName: '', lastName: 'ใจดี' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  it('returns 200 and updates profile for valid USER', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.user.update).mockResolvedValue({
      ...mockUserRow,
      name: 'สมหญิง ดีมาก',
      firstName: 'สมหญิง',
      lastName: 'ดีมาก',
    } as never)

    const res = await PATCH(fakeRequest('PATCH', { firstName: 'สมหญิง', lastName: 'ดีมาก' }))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.message).toBe('อัปเดตข้อมูลสำเร็จ')
    expect(body.data.firstName).toBe('สมหญิง')
  })

  it('updates name field as concatenated fullName', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.user.update).mockResolvedValue(mockUserRow as never)

    await PATCH(fakeRequest('PATCH', { firstName: 'สมชาย', lastName: 'ใจดี' }))
    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          firstName: 'สมชาย',
          lastName: 'ใจดี',
          name: 'สมชาย ใจดี',
        }),
      })
    )
  })

  it('saves phone when provided', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.user.update).mockResolvedValue(mockUserRow as never)

    await PATCH(fakeRequest('PATCH', { firstName: 'สมชาย', lastName: 'ใจดี', phone: '0812345678' }))
    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ phone: '0812345678' }),
      })
    )
  })

  it('sets phone to null when not provided', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.user.update).mockResolvedValue(mockUserRow as never)

    await PATCH(fakeRequest('PATCH', { firstName: 'สมชาย', lastName: 'ใจดี' }))
    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ phone: null }),
      })
    )
  })

  it('returns 200 for ADMIN updating own profile', async () => {
    mockAdminSession('admin-123')
    vi.mocked(prisma.user.update).mockResolvedValue({
      ...mockUserRow,
      id: 'admin-123',
      role: 'ADMIN',
    } as never)

    const res = await PATCH(fakeRequest('PATCH', { firstName: 'Admin', lastName: 'User' }))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  it('returns 500 on prisma error', async () => {
    mockUserSession()
    vi.mocked(prisma.user.update).mockRejectedValue(new Error('DB error'))

    const res = await PATCH(fakeRequest('PATCH', { firstName: 'สมชาย', lastName: 'ใจดี' }))
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.success).toBe(false)
  })
})