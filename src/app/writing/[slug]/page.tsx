/**
 * Individual writing post.
 *
 * Prompt becomes the heading. Written response renders below it via the
 * same unified pipeline as blog posts.
 *
 * Prev/next nav steps through published posts in prompt-number order —
 * not date order — so the reader can move sequentially through the series.
 *
 * generateStaticParams only yields published slugs, so unpublished prompts
 * never get a static page.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { getWritingPost, getWritingPosts } from "@/data/writing";

export function generateStaticParams() {
  const posts = getWritingPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getWritingPost(slug);

  return {
    title: post.prompt,
    description: `Writing prompt #${post.number}`,
    openGraph: {
      title: post.prompt,
      description: `Writing prompt #${post.number}`,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getWritingPost(slug);

  // Prev/next among published posts, ordered by prompt number
  const allPosts = getWritingPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const next =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <article className="pt-4">
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/writing"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to writing
        </Link>
      </div>

      {/* Counter */}
      <p className="text-xs font-mono text-muted-foreground">
        #{post.number} / 365
      </p>

      {/* Prompt as heading */}
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mt-1">
        {post.prompt}
      </h1>

      {/* Completion date */}
      <p className="mt-2 text-sm text-muted-foreground">
        {new Date(post.publishedAt + "T00:00:00").toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      {/* Written response — same prose styling as blog posts */}
      <div
        className="mt-10 prose prose-sm dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.source }}
      />

      {/* Prev / Next nav — only rendered if there's a neighbor to go to */}
      <nav className="mt-16 flex items-center justify-between pt-8 border-t border-border">
        {prev ? (
          <Link
            href={`/writing/${prev.slug}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← #{prev.number}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/writing/${next.slug}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            #{next.number} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
