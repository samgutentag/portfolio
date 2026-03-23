import { GitHubIcon } from '@/components/icons'

type GitHubCardProps = {
  repo: string
  description?: string
  branch?: string
  stars?: number
  language?: string
  topics?: string[]
}

export function GitHubCard({
  repo,
  description,
  stars,
  language,
  topics,
}: GitHubCardProps) {
  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose group my-4 flex items-start gap-3 rounded-lg border border-border p-4 no-underline hover:border-accent/50 transition-colors block"
    >
      <GitHubIcon className="mt-0.5 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
          {repo}
        </span>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
        {(language || stars !== undefined || topics?.length) && (
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {language && (
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                {language}
              </span>
            )}
            {stars !== undefined && <span>★ {stars}</span>}
            {topics?.map((t) => (
              <span key={t} className="rounded bg-muted px-1.5 py-0.5">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
