"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Data ---

interface Spec {
  res: string;
  hz: number;
}

interface Config {
  displays: number;
  specs: Spec[];
}

interface Machine {
  id: string;
  name: string;
  color: string;
  configs: Config[];
}

const machines: Machine[] = [
  {
    id: "mba-m4",
    name: "MacBook Air (M4)",
    color: "#0071e3",
    configs: [
      { displays: 1, specs: [{ res: "4K", hz: 240 }, { res: "5K", hz: 120 }, { res: "8K", hz: 60 }] },
      { displays: 2, specs: [{ res: "4K", hz: 144 }, { res: "6K", hz: 60 }] },
    ],
  },
  {
    id: "mbp-m5",
    name: 'MacBook Pro 14" (M5)',
    color: "#5856d6",
    configs: [
      { displays: 1, specs: [{ res: "4K", hz: 144 }, { res: "6K", hz: 60 }, { res: "8K", hz: 60 }] },
      { displays: 2, specs: [{ res: "4K", hz: 144 }, { res: "6K", hz: 60 }] },
    ],
  },
  {
    id: "mbp-m5-pro",
    name: "MacBook Pro (M5 Pro)",
    color: "#af52de",
    configs: [
      { displays: 3, specs: [{ res: "4K", hz: 144 }, { res: "6K", hz: 60 }] },
    ],
  },
  {
    id: "mbp-m5-max",
    name: "MacBook Pro (M5 Max)",
    color: "#7d3c98",
    configs: [
      { displays: 4, specs: [{ res: "4K", hz: 144 }, { res: "6K", hz: 60 }] },
    ],
  },
  {
    id: "mini-m4",
    name: "Mac mini (M4)",
    color: "#34c759",
    configs: [
      { displays: 2, specs: [{ res: "4K", hz: 240 }, { res: "5K", hz: 60 }, { res: "8K", hz: 60 }] },
      { displays: 3, specs: [{ res: "4K", hz: 60 }, { res: "5K", hz: 60 }, { res: "6K", hz: 60 }] },
    ],
  },
  {
    id: "mini-m4-pro",
    name: "Mac mini (M4 Pro)",
    color: "#248f3f",
    configs: [
      { displays: 2, specs: [{ res: "4K", hz: 240 }, { res: "6K", hz: 60 }, { res: "8K", hz: 60 }] },
      { displays: 3, specs: [{ res: "6K", hz: 60 }] },
    ],
  },
  {
    id: "imac-2p",
    name: "iMac (2-port)",
    color: "#ff9f0a",
    configs: [
      { displays: 1, specs: [{ res: "6K", hz: 60 }] },
    ],
  },
  {
    id: "imac-4p",
    name: "iMac (4-port)",
    color: "#e67e00",
    configs: [
      { displays: 1, specs: [{ res: "8K", hz: 60 }] },
      { displays: 2, specs: [{ res: "6K", hz: 60 }] },
    ],
  },
  {
    id: "studio-m4-max",
    name: "Mac Studio (M4 Max)",
    color: "#ff375f",
    configs: [
      { displays: 2, specs: [{ res: "4K", hz: 240 }, { res: "6K", hz: 60 }, { res: "8K", hz: 60 }] },
      { displays: 5, specs: [{ res: "4K", hz: 144 }, { res: "6K", hz: 60 }] },
    ],
  },
  {
    id: "studio-m3-ultra",
    name: "Mac Studio (M3 Ultra)",
    color: "#d63031",
    configs: [
      { displays: 4, specs: [{ res: "4K", hz: 240 }, { res: "8K", hz: 60 }] },
      { displays: 8, specs: [{ res: "4K", hz: 144 }, { res: "6K", hz: 60 }] },
    ],
  },
  {
    id: "mac-pro",
    name: "Mac Pro (M2 Ultra)",
    color: "#30b0c7",
    configs: [
      { displays: 3, specs: [{ res: "4K", hz: 240 }, { res: "8K", hz: 60 }] },
      { displays: 6, specs: [{ res: "6K", hz: 60 }] },
    ],
  },
];

type Mode = "best" | "max";

const ALL_RESOLUTIONS = ["4K", "5K", "6K", "8K"];

function getConfig(machine: Machine, mode: Mode): Config {
  return mode === "best"
    ? machine.configs[0]
    : machine.configs[machine.configs.length - 1];
}

function buildChartData(mode: Mode) {
  return ALL_RESOLUTIONS.map((res) => {
    const point: Record<string, string | number> = { resolution: res };
    let hasData = false;
    machines.forEach((m) => {
      const config = getConfig(m, mode);
      const spec = config.specs.find((s) => s.res === res);
      if (spec) {
        point[m.id] = spec.hz;
        hasData = true;
      }
    });
    return hasData ? point : null;
  }).filter(Boolean) as Record<string, string | number>[];
}

