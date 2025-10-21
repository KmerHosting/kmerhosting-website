# Copilot Instructions for KmerHosting Website

## Architecture Overview
This is a Next.js 15 application using the App Router for routing. The project follows a component-based architecture with:
- **Pages**: Located in `app/` directory (e.g., `app/page.tsx` for homepage, `app/about/page.tsx` for about page)
- **Components**: Reusable UI in `components/` (e.g., `header.tsx`, `footer.tsx`)
- **Sections**: Page-specific sections in `components/sections/` (e.g., `hero.tsx`, `features.tsx`)
- **UI Library**: shadcn/ui components in `components/ui/` (Radix UI primitives with Tailwind styling)
- **Styling**: Tailwind CSS with CSS variables for theming, configured via `components.json`
- **Providers**: Theme and language providers wrap the app in `app/layout.tsx`

Key data flows: Static pages with no backend; all content is client-side rendered. External integrations include Vercel Analytics.

## Developer Workflows
- **Package Management**: Use `pnpm` (lockfile: `pnpm-lock.yaml`)
- **Development**: `npm run dev` (uses Turbopack for faster builds)
- **Build**: `npm run build` (Next.js production build)
- **Linting**: `npm run lint` (ESLint)
- **Start**: `npm run start` (production server)
- **Debugging**: Standard Next.js dev tools; check browser console for client errors, terminal for build issues

Ignore TypeScript build errors in dev (configured in `next.config.mjs`).

## Project Conventions
- **Imports**: Use `@/` aliases (e.g., `@/components/header` instead of relative paths)
- **Component Structure**: Export default function components; use TypeScript interfaces for props
- **Styling**: Tailwind classes directly in JSX; CSS variables for themes (defined in `app/globals.css`)
- **Icons**: Lucide React icons (imported as needed)
- **Forms**: React Hook Form with resolvers (e.g., for validation)
- **Theming**: next-themes for dark/light mode support
- **Internationalization**: Custom language provider (check `language-provider.tsx`)

Avoid adding new dependencies unless necessary; prefer shadcn/ui components for UI elements.

## Integration Points
- **Analytics**: Vercel Analytics in `layout.tsx`
- **SEO**: Metadata configured in `layout.tsx` and individual pages
- **External Links**: No APIs; static site with links to external services

When adding new pages, create in `app/` with `page.tsx`; import shared components from `components/`.

## Examples
- Adding a new section: Create in `components/sections/`, import in page component (see `app/page.tsx`)
- Styling: Use Tailwind utilities; extend via `globals.css` if needed
- Component: Follow shadcn pattern (e.g., `components/ui/button.tsx`)</content>
<parameter name="filePath">c:\Users\OpendMind Technology\Desktop\kmerhosting\.github\copilot-instructions.md