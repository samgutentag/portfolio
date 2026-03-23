import type { Metadata } from 'next'
import { TerminalBlock } from '@/components/mdx/TerminalBlock'
import { Callout } from '@/components/mdx/Callout'
import { StepList, Step } from '@/components/mdx/StepList'
import { TIL } from '@/components/mdx/TIL'
import { PartsList } from '@/components/mdx/PartsList'
import { GitHubCard } from '@/components/mdx/GitHubCard'

export const metadata: Metadata = {
  title: 'Custom Blog Components',
  description: 'MDX component library for the blog — TerminalBlock, Callout, StepList, TIL, PartsList, GitHubCard.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold tracking-tight text-foreground mb-4">{title}</h2>
      {children}
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground mb-2 mt-6">{children}</p>
}

export default function BlogComponentsPage() {
  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Custom Blog Components</h1>
      <p className="mt-2 text-sm text-muted-foreground mb-10">
        MDX components available in all blog posts. Imported globally — no per-file imports needed.
      </p>

      <Section title="TerminalBlock">
        <Label>Basic bash with auto-prompt:</Label>
        <TerminalBlock>
          npm install{'\n'}cd my-project{'\n'}npm run dev
        </TerminalBlock>

        <Label>Custom title:</Label>
        <TerminalBlock language="bash" title="install dependencies">
          npm install next react react-dom{'\n'}npm install -D tailwindcss typescript
        </TerminalBlock>

        <Label>Non-shell language (no prompt):</Label>
        <TerminalBlock language="sql" showPrompt={false}>
          SELECT name, email FROM users WHERE active = true ORDER BY created_at DESC;
        </TerminalBlock>

        <Label>Shell with prompt disabled:</Label>
        <TerminalBlock language="bash" showPrompt={false}>
          # output from a command, not something you&apos;d type{'\n'}total 48{'\n'}drwxr-xr-x  12 sam  staff   384 Mar 23 10:00 .{'\n'}-rw-r--r--   1 sam  staff  1024 Mar 23 09:58 package.json
        </TerminalBlock>
      </Section>

      <Section title="Callout">
        <Callout variant="note">
          This is a standard note. Use it for supplementary information that&apos;s worth calling out but isn&apos;t critical.
        </Callout>

        <Callout variant="warning">
          This is a warning. Something could go wrong if the reader isn&apos;t careful here.
        </Callout>

        <Callout variant="tip">
          This is a tip. A helpful shortcut or best practice the reader might not know about.
        </Callout>

        <Callout variant="gotcha">
          This is a gotcha. Something that looks right but will bite you — the API returns 200 even on auth failures.
        </Callout>

        <Callout variant="future-me">
          If this breaks, the token expires every 90 days. Check the .env file first.
        </Callout>

        <Label>Custom title override:</Label>
        <Callout variant="gotcha" title="This one got me">
          The sendBeacon API silently fails cross-origin if you set the wrong content type. No console error, no network tab trace.
        </Callout>
      </Section>

      <Section title="StepList">
        <StepList>
          <Step title="Clone the repo">
            Run git clone and navigate into the directory.
          </Step>
          <Step title="Install dependencies">
            <TerminalBlock>npm install</TerminalBlock>
          </Step>
          <Step title="Configure your environment">
            Copy .env.example to .env and fill in your values. You&apos;ll need API keys for the weather service and a Cloudflare account.
          </Step>
          <Step title="Start the dev server">
            <TerminalBlock>npm run dev</TerminalBlock>
            Open http://localhost:3000 to verify everything works.
          </Step>
        </StepList>
      </Section>

      <Section title="TIL">
        <TIL>
          rsync preserves file permissions by default but scp does not.
        </TIL>

        <TIL>
          The sendBeacon API silently fails cross-origin with the wrong content type — no console error, no network tab trace. Use fetch with keepalive: true instead.
        </TIL>
      </Section>

      <Section title="PartsList">
        <PartsList items={[
          { name: 'Raspberry Pi 4 (4GB)', qty: 1, link: 'https://raspberrypi.com' },
          { name: 'MicroSD card (32GB+)', qty: 1, note: 'any brand works' },
          { name: 'USB-C power supply', qty: 1 },
          { name: 'Short ethernet cable', qty: 1, note: 'or use WiFi' },
          { name: '3D-printed case', qty: 1, link: 'https://www.thingiverse.com', note: 'optional' },
        ]} />

        <Label>Custom title:</Label>
        <PartsList title="Cables" items={[
          { name: 'USB-C to USB-C (100W)', qty: 2, note: 'for laptop + battery bank' },
          { name: 'USB-C to Lightning', qty: 1, note: 'AirPods' },
          { name: 'Apple Watch magnetic cable', qty: 1 },
        ]} />
      </Section>

      <Section title="GitHubCard">
        <GitHubCard
          repo="samgutentag/portfolio"
          description="Personal portfolio and blog built with Next.js and MDX"
          language="TypeScript"
          stars={12}
        />

        <Label>With topics:</Label>
        <GitHubCard
          repo="samgutentag/sbburgerweek"
          description="Santa Barbara Burger Week voting app — Claude-built, fork-ready"
          language="TypeScript"
          stars={4}
          topics={['next.js', 'claude', 'food']}
        />

        <Label>Minimal (just repo name):</Label>
        <GitHubCard repo="samgutentag/cloud-cover" />
      </Section>
    </div>
  )
}
