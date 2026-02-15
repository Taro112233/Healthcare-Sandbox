// tests/api/comments.test.ts
// GET /api/requests/[id]/comments + POST /api/requests/[id]/comments

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GET, POST } from '@/app/api/requests/[id]/comments/route'
import { prisma } from '@/lib/prisma'
import { mockUserSession, mockAdminSession, mockNoSession } from '../helpers/mock-session'

// ===== FAKE DATA =====

const fakeRequest = (url = 'http://localhost/api/requests/req-001/comments', body?: object) =>
  new Request(url, {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  }) as never

const mockRequestOwnership = { userId: 'user-123' }

const mockComment = {
  id: 'comment-001',
  requestId: 'req-001',
  userId: 'user-123',
  content: 'ดำเนินการได้เลยครับ',
  type: 'COMMENT',
  fromStatus: null,
  toStatus: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  user: {
    id: 'user-123',
    name: 'สมชาย ใจดี',
    role: 'USER',
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    image: null,
  },
}

// ===== GET /api/requests/[id]/comments =====

describe('GET /api/requests/[id]/comments', () => {
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

  it('returns 403 when USER tries to access another user request comments', async () => {
    mockUserSession('other-user-999')
    vi.mocked(prisma.request.findUnique).mockResolvedValue(mockRequestOwnership as never)

    const params = Promise.resolve({ id: 'req-001' })
    const res = await GET(fakeRequest(), { params })
    expect(res.status).toBe(403)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Access denied')
  })

  it('returns 200 with comments when USER accesses own request', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.request.findUnique).mockResolvedValue(mockRequestOwnership as never)
    vi.mocked(prisma.comment.findMany).mockResolvedValue([mockComment] as never)

    const params = Promise.resolve({ id: 'req-001' })
    const res = await GET(fakeRequest(), { params })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data).toHaveLength(1)
    expect(body.meta.total).toBe(1)
  })

  it('returns 200 when ADMIN accesses any request comments', async () => {
    mockAdminSession('admin-123')
    // Request owned by different user
    vi.mocked(prisma.request.findUnique).mockResolvedValue({ userId: 'other-user' } as never)
    vi.mocked(prisma.comment.findMany).mockResolvedValue([mockComment] as never)

    const params = Promise.resolve({ id: 'req-001' })
    const res = await GET(fakeRequest(), { params })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  it('transforms comments to include fullName', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.request.findUnique).mockResolvedValue(mockRequestOwnership as never)
    vi.mocked(prisma.comment.findMany).mockResolvedValue([mockComment] as never)

    const params = Promise.resolve({ id: 'req-001' })
    const res = await GET(fakeRequest(), { params })
    const body = await res.json()
    expect(body.data[0].user.fullName).toBe('สมชาย ใจดี')
  })

  it('returns 500 on prisma error', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.request.findUnique).mockResolvedValue(mockRequestOwnership as never)
    vi.mocked(prisma.comment.findMany).mockRejectedValue(new Error('DB error'))

    const params = Promise.resolve({ id: 'req-001' })
    const res = await GET(fakeRequest(), { params })
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.success).toBe(false)
  })
})

// ===== POST /api/requests/[id]/comments =====

