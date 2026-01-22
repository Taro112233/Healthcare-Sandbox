# HealthTech Sandbox - Production Instruction (Condensed)

## 🎯 Project Overview

**HealthTech Sandbox** เป็นแพลตฟอร์ม Sandbox สำหรับรับและพัฒนา Technology Requests จากบุคลากรทางการแพทย์

**หลักการสำคัญ:**
- ไม่ใช้ข้อมูลผู้ป่วยจริง
- ไม่รับประกันการพัฒนา
- เน้น educational และ experimental
- Admin เป็น gatekeeper หลัก

---

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend:** Next.js 15 (App Router) + TypeScript
- **UI:** TailwindCSS 4 + Shadcn/UI
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Authentication:** Better Auth
- **File Storage:** Vercel Blob
- **Security:** Arcjet
- **Date Utilities:** date-fns
- **Form Management:** react-hook-form + zod
- **Toast:** sonner
- **Hosting:** Vercel

---

## 🎓 Code Quality Standards (MANDATORY)

### 1. TypeScript Strict Mode - NO EXCEPTIONS

**NEVER use `any` type. Always use proper types.**

#### ❌ WRONG:
```typescript
const userRole = (session.user as any).role || 'USER';
```

#### ✅ CORRECT:
```typescript
interface BetterAuthUser {
  id: string;
  email: string;
  name: string;
  role?: 'USER' | 'ADMIN';
  firstName?: string;
  lastName?: string;
  phone?: string;
  image?: string;
}

const betterAuthUser = session.user as BetterAuthUser;
const userRole = betterAuthUser.role || 'USER';
```

---

### 2. Handle Optional/Undefined Values - ALWAYS

**NEVER access properties without checking if they exist.**

#### ❌ WRONG:
```typescript
const getUserInitials = () => {
  return `${request.user.firstName.charAt(0)}${request.user.lastName.charAt(0)}`;
};
```

#### ✅ CORRECT:
```typescript
const getUserInitials = () => {
  if (!request.user) return 'U';
  
  const firstName = request.user.firstName || request.user.name?.split(' ')[0] || '';
  const lastName = request.user.lastName || request.user.name?.split(' ').slice(1).join(' ') || '';
  
  if (!firstName && !lastName) return 'U';
  
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};
```

---

### 3. Tailwind CSS v4 - Use Canonical Classes

#### ❌ WRONG:
```typescript
<div className="flex-shrink-0 break-words">
```

#### ✅ CORRECT:
```typescript
<div className="shrink-0 wrap-break-word">
```

**Common Replacements:**
| Old Class | New Class |
|-----------|-----------|
| `flex-shrink-0` | `shrink-0` |
| `flex-grow-0` | `grow-0` |
| `break-words` | `wrap-break-word` |
| `break-all` | `wrap-break-all` |

---

### 4. Pre-commit Checklist

**Before committing ANY code, verify:**

- [ ] No `any` types used anywhere
- [ ] All optional properties handled with `?.` or fallback
- [ ] Tailwind classes use v4 canonical names
- [ ] No unused imports
- [ ] `pnpm type-check` passes (0 errors)
- [ ] `pnpm lint` passes

---

## 👥 User Roles & Permissions

```typescript
enum UserRole {
  USER = "USER",     // Submit requests + view own + comment on own
  ADMIN = "ADMIN"    // Full access + status management + comment anywhere
}
```

| Feature | USER | ADMIN |
|---------|------|-------|
| Submit request | ✅ | ✅ |
| View own requests | ✅ | ✅ |
| View all requests | ❌ | ✅ |
| Change request status | ❌ | ✅ |
| Comment on own request | ✅ | ✅ |
| Comment on any request | ❌ | ✅ |

---

## 🏷️ Request Status System

```typescript
enum RequestStatus {
  PENDING_REVIEW = "รอตรวจสอบ",
  UNDER_CONSIDERATION = "อยู่ในการพิจารณา",
  IN_DEVELOPMENT = "อยู่ในการพัฒนา",
  IN_TESTING = "อยู่ในการทดสอบ",
  COMPLETED = "สำเร็จ",
  BEYOND_CAPACITY = "เกินความสามารถ"
}
```

**Rules:**
- Default: `รอตรวจสอบ`
- Admin only: เปลี่ยนสถานะได้ตลอดเวลา
- No auto-transition
- Status History: บันทึกทุก transition

---

## 📝 Request Schema

```typescript
interface RequestForm {
  department: string             // หน่วยงานที่ขอ
  painPoint: string              // Pain point (Rich text)
  currentWorkflow: string        // ขั้นตอนปัจจุบัน (Rich text)
  expectedTechHelp: string       // สิ่งที่ต้องการ (Rich text)
  requestType: RequestType       // Dropdown
  attachments?: File[]           // max 5 files, 10MB each
}

enum RequestType {
  CALCULATOR, FORM, WORKFLOW, DECISION_AID, OTHER
}
```

---

## 🗂️ Database Schema (Core Models)

