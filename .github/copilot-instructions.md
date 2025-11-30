# KmerHosting AI Agent Instructions

This is a **Next.js web hosting sales & customer management platform** for Cameroon. The architecture combines marketing pages with authenticated customer dashboards and backend API services.

## Architecture Overview

### Core Structure
- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Database**: Prisma ORM + MySQL (schemas: `User`, `Order`, `PaymentProof`, `VerificationToken`, `PasswordReset`, `NewsletterSubscription`)
- **UI**: Radix UI components + TailwindCSS with dark mode support (`next-themes`)
- **Auth**: JWT tokens stored in httpOnly cookies (secure, prevents XSS)
- **Email**: Mailtrap transporter with department-specific addresses (`noreply`, `billing`, `sales`)

### Key Directories
- `app/` - Next.js App Router: public pages, `/api` routes, `/customers` authenticated dashboard
- `components/ui/` - Radix UI component library (40+ headless UI components)
- `lib/` - Utilities: `mailer.ts` (email templates), `cookie-context.tsx` (cookie consent), `utils.ts` (cn helper)
- `prisma/schema.prisma` - Database schema with email verification & payment proof tracking

## Critical Patterns

### Authentication Flow
1. **Registration** (`/api/auth/register`): Email-only signup + JWT verification token (24hr expiry)
2. **Verification** (`/verify-email`): User verifies email, JWT token creates user record + auth cookie
3. **Login** (`/api/auth/login`): Validates password hash (bcrypt), sets `authToken` cookie (JWT format)
4. **Auth Check** (`/api/auth/me`): Used in client components (navbar, dashboard, get-pay) - returns `{authenticated: bool, user: {id, email, username}}`
5. **Cookie-based Sessions**: JWT in httpOnly cookie prevents direct JS access - checked via `/api/auth/me` endpoint

**Important**: All client-side auth checks must:
- Call `fetch("/api/auth/me")` on mount (see `navbar.tsx`, `dashboard/page.tsx`)
- Use `useState(false)` + `useEffect()` to avoid hydration mismatch (check `mounted` flag first)
- Display appropriate UI based on `isAuthenticated` state

### Component Patterns
- **"use client"** directive required for interactive components (state, hooks, dialogs)
- **Lazy loading**: Home page (`page.tsx`) uses `lazy()` + `<Suspense>` for 7+ heavy components
- **Toast notifications**: Use `sonner` library - `toast.success()`, `toast.error()`
- **Theme toggle**: `useTheme()` from `next-themes` with `mounted` check to prevent hydration mismatch
- **Modals**: `ContactDepartmentDialog`, `DemoRequestDialog`, etc. manage `showContactDialog` state

### Form & Validation Patterns
- **Newsletter subscribe**: `POST /api/newsletter/subscribe` with email validation
- **Payment proof upload**: `get-pay/page.tsx` uploads max 5 images + contact info to `/api/payment` 
- **Error handling**: Always wrap `fetch()` in try-catch, show `toast.error()` to user, log to console
- **Loading states**: Use `useState(false)` then `setIsLoading(true)` during async operations

### API Route Conventions
All routes return JSON with consistent format:
```typescript
// Success
{ success: true, message: "...", data?: {} }

// Error  
{ error: "message", status: 400|401|500 }

// Auth endpoints specifically
GET /api/auth/me → { authenticated: bool, user?: {id, email, username} }
```

**Security patterns**:
- Check JWT in cookie header: `const token = req.cookies.get("authToken")?.value`
- Verify JWT: `jwt.verify(token, process.env.JWT_SECRET)`
- User enumeration prevention: Register endpoint returns success even if email exists
- Password hashing: Use `bcrypt` for password operations

## Email System

`lib/mailer.ts` exports pre-built templates for common flows:
- `sendVerificationEmail(email, displayName, verifyUrl)` - Called during registration
- `notifyAdminNewUser(email, displayName, timestamp)` - Admin notification
- `sendPasswordResetEmail(email, resetUrl)` - Password recovery
- `sendOrderConfirmationEmail(email, orderDetails)` - Order processing

Each returns `{ success: bool, error?: string }`. Mailtrap transport configured with department-specific from addresses.

## Development Workflows

### Run the App
```bash
npm run dev           # Start dev server on http://localhost:3000 (uses --webpack flag)
npm run build         # Build with --webpack (note: TS errors ignored in next.config.mjs)
npm start             # Serve built app
npm run lint          # ESLint check
```

### Database
```bash
npx prisma generate  # Generate Prisma client (run after schema changes)
npx prisma migrate dev --name <migration_name>  # Create migration
```

### Key Build Config
- `next.config.mjs`: Webpack enabled, TypeScript build errors ignored (`ignoreBuildErrors: true`), image optimization enabled (AVIF/WebP formats), CSS optimization via `critters`
- `tsconfig.json`: Strict mode enabled, path alias `@/*` for root imports

## Important Conventions

### Do NOT Assume
- Don't create new UI components - use existing Radix UI components from `components/ui/`
- Don't ignore `mounted` checks on client components - prevents hydration mismatches with theme/auth
- Don't call `/api/auth/me` inside `useEffect` without a dependency array cleanup
- Don't hardcode environment URLs - use `process.env.NEXT_PUBLIC_URL`

### File Naming
- Page components: `page.tsx` (must be React Server Components unless using `"use client"`)
- API routes: `route.ts` with uppercase HTTP method names (`GET`, `POST`, etc.)
- Dialog components: `*-dialog.tsx` (e.g., `contact-department-dialog.tsx`)

### Styling
- Use `clsx` + `twMerge` via `cn()` utility to merge Tailwind classes intelligently
- Primary color: `#128C7E` (used in buttons, API key generation UI)
- Dark mode: Managed by `next-themes`, apply `dark:` classes for dark variants

## New Feature Checklist
1. **Database**: Add models to `prisma/schema.prisma`, run migration
2. **API**: Create `app/api/[feature]/route.ts` with proper error handling
3. **Component**: Build UI in `components/` with `"use client"` if interactive
4. **Page**: Create `app/[feature]/page.tsx` (lazy load if heavy)
5. **Auth**: If protected, check `authenticated` state or use `/api/auth/me`
6. **Email**: Use `lib/mailer.ts` exports for transactional emails
