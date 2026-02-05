"use client";

/**
 * Thin wrapper around next-themes' ThemeProvider.
 * Marked "use client" because next-themes uses React context internally.
 *
 * We re-export it as a named component so the root layout (a server component)
 * can import it without pulling the entire next-themes module into the server bundle.
 * This is a standard Next.js pattern: client boundaries are opt-in per component.
 */

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
