import React from 'react'

type StepProps = {
  title: string
  number?: number
  isLast?: boolean
  children: React.ReactNode
}

export function Step({
  title,
  number = 1,
  isLast = false,
  children,
}: StepProps) {
  return (
    <div className="not-prose relative flex gap-4">
      {/* Number circle + connecting line */}
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-background text-sm font-semibold">
          {number}
        </div>
        {!isLast && <div className="w-px flex-1 bg-border mt-2" />}
      </div>
      {/* Content */}
      <div className={isLast ? 'pt-0.5' : 'pb-8 pt-0.5'}>
        <h4 className="text-base font-semibold text-foreground">{title}</h4>
        <div className="mt-2 text-sm text-foreground/80 [&>p]:m-0 [&>p:not(:first-child)]:mt-2">
          {children}
        </div>
      </div>
    </div>
  )
}

type StepListProps = {
  children: React.ReactNode
}

export function StepList({ children }: StepListProps) {
  const steps = React.Children.toArray(children)

  return (
    <div className="my-6">
      {steps.map((child, index) => {
        if (React.isValidElement<StepProps>(child)) {
          return React.cloneElement(child, {
            number: index + 1,
            isLast: index === steps.length - 1,
          } as Partial<StepProps>)
        }
        return child
      })}
    </div>
  )
}
