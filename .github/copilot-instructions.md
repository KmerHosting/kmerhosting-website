# KmerHosting Copilot Instructions

## Architecture Overview
This is a Next.js 15 application using the app router for a web hosting company's marketing site. It features static pages for services like pricing, products, and contact, with no backend API - all content is client-side rendered.

## Key Components
- **Layout**: Root layout in `app/layout.tsx` wraps pages with `ThemeProvider` and `LanguageProvider` for dark/light themes and en/fr localization.
- **Pages**: Each route in `app/` directory uses section components from `components/sections/` (e.g., Hero, Features) composed in page components.
- **UI Library**: shadcn/ui components in `components/ui/`, configured via `components.json` with "new-york" style and Lucide icons.

## Patterns & Conventions
- **Styling**: Tailwind CSS v4 with CSS variables for theming. Use `cn()` from `@/lib/utils` for conditional classes.
- **Internationalization**: Custom `LanguageProvider` context with `t(key)` function. Translations in `language-provider.tsx` object.
- **Theming**: `next-themes` with `useTheme()` hook. Supports system preference.
- **Imports**: `@/` alias for root imports (configured in `tsconfig.json`).
- **Components**: Client components marked with `"use client"`. Server components by default.

## Workflows
- **Development**: `pnpm dev` starts dev server on localhost:3000.
- **Build**: `pnpm build` compiles for production. TypeScript errors are ignored (`next.config.mjs`).
- **Linting**: `pnpm lint` runs ESLint.
- **No Tests**: Project has no test suite currently.

## Examples
- Adding a new page: Create `app/new-page/page.tsx`, import sections from `components/sections/`, wrap with Header/Footer.
- Using translations: `const { t } = useLanguage(); <p>{t("nav.home")}</p>`
- Theming: `const { theme, setTheme } = useTheme();` in client components.

Reference: `app/page.tsx` for home page structure, `components/header.tsx` for navigation with i18n.