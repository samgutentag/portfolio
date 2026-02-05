"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

/**
 * Cycles through light → dark → system on each click.
 *
 * The `mounted` guard is critical: next-themes can't know the resolved theme
 * until after the first client-side render (it reads from localStorage / OS pref).
 * Rendering the icon before that causes a hydration mismatch, so we render
 * nothing on the server and reveal the icon only after mount.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const cycle: Record<string, string> = {
    light: "dark",
    dark: "system",
    system: "light",
  };

  // theme is undefined before hydration; fall back to "system"
  const resolved = theme || "system";
  const Icon = resolved === "light" ? Sun : resolved === "dark" ? Moon : Monitor;

  return (
    <button
      onClick={() => setTheme(cycle[resolved])}
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label={`Switch to ${cycle[resolved]} theme`}
    >
      <Icon size={16} />
    </button>
  );
}
