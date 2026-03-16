import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Dev Tools",
  description: "Interactive tools and visualizations.",
};

interface Project {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  image?: string;
  blogSlug?: string;
}

const projects: Project[] = [
  {
    slug: "display-specs",
    title: "Display Specs",
    description:
      "Apple Mac external display support resolution vs. refresh rate.",
    emoji: "🖥️",
    color: "#7c3aed",
  },
  {
    slug: "logo-review",
    title: "Logo Review",
    description:
      "Contrast checker for logo color variants against common background colors.",
    emoji: "🎨",
    color: "#f59e0b",
    blogSlug: "2026-02-20-taming-logo-svgs-at-scale",
  },
  {
    slug: "charging-setup",
    title: "Travel Charging Setup",
    description: "Interactive diagram of a minimal travel charging kit.",
    emoji: "🔌",
    color: "#0071e3",
    blogSlug: "2026-02-17-the-latest-travel-charger-audit",
  },
];

export default async function DevIndexPage() {
  const posts = await getBlogPosts();
  const publishedSlugs = new Set(posts.map((p) => p.slug));

  return (
    <div className="pt-4">
      <h1 className="mb-1 text-xl font-bold tracking-tight">Dev Tools</h1>
      <p className="mb-8 text-xs text-neutral-400">
        Interactive tools and visualizations, some from projects, some one offs,
        just exploring
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <div key={project.slug} className="flex flex-col">
            {/* Preview area */}
            <Link href={`/dev/${project.slug}`} className="group no-underline">
              <div
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-lg"
                style={{ background: `${project.color}12` }}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full text-3xl shadow-sm transition-transform duration-200 group-hover:scale-110"
                    style={{ background: `${project.color}20` }}
                  >
                    {project.emoji}
                  </div>
                )}
              </div>
            </Link>

            {/* Text */}
            <div className="mt-4 flex flex-col gap-1">
              <h2 className="text-[14px] font-semibold tracking-tight text-balance">
                {project.title}
              </h2>
              <p className="text-[12px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                {project.description}
              </p>
              <div className="mt-1 flex flex-col gap-1 text-[12px]">
                <Link
                  href={`/dev/${project.slug}`}
                  className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Open tool
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                {project.blogSlug && publishedSlugs.has(project.blogSlug) && (
                  <Link
                    href={`/blog/${project.blogSlug}`}
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Read the blog post
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
