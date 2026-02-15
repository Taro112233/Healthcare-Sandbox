// tests/api/requests.test.ts
// GET /api/requests + POST /api/requests

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GET, POST } from '@/app/api/requests/route'
import { prisma } from '@/lib/prisma'
import { mockUserSession, mockAdminSession, mockNoSession } from '../helpers/mock-session'

// ===== FAKE DATA =====

const fakeRequest = (url = 'http://localhost/api/requests', body?: object) =>
  new Request(url, {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  }) as never

const validBody = {
  department: 'ห้องฉุกเฉิน',
  painPoint: 'ปัญหาการจัดการข้อมูลผู้ป่วยที่ซับซ้อนมากเกินไป',
  currentWorkflow: 'ปัจจุบันใช้กระดาษบันทึกข้อมูลทุกอย่างด้วยมือ',
  expectedTechHelp: 'ต้องการระบบดิจิทัลที่ช่วยลดขั้นตอนการทำงาน',
  requestType: 'FORM',
}

const mockRequestRow = {
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
  user: { id: 'user-123', firstName: 'สมชาย', lastName: 'ใจดี', email: 'user@test.com' },
  _count: { comments: 0, attachments: 0 },
}

// ===== GET /api/requests =====

describe('GET /api/requests', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 401 when no session', async () => {
    mockNoSession()
    const res = await GET(fakeRequest())
    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Authentication required')
  })

  it('USER gets only own requests (filters by userId)', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.request.count).mockResolvedValue(1)
    vi.mocked(prisma.request.findMany).mockResolvedValue([mockRequestRow] as never)

    const res = await GET(fakeRequest())
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data).toHaveLength(1)

    // Verify prisma was called with userId filter
    expect(prisma.request.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ userId: 'user-123' }),
      })
    )
  })

  it('ADMIN gets all requests (no userId filter)', async () => {
    mockAdminSession('admin-123')
    vi.mocked(prisma.request.count).mockResolvedValue(5)
    vi.mocked(prisma.request.findMany).mockResolvedValue([mockRequestRow] as never)

    const res = await GET(fakeRequest())
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)

    // Verify prisma was NOT called with userId filter
    expect(prisma.request.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.not.objectContaining({ userId: expect.anything() }),
      })
    )
  })

  it('returns correct meta pagination', async () => {
    mockUserSession()
    vi.mocked(prisma.request.count).mockResolvedValue(25)
    vi.mocked(prisma.request.findMany).mockResolvedValue([mockRequestRow] as never)

    const res = await GET(fakeRequest('http://localhost/api/requests?page=2&pageSize=10'))
    const body = await res.json()
    expect(body.meta.total).toBe(25)
    expect(body.meta.page).toBe(2)
    expect(body.meta.pageSize).toBe(10)
    expect(body.meta.totalPages).toBe(3)
  })

  it('filters by status when provided', async () => {
    mockUserSession()
    vi.mocked(prisma.request.count).mockResolvedValue(1)
    vi.mocked(prisma.request.findMany).mockResolvedValue([mockRequestRow] as never)

    await GET(fakeRequest('http://localhost/api/requests?status=PENDING_REVIEW'))

    expect(prisma.request.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ status: 'PENDING_REVIEW' }),
      })
    )
  })

  it('does not filter status when status=ALL', async () => {
    mockUserSession()
    vi.mocked(prisma.request.count).mockResolvedValue(1)
    vi.mocked(prisma.request.findMany).mockResolvedValue([mockRequestRow] as never)

    await GET(fakeRequest('http://localhost/api/requests?status=ALL'))

    expect(prisma.request.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.not.objectContaining({ status: expect.anything() }),
      })
    )
  })

  it('returns 500 on prisma error', async () => {
    mockUserSession()
    vi.mocked(prisma.request.count).mockRejectedValue(new Error('DB error'))

    const res = await GET(fakeRequest())
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.success).toBe(false)
  })
})

// ===== POST /api/requests =====

describe('POST /api/requests', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 401 when no session', async () => {
    mockNoSession()
    const res = await POST(fakeRequest('http://localhost/api/requests', validBody))
    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Authentication required')
  })

  it('returns 400 when required fields are missing', async () => {
    mockUserSession()
    const res = await POST(
      fakeRequest('http://localhost/api/requests', { department: 'test' })
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Invalid input data')
    expect(body.details).toBeDefined()
  })

  it('returns 400 when painPoint is too short', async () => {
    mockUserSession()
    const res = await POST(
      fakeRequest('http://localhost/api/requests', {
        ...validBody,
        painPoint: 'short', // min 10 chars
      })
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  it('returns 400 when requestType is invalid', async () => {
    mockUserSession()
    const res = await POST(
      fakeRequest('http://localhost/api/requests', {
        ...validBody,
        requestType: 'INVALID_TYPE',
      })
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  it('returns 201 and creates request for valid USER', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.$transaction).mockImplementation(async (fn) => {
      return fn({
        request: {
          create: vi.fn().mockResolvedValue({ id: 'new-req-001' }),
          findUnique: vi.fn().mockResolvedValue({
            ...mockRequestRow,
            id: 'new-req-001',
          }),
        },
        attachment: { createMany: vi.fn() },
      } as never)
    })

    const res = await POST(fakeRequest('http://localhost/api/requests', validBody))
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.message).toBe('ส่งคำขอสำเร็จ')
  })

  it('returns 201 when ADMIN creates request', async () => {
    mockAdminSession('admin-123')
    vi.mocked(prisma.$transaction).mockImplementation(async (fn) => {
      return fn({
        request: {
          create: vi.fn().mockResolvedValue({ id: 'new-req-002' }),
          findUnique: vi.fn().mockResolvedValue({
            ...mockRequestRow,
            id: 'new-req-002',
            userId: 'admin-123',
          }),
        },
        attachment: { createMany: vi.fn() },
      } as never)
    })

    const res = await POST(fakeRequest('http://localhost/api/requests', validBody))
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  it('creates attachments when attachmentUrls provided', async () => {
    mockUserSession('user-123')
    const createMany = vi.fn()
    vi.mocked(prisma.$transaction).mockImplementation(async (fn) => {
      return fn({
        request: {
          create: vi.fn().mockResolvedValue({ id: 'req-001' }),
          findUnique: vi.fn().mockResolvedValue(mockRequestRow),
        },
        attachment: { createMany },
      } as never)
    })

    const bodyWithAttachments = {
      ...validBody,
      attachmentUrls: [
        {
          filename: 'test.pdf',
          fileType: 'application/pdf',
          fileSize: 1024,
          fileUrl: 'https://blob.vercel.com/test.pdf',
        },
      ],
    }

    const res = await POST(
      fakeRequest('http://localhost/api/requests', bodyWithAttachments)
    )
    expect(res.status).toBe(201)
    expect(createMany).toHaveBeenCalled()
  })

  it('returns 500 on transaction error', async () => {
    mockUserSession()
    vi.mocked(prisma.$transaction).mockRejectedValue(new Error('Transaction failed'))

    const res = await POST(fakeRequest('http://localhost/api/requests', validBody))
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.success).toBe(false)
  })
})