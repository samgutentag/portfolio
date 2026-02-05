/**
 * migrate-writing-prompts.mjs
 *
 * Moves the prompt text out of the markdown body and into the frontmatter
 * `title` field, then strips the prompt block from the body so it doesn't
 * render twice (once as the <h1> from frontmatter, once as a blockquote).
 *
 * Handles two body shapes:
 *
 *   Shape A (stub — no response written yet):
 *     > Prompt: What is the meaning of…
 *
 *   Shape B (response started — has section headings):
 *     ## Prompt
 *     > Prompt: What is the meaning of…
 *     ## Writing
 *     <actual response>
 *
 * In both cases the "> Prompt: …" line (and the "## Prompt" heading above it,
 * if present) are removed. Everything else — including "## Writing" and the
 * response — stays.
 *
 * Usage:
 *   node scripts/migrate-writing-prompts.mjs          ← runs for real
 *   node scripts/migrate-writing-prompts.mjs --dry-run ← preview only
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, "..", "content", "writing");
const DRY_RUN = process.argv.includes("--dry-run");

const files = fs
  .readdirSync(CONTENT_DIR)
  .filter((f) => path.extname(f) === ".md")
  .sort();

let updated = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Pull the prompt sentence out of "> Prompt: …"
  const promptMatch = content.match(/^>\s*Prompt:\s*(.+)/m);
  if (!promptMatch) {
    console.log(`[skip] ${file} — no "> Prompt:" line`);
    skipped++;
    continue;
  }

  const promptText = promptMatch[1].trim();

  // Strip the prompt block from the body.
  // If there's a "## Prompt" heading directly before the blockquote, remove
  // that too — it becomes redundant once the prompt is the page <h1>.
  //
  // The regex matches:
  //   (optional)  ## Prompt\n\n
  //   (required)  > Prompt: …\n
  //   (optional)  trailing blank line
  const cleaned = content
    .replace(/(^|\n)##\s*Prompt\s*\n\s*\n>\s*Prompt:\s*.+\n?(\n)?/, "$1")
    .replace(/^>\s*Prompt:\s*.+\n?(\n)?/m, "")
    .trimStart();

  // Update frontmatter title
  data.title = promptText;

  // gray-matter.stringify: re-serialises frontmatter + body.
  // Preserves key order from the original data object.
  const output = matter.stringify(cleaned, data);

  if (DRY_RUN) {
    console.log(`\n[dry-run] ${file}`);
    console.log(`  title  → ${promptText}`);
    console.log(`  body   → ${cleaned.slice(0, 80)}${cleaned.length > 80 ? "…" : ""}`);
  } else {
    fs.writeFileSync(filePath, output);
    console.log(`[ok]   ${file}`);
  }

  updated++;
}

console.log(
  `\n${DRY_RUN ? "Would update" : "Updated"} ${updated} files, skipped ${skipped}.`
);
