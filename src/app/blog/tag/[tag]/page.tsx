/**
 * Tag filtered blog listing.
 * Shows all posts that have a matching tag in their frontmatter.
 */

import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPosts } from "@/data/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `Posts tagged with #${tag}`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const allPosts = await getBlogPosts();
  const posts = allPosts.filter((post) => post.metadata.tags?.includes(tag));

  return (
    <div className="pt-4">
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to blog
        </Link>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        #{tag}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {posts.length} {posts.length === 1 ? "post" : "posts"}
      </p>

      <div className="mt-8 space-y-0">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-baseline justify-between gap-4 py-3 border-b border-border last:border-0"
          >
            <span className="text-base text-foreground group-hover:text-accent transition-colors">
              {post.metadata.title}
            </span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
