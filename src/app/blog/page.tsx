/**
 * Blog listing — groups posts by year for an editorial archive feel.
 *
 * Server Component: posts are fetched at build time, so this page
 * is fully static with zero client-side JavaScript (aside from the nav).
 */

import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about dev, tech, and building things.",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  /**
   * Group posts into { "2025": [...], "2024": [...], ... }.
   * Posts are already sorted newest-first from getBlogPosts(),
   * so each year bucket is also in reverse-chronological order.
   */
  const postsByYear = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = new Date(post.metadata.publishedAt).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="pt-4">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Blog
      </h1>
      <p className="mt-2 text-base text-muted-foreground">
        Writing about dev, tech, and building things.
      </p>

      <div className="mt-12 space-y-10">
        {years.map((year) => (
          <div key={year}>
            {/* Year label — same style as the section dividers on the homepage */}
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
              {year}
            </h2>

            <div className="space-y-0">
              {postsByYear[year].map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-3 border-b border-border last:border-0"
                >
                  <span className="text-base text-foreground group-hover:text-accent transition-colors">
                    {post.metadata.title}
                  </span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(post.metadata.publishedAt)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
