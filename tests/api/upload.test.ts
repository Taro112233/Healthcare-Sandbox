// tests/api/upload.test.ts
// POST /api/requests/upload + GET /api/requests/upload

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { POST, GET } from '@/app/api/requests/upload/route'
import { mockUserSession, mockAdminSession, mockNoSession } from '../helpers/mock-session'
import { arcjetUpload, handleArcjetDecision } from '@/lib/arcjet-config'

// ===== HELPERS =====

const fakeGetRequest = () => new Request('http://localhost/api/requests/upload') as never

const makeFormData = (files: File[]) => {
  const fd = new FormData()
  files.forEach(f => fd.append('files', f))
  return fd
}

const makeFile = (
  name = 'test.jpg',
  type = 'image/jpeg',
  size = 1024
): File => {
  const blob = new Blob(['x'.repeat(size)], { type })
  return new File([blob], name, { type })
}

const fakePostRequest = (formData: FormData) =>
  new Request('http://localhost/api/requests/upload', {
    method: 'POST',
    body: formData,
  }) as never

// ===== MOCK: @vercel/blob =====

vi.mock('@vercel/blob', () => ({
  put: vi.fn().mockResolvedValue({ url: 'https://blob.vercel.com/test.jpg' }),
}))

// ===== MOCK: file-validation =====
// Override only for specific tests via vi.mocked inside each case
vi.mock('@/lib/file-validation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/file-validation')>()
  return {
    ...actual,
    validateFilesFromFormData: vi.fn().mockReturnValue({
      isValid: true,
      files: [],
      errors: [],
    }),
  }
})

// ===== GET /api/requests/upload =====

describe('GET /api/requests/upload', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 200 with constraints (no auth required)', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.constraints).toBeDefined()
    expect(body.constraints.maxFiles).toBeDefined()
    expect(body.constraints.maxFileSizeFormatted).toBeDefined()
  })
})

// ===== POST /api/requests/upload =====

describe('POST /api/requests/upload', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 401 when no session', async () => {
    mockNoSession()
    const res = await POST(fakePostRequest(makeFormData([])))
    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Authentication required')
  })

  it('returns 429 when Arcjet rate limit exceeded', async () => {
    mockUserSession()
    vi.mocked(arcjetUpload.protect).mockResolvedValue({
      isDenied: () => true,
      reason: { isRateLimit: () => true, isBot: () => false },
      results: [],
    } as never)
    vi.mocked(handleArcjetDecision).mockReturnValue({
      error: 'Too many requests. Please try again later.',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: 60,
    })

    const res = await POST(fakePostRequest(makeFormData([])))
    expect(res.status).toBe(429)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  it('returns 403 when Arcjet bot detected', async () => {
    mockUserSession()
    vi.mocked(arcjetUpload.protect).mockResolvedValue({
      isDenied: () => true,
      reason: { isRateLimit: () => false, isBot: () => true },
      results: [],
    } as never)
    vi.mocked(handleArcjetDecision).mockReturnValue({
      error: 'Automated requests are not allowed',
      code: 'BOT_DETECTED',
    })

    const res = await POST(fakePostRequest(makeFormData([])))
    expect(res.status).toBe(403)
  })

  it('returns 400 when no files in formData', async () => {
    mockUserSession()
    const { validateFilesFromFormData } = await import('@/lib/file-validation')
    vi.mocked(validateFilesFromFormData).mockReturnValue({
      isValid: true,
      files: [],
      errors: [],
    })

    const res = await POST(fakePostRequest(makeFormData([])))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('No files provided')
  })

  it('returns 400 when file validation fails', async () => {
    mockUserSession()
    const { validateFilesFromFormData } = await import('@/lib/file-validation')
    vi.mocked(validateFilesFromFormData).mockReturnValue({
      isValid: false,
      files: [],
      errors: ['ไฟล์มีขนาดใหญ่เกินไป'],
    })

    const res = await POST(fakePostRequest(makeFormData([makeFile()])))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('File validation failed')
    expect(body.details).toContain('ไฟล์มีขนาดใหญ่เกินไป')
  })

  it('returns 200 and uploads valid file successfully', async () => {
    mockUserSession('user-123')
    const file = makeFile('photo.jpg', 'image/jpeg', 2048)
    const { validateFilesFromFormData } = await import('@/lib/file-validation')
    vi.mocked(validateFilesFromFormData).mockReturnValue({
      isValid: true,
      files: [file],
      errors: [],
    })

    const res = await POST(fakePostRequest(makeFormData([file])))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.totalUploaded).toBe(1)
    expect(body.data.totalFailed).toBe(0)
    expect(body.data.uploaded[0].fileUrl).toBe('https://blob.vercel.com/test.jpg')
  })

  it('returns 200 for ADMIN upload', async () => {
    mockAdminSession('admin-123')
    const file = makeFile('doc.pdf', 'application/pdf', 1024)
    const { validateFilesFromFormData } = await import('@/lib/file-validation')
    vi.mocked(validateFilesFromFormData).mockReturnValue({
      isValid: true,
      files: [file],
      errors: [],
    })

    const res = await POST(fakePostRequest(makeFormData([file])))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  it('returns 500 when all uploads fail', async () => {
    mockUserSession('user-123')
    const file = makeFile('fail.jpg', 'image/jpeg', 1024)
    const { validateFilesFromFormData } = await import('@/lib/file-validation')
    vi.mocked(validateFilesFromFormData).mockReturnValue({
      isValid: true,
      files: [file],
      errors: [],
    })

    const { put } = await import('@vercel/blob')
    vi.mocked(put).mockRejectedValue(new Error('Blob service unavailable'))

    const res = await POST(fakePostRequest(makeFormData([file])))
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('All uploads failed')
  })

  it('returns partial success when some files fail', async () => {
    mockUserSession('user-123')
    const file1 = makeFile('ok.jpg', 'image/jpeg', 1024)
    const file2 = makeFile('fail.jpg', 'image/jpeg', 1024)
    const { validateFilesFromFormData } = await import('@/lib/file-validation')
    vi.mocked(validateFilesFromFormData).mockReturnValue({
      isValid: true,
      files: [file1, file2],
      errors: [],
    })

    const { put } = await import('@vercel/blob')
    vi.mocked(put)
      .mockResolvedValueOnce({ url: 'https://blob.vercel.com/ok.jpg' } as never)
      .mockRejectedValueOnce(new Error('Upload failed'))

    const res = await POST(fakePostRequest(makeFormData([file1, file2])))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.totalUploaded).toBe(1)
    expect(body.data.totalFailed).toBe(1)
    expect(body.data.failed).toHaveLength(1)
  })
})