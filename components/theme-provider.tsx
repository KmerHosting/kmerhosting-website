'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Use the `class` attribute so Tailwind's `dark:` variants work.
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" {...props}>
      {children}
    </NextThemesProvider>
  )
}
