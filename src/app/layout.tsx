import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";

/**
 * next/font/google downloads Inter at build time and self-hosts it.
 * The `variable` option injects a CSS custom property (`--font-inter`)
 * that we reference in globals.css via @theme inline.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * Next.js Metadata API — statically analyzable, no <Head> component needed.
 * `title.template` adds " | Sam Gutentag" to every page's <title> automatically.
 * `metadataBase` is required for resolving relative Open Graph URLs.
 */
export const metadata: Metadata = {
  title: {
    default: "Sam Gutentag",
    template: "%s | Sam Gutentag",
  },
  description:
    "Sr. Developer Relations Engineer. Writing about dev, tech, and building things.",
  metadataBase: new URL("https://gutentag.world"),
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gutentag.world",
    title: "Sam Gutentag",
    description:
      "Sr. Developer Relations Engineer. Writing about dev, tech, and building things.",
    siteName: "Sam Gutentag",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Gutentag",
    description:
      "Sr. Developer Relations Engineer. Writing about dev, tech, and building things.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
     * suppressHydrationWarning is required here because next-themes
     * sets the `dark` class on <html> client-side after hydration.
     * Without it, React warns about a mismatch between server and client HTML.
     */
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/*
         * ThemeProvider wraps the entire app.
         * attribute="class" → adds/removes "dark" class on <html>
         * defaultTheme="system" → reads prefers-color-scheme on first load
         * enableSystem → keeps watching the OS preference for changes
         */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Nav />
          {/*
           * max-w-2xl (672px) keeps prose readable.
           * pb-24 gives breathing room at the bottom of every page.
           */}
          <main className="mx-auto max-w-2xl px-6 pb-24">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
