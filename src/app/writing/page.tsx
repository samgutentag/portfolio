/**
 * Writing listing page.
 *
 * Only posts with a publishedAt date show up here — the user fills that in
 * when a prompt is completed. Each row: number, prompt text, date written.
 *
 * Server Component. getWritingPosts() is synchronous (metadata-only),
 * so no `await` is needed.
 */

import Link from "next/link";
import type { Metadata } from "next";
import { getWritingPosts } from "@/data/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "365 daily writing prompts.",
};

function formatDate(dateString: string): string {
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function WritingPage() {
  const posts = getWritingPosts();

  return (
    <div className="pt-4">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Writing
      </h1>
      <p className="mt-2 text-base text-muted-foreground">
        365 daily prompts.
        {posts.length > 0 && (
          <span className="ml-1">{posts.length} completed.</span>
        )}
      </p>

      <p className="mt-2 text-base text-muted-foreground">
        I'll be honest, I dont recall where I got this idea from originally, but
        the goal here is to write for 20 minutes each day. I'm working on
        finding my voice, rather than chucking every random bit and bob of
        thought into an LLM and calling it a day, I want to commit to actaully
        creating something that I can learn from and maybe even be proud of down
        the line.
      </p>

      <p className="mt-2 text-base text-muted-foreground">
        On the topic of LLMs, Its 2026, and I'm not going to pretend I dont find
        them extremely useful. So to get started with this project, I asked
        Claude to generate a year’s worth of prompts structured by weekly themes
        (like identity, curiosity, failure, joy, etc.), and then tweaked them to
        make sure they were varied, personal, and flexible enough for however
        I’m feeling that day.
      </p>

      <p className="mt-2 text-base text-muted-foreground">
        You'll also note the first post is on February 4th... so I guess this
        year worth of prompts is actually 365 days of prompts. I hope you enjoy
        reading as much as I hope to enjoy this project.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">
          No prompts completed yet.
        </p>
      ) : (
        <div className="mt-12 space-y-0">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group flex items-baseline justify-between gap-4 py-3 border-b border-border last:border-0"
            >
              {/* Number + prompt text, left side */}
              <div className="flex items-baseline gap-3 min-w-0">
                <span className="text-xs font-mono text-muted-foreground flex-shrink-0 w-7 text-right">
                  {post.number}
                </span>
                <span className="text-base text-foreground group-hover:text-accent transition-colors truncate">
                  {post.prompt}
                </span>
              </div>

              {/* Completion date, right side */}
              <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                {formatDate(post.publishedAt)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
