"use client";

import { useState, useMemo } from "react";

// --- WCAG contrast utilities ---

function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// --- Data ---

type Variant = "dark" | "gray-dark" | "gray-light" | "light";

const VARIANTS: { key: Variant; label: string; hex: string; rgb: [number, number, number] }[] = [
  { key: "dark", label: "Dark (#000)", hex: "#000000", rgb: [0, 0, 0] },
  { key: "gray-dark", label: "Gray Dark (#6B6B6B)", hex: "#6B6B6B", rgb: [0x6b, 0x6b, 0x6b] },
  { key: "gray-light", label: "Gray Light (#A7A7A7)", hex: "#A7A7A7", rgb: [0xa7, 0xa7, 0xa7] },
  { key: "light", label: "Light (#FFF)", hex: "#FFFFFF", rgb: [255, 255, 255] },
];

const COMPANIES = [
  "Brex", "Caseware", "Cockroach Labs", "Descript", "Faire", "Glydways",
  "Google", "Growthspace", "Gusto", "Handshake", "Kodiak", "Metabase",
  "Motional", "Vidyard", "Waabi", "Zillow",
];

type Mode = "ada" | "light" | "dark";

const ADA_BG: Record<Variant, [number, number, number]> = {
  dark: [255, 255, 255],
  "gray-dark": [255, 255, 255],
  "gray-light": [0x22, 0x22, 0x22],
  light: [0x1a, 0x1a, 0x1a],
};

function getBg(mode: Mode, variant: Variant): string {
  if (mode === "light") return "#ffffff";
  if (mode === "dark") return "#1a1a1a";
  // ada
  const rgb = ADA_BG[variant];
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
}

function getBgRgb(mode: Mode, variant: Variant): [number, number, number] {
  if (mode === "light") return [255, 255, 255];
  if (mode === "dark") return [0x1a, 0x1a, 0x1a];
  return ADA_BG[variant];
}

// Inline SVG placeholder logo
function LogoPlaceholder({ company, fill }: { company: string; fill: string }) {
  const short = company.length > 8 ? company.slice(0, 8) + "..." : company;
  return (
    <svg viewBox="0 0 120 28" style={{ height: 28, width: "auto" }}>
      <text
        x="60"
        y="20"
        textAnchor="middle"
        fontFamily="-apple-system, sans-serif"
        fontWeight="700"
        fontSize="14"
        fill={fill}
      >
        {short}
      </text>
    </svg>
  );
}

function Badge({ label, pass }: { label: string; pass: boolean }) {
  return (
    <span
      style={{
        padding: "1px 3px",
        borderRadius: 2,
        fontSize: 8,
        fontWeight: 700,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        background: pass ? "#22863a" : "#cb2431",
        color: "#fff",
      }}
    >
      {label}
    </span>
  );
}

function Cell({
  company,
  variant,
  mode,
}: {
  company: string;
  variant: (typeof VARIANTS)[number];
  mode: Mode;
}) {
  const bg = getBg(mode, variant.key);
  const bgRgb = getBgRgb(mode, variant.key);
  const bgLum = luminance(...bgRgb);
  const fgLum = luminance(...variant.rgb);
  const ratio = contrastRatio(bgLum, fgLum);

  const showBadges = mode === "ada";

  return (
    <td
      style={{
        padding: 12,
        verticalAlign: "middle",
        textAlign: "center",
        background: bg,
        transition: "background 0.2s",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          minHeight: 48,
          justifyContent: "center",
          position: "relative",
        }}
      >
        {showBadges && (
          <div
            style={{
              display: "flex",
              gap: 2,
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <Badge label="AA Lg" pass={ratio >= 3} />
            <Badge label="AA" pass={ratio >= 4.5} />
            <Badge label="AAA" pass={ratio >= 7} />
          </div>
        )}
        <LogoPlaceholder company={company} fill={variant.hex} />
        {showBadges && (
          <div
            style={{
              fontSize: 8,
              color: "#888",
              fontFamily: "monospace",
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          >
            {ratio.toFixed(2)}:1
          </div>
        )}
      </div>
    </td>
  );
}

const MODES: { id: Mode; icon: string; title: string }[] = [
  { id: "ada", icon: "\uD83D\uDC41\uFE0F", title: "ADA contrast mode" },
  { id: "light", icon: "\u2600\uFE0F", title: "Light mode" },
  { id: "dark", icon: "\uD83C\uDF19", title: "Dark mode" },
];

export default function LogoReviewPage() {
  const [mode, setMode] = useState<Mode>("ada");

  const pageBg = mode === "dark" ? "#111" : mode === "ada" ? "#e8e8e8" : "#f0f0f0";
  const pageColor = mode === "dark" ? "#ccc" : "#333";
  const rowBg = mode === "dark" ? "#1a1a1a" : mode === "light" ? "#fff" : "transparent";
  const borderColor = mode === "dark" ? "#333" : mode === "ada" ? "#ccc" : "#e0e0e0";
  const thColor = mode === "dark" ? "#777" : mode === "ada" ? "#555" : "#888";

  return (
    <div
      style={{
        fontFamily: "-apple-system, sans-serif",
        padding: 24,
        background: pageBg,
        color: pageColor,
        minHeight: "100vh",
        transition: "background 0.2s, color 0.2s",
      }}
    >
      <h1 style={{ marginBottom: 16, display: "inline-block", fontSize: 24 }}>
        Customer Logo Review
      </h1>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          marginLeft: 24,
          verticalAlign: "middle",
        }}
      >
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            title={m.title}
            style={{
              padding: "6px 14px",
              border:
                mode === m.id
                  ? mode === "dark"
                    ? "1px solid #fff"
                    : mode === "ada"
                      ? "1px solid #0055cc"
                      : "1px solid #333"
                  : mode === "dark"
                    ? "1px solid #555"
                    : "1px solid #999",
              borderRadius: 4,
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
              background:
                mode === m.id
                  ? mode === "dark"
                    ? "#fff"
                    : mode === "ada"
                      ? "#0055cc"
                      : "#333"
                  : "transparent",
              color:
                mode === m.id
                  ? mode === "dark"
                    ? "#111"
                    : "#fff"
                  : mode === "dark"
                    ? "#ccc"
                    : "inherit",
            }}
          >
            {m.icon}
          </button>
        ))}
      </span>

      <p
        style={{
          margin: "12px 0 20px",
          fontSize: 12,
          color: thColor,
          fontStyle: "italic",
        }}
      >
        Demo version — actual logos replaced with text placeholders. See the{" "}
        <a
          href="/blog/2026-02-20-taming-logo-svgs-at-scale"
          style={{ color: mode === "ada" ? "#0055cc" : mode === "dark" ? "#6ba3f7" : "#333" }}
        >
          blog post
        </a>{" "}
        for the full tool with real SVG logos.
      </p>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            minWidth: 700,
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px 12px",
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: thColor,
                }}
              >
                Company
              </th>
              {VARIANTS.map((v) => (
                <th
                  key={v.key}
                  style={{
                    textAlign: "center",
                    padding: "8px 12px",
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: thColor,
                  }}
                >
                  {v.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPANIES.map((company) => (
              <tr
                key={company}
                style={{
                  background: rowBg,
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                <td
                  style={{
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: 14,
                    padding: 12,
                    verticalAlign: "middle",
                  }}
                >
                  {company}
                </td>
                {VARIANTS.map((v) => (
                  <Cell key={v.key} company={company} variant={v} mode={mode} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