describe('POST /api/requests/[id]/comments', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 401 when no session', async () => {
    mockNoSession()
    const params = Promise.resolve({ id: 'req-001' })
    const res = await POST(fakeRequest('http://localhost/api/requests/req-001/comments', {
      content: 'ความคิดเห็น',
    }), { params })
    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  it('returns 400 when content is empty', async () => {
    mockUserSession()
    const params = Promise.resolve({ id: 'req-001' })
    const res = await POST(fakeRequest('http://localhost/api/requests/req-001/comments', {
      content: '',
    }), { params })
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Invalid input data')
  })

  it('returns 400 when content exceeds 5000 chars', async () => {
    mockUserSession()
    const params = Promise.resolve({ id: 'req-001' })
    const res = await POST(fakeRequest('http://localhost/api/requests/req-001/comments', {
      content: 'a'.repeat(5001),
    }), { params })
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  it('returns 403 when USER tries STATUS_CHANGE', async () => {
    mockUserSession('user-123')
    const params = Promise.resolve({ id: 'req-001' })
    const res = await POST(fakeRequest('http://localhost/api/requests/req-001/comments', {
      content: 'เปลี่ยนสถานะ',
      type: 'STATUS_CHANGE',
      fromStatus: 'PENDING_REVIEW',
      toStatus: 'IN_DEVELOPMENT',
    }), { params })
    expect(res.status).toBe(403)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('เฉพาะ Admin เท่านั้นที่เปลี่ยนสถานะได้')
  })

  it('returns 400 when STATUS_CHANGE missing fromStatus or toStatus', async () => {
    mockAdminSession('admin-123')
    const params = Promise.resolve({ id: 'req-001' })
    const res = await POST(fakeRequest('http://localhost/api/requests/req-001/comments', {
      content: 'เปลี่ยนสถานะ',
      type: 'STATUS_CHANGE',
      // missing fromStatus and toStatus
    }), { params })
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('ต้องระบุ fromStatus และ toStatus')
  })

  it('returns 404 when request not found (COMMENT type)', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.request.findUnique).mockResolvedValue(null)

    const params = Promise.resolve({ id: 'non-existent' })
    const res = await POST(fakeRequest('http://localhost/api/requests/non-existent/comments', {
      content: 'ความคิดเห็น',
      type: 'COMMENT',
    }), { params })
    expect(res.status).toBe(404)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Request not found')
  })

  it('returns 403 when USER comments on another user request', async () => {
    mockUserSession('other-user-999')
    vi.mocked(prisma.request.findUnique).mockResolvedValue({ userId: 'user-123' } as never)

    const params = Promise.resolve({ id: 'req-001' })
    const res = await POST(fakeRequest('http://localhost/api/requests/req-001/comments', {
      content: 'ความคิดเห็น',
      type: 'COMMENT',
    }), { params })
    expect(res.status).toBe(403)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('คุณไม่มีสิทธิ์แสดงความคิดเห็นในคำขอนี้')
  })

  it('returns 201 when USER comments on own request', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.request.findUnique).mockResolvedValue({ userId: 'user-123' } as never)
    vi.mocked(prisma.$transaction).mockImplementation(async (fn) => {
      return fn({
        comment: {
          create: vi.fn().mockResolvedValue({
            ...mockComment,
            user: { id: 'user-123', firstName: 'สมชาย', lastName: 'ใจดี', role: 'USER', image: null },
          }),
        },
        request: { update: vi.fn() },
      } as never)
    })

    const params = Promise.resolve({ id: 'req-001' })
    const res = await POST(fakeRequest('http://localhost/api/requests/req-001/comments', {
      content: 'ความคิดเห็นของฉัน',
      type: 'COMMENT',
    }), { params })
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.message).toBe('เพิ่มความคิดเห็นสำเร็จ')
  })

  it('returns 201 when ADMIN does STATUS_CHANGE and updates request status', async () => {
    mockAdminSession('admin-123')
    const requestUpdate = vi.fn()
    vi.mocked(prisma.$transaction).mockImplementation(async (fn) => {
      return fn({
        comment: {
          create: vi.fn().mockResolvedValue({
            ...mockComment,
            type: 'STATUS_CHANGE',
            fromStatus: 'PENDING_REVIEW',
            toStatus: 'IN_DEVELOPMENT',
            user: { id: 'admin-123', firstName: 'Admin', lastName: 'User', role: 'ADMIN', image: null },
          }),
        },
        request: { update: requestUpdate },
      } as never)
    })

    const params = Promise.resolve({ id: 'req-001' })
    const res = await POST(fakeRequest('http://localhost/api/requests/req-001/comments', {
      content: 'เริ่มพัฒนาแล้วครับ',
      type: 'STATUS_CHANGE',
      fromStatus: 'PENDING_REVIEW',
      toStatus: 'IN_DEVELOPMENT',
    }), { params })
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.message).toBe('อัปเดทสถานะสำเร็จ')
    // Verify request status was updated
    expect(requestUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'IN_DEVELOPMENT' }),
      })
    )
  })

  it('returns 201 when ADMIN comments on any request', async () => {
    mockAdminSession('admin-123')
    // Request owned by different user
    vi.mocked(prisma.request.findUnique).mockResolvedValue({ userId: 'other-user' } as never)
    vi.mocked(prisma.$transaction).mockImplementation(async (fn) => {
      return fn({
        comment: {
          create: vi.fn().mockResolvedValue({
            ...mockComment,
            user: { id: 'admin-123', firstName: 'Admin', lastName: 'User', role: 'ADMIN', image: null },
          }),
        },
        request: { update: vi.fn() },
      } as never)
    })

    const params = Promise.resolve({ id: 'req-001' })
    const res = await POST(fakeRequest('http://localhost/api/requests/req-001/comments', {
      content: 'Admin comment on any request',
      type: 'COMMENT',
    }), { params })
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  it('returns 500 on transaction error', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.request.findUnique).mockResolvedValue({ userId: 'user-123' } as never)
    vi.mocked(prisma.$transaction).mockRejectedValue(new Error('Transaction failed'))

    const params = Promise.resolve({ id: 'req-001' })
    const res = await POST(fakeRequest('http://localhost/api/requests/req-001/comments', {
      content: 'ความคิดเห็น',
      type: 'COMMENT',
    }), { params })
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.success).toBe(false)
  })
})