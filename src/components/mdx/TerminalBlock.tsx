import { CopyButton } from './CopyButton'

type TerminalBlockProps = {
  language?: string
  title?: string
  showPrompt?: boolean | string
  children: React.ReactNode
}

function parseBool(val: boolean | string | undefined, fallback: boolean): boolean {
  if (val === undefined || val === null) return fallback
  if (typeof val === 'boolean') return val
  return val !== 'false'
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (!node) return ''
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>
    return extractText(el.props.children)
  }
  return ''
}

export function TerminalBlock({
  language = 'bash',
  title,
  showPrompt,
  children,
}: TerminalBlockProps) {
  const isShell = ['bash', 'sh', 'zsh', 'shell'].includes(language)
  const shouldShowPrompt = parseBool(showPrompt, isShell)

  const raw = extractText(children).trim()
  const lines = raw.split('\n')

  return (
    <div className="not-prose my-4 rounded-lg overflow-hidden border border-[#2a2a3e] bg-[#1a1a2e]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#2a2a3e]">
        <span className="text-xs text-[#8888a8] font-mono">
          {title || language}
        </span>
        <CopyButton text={raw} />
      </div>
      {/* Code area — uses div instead of pre/code to avoid global pre styles */}
      <div className="border-l-2 border-emerald-500/60">
        <div className="p-4 overflow-x-auto whitespace-pre font-mono text-sm text-[#e2e2f0] leading-relaxed">
          {lines.map((line, i) => (
            <div key={i}>
              {shouldShowPrompt && line.trim() !== '' && (
                <span className="text-[#5a5a7a] select-none">$ </span>
              )}
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