### User Model (Better Auth)
```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  emailVerified Boolean   @default(false)
  image         String?
  
  // Project fields (optional with defaults)
  firstName     String    @default("")
  lastName      String    @default("")
  phone         String?
  role          UserRole  @default(USER)
  status        String    @default("ACTIVE")
  isActive      Boolean   @default(true)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  sessions      Session[]
  accounts      Account[]
  requests      Request[]
  comments      Comment[]
  statusChanges StatusHistory[]
}
```

### Request Model
```prisma
model Request {
  id                String        @id @default(cuid())
  userId            String
  department        String
  painPoint         String        @db.Text
  currentWorkflow   String        @db.Text
  expectedTechHelp  String        @db.Text
  requestType       RequestType
  status            RequestStatus @default(PENDING_REVIEW)
  
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
  
  user              User          @relation(...)
  attachments       Attachment[]
  comments          Comment[]
  statusHistory     StatusHistory[]
}
```

### Comment Model
```prisma
model Comment {
  id          String        @id @default(cuid())
  requestId   String
  userId      String
  content     String        @db.Text
  type        CommentType   @default(COMMENT)
  
  // For STATUS_CHANGE type only
  fromStatus  RequestStatus?
  toStatus    RequestStatus?
  
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  
  request     Request       @relation(...)
  user        User          @relation(...)
}

enum CommentType {
  COMMENT
  STATUS_CHANGE
}
```

---

## 🔐 Authentication (Better Auth)

### Configuration
```typescript
// lib/auth.ts
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  baseURL: process.env.BETTER_AUTH_URL,
  
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: false,
  },
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  
  user: {
    additionalFields: {
      firstName: { type: "string", required: true },
      lastName: { type: "string", required: true },
      phone: { type: "string", required: false },
      role: { type: "string", defaultValue: "USER" },
      status: { type: "string", defaultValue: "ACTIVE" },
      isActive: { type: "boolean", defaultValue: true },
    },
  },
});
```

### Client Setup
```typescript
// lib/auth-client.ts
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
```

---

