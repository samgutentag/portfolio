/**
 * Writing data layer — reads .md prompts from content/writing/.
 *
 * Two tiers of functions:
 *   getWritingPosts()    — synchronous, metadata-only. Parses frontmatter only.
 *                           No unified pipeline. Used by listing pages and
 *                           generateStaticParams where we need the full list
 *                           without paying the cost of rendering every file.
 *   getWritingPost(slug) — async, full pipeline. Renders markdown → HTML via
 *                           the same unified setup as blog.ts. Only called for
 *                           the one page the user actually navigated to.
 *
 * Filtering: only posts with a non-empty publishedAt are "published".
 *            The user fills in publishedAt (yyyy-mm-dd) when a prompt is done.
 * Sorting:   by the numeric prefix in the filename (001, 002, …), ascending.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHTML } from "./blog";

type WritingPostMetadata = {
  title: string;
  summary: string;
  publishedAt: string;
};

export type WritingPostSummary = {
  slug: string;
  number: number;
  prompt: string;
  publishedAt: string;
};

export type WritingPost = WritingPostSummary & {
  source: string; // rendered HTML
};

const CONTENT_DIR = path.join(process.cwd(), "content", "writing");

/** "003-foo-bar" → 3 */
function parseNumber(slug: string): number {
  const match = slug.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * All published writing posts, metadata only. Synchronous.
 * Reads every .md file but only parses frontmatter — no unified pipeline.
 */
export function getWritingPosts(): WritingPostSummary[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => path.extname(file) === ".md");

  return files
    .map((file) => {
      const slug = path.basename(file, ".md");
      const source = fs.readFileSync(
        path.join(CONTENT_DIR, file),
        "utf-8"
      );
      const { data } = matter(source);
      const metadata = data as WritingPostMetadata;

      return {
        slug,
        number: parseNumber(slug),
        prompt: metadata.title,
        publishedAt: metadata.publishedAt,
      };
    })
    .filter((post) => post.publishedAt && post.publishedAt.trim() !== "")
    .sort((a, b) => a.number - b.number);
}

/**
 * Single post, fully rendered. Only called when the user lands on a specific
 * writing post page — not at listing time.
 */
export async function getWritingPost(slug: string): Promise<WritingPost> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);
  const metadata = data as WritingPostMetadata;
  const html = await markdownToHTML(content);

  return {
    slug,
    number: parseNumber(slug),
    prompt: metadata.title,
    publishedAt: metadata.publishedAt,
    source: html,
  };
}
