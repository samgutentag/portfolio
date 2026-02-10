# gutentag.world

Personal portfolio and blog built with Next.js 16, React 19, and Tailwind CSS 4.

## Features

### Blog (MDX)

Full markdown + JSX authoring via MDX with a unified processing pipeline.

- **Syntax highlighting** — Dual-theme Shiki (`min-light` / `min-dark`) via rehype-pretty-code, switches automatically with the site theme
- **Carbon-style terminal windows** — Shell code blocks (`bash`, `sh`, `zsh`, `shell`) render inside a macOS-style window frame with traffic light dots and a title bar separator, all CSS-only
- **GitHub Flavored Markdown** — Tables, strikethrough, task lists via remark-gfm
- **Responsive tables** — Custom rehype plugin wraps tables in a horizontal scroll container on small screens
- **Line numbers** — Opt-in via `showLineNumbers` meta string on fenced code blocks
- **Tag filtering** — Posts are tagged and browsable at `/blog/tag/[tag]`
- **Year grouping** — Archive page groups posts by year, newest first
- **Draft support** — `unpublished: true` in frontmatter hides a post from listings

### Writing Prompts

A 365-day writing prompt project tracked at `/writing`.

- Per-prompt pages with previous/next navigation
- Completion counter and progress tracking
- Same markdown rendering pipeline as the blog

### Theming

- Light and dark palettes defined as CSS custom properties
- Class-based switching via `next-themes` (light / dark / system)
- Three-state toggle cycles through light, dark, and system
- All colors resolve at runtime — one set of Tailwind utilities, two palettes

### Homepage

- Profile, bio, and social links (GitHub, LinkedIn, X, Mastodon, Bluesky, email)
- Work timeline with company logos and date ranges
- Latest blog posts section
- Staggered fade-in animations via Framer Motion

### SEO

- Next.js Metadata API with `title.template` for consistent page titles
- Open Graph and Twitter Card tags on every page
- Per-post metadata generated from frontmatter
- Canonical URL handling via `metadataBase`

## Tech Stack

| Layer         | Tool                                          |
| ------------- | --------------------------------------------- |
| Framework     | Next.js 16 (App Router)                       |
| UI            | React 19, TypeScript                          |
| Styling       | Tailwind CSS 4, `@tailwindcss/typography`     |
| Content       | MDX, gray-matter, unified (remark + rehype)   |
| Highlighting  | Shiki via rehype-pretty-code                  |
| Animations    | Framer Motion                                 |
| Theming       | next-themes                                   |
| Icons         | lucide-react + custom SVGs                    |
| Font          | Inter (self-hosted via `next/font/google`)    |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
content/
  blog/          # MDX blog posts (frontmatter + markdown)
  writing/       # Daily writing prompts (markdown)
public/
  companyIcons/  # Work timeline logos
src/
  app/           # Next.js App Router pages and layouts
  components/    # React components (Nav, ThemeToggle, etc.)
  data/          # Resume data (single source of truth)
```

## Content Authoring

### Blog posts

Add a file to `content/blog/` named `YYYY-MM-DD-slug.mdx`:

```mdx
---
title: "Post Title"
publishedAt: "2026-01-15"
summary: "A short description."
tags: ["tag-a", "tag-b"]
---

Your content here.
```

### Writing prompts

Add a file to `content/writing/` named `NNN-prompt-slug.md`:

```md
---
title: "What does joy look like to you?"
publishedAt: "2026-01-15"
---

Your response here.
```

## Build

```bash
npm run build
npm start
```
