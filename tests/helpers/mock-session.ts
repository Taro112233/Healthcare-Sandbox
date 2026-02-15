// tests/helpers/mock-session.ts
import { vi } from 'vitest'
import { auth } from '@/lib/auth'

export function mockUserSession(userId = 'user-123') {
  vi.mocked(auth.api.getSession).mockResolvedValue({
    user: { id: userId, email: 'user@test.com', name: 'Test User', role: 'USER' },
    session: { id: 'session-1' },
  } as never)
}

export function mockAdminSession(userId = 'admin-123') {
  vi.mocked(auth.api.getSession).mockResolvedValue({
    user: { id: userId, email: 'admin@test.com', name: 'Admin User', role: 'ADMIN' },
    session: { id: 'session-2' },
  } as never)
}

export function mockNoSession() {
  vi.mocked(auth.api.getSession).mockResolvedValue(null)
}