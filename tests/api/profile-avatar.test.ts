// tests/api/profile-avatar.test.ts
// POST /api/profile/avatar

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { POST } from '@/app/api/profile/avatar/route'
import { prisma } from '@/lib/prisma'
import { mockUserSession, mockAdminSession, mockNoSession } from '../helpers/mock-session'

// ===== MOCK: @vercel/blob =====

vi.mock('@vercel/blob', () => ({
  put: vi.fn().mockResolvedValue({ url: 'https://blob.vercel.com/avatars/user-123/avatar.jpeg' }),
}))

// ===== MOCK: file-validation — validateFile passes by default =====

vi.mock('@/lib/file-validation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/file-validation')>()
  return {
    ...actual,
    validateFile: vi.fn().mockReturnValue({ isValid: true }),
  }
})

// ===== HELPERS =====

const makeImageFile = (
  name = 'avatar.jpg',
  type = 'image/jpeg',
  size = 2048
): File => {
  const blob = new Blob(['x'.repeat(size)], { type })
  return new File([blob], name, { type })
}

const makePdfFile = (): File => {
  const blob = new Blob(['%PDF'], { type: 'application/pdf' })
  return new File([blob], 'doc.pdf', { type: 'application/pdf' })
}

const fakePostRequest = (formData: FormData) =>
  new Request('http://localhost/api/profile/avatar', {
    method: 'POST',
    body: formData,
  }) as never

const makeFormWithAvatar = (file: File | null) => {
  const fd = new FormData()
  if (file) fd.append('avatar', file)
  return fd
}

const mockUpdatedUser = {
  id: 'user-123',
  email: 'user@test.com',
  name: 'สมชาย ใจดี',
  firstName: 'สมชาย',
  lastName: 'ใจดี',
  phone: null,
  image: 'https://blob.vercel.com/avatars/user-123/avatar.jpeg',
  role: 'USER',
  status: 'ACTIVE',
  isActive: true,
  emailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

// ===== POST /api/profile/avatar =====

describe('POST /api/profile/avatar', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 401 when no session', async () => {
    mockNoSession()
    const fd = makeFormWithAvatar(makeImageFile())
    const res = await POST(fakePostRequest(fd))
    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Authentication required')
  })

  it('returns 400 when no file in formData', async () => {
    mockUserSession('user-123')
    const fd = makeFormWithAvatar(null) // no avatar field
    const res = await POST(fakePostRequest(fd))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('No file provided')
  })

  it('returns 400 when file validation fails', async () => {
    mockUserSession('user-123')
    const { validateFile } = await import('@/lib/file-validation')
    vi.mocked(validateFile).mockReturnValue({
      isValid: false,
      error: 'ไฟล์มีขนาดใหญ่เกินไป',
    })

    const fd = makeFormWithAvatar(makeImageFile())
    const res = await POST(fakePostRequest(fd))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('ไฟล์มีขนาดใหญ่เกินไป')
  })

  it('returns 400 when file is not an image (PDF)', async () => {
    mockUserSession('user-123')
    const { validateFile } = await import('@/lib/file-validation')
    vi.mocked(validateFile).mockReturnValue({ isValid: true }) // passes size/type check

    const fd = makeFormWithAvatar(makePdfFile())
    const res = await POST(fakePostRequest(fd))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('รองรับเฉพาะไฟล์รูปภาพ')
  })

  it('returns 200 and updates avatar for authenticated USER', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.user.update).mockResolvedValue(mockUpdatedUser as never)

    const fd = makeFormWithAvatar(makeImageFile())
    const res = await POST(fakePostRequest(fd))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.message).toBe('อัปเดตรูปโปรไฟล์สำเร็จ')
    expect(body.data.image).toBe('https://blob.vercel.com/avatars/user-123/avatar.jpeg')
  })

  it('returns 200 and updates avatar for ADMIN', async () => {
    mockAdminSession('admin-123')
    vi.mocked(prisma.user.update).mockResolvedValue({
      ...mockUpdatedUser,
      id: 'admin-123',
      role: 'ADMIN',
    } as never)

    const fd = makeFormWithAvatar(makeImageFile('profile.png', 'image/png'))
    const res = await POST(fakePostRequest(fd))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  it('updates prisma user with blob URL', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.user.update).mockResolvedValue(mockUpdatedUser as never)

    const fd = makeFormWithAvatar(makeImageFile())
    await POST(fakePostRequest(fd))

    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'user-123' },
        data: expect.objectContaining({
          image: 'https://blob.vercel.com/avatars/user-123/avatar.jpeg',
        }),
      })
    )
  })

  it('generates path with user id in blob storage', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.user.update).mockResolvedValue(mockUpdatedUser as never)

    const { put } = await import('@vercel/blob')
    const fd = makeFormWithAvatar(makeImageFile('photo.jpg', 'image/jpeg'))
    await POST(fakePostRequest(fd))

    expect(put).toHaveBeenCalledWith(
      expect.stringContaining('avatars/user-123/'),
      expect.any(File),
      expect.objectContaining({ access: 'public' })
    )
  })

  it('returns 500 on blob upload error', async () => {
    mockUserSession('user-123')
    const { put } = await import('@vercel/blob')
    vi.mocked(put).mockRejectedValue(new Error('Blob unavailable'))

    const fd = makeFormWithAvatar(makeImageFile())
    const res = await POST(fakePostRequest(fd))
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  it('returns 500 on prisma update error', async () => {
    mockUserSession('user-123')
    vi.mocked(prisma.user.update).mockRejectedValue(new Error('DB error'))

    const fd = makeFormWithAvatar(makeImageFile())
    const res = await POST(fakePostRequest(fd))
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.success).toBe(false)
  })
})