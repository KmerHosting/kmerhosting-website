# KmerHosting Website - AI Agent Instructions# Copilot Instructions for KmerHosting Website



## Project Overview## Architecture Overview

This is a **Next.js 15** static marketing website (`output: 'export'`) for KmerHosting, a web hosting company based in Cameroon. The site is built with React 19, TypeScript, Tailwind CSS v4, and shadcn/ui (New York style) components with extensive Radix UI primitives.This is a Next.js 15 application using the App Router for routing. The project follows a component-based architecture with:

- **Pages**: Located in `app/` directory (e.g., `app/page.tsx` for homepage, `app/about/page.tsx` for about page)

## Architecture & Stack- **Components**: Reusable UI in `components/` (e.g., `header.tsx`, `footer.tsx`)

- **Sections**: Page-specific sections in `components/sections/` (e.g., `hero.tsx`, `features.tsx`)

### Core Technologies- **UI Library**: shadcn/ui components in `components/ui/` (Radix UI primitives with Tailwind styling)

- **Next.js 15.2+** with App Router and static export (`next build` generates static HTML)- **Styling**: Tailwind CSS with CSS variables for theming, configured via `components.json`

- **React 19** with Server Components (RSC) by default- **Providers**: Theme and language providers wrap the app in `app/layout.tsx`

- **TypeScript 5** (strict mode enabled, but `ignoreBuildErrors: true` in next.config)

- **Tailwind CSS v4.1+** using `@import "tailwindcss"` in `app/globals.css` (not traditional config file)Key data flows: Static pages with no backend; all content is client-side rendered. External integrations include Vercel Analytics.

- **shadcn/ui** components (New York variant) with Radix UI primitives

- **Lucide React** for icons## Developer Workflows

- **Package Management**: Use `pnpm` (lockfile: `pnpm-lock.yaml`)

### Key Configuration Files- **Development**: `npm run dev` (uses Turbopack for faster builds)

- `tsconfig.json`: Path aliases use `@/*` for root-level imports (no `src/` directory)- **Build**: `npm run build` (Next.js production build)

- `components.json`: shadcn/ui config - New York style, `cssVariables: true`, Lucide icons- **Linting**: `npm run lint` (ESLint)

- `next.config.mjs`: Static export, optimized images (unoptimized), package import optimization for Radix UI- **Start**: `npm run start` (production server)

- `app/globals.css`: Tailwind v4 imports, extensive design tokens in CSS variables (OKLCH color space)- **Debugging**: Standard Next.js dev tools; check browser console for client errors, terminal for build issues



## Project Structure & PatternsIgnore TypeScript build errors in dev (configured in `next.config.mjs`).



### Directory Organization## Project Conventions

```- **Imports**: Use `@/` aliases (e.g., `@/components/header` instead of relative paths)

app/                    # Next.js App Router pages- **Component Structure**: Export default function components; use TypeScript interfaces for props

  page.tsx             # Each page includes Header, Footer, CookieBanner- **Styling**: Tailwind classes directly in JSX; CSS variables for themes (defined in `app/globals.css`)

  layout.tsx           # Nested layouts for metadata (e.g., pricing/layout.tsx)- **Icons**: Lucide React icons (imported as needed)

  globals.css          # Tailwind v4 imports + design tokens- **Forms**: React Hook Form with resolvers (e.g., for validation)

components/- **Theming**: next-themes for dark/light mode support

  header.tsx           # Shared navigation (client component)- **Internationalization**: Custom language provider (check `language-provider.tsx`)

  footer.tsx           # Shared footer with newsletter

  cookie-banner.tsx    # GDPR cookie consentAvoid adding new dependencies unless necessary; prefer shadcn/ui components for UI elements.

  structured-data.tsx  # Schema.org JSON-LD helpers

  sections/            # Homepage sections (hero, features, etc.)## Integration Points

  ui/                  # shadcn/ui components- **Analytics**: Vercel Analytics in `layout.tsx`

lib/- **SEO**: Metadata configured in `layout.tsx` and individual pages

  utils.ts             # Single `cn()` utility for class merging- **External Links**: No APIs; static site with links to external services

hooks/                 # Shared React hooks

public/                # Static assetsWhen adding new pages, create in `app/` with `page.tsx`; import shared components from `components/`.

```

## Examples

### Page Architecture Pattern- Adding a new section: Create in `components/sections/`, import in page component (see `app/page.tsx`)

**Every page follows this structure:**- Styling: Use Tailwind utilities; extend via `globals.css` if needed

```tsx- Component: Follow shadcn pattern (e.g., `components/ui/button.tsx`)</content>

import { Header } from "@/components/header"<parameter name="filePath">c:\Users\OpendMind Technology\Desktop\kmerhosting\.github\copilot-instructions.md
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import type { Metadata } from "next"

export const metadata: Metadata = { /* SEO metadata */ }

export default function PageName() {
  return (
    <>
      <Header />
      <main>{/* page content */}</main>
      <Footer />
      <CookieBanner />
    </>
  )
}
```

