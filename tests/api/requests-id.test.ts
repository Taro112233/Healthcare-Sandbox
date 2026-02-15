// tests/api/requests-id.test.ts
// GET /api/requests/[id]

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GET } from '@/app/api/requests/[id]/route'
import { prisma } from '@/lib/prisma'
import { mockUserSession, mockAdminSession, mockNoSession } from '../helpers/mock-session'

// ===== FAKE DATA =====

const fakeRequest = (url = 'http://localhost/api/requests/req-001') =>
  new Request(url) as never

const mockFullRequest = {
  id: 'req-001',
  userId: 'user-123',
  department: 'ห้องฉุกเฉิน',
  painPoint: 'ปัญหาการจัดการข้อมูล',
  currentWorkflow: 'ใช้กระดาษ',
  expectedTechHelp: 'ต้องการระบบดิจิทัล',
  requestType: 'FORM',
  status: 'PENDING_REVIEW',
  createdAt: new Date(),
  updatedAt: new Date(),
  user: {
    id: 'user-123',
    name: 'สมชาย ใจดี',
    email: 'user@test.com',
    phone: null,
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    image: null,
  },
  attachments: [],
  comments: [
    {
      id: 'comment-001',
      requestId: 'req-001',
      userId: 'admin-123',
      content: 'รับทราบครับ',
      type: 'COMMENT',
      fromStatus: null,
      toStatus: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        id: 'admin-123',
        name: 'Admin User',
        role: 'ADMIN',
        firstName: 'Admin',
        lastName: 'User',
        image: null,
      },
    },
  ],
  statusHistory: [],
  _count: { comments: 1, attachments: 0 },
}

// ===== GET /api/requests/[id] =====

describe('GET /api/requests/[id]', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 401 when no session', async () => {
    mockNoSession()
    const params = Promise.resolve({ id: 'req-001' })
    const res = await GET(fakeRequest(), { params })
    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Authentication required')
  })

  it('returns 404 when request does not exist', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.request.findUnique).mockResolvedValue(null)

    const params = Promise.resolve({ id: 'non-existent' })
    const res = await GET(fakeRequest(), { params })
    expect(res.status).toBe(404)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Request not found')
  })

  it('returns 403 when USER tries to access another user request', async () => {
    mockUserSession('other-user-999')
    vi.mocked(prisma.request.findUnique).mockResolvedValue(mockFullRequest as never)

    const params = Promise.resolve({ id: 'req-001' })
    const res = await GET(fakeRequest(), { params })
    expect(res.status).toBe(403)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Access denied')
  })

  it('returns 200 when USER accesses own request', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.request.findUnique).mockResolvedValue(mockFullRequest as never)

    const params = Promise.resolve({ id: 'req-001' })
    const res = await GET(fakeRequest(), { params })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.id).toBe('req-001')
  })

  it('returns 200 when ADMIN accesses any request', async () => {
    mockAdminSession('admin-123')
    // Request owned by different user
    vi.mocked(prisma.request.findUnique).mockResolvedValue({
      ...mockFullRequest,
      userId: 'some-other-user',
    } as never)

    const params = Promise.resolve({ id: 'req-001' })
    const res = await GET(fakeRequest(), { params })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  it('transforms user data to include fullName', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.request.findUnique).mockResolvedValue(mockFullRequest as never)

    const params = Promise.resolve({ id: 'req-001' })
    const res = await GET(fakeRequest(), { params })
    const body = await res.json()
    // fullName should be set from name field
    expect(body.data.user.fullName).toBe('สมชาย ใจดี')
  })

  it('transforms comment users to include fullName', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.request.findUnique).mockResolvedValue(mockFullRequest as never)

    const params = Promise.resolve({ id: 'req-001' })
    const res = await GET(fakeRequest(), { params })
    const body = await res.json()
    expect(body.data.comments[0].user.fullName).toBe('Admin User')
  })

  it('falls back to firstName+lastName when name is empty', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.request.findUnique).mockResolvedValue({
      ...mockFullRequest,
      user: {
        ...mockFullRequest.user,
        name: '',
        firstName: 'สมชาย',
        lastName: 'ใจดี',
      },
    } as never)

    const params = Promise.resolve({ id: 'req-001' })
    const res = await GET(fakeRequest(), { params })
    const body = await res.json()
    expect(body.data.user.fullName).toBe('สมชาย ใจดี')
  })

  it('returns 500 on prisma error', async () => {
    mockUserSession()
    vi.mocked(prisma.request.findUnique).mockRejectedValue(new Error('DB error'))

    const params = Promise.resolve({ id: 'req-001' })
    const res = await GET(fakeRequest(), { params })
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.success).toBe(false)
  })
})