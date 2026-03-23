type TILProps = {
  children: React.ReactNode
}

export function TIL({ children }: TILProps) {
  return (
    <div className="not-prose my-6 flex items-start gap-3 rounded-lg bg-accent/10 border border-accent/20 px-4 py-3">
      <span className="shrink-0 rounded bg-accent px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-background">
        TIL
      </span>
      <div className="text-sm text-foreground [&>p]:m-0">
        {children}
      </div>
    </div>
  )
}
