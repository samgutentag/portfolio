import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dev Tools",
  description: "Interactive tools and visualizations.",
};

const projects = [
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
  },
  {
    slug: "charging-setup",
    title: "Travel Charging Setup",
    description: "Interactive diagram of a minimal travel charging kit.",
    emoji: "🔌",
    color: "#0071e3",
  },
];

export default function DevIndexPage() {
  return (
    <div className="pt-4">
      <h1 className="mb-1 text-xl font-bold tracking-tight">Dev Tools</h1>
      <p className="mb-8 text-xs text-neutral-400">
        Interactive tools and visualizations
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/dev/${project.slug}`}
            className="group flex flex-col no-underline"
          >
            {/* Icon area */}
            <div
              className="flex aspect-[4/3] items-center justify-center rounded-2xl transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-lg"
              style={{ background: `${project.color}12` }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-3xl shadow-sm transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${project.color}20` }}
              >
                {project.emoji}
              </div>
            </div>

            {/* Text */}
            <div className="mt-4 flex flex-col gap-1">
              <h2 className="text-[14px] font-semibold tracking-tight text-balance">
                {project.title}
              </h2>
              <p className="text-[12px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                {project.description}
              </p>
              <span
                className="mt-1 inline-flex items-center gap-1 text-[12px] font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ color: project.color }}
              >
                Open tool
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
