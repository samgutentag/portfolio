import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import { getMasterReactPosts } from "@/data/master-react";

export const metadata = {
  title: "Master React Series",
  description: "A series on mastering React: tutorials, tips, and deep dives.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function MasterReactIndexPage() {
  const posts = await getMasterReactPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">
          Master React Series
        </h1>
      </BlurFade>
      {posts
        .sort((a, b) => {
          if (
            // change `>` to `<` to reverse sort order
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
            <Link
              className="flex flex-col space-y-1 mb-4"
              href={`/master-react/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <p className="tracking-tight text-foreground">
                  {post.metadata.title}
                </p>
                <p className="h-6 text-s text-muted-foreground">
                  {post.metadata.summary}
                </p>
                <p className="h-6 text-xs text-muted-foreground">
                  {post.metadata.publishedAt}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
