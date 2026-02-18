"use client";

import { useState } from "react";
import type { Metadata } from "next";

function Node({
  label,
  sub,
  icon,
  accent = "#1e293b",
  outline = false,
  small = false,
  glow = false,
}: {
  label: string;
  sub?: string;
  icon?: string;
  accent?: string;
  outline?: boolean;
  small?: boolean;
  glow?: boolean;
}) {
  return (
    <div
      style={{
        background: outline ? "transparent" : accent,
        border: outline ? `1.5px solid ${accent}` : "none",
        color: outline ? accent : "#fff",
        padding: small ? "6px 10px" : "10px 16px",
        borderRadius: 10,
        fontSize: small ? 12 : 13,
        fontWeight: 600,
        textAlign: "center",
        minWidth: small ? 80 : 100,
        boxShadow: glow
          ? `0 0 20px ${accent}33, 0 2px 8px rgba(0,0,0,0.08)`
          : "0 2px 8px rgba(0,0,0,0.06)",
        lineHeight: 1.3,
      }}
    >
      {icon && <div style={{ fontSize: 18, marginBottom: 2 }}>{icon}</div>}
      <div>{label}</div>
      {sub && (
        <div
          style={{
            fontSize: 9,
            opacity: 0.75,
            fontWeight: 400,
            marginTop: 2,
            fontFamily: "monospace",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function Connector({
  cableType,
  color = "#94a3b8",
}: {
  cableType?: string;
  color?: string;
}) {
  return (
    <div className="flex flex-col items-center" style={{ gap: 0 }}>
      <div style={{ width: 2, height: 20, background: color }} />
      {cableType && (
        <span
          className="border bg-[var(--background)]"
          style={{
            fontSize: 8,
            color,
            fontFamily: "monospace",
            padding: "1px 5px",
            borderRadius: 3,
            borderColor: `${color}44`,
            whiteSpace: "nowrap",
          }}
        >
          {cableType}
        </span>
      )}
      <div style={{ width: 2, height: 20, background: color }} />
    </div>
  );
}

function Section({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
        {badge && (
          <span className="rounded bg-neutral-900 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-200 dark:bg-neutral-200 dark:text-neutral-900">
            {badge}
          </span>
        )}
        <h3 className="m-0 text-[15px] font-bold">{title}</h3>
      </div>
      {subtitle && (
        <p className="mb-3.5 mt-0 text-[11px] leading-relaxed text-neutral-500">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}

function PackItem({
  qty,
  name,
  note,
  href,
}: {
  qty: number;
  name: string;
  note?: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-neutral-100 py-2 dark:border-neutral-800">
      <span className="min-w-[24px] text-right font-mono text-[13px] font-bold">
        {qty}&times;
      </span>
      <div>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-500 dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
          >
            {name}
          </a>
        ) : (
          <span className="text-[13px] font-semibold">{name}</span>
        )}
        {note && (
          <span className="ml-1.5 text-[11px] text-neutral-400">{note}</span>
        )}
      </div>
    </div>
  );
}

const tabs = [
  { id: "overnight", label: "Overnight", icon: "🌙" },
  { id: "morning", label: "Morning Swap", icon: "☀️" },
  { id: "travel", label: "On the Go", icon: "✈️" },
  { id: "pack", label: "Pack List", icon: "🎒" },
] as const;

type View = (typeof tabs)[number]["id"];

export default function ChargingSetupPage() {
  const [view, setView] = useState<View>("overnight");

  return (
    <div className="pt-4">
      <h1 className="mb-1 text-xl font-bold tracking-tight">
        Travel Charging Setup
      </h1>
      <p className="mb-5 text-xs text-neutral-400">
        2 blocks &middot; 1 battery bank &middot; minimal carry
      </p>

      {/* Tab bar */}
      <div className="mb-6 flex gap-1 rounded-[10px] bg-neutral-200 p-[3px] dark:bg-neutral-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`flex-1 cursor-pointer rounded-lg border-none px-1 py-2 text-[11px] font-medium transition-all ${
              view === tab.id
                ? "bg-[var(--background)] font-bold shadow-sm"
                : "bg-transparent text-neutral-500"
            }`}
          >
            <span className="text-sm">{tab.icon}</span>
            <br />
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERNIGHT */}
      {view === "overnight" && (
        <Section
          title="Hotel Overnight"
          badge="Sleep mode"
          subtitle="Plug in everything before bed. iPad and MacBook charge via passthrough from the battery bank."
        >
          <div className="mb-3 rounded-[14px] border border-neutral-200 bg-[var(--background)] p-5 dark:border-neutral-800">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Wall Outlet 1
            </div>
            <div className="flex flex-col items-center">
              <Node label="67W Block" sub="USB-C" icon="🔌" accent="#0f172a" />
              <Connector cableType="USB-C → USB-C" />
              <Node
                label="Anker Battery Bank"
                sub="Input · Passthrough"
                icon="🔋"
                accent="#3b82f6"
                glow
              />
              <div className="h-2" />
              <div className="flex w-full items-start justify-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="mb-1 font-mono text-[8px] text-neutral-500">
                    OUTPUT 1
                  </div>
                  <Connector cableType="Built-in USB-C" color="#3b82f6" />
                  <Node label="MacBook" icon="💻" accent="#334155" small />
                </div>
                <div className="flex flex-col items-center">
                  <div className="mb-1 font-mono text-[8px] text-neutral-500">
                    OUTPUT 2
                  </div>
                  <Connector cableType="Built-in USB-C" color="#3b82f6" />
                  <Node label="iPad" icon="📱" accent="#334155" small />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[14px] border border-neutral-200 bg-[var(--background)] p-5 dark:border-neutral-800">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Wall Outlet 2
            </div>
            <div className="flex flex-col items-center">
              <Node label="45W Block" sub="USB-C" icon="🔌" accent="#0f172a" />
              <Connector cableType="USB-C → Watch Magnetic" />
              <Node label="Apple Watch" icon="⌚" accent="#334155" small />
            </div>
          </div>

          <div className="mt-3.5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-[11px] leading-relaxed text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
            AirPods Max + AirPods Pro charge opportunistically &mdash; swap onto
            bank Output 2 after iPad finishes, or charge during the day.
          </div>
        </Section>
      )}

      {/* MORNING SWAP */}
      {view === "morning" && (
        <Section
          title="Morning Swap"
          badge="Wake up"
          subtitle="iPad is done charging. Unplug it, plug in your iPhone to top off while you get ready."
        >
          <div className="mb-3 rounded-[14px] border border-neutral-200 bg-[var(--background)] p-5 dark:border-neutral-800">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Wall Outlet 1 &mdash; same setup
            </div>
            <div className="flex flex-col items-center">
              <Node label="67W Block" sub="USB-C" icon="🔌" accent="#0f172a" />
              <Connector cableType="USB-C → USB-C" />
              <Node
                label="Anker Battery Bank"
                sub="Passthrough"
                icon="🔋"
                accent="#3b82f6"
                glow
              />
              <div className="h-2" />
              <div className="flex w-full items-start justify-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="mb-1 font-mono text-[8px] text-neutral-500">
                    OUTPUT 1
                  </div>
                  <Connector cableType="Built-in USB-C" color="#3b82f6" />
                  <Node label="MacBook" icon="💻" accent="#334155" small />
                </div>
                <div className="flex flex-col items-center">
                  <div className="mb-1 font-mono text-[8px] text-amber-500">
                    OUTPUT 2 &mdash; SWAP
                  </div>
                  <Connector cableType="Built-in USB-C" color="#f59e0b" />
                  <Node label="iPhone" icon="📱" accent="#f59e0b" small glow />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 rounded-[14px] border border-neutral-200 bg-[var(--background)] p-5 dark:border-neutral-800">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Also swap in
            </div>
            <div className="flex w-full items-start justify-center gap-6">
              <div className="flex flex-col items-center text-center">
                <Node label="AirPods Max" icon="🎧" accent="#64748b" outline small />
                <div className="mt-1.5 font-mono text-[9px] text-neutral-400">
                  USB-C &rarr; Lightning cable
                  <br />
                  off 45W block
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <Node label="AirPods Pro" icon="🎵" accent="#64748b" outline small />
                <div className="mt-1.5 font-mono text-[9px] text-neutral-400">
                  Bank built-in cable
                  <br />
                  swap onto output
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-[11px] leading-relaxed text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
            By checkout, everything is topped off. Unplug all, toss in bag.
          </div>
        </Section>
      )}

      {/* TRAVEL / ON THE GO */}
      {view === "travel" && (
        <Section
          title="On the Go / Flights"
          badge="Travel"
          subtitle="Leave both wall blocks at the hotel. Just carry the battery bank and cables."
        >
          <div className="mb-3 rounded-[14px] border border-neutral-200 bg-[var(--background)] p-5 dark:border-neutral-800">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Battery bank only
            </div>
            <div className="flex flex-col items-center">
              <Node
                label="Anker Battery Bank"
                sub="Fully charged"
                icon="🔋"
                accent="#3b82f6"
                glow
              />
              <div className="h-2" />
              <div className="flex w-full items-start justify-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="mb-1 font-mono text-[8px] text-neutral-500">
                    OUTPUT 1
                  </div>
                  <Connector cableType="Built-in USB-C" color="#3b82f6" />
                  <Node label="iPhone" icon="📱" accent="#334155" small />
                </div>
                <div className="flex flex-col items-center">
                  <div className="mb-1 font-mono text-[8px] text-neutral-500">
                    OUTPUT 2
                  </div>
                  <Connector cableType="Built-in USB-C" color="#3b82f6" />
                  <Node label="iPad" sub="flights" icon="📱" accent="#334155" small />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[14px] border border-neutral-200 bg-[var(--background)] p-5 dark:border-neutral-800">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              If seat has power outlet
            </div>
            <div className="flex flex-col items-center">
              <Node label="67W Block" sub="from bag" icon="🔌" accent="#0f172a" />
              <Connector cableType="USB-C → USB-C" />
              <Node label="MacBook" icon="💻" accent="#334155" small />
            </div>
            <div className="mt-3 text-center font-mono text-[10px] text-neutral-400">
              Keep bank for phone + iPad
            </div>
          </div>
        </Section>
      )}

      {/* PACKING LIST */}
      {view === "pack" && (
        <Section
          title="Packing Checklist"
          badge="Pack"
          subtitle="Everything you need to bring. Total: 3 power sources + 3 cables."
        >
          <div className="mb-4 rounded-[14px] border border-neutral-200 bg-[var(--background)] p-5 dark:border-neutral-800">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Power Sources
            </div>
            <PackItem qty={1} name="67W USB-C Wall Block" note="— primary" href="https://www.amazon.com/dp/B0C33KSJNF" />
            <PackItem qty={1} name="45W USB-C Wall Block" note="— Apple Watch" href="https://www.amazon.com/dp/B0BQLHGLG4" />
            <PackItem qty={1} name="Anker Battery Bank" note="— hub + travel power" href="https://www.amazon.com/dp/B0DCBB2YTR" />
          </div>

          <div className="mb-4 rounded-[14px] border border-neutral-200 bg-[var(--background)] p-5 dark:border-neutral-800">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Cables
            </div>
            <PackItem
              qty={1}
              name="USB-C to USB-C"
              note="— block → bank input / block → MacBook (flights)"
              href="https://www.amazon.com/dp/B0DK5G316X"
            />
            <PackItem qty={1} name="USB-C to Lightning" note="— AirPods Max" href="https://www.amazon.com/dp/B08GFLBXSZ" />
            <PackItem qty={1} name="Apple Watch Magnetic Cable" note="— USB-C end" href="https://www.amazon.com/dp/B0CHX5CS34" />
          </div>

          <div className="rounded-[14px] border border-neutral-200 bg-[var(--background)] p-5 dark:border-neutral-800">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Summary
            </div>
            <div className="flex justify-between gap-3">
              {[
                { n: "3", label: "Power\nSources" },
                { n: "3", label: "Cables" },
                { n: "6", label: "Total\nItems" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-[10px] bg-neutral-100 py-3 text-center dark:bg-neutral-800"
                >
                  <div className="font-mono text-[28px] font-bold leading-none">
                    {s.n}
                  </div>
                  <div className="mt-1 whitespace-pre-line text-[9px] leading-tight text-neutral-400">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3.5 rounded-lg border border-blue-200 bg-blue-50 p-3 text-[11px] leading-relaxed text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
            The bank&apos;s built-in USB-C output cables handle MacBook, iPad,
            iPhone, and AirPods Pro &mdash; no extra cables needed for those
            devices.
          </div>
        </Section>
      )}
    </div>
  );
}
