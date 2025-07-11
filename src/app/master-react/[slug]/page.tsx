import { notFound } from "next/navigation";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { markdownToHTML } from "@/data/blog";

interface PageProps {
  params: { slug: string };
}

async function getMasterReactPost(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "content",
    "master-react",
    `${slug}.mdx`,
  );
  let source;
  try {
    source = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    return null;
  }
  const { content: rawContent, data: metadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  return {
    source: content,
    metadata,
    slug,
  };
}

export default async function MasterReactPostPage({ params }: PageProps) {
  const post = await getMasterReactPost(params.slug);
  if (!post) notFound();

  return (
    <section id="master-react-post">
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {post.metadata.publishedAt
            ? formatDate(post.metadata.publishedAt)
            : null}
        </p>
      </div>
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.source }}
      />
    </section>
  );
}
