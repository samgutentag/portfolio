type PartsListItem = {
  name: string
  qty?: number | string
  link?: string
  note?: string
}

type PartsListProps = {
  items: PartsListItem[]
  title?: string
}

export function PartsList({ items = [], title = 'Parts' }: PartsListProps) {
  if (!items || items.length === 0) return null

  return (
    <div className="not-prose my-6">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        {title}
      </h4>
      <div className="rounded-lg border border-border overflow-hidden">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex flex-wrap items-baseline gap-3 px-4 py-2.5 text-sm ${
              i % 2 === 0 ? 'bg-muted/50' : ''
            }`}
          >
            {item.qty !== undefined && (
              <span className="w-8 shrink-0 text-right text-muted-foreground font-mono text-xs">
                {typeof item.qty === 'number' ? `${item.qty}×` : item.qty}
              </span>
            )}
            <span className="text-foreground">
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-border hover:decoration-accent transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </span>
            {item.note && (
              <span className="text-muted-foreground italic text-xs">
                {item.note}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