## 🛡️ Middleware Security

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files
  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // Allow Better Auth routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Public routes
  const PUBLIC_ROUTES = ["/", "/login", "/register", "/products", "/about"];
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Get session
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Admin route protection
  if (pathname.startsWith("/admin")) {
    const betterAuthUser = session.user as BetterAuthUser;
    if (betterAuthUser.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Inject user headers
  const requestHeaders = new Headers(request.headers);
  const betterAuthUser = session.user as BetterAuthUser;
  requestHeaders.set("x-user-id", betterAuthUser.id);
  requestHeaders.set("x-user-role", betterAuthUser.role || "USER");

  return NextResponse.next({ request: { headers: requestHeaders } });
}
```

---

## 🗺️ Application Routes

### Page Routes
```
app/
├── page.tsx                    # Landing (public)
├── login/page.tsx              # Login (public)
├── register/page.tsx           # Register (public)
├── dashboard/page.tsx          # My requests (auth)
├── requests/
│   ├── new/page.tsx           # Submit form (auth)
│   └── [id]/page.tsx          # Detail (auth + ownership)
└── admin/
    └── page.tsx               # Admin dashboard (admin only)
```

### API Routes
```
app/api/
├── auth/[...all]/route.ts     # Better Auth handler
├── requests/
│   ├── route.ts               # POST Create, GET List
│   ├── [id]/route.ts          # GET Detail, PATCH Update
│   ├── [id]/comments/route.ts # POST Add, GET List
│   └── upload/route.ts        # POST Upload files
```

---

## 🔄 Key User Flows

### Flow 1: Login → Dashboard
```
/ (Landing) → /login → /dashboard
```

### Flow 2: Register
```
/register → Better Auth Sign Up → /dashboard (auto login)
```

### Flow 3: Submit Request
```
/requests/new → POST /api/requests → /requests/[id]
```

### Flow 4: View Request Detail
```
/requests/[id] → GET /api/requests/[id]

Permission: USER (own) OR ADMIN (all)
```

### Flow 5: Admin Status Change
```
Admin opens /requests/[id]
  ↓
Change status in comment section
  ↓
POST /api/requests/[id]/comments (type: STATUS_CHANGE)
  ↓
Request status updates
```

### Flow 6: Comment
```
Type in comment section (right sidebar)
  ↓
POST /api/requests/[id]/comments
  ↓
Permission: own request OR admin
  ↓
Optimistic update → Show immediately
```

---

## 🎨 Component Architecture

### Directory Structure
```
components/
├── ui/                     # Shadcn/UI
├── shared/                 # Reusable (Header, Footer, Loading)
├── providers/              # AuthProvider
├── RequestForm/
│   ├── index.tsx
│   └── FileUploadSection.tsx
├── RequestList/
│   ├── index.tsx
│   ├── RequestCard.tsx
│   ├── RequestFilters.tsx
│   └── RequestPagination.tsx
├── RequestDetail/
│   ├── index.tsx
│   ├── RequestInfo.tsx
│   ├── AttachmentList.tsx
│   └── CommentSection/
│       ├── index.tsx
│       ├── CommentList.tsx
│       ├── CommentItem.tsx
│       └── CommentInput.tsx
└── RichTextEditor/
    ├── RichTextEditor.tsx
    └── RichTextViewer.tsx
```

### Component Rules
- Max 200 lines per file
- Header comment with path
- Default values for optional props
- Extract logic to custom hooks
- **Safe null/undefined handling**
- **No `any` types**

---

## 💬 Comment System (Facebook-style)

### Layout
```
┌─────────────────────────────────┐
│ Comment List (scrollable)       │
│ - Oldest first                   │
│ - Bottom = newest                │
├─────────────────────────────────┤
│ Comment Input                    │
│ [For Admin: Status dropdown]    │
└─────────────────────────────────┘
```

### Features
- Avatar (initials or Better Auth image)
- Name display (FirstName + Last Initial)
- Status change indicator (if type=STATUS_CHANGE)
- Relative timestamp (date-fns, Thai locale)
- Auto-scroll to bottom on new comment
- Optimistic update
- Fixed height (h-150) with scroll

---

## 🔌 API Design Standards

### Response Format
```typescript
// Success
{ success: true, data: {...}, meta?: {...} }

// Error
{ success: false, error: "message", code?: "CODE" }
```

### HTTP Status Codes
- `200` OK → GET/PATCH success
- `201` Created → POST success
- `400` Bad Request → Validation error
- `401` Unauthorized → No auth
- `403` Forbidden → No permission
- `404` Not Found
- `500` Internal Server Error

### API Route Pattern (Better Auth)
```typescript
export async function GET(request: Request) {
  // 1. Get session
  const session = await auth.api.getSession({ headers: request.headers });
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // 2. Type user properly
  const betterAuthUser = session.user as BetterAuthUser;
  const userRole = betterAuthUser.role || 'USER';
  
  // 3. Permission check
  if (requiresAdmin && userRole !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  // 4. Business logic
}
```

---

## 🚀 Development Workflow

### Database Commands
```bash
pnpm schema:merge       # Merge schemas
pnpm db:generate        # Generate Prisma client
pnpm db:push           # Push to DB
pnpm db:migrate        # Create migration
pnpm db:seed           # Seed data
pnpm db:studio         # Open Prisma Studio
```

### Development Commands
```bash
pnpm dev               # Start dev server
pnpm build            # Build for production
pnpm type-check       # TypeScript check
pnpm lint             # ESLint check
pnpm lint --fix       # Auto-fix
```

---

## ⚠️ Security Best Practices

### Input Validation
- Use `zod` for schema validation
- Validate on both client and server
- Server validation is mandatory
- Sanitize user input

### File Upload Security
1. Check file size (< 10MB)
2. Verify MIME type (image/*, application/pdf)
3. Validate extension
4. Sanitize filename
5. Generate unique storage path

### Better Auth Security
- HTTP-only cookies (XSS prevention)
- Secure flag in production
- SameSite: 'lax'
- Session expiration: 7 days
- Built-in CSRF protection

### API Route Checklist
1. ✅ Authentication check
2. ✅ Permission check
3. ✅ Input validation (zod)
4. ✅ Ownership check
5. ✅ Error handling (try-catch)
6. ✅ Proper HTTP status
7. ✅ No `any` types

---

## 📦 Core Dependencies

- `next` (15.5.9), `react` (19.2.1), `typescript`
- `@prisma/client`, `@prisma/adapter-neon`, `@neondatabase/serverless`
- `better-auth`
- `tailwindcss` (v4), Shadcn/UI (@radix-ui/*)
- `react-hook-form`, `zod`, `@hookform/resolvers`
- `sonner`, `date-fns`, `framer-motion`
- `@tiptap/react`, `@tiptap/starter-kit`
- `@vercel/blob`
- `lucide-react`

---

## 🎯 Key Principles

1. **Simplicity First** - Choose simplest solution
2. **Security by Default** - Auth required, server-side validation
3. **Data Integrity** - FK constraints, timestamps, status history
4. **Type Safety** - Zero `any` types, handle nulls properly
5. **User Experience** - Loading states, error messages, optimistic updates
6. **Maintainability** - <200 lines, custom hooks, centralized utils

---

## 📋 Pre-Commit Checklist (MANDATORY)

- [ ] No `any` types
- [ ] Optional properties handled (`?.` or fallback)
- [ ] Tailwind v4 canonical classes (`shrink-0`, not `flex-shrink-0`)
- [ ] No unused imports
- [ ] `pnpm type-check` passes
- [ ] `pnpm lint` passes

---

**Remember:** 
- Start simple, iterate based on real usage
- Maintain security with Better Auth
- Focus on user value
- **ZERO tolerance for `any` types**
- **Handle null/undefined safely**
- **Use Tailwind v4 canonical classes**
- **Pass linting before every commit**