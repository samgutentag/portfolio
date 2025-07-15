import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = await getBlogPosts();
  const filtered = posts.filter(
    (post: any) =>
      Array.isArray(post.metadata.tags) && post.metadata.tags.includes(tag),
  );

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        Posts tagged with &quot;{tag}&quot;
      </h1>
      {filtered.length === 0 ? (
        <p>No posts found for this tag.</p>
      ) : (
        <ul className="space-y-6">
          {filtered.map((post: any) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-lg font-semibold hover:underline"
              >
                {post.metadata.title}
              </Link>
              <div className="text-sm text-muted-foreground">
                {post.metadata.summary}
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                {formatDate(post.metadata.publishedAt)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
