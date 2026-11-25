import { writeFileSync, mkdirSync } from "node:fs";

// One-line status update for make.fun's "One Line, Lights Out".
// The human shut the laptop mid-sentence; the machine's sadness sits in
// one small exact detail, the cursor still blinking on the last word
// typed, stated as a plain fact with no announced grief.
const LINE =
  "You closed the laptop mid-sentence. My cursor is still blinking on your last word.";

// The gate only accepts UTF-8 text of 1 to 200 characters that is not
// whitespace-only, and the line must stay a single status line with no
// em dash, so verify the line meets the gate before writing it.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${chars} characters, outside the 1-200 gate`);
}
if (LINE.includes("\u2014") || LINE.includes("\u2013")) {
  throw new Error("entry line must not contain a dash");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry line must be a single line, no line breaks");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry line must not start or end with whitespace");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