### Metadata Strategy
- **Root layout** (`app/layout.tsx`): Site-wide metadata with `metadataBase`, OpenGraph, Twitter cards
- **Nested layouts**: Pages with similar metadata (e.g., `pricing/layout.tsx`) use nested layouts
- **Page-level**: Override `title`, `description`, `keywords` per page with template pattern
- **Structured data**: Use `<StructuredData>` component from `components/structured-data.tsx` for Schema.org JSON-LD (Organization, WebSite, FAQPage schemas)

### Component Patterns
1. **Client vs Server Components**: 
   - Default to Server Components (no `"use client"`)
   - Use `"use client"` only for interactivity: `header.tsx`, `footer.tsx`, `cookie-banner.tsx`, all `sections/*`
   
2. **shadcn/ui Usage**:
   - Import from `@/components/ui/*` (configured in `components.json`)
   - Components use `cn()` from `@/lib/utils` for className merging
   - Variants via `class-variance-authority` (see `button.tsx`)

3. **Styling Conventions**:
   - Tailwind utility classes inline (no separate CSS modules)
   - Design tokens: `--primary`, `--foreground`, etc. in OKLCH color space (see `app/globals.css`)
   - Responsive: mobile-first (`sm:`, `md:`, `lg:`)
   - Dark mode: Controlled via `next-themes` (`ThemeProvider` in root layout)

## Development Workflows

### Build & Dev Commands
```bash
npm run dev        # Next.js dev server with Turbopack
npm run build      # Static export to `out/` directory
npm start          # Serve production build (requires `next start` server)
npm run lint       # ESLint (configured but lenient - ignoreBuildErrors: true)
```

### Static Export Caveats
- **No server runtime**: `output: 'export'` means no API routes, no dynamic rendering
- **Images**: `unoptimized: true` for static hosting compatibility
- **Environment**: All data is hardcoded or fetched client-side (no server-side data fetching shown)

### Package Manager
Uses **pnpm** (lockfile present), but npm commands work due to compatibility.

## SEO & Performance Optimizations

### SEO Checklist (per page)
1. Export `metadata` object with `title`, `description`, `keywords`
2. Set `openGraph` and `twitter` for social sharing
3. Add `alternates.canonical` for URL canonicalization
4. Use `<StructuredData>` for rich snippets (Organization on homepage, FAQPage on FAQ)

### Performance Optimizations
- **Font optimization**: Inter & Geist Mono via `next/font/google` with preconnect hints
- **Package imports**: Radix UI packages optimized in `next.config.mjs` (`experimental.optimizePackageImports`)
- **CSS optimization**: `experimental.optimizeCss: true`
- **Analytics**: Vercel Analytics via `@vercel/analytics/next`

## Business Domain Knowledge

### Hosting Products
- **Shared hosting**: PHP, Node.js, Python, WordPress (from 1,158 FCFA/month)
- **Free hosting plan**: Available at `/free-hosting`
- **VPS hosting**: Virtual private servers
- **Reseller hosting**: Dedicated page at `/products/reseller`
- **Partner technologies**: Sectigo SSL, LiteSpeed, CloudLinux, WHMCS, Softaculous, Cloudflare, DirectAdmin, JetBackup (logos in `public/partners/`)

### Key Features (marketing copy)
- Free .com domain
- Free SSL certificate  
- 10+ Pro email addresses
- 99.9% uptime guarantee
- 24/7 support (live chat at `/support/live-chat`)

## Common Tasks

### Adding a New Page
1. Create `app/new-page/page.tsx`
2. Export `metadata` object for SEO
3. Import and render `<Header>`, `<Footer>`, `<CookieBanner>`
4. Add navigation link in `components/header.tsx` navItems array

### Adding a shadcn/ui Component
Component library is already configured. If a component is missing, follow shadcn/ui docs for "New York" style.

### Color Customization
Edit CSS variables in `app/globals.css` (`:root` for light mode, `.dark` for dark mode). Colors use OKLCH format.

### TypeScript Errors
Build has `ignoreBuildErrors: true`, so TypeScript won't block builds. Fix types progressively for better DX.

## Notes & Gotchas

- **No `src/` directory**: Imports use `@/*` pointing to root
- **Tailwind v4**: Uses `@import "tailwindcss"` in CSS, not `tailwind.config.js`
- **Currency**: Pricing in FCFA (West African CFA franc) indicates Cameroon market
- **Static site**: No backend - forms/submissions need external service integration
- **Partner logos**: Expected in `public/partners/` as SVG files (see `public/partners/README.md`)
- **Cookie consent**: Custom implementation storing preferences in localStorage

## Debugging

- **Build fails**: Check `npm run build` output; static export requires all data at build time
- **Styles not applying**: Verify Tailwind classes are valid; check design token names in `app/globals.css`
- **Metadata not showing**: Ensure `metadata` is exported from page or layout file
- **Client/server mismatch**: Verify `"use client"` is present if using hooks/events
