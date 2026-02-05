/**
 * Blog data layer — reads .mdx files from disk, parses frontmatter,
 * and converts markdown → HTML via a unified pipeline.
 *
 * All functions are async and run on the server (Node.js `fs`).
 * Next.js calls them at build time for static pages or at request time for dynamic ones.
 *
 * Pipeline:
 *   .mdx file  →  gray-matter (split frontmatter + content)
 *              →  unified / remark-parse (markdown AST)
 *              →  remark-rehype (markdown AST → HTML AST)
 *              →  rehype-pretty-code (syntax-highlighted code blocks via shiki)
 *              →  rehype-stringify (HTML AST → HTML string)
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

export type BlogPostMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  tags?: string[];
  image?: string;
  unpublished?: boolean;
};

export type BlogPost = {
  slug: string;
  metadata: BlogPostMetadata;
  source: string; // rendered HTML
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Converts a raw markdown string into an HTML string.
 * rehype-pretty-code handles <pre>/<code> blocks with shiki themes;
 * keepBackground: false lets us style the background via CSS instead of inline styles.
 */
export async function markdownToHTML(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}

/**
 * Reads a single post by slug. Throws if the file doesn't exist.
 */
export async function getPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);
  const html = await markdownToHTML(content);

  return {
    slug,
    metadata: data as BlogPostMetadata,
    source: html,
  };
}

/**
 * Returns all published posts, sorted newest-first.
 * Posts with `unpublished: true` in their frontmatter are excluded.
 * Files without a `.mdx` extension (e.g. `.mdx.WIP`, templates) are also skipped.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => path.extname(file) === ".mdx");

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = path.basename(file, ".mdx");
      return getPost(slug);
    })
  );

  return posts
    .filter((post) => !post.metadata.unpublished)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    );
}
