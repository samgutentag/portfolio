import { getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as Icons from "@/components/icons";
import { Separator } from "@/components/ui/separator";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </Suspense>
      </div>
      <article
        className="prose dark:prose-invert mt-6"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
      {Array.isArray(post.metadata.tags) && post.metadata.tags.length > 0 && (
        <>
          <Separator className="my-8" />
          <div className="mt-8">
            <div className="flex items-center flex-wrap gap-2 mb-4">
              <h2 className="text-sm font-semibold text-muted-foreground mr-2">
                Tags:
              </h2>
              {post.metadata.tags.map((tag: string) => (
                <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
                  <Badge variant="secondary">{tag}</Badge>
                </Link>
              ))}
            </div>
            <div className="flex gap-2 items-center mt-2">
              <span className="text-sm font-semibold text-muted-foreground mr-2">
                Share:
              </span>
              {/* X share */}
              <Link
                href={`https://x.com/intent/tweet?url=${encodeURIComponent(`${DATA.url}/blog/${post.slug}`)}&text=${encodeURIComponent(`Check out this post from @samgutentag: ${post.metadata.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon" aria-label="Share on X">
                  <Icons.Icons.x className="size-4" />
                </Button>
              </Link>
              {/* Mastodon share */}
              <Link
                href={`https://mastodon.social/share?text=${encodeURIComponent(`Check out this post from @samgutentag: ${post.metadata.title} ${DATA.url}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Share on Mastodon"
                >
                  <Icons.Icons.mastodon className="size-4" />
                </Button>
              </Link>
              {/* Bluesky share */}
              <Link
                href={`https://bsky.app/intent/compose?text=${encodeURIComponent(`Check out this post from @samgutentag.bsky.social: ${post.metadata.title} ${DATA.url}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Share on Bluesky"
                >
                  <Icons.Icons.bluesky className="size-4" />
                </Button>
              </Link>
              {/* Email share */}
              <Link
                href={`mailto:?subject=${encodeURIComponent(post.metadata.title)}&body=${encodeURIComponent(`Check out this post from @samgutentag: ${post.metadata.title} - ${DATA.url}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Share by Email"
                >
                  <Icons.Icons.email className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
