type CalloutVariant = 'note' | 'warning' | 'tip' | 'gotcha' | 'future-me'

type CalloutProps = {
  variant: CalloutVariant
  title?: string
  children: React.ReactNode
}

const variantConfig: Record<
  CalloutVariant,
  { label: string; icon: string; classes: string }
> = {
  note: {
    label: 'Note',
    icon: '📝',
    classes: 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/30',
  },
  warning: {
    label: 'Warning',
    icon: '⚠️',
    classes: 'border-l-amber-500 bg-amber-50 dark:bg-amber-950/30',
  },
  tip: {
    label: 'Tip',
    icon: '💡',
    classes: 'border-l-green-500 bg-green-50 dark:bg-green-950/30',
  },
  gotcha: {
    label: 'Gotcha',
    icon: '🪤',
    classes: 'border-l-red-500 bg-red-50 dark:bg-red-950/30',
  },
  'future-me': {
    label: 'Hey future me,',
    icon: '👋',
    classes: 'border-l-purple-500 bg-purple-50 dark:bg-purple-950/30',
  },
}

export function Callout({ variant, title, children }: CalloutProps) {
  const config = variantConfig[variant]

  return (
    <div
      className={`not-prose my-4 rounded-r-lg border-l-4 px-4 py-3 ${config.classes}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span>{config.icon}</span>
        <span className="text-sm font-semibold text-foreground">
          {title || config.label}
        </span>
      </div>
      <div className="text-[0.8125rem] leading-relaxed text-foreground/90 [&>p]:m-0 [&>p:not(:first-child)]:mt-2">
        {children}
      </div>
    </div>
  )
}