// --- Components ---

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ dataKey?: string; value?: number; color?: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;

  const sorted = [...payload].sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
      <div className="mb-2 text-[13px] font-semibold text-neutral-600 dark:text-neutral-300">
        {label}
      </div>
      <div className="space-y-1">
        {sorted.map((p) => {
          const machine = machines.find((m) => m.id === p.dataKey);
          return (
            <div key={p.dataKey} className="flex items-center gap-2">
              <div
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: p.color }}
              />
              <span className="flex-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                {machine?.name}
              </span>
              <span
                className="font-mono text-[12px] font-semibold"
                style={{ color: p.color }}
              >
                {p.value}Hz
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function DisplaySpecsPage() {
  const [mode, setMode] = useState<Mode>("best");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const chartData = buildChartData(mode);

  const allHz = machines.flatMap((m) =>
    getConfig(m, mode).specs.map((s) => s.hz)
  );
  const yTicks = Array.from(new Set(allHz)).sort((a, b) => a - b);
  const yMax = Math.max(...yTicks) + 20;

  // Render the hovered line last so it draws on top
  const orderedMachines = hoveredId
    ? [...machines.filter((m) => m.id !== hoveredId), ...machines.filter((m) => m.id === hoveredId)]
    : machines;

  return (
    <div className="pt-4">
      <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
        Apple Mac &middot; External Display Support
      </div>
      <h1 className="mb-1 mt-3 text-xl font-bold tracking-tight">
        Resolution vs. Refresh Rate
      </h1>
      <p className="mb-5 text-xs text-neutral-400">
        Compare every Mac&apos;s external display capabilities
      </p>

      {/* Toggle */}
      <div className="mb-6 flex gap-1 rounded-[10px] bg-neutral-200 p-[3px] dark:bg-neutral-800">
        {([
          { id: "best" as const, label: "Best Per Display" },
          { id: "max" as const, label: "Most Displays" },
        ]).map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex-1 cursor-pointer rounded-lg border-none px-4 py-2 text-[13px] font-medium transition-all ${
              mode === m.id
                ? "bg-[var(--background)] font-bold shadow-sm"
                : "bg-transparent text-neutral-500"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Mode description */}
      <div className="mb-4 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-[11px] leading-relaxed text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-400">
        {mode === "best" ? (
          <>
            Showing the <span className="font-semibold text-neutral-700 dark:text-neutral-300">highest refresh rate per resolution</span> when
            driving the fewest displays — best single-display quality.
          </>
        ) : (
          <>
            Showing capabilities when driving the <span className="font-semibold text-neutral-700 dark:text-neutral-300">maximum number of displays</span> each
            Mac supports simultaneously.
          </>
        )}
      </div>

      {/* Chart Card */}
      <div className="rounded-2xl border border-neutral-200 bg-[var(--background)] p-6 shadow-sm dark:border-neutral-800">
        <div className="mb-2 pl-12 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          Max Refresh Rate (Hz)
        </div>

        <ResponsiveContainer width="100%" height={340}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, bottom: 20, left: 10 }}
          >
            <CartesianGrid
              stroke="var(--color-neutral-200)"
              strokeOpacity={0.4}
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              dataKey="resolution"
              tick={{
                fontSize: 13,
                fill: "var(--color-neutral-400)",
                fontWeight: 600,
              }}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Resolution",
                position: "insideBottom",
                offset: -10,
                fontSize: 11,
                fill: "var(--color-neutral-400)",
                fontWeight: 500,
              }}
            />
            <YAxis
              domain={[0, yMax]}
              ticks={yTicks}
              tickFormatter={(v: number) => `${v}Hz`}
              tick={{ fontSize: 11, fill: "var(--color-neutral-400)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Dashed background lines — connect across gaps */}
            {orderedMachines.map((m) => {
              const isHighlighted = hoveredId === m.id;
              const isDimmed = hoveredId !== null && !isHighlighted;
              return (
                <Line
                  key={`${m.id}-dash`}
                  type="monotone"
                  dataKey={m.id}
                  stroke={isDimmed ? "#d4d4d8" : m.color}
                  strokeWidth={isHighlighted ? 2.5 : isDimmed ? 1 : 1.5}
                  strokeOpacity={isDimmed ? 0.2 : 0.4}
                  strokeDasharray="6 4"
                  dot={false}
                  activeDot={false}
                  connectNulls
                  legendType="none"
                  style={{
                    transition: "all 0.2s ease",
                  }}
                />
              );
            })}
            {/* Solid foreground lines — real data points */}
            {orderedMachines.map((m) => {
              const isHighlighted = hoveredId === m.id;
              const isDimmed = hoveredId !== null && !isHighlighted;
              return (
                <Line
                  key={m.id}
                  type="monotone"
                  dataKey={m.id}
                  stroke={isDimmed ? "#d4d4d8" : m.color}
                  strokeWidth={isHighlighted ? 4.5 : isDimmed ? 1.5 : 3}
                  strokeOpacity={isDimmed ? 0.4 : 1}
                  dot={{
                    r: isHighlighted ? 7 : isDimmed ? 3 : 5,
                    fill: isDimmed ? "#d4d4d8" : m.color,
                    strokeWidth: isHighlighted ? 3 : 2,
                    stroke: "#fff",
                    fillOpacity: isDimmed ? 0.4 : 1,
                  }}
                  activeDot={{
                    r: 8,
                    fill: m.color,
                    strokeWidth: 2.5,
                    stroke: "#fff",
                  }}
                  connectNulls={false}
                  style={{
                    filter: isHighlighted
                      ? `drop-shadow(0 0 6px ${m.color}66)`
                      : "none",
                    transition: "all 0.2s ease",
                  }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-0.5 border-t border-neutral-100 pt-4 dark:border-neutral-800">
          {machines.map((m) => {
            const config = getConfig(m, mode);
            const isHighlighted = hoveredId === m.id;
            const isDimmed = hoveredId !== null && !isHighlighted;
            return (
              <div
                key={m.id}
                className="flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 transition-all"
                style={{
                  opacity: isDimmed ? 0.35 : 1,
                  background: isHighlighted ? `${m.color}10` : "transparent",
                }}
                onMouseEnter={() => setHoveredId(m.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform"
                  style={{
                    background: isDimmed ? "#d4d4d8" : m.color,
                    transform: isHighlighted ? "scale(1.4)" : "scale(1)",
                    boxShadow: isHighlighted ? `0 0 6px ${m.color}66` : "none",
                  }}
                />
                <span
                  className="truncate text-[11px] transition-colors"
                  style={{
                    color: isHighlighted ? m.color : undefined,
                    fontWeight: isHighlighted ? 700 : 400,
                  }}
                >
                  {m.name}
                  <span
                    className="ml-1"
                    style={{
                      opacity: isDimmed ? 0.5 : 0.4,
                    }}
                  >
                    {config.displays}×
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data table */}
      <div className="mt-4 overflow-x-auto rounded-2xl border border-neutral-200 bg-[var(--background)] dark:border-neutral-800">
        <table className="w-full border-collapse text-[11px]">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-800/50">
              <th className="sticky left-0 border-b border-neutral-100 bg-neutral-50 px-3 py-2 text-left font-semibold uppercase tracking-wider text-neutral-400 dark:border-neutral-800 dark:bg-neutral-800/50">
                Mac
              </th>
              <th className="border-b border-neutral-100 px-3 py-2 text-center font-semibold uppercase tracking-wider text-neutral-400 dark:border-neutral-800">
                Displays
              </th>
              {ALL_RESOLUTIONS.map((res) => (
                <th
                  key={res}
                  className="border-b border-neutral-100 px-3 py-2 text-center font-semibold uppercase tracking-wider text-neutral-400 dark:border-neutral-800"
                >
                  {res}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {machines.map((m) => {
              const config = getConfig(m, mode);
              const isHighlighted = hoveredId === m.id;
              const isDimmed = hoveredId !== null && !isHighlighted;
              return (
                <tr
                  key={m.id}
                  className="border-b border-neutral-50 last:border-none dark:border-neutral-800/50"
                  style={{
                    opacity: isDimmed ? 0.3 : 1,
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={() => setHoveredId(m.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <td className="sticky left-0 bg-[var(--background)] px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: isDimmed ? "#d4d4d8" : m.color }}
                      />
                      <span
                        className="font-medium"
                        style={{
                          color: isHighlighted ? m.color : undefined,
                          fontWeight: isHighlighted ? 700 : 500,
                        }}
                      >
                        {m.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center font-mono font-semibold">
                    {config.displays}×
                  </td>
                  {ALL_RESOLUTIONS.map((res) => {
                    const spec = config.specs.find((s) => s.res === res);
                    return (
                      <td key={res} className="px-3 py-2 text-center font-mono">
                        {spec ? (
                          <span
                            className="font-semibold"
                            style={{ color: isDimmed ? "#d4d4d8" : m.color }}
                          >
                            {spec.hz}Hz
                          </span>
                        ) : (
                          <span className="text-neutral-300 dark:text-neutral-600">
                            &mdash;
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-center text-[11px] text-neutral-300 dark:text-neutral-600">
        Source: Apple tech specs &middot; Updated March 2026
      </p>
    </div>
  );
}
