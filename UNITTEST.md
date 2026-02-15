เข้าใจแล้วครับ จะเขียน instruction สั้น ๆ ตรงประเด็น ให้ AI นำไปทำได้เลยได้เลยครับ นี่คือ instruction ที่เขียนมาเพื่อให้ AI อ่านแล้วทำได้เลย:

---

## Unit Test Instruction — HealthTech Sandbox

### Stack ที่ใช้
- **Test runner:** Vitest
- **Dependencies ที่ต้อง install:**
```bash
pnpm add -D vitest @vitest/coverage-v8
```

---

### โครงสร้างไฟล์

```
tests/
├── setup.ts                          ← global mock setup
├── helpers/
│   └── mock-session.ts               ← helper สำหรับ mock session
└── api/
    ├── requests.test.ts
    ├── requests-id.test.ts
    └── comments.test.ts
```

---

### Config ที่ต้องสร้าง

**`vitest.config.ts`** (root)
```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

เพิ่มใน **`package.json`**:
```json
"test": "vitest",
"test:run": "vitest run",
"test:coverage": "vitest run --coverage"
```

---

### Global Mock (`tests/setup.ts`)

Mock 3 dependencies นี้ทุก test — **ห้ามข้าม**

```typescript
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

// 3. Mock Arcjet — ให้ผ่านทุก request เป็น default
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
```

---

### Session Helper (`tests/helpers/mock-session.ts`)

```typescript
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
```

---

### กฎการเขียน Test

**1. ทุก test ต้องมี `beforeEach(() => vi.clearAllMocks())`**

**2. โครงสร้างของแต่ละ test case:**
```
1. Setup session (mockUserSession / mockAdminSession / mockNoSession)
2. Setup prisma mock ว่าจะคืนข้อมูลอะไร
3. สร้าง fake request แล้วเรียก handler
4. Assert status code และ response body
```

**3. Test case บังคับที่ทุก route ต้องมี:**
- `returns 401 when no session`
- `returns 403 when USER tries to access admin-only action`
- `returns 400 when input is invalid`
- `returns 200/201 when valid USER request`
- `returns 200/201 when valid ADMIN request`

**4. ห้ามใช้ `any` type ใน test file เช่นเดียวกับโค้ดจริง**

---

### Routes ที่ต้อง test

| File | Functions |
|------|-----------|
| `app/api/requests/route.ts` | `GET`, `POST` |
| `app/api/requests/[id]/route.ts` | `GET`, `PATCH` |
| `app/api/requests/[id]/comments/route.ts` | `GET`, `POST` |

---

### ตัวอย่าง pattern สำหรับ route ที่มี `params`

```typescript
// route ที่รับ [id] ต้องส่ง params แบบนี้
const params = Promise.resolve({ id: 'req-123' })
const response = await GET(fakeRequest as never, { params })
```